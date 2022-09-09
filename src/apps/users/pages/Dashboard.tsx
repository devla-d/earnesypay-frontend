import { AxiosError } from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../../../hook/useAxios";
import { useAppDispatch, useAppSelector } from "../../../hooks";
// import { reQuest } from "../../../services";
import { upDateUser } from "../../auth/slicers/Userslicer";
import {
  COLOR_CODES,
  FULL_DASH_ARRAY,
  WARNING_THRESHOLD,
  ALERT_THRESHOLD,
  formatTime,
  setRemainingPathColor,
  InvestmentResponse,
  endInvestmentResponse,
  investmentType,
  initInvestment,
} from "../helper";

const Dashboard = () => {
  const user = useAppSelector((state) => state.user.user);
  const interVal = useRef<NodeJS.Timeout>();
  const [investment, setInvestment] = useState<investmentType>(initInvestment);
  const [timeLimit, settimeLimit] = useState(0);
  const [startTime, setstartTime] = useState(false);
  const [END_Date, setEND_Date] = useState(0);
  const dispatch = useAppDispatch();
  const [authRequest] = useAxios();

  const TIME_LIMIT = timeLimit;
  let timePassed = 0;
  let timeLeft = TIME_LIMIT;

  let remainingPathColor = COLOR_CODES.info.color;

  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }

  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      ?.setAttribute("stroke-dasharray", circleDasharray);
  }
  function startTimer() {
    interVal.current = setInterval(() => {
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;

      var basetimerlabel = document.getElementById(
        "base-timer-label"
      ) as HTMLElement;

      var now = new Date().getTime();
      var distance = END_Date - now;
      // console.log("dis", distance);

      basetimerlabel.innerHTML = formatTime(distance);
      setCircleDasharray();
      setRemainingPathColor(timeLeft);

      if (timeLeft < 1 || timeLeft === 0) {
        console.log("clearing interval");
        clearInterval(interVal.current);
        completeInvestment();
      }
    }, 1000);
  }

  const getUserInvestment = async () => {
    try {
      const { data } = await authRequest.get<InvestmentResponse>("/dashboard/");
      // console.log(data);
      if (data.investment === null) {
        toast.warning("No active investment");
        setInvestment(initInvestment);
      } else {
        // console.log(data.investment.end_date.toString());
        setInvestment(data.investment);
        if (data.investment.status === "active") {
          var now = new Date().getTime();
          var end_date = Date.parse(data.investment.end_date.toString());

          var distance = end_date - now;
          var seconds = Math.floor(distance / 1000);
          setEND_Date(end_date);

          setInvestment(data.investment);

          setstartTime(true);
          settimeLimit(seconds);
        }
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const completeInvestment = async () => {
    if (startTime) {
      try {
        const { data } = await authRequest.post<InvestmentResponse>(
          "/end-investment/",
          {
            ping: "PONG",
          }
        );
        // console.log(data);

        setInvestment(data.investment);
        dispatch(upDateUser(data.investment.user));

        toast.info("Account Credited");
      } catch (error) {
        let err = error as AxiosError;
        toast.error(err.message);
      }
    }
  };

  useEffect(() => {
    if (startTime) {
      startTimer();
    }

    //   isFirstrender.current = false;
    // }

    return () => {};
  }, [timeLeft, startTime, END_Date]);

  useEffect(() => {
    document.title = "Dashboard";
    getUserInvestment();

    return () => {
      clearInterval(interVal.current);
    };
  }, []);

  return (
    <>
      <div className="in-section">
        <div className="container">
          <h5>welcom {user.full_name}</h5>
          <div className="balance-box in-background-contain">
            <h3 id="bal-title">Avialable Balance</h3>
            <Link to="/withdraw-funds" className="fund-acc">
              <h5>
                Withdraw
                <span className="fas fa-plus"></span>
              </h5>
            </Link>
            <h1 id="bal">${user.balance}</h1>
            <ul className="account-info">
              <li>
                <p>User Id</p>
                <h4>{user.username}</h4>
              </li>
              <li>
                <p>Account Status</p>
                <h4>Active</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="in-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row justify-content-center align-center">
                <div className="col-lg-6">
                  <div className="">
                    <div className="in-card in-box-shadow-small in-card-body">
                      <h3 className="in-card-title">Spending</h3>
                      <div className="in-box">
                        <div className="chbox in-text-center">
                          <img
                            src="/assets/users/images/spend.png"
                            alt=""
                            className="barpng"
                          />
                        </div>
                        <div>
                          <ul>
                            <li>
                              <h5>Deposit Balance</h5>
                              <p>
                                <strong>$</strong>
                                {user.deposit_balance}
                              </p>
                            </li>
                            <li>
                              <h5>Total Withdraw</h5>
                              <p>
                                <strong>$</strong>
                                {user.total_withdraw}
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div id="counter-box">
                    <div className="base-timer">
                      <svg
                        className="base-timer__svg"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g className="base-timer__circle">
                          <circle
                            className="base-timer__path-elapsed"
                            cx="50"
                            cy="50"
                            r="45"
                          ></circle>
                          <path
                            id="base-timer-path-remaining"
                            strokeDasharray="283"
                            className={`base-timer__path-remaining ${remainingPathColor}`}
                            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
                          ></path>
                        </g>
                      </svg>
                      <span id="base-timer-label" className="base-timer__label">
                        {formatTime(timeLeft)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 mt-3">
                  <div className="in-card in-box-shadow-small in-card-hover in-card-body">
                    <div className="io-investinfo">
                      <div className="tip-balance">
                        <ul>
                          <li>
                            <h4>Amount Invested :</h4>
                            <p>${investment.amount_invested}</p>
                          </li>
                          <li>
                            <h4>Package :</h4>
                            {investment.status == "inactive" ? (
                              <p>None</p>
                            ) : (
                              <p>{investment.package.name}</p>
                            )}
                          </li>
                          <li>
                            <h4>Start Date :</h4>
                            {investment.status == "inactive" ? (
                              <p>None</p>
                            ) : (
                              <p>{investment.start_date.toString()}</p>
                            )}
                          </li>
                          <li>
                            <h4>Status :</h4>
                            <p
                              className={
                                investment.status === "active"
                                  ? "text-success"
                                  : "text-warning"
                              }
                            >
                              {investment.status}
                            </p>
                          </li>
                          {investment.status == "completed" ||
                          investment.status == "inactive" ? (
                            <li>
                              <Link
                                to="/create-investment"
                                className="btn btn-primary custom mt-2"
                              >
                                Invest
                              </Link>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
