import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../../hook/useAxios";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { uSeR } from "../../auth/helper";
import { upDateUser } from "../../auth/slicers/Userslicer";
import { LogHistoryType } from "../helper";

const Settings = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const [authRequest] = useAxios();
  const [logHistory, setlogHistory] = useState<LogHistoryType[]>();
  const [payMethodSettings, setpayMethodSettings] = useState({
    btc_id: user.btc_id ? user.btc_id : "",
    usdt_id: user.usdt_id ? user.usdt_id : "",
    perfect_money_id: user.perfect_money_id ? user.perfect_money_id : "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    setpayMethodSettings((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    upDateUserpaymethod();
  };

  const upDateUserpaymethod = async () => {
    try {
      const { data } = await authRequest.post<uSeR>(
        "/settings/",
        payMethodSettings
      );
      // console.log(data);
      dispatch(upDateUser(data));
      toast.info("Payment Method updated");
    } catch (error) {
      let err = error as AxiosError;
      toast.warn(err.message);
    }
  };

  const getLogHistory = async () => {
    try {
      const { data } = await authRequest.get("/settings/");
      // console.log(data);
      setlogHistory(data);
    } catch (error) {
      let err = error as AxiosError;
      toast.warn(err.message);
    }
  };

  useEffect(() => {
    getLogHistory();

    return () => {};
  }, []);

  return (
    <>
      <div className="in-section">
        <div className="container">
          <div className="col-lg-12">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Settings</h1>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  settings
                </li>
              </ol>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                  <a
                    data-bs-toggle="tab"
                    className="nav-link active"
                    aria-current="page"
                    href="#paymentdetails"
                  >
                    Details
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-bs-toggle="tab"
                    href="#loghistory"
                  >
                    Login history
                  </a>
                </li>
              </ul>
              <div className="tab-content">
                {/* <!--tab pane--> */}
                <div className="tab-pane container active" id="paymentdetails">
                  <form action="" onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                      <label htmlFor="bank" className="form-label">
                        Perfect Money
                      </label>
                      <input
                        name="perfect_money_id"
                        type="text"
                        className="form-control form-control-lg"
                        id="perfectmoney"
                        placeholder="Perfect Money"
                        value={payMethodSettings.perfect_money_id}
                        onChange={handleChange}
                      />
                      <p className="text-danger"></p>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="acc-name" className="form-label">
                        Btc Address
                      </label>
                      <input
                        name="btc_id"
                        type="text"
                        className="form-control form-control-lg"
                        id="acc-name"
                        placeholder="Btc Address"
                        value={payMethodSettings.btc_id}
                        onChange={handleChange}
                      />
                      <p className="text-danger"></p>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="acc-num" className="form-label">
                        Usdt address
                      </label>
                      <input
                        name="usdt_id"
                        type="text"
                        className="form-control form-control-lg"
                        id="acc-num"
                        placeholder="Usdt address"
                        value={payMethodSettings.usdt_id}
                        onChange={handleChange}
                      />
                      <p className="text-danger"></p>
                    </div>

                    <div className="mb-3">
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-primary custom mt-3"
                          type="submit"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="tab-pane container" id="loghistory">
                  <table
                    id="profittable"
                    className="table table-hover table-striped"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>IP address</th>
                        <th>Browser</th>
                      </tr>
                    </thead>
                    <tbody>
                      {logHistory ? (
                        logHistory.map((loh) => (
                          <tr key={loh.id}>
                            <td>{loh.date}</td>
                            <td>{loh.ip_add}</td>
                            <td>{loh.device}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td>No Log history</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
