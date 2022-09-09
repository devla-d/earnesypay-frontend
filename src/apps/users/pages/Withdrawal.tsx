import React, { useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../../hook/useAxios";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { upDateUser } from "../../auth/slicers/Userslicer";
import { WithdrawResponse } from "../helper";

const Withdrawal = () => {
  const [authRequest] = useAxios();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const [payMethod, setpayMethod] = useState({ mode: "", amount: "" });
  const [bankPay, setbankPay] = useState({
    acc_name: "",
    acc_num: "",
    ty_pe: "",
    mode: "Bank transfer",
    amount: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    setpayMethod((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleChangeII = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    setbankPay((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handlePaySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    makePayWithapp();
  };

  const handleBankSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("submited");
    makePayWithBank();
  };

  const makePayWithapp = async () => {
    try {
      setLoading(true);
      const { data } = await authRequest.post<WithdrawResponse>(
        "/withdrawal-funds/",
        {
          mode: payMethod.mode,
          amount: payMethod.amount,
        }
      );

      // console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        dispatch(upDateUser(data.user));
        toast.info(data.msg);
        setpayMethod({ mode: "", amount: "" });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const makePayWithBank = async () => {
    try {
      setLoading(true);
      const { data } = await authRequest.post<WithdrawResponse>(
        "/withdrawal-funds/",
        {
          acc_name: bankPay.acc_name,
          acc_num: bankPay.acc_num,
          ty_pe: bankPay.ty_pe,
          mode: bankPay.mode,
          amount: bankPay.amount,
        }
      );

      // console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        dispatch(upDateUser(data.user));
        toast.info(data.msg);
        setbankPay((prev) => ({
          ...prev,
          acc_name: "",
          acc_num: "",
          ty_pe: "",
          amount: "",
        }));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="in-section">
        <div className="container">
          <div className="col-lg-12">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="withdrawl-box">
                  <p>
                    Enter the amount you want to withdwral, Current Balance : $
                    {user.balance}
                  </p>
                  <ul className="nav nav-tabs justify-content-center">
                    <li className="nav-item">
                      <a
                        data-bs-toggle="tab"
                        className="nav-link active"
                        aria-current="page"
                        href="#msg"
                      >
                        DETAILS
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-bs-toggle="tab" href="#pro">
                        Bank Transfer
                      </a>
                    </li>
                  </ul>
                  {/* <!-- Tab panes --> */}
                  <div className="tab-content">
                    {/* <!--tab pane--> */}
                    <div className="tab-pane container active" id="msg">
                      <form action="" onSubmit={handlePaySubmit}>
                        <div className="mt-2 mb-3">
                          <label>Select a method to recieve money</label>
                          <div className="paymethod mt-3">
                            <div className="radio-toolbar">
                              <input
                                type="radio"
                                name="mode"
                                id="mode_perfect_money"
                                required={true}
                                value="Perfect money"
                                onChange={handleChange}
                                checked={payMethod.mode === "Perfect money"}
                              />
                              <label htmlFor="mode_perfect_money">
                                Perfect Money
                              </label>
                            </div>
                            <div className="radio-toolbar">
                              <input
                                type="radio"
                                name="mode"
                                id="mode_btc"
                                required={true}
                                value="Bitcoin"
                                onChange={handleChange}
                                checked={payMethod.mode === "Bitcoin"}
                              />
                              <label htmlFor="mode_btc"> Bitcoin</label>
                            </div>
                            <div className="radio-toolbar">
                              <input
                                type="radio"
                                name="mode"
                                id="mode_usdt"
                                required={true}
                                value="USDT"
                                onChange={handleChange}
                                checked={payMethod.mode === "USDT"}
                              />
                              <label htmlFor="mode_usdt"> USDT</label>
                            </div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Amount
                          </label>
                          <input
                            type="number"
                            name="amount"
                            className="form-control form-control-lg"
                            id="amount"
                            placeholder="Amount"
                            value={payMethod.amount}
                            onChange={handleChange}
                          />
                          <p className="text-danger"></p>
                        </div>

                        <div className="mb-3">
                          <div className="d-grid gap-2">
                            <button
                              className="btn btn-primary custom mt-3"
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? (
                                <i className="fa fa-spinner fa-spin fa-1x formLoader"></i>
                              ) : null}
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* <!--tab pane ends--> */}
                    {/* <!--tab pane--> */}
                    <div className="tab-pane container fade" id="pro">
                      <form action="" onSubmit={handleBankSubmit}>
                        <div className="mb-3">
                          <label htmlFor="bank" className="form-label">
                            Bank Name
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="bank"
                            required={true}
                            name="ty_pe"
                            placeholder="bank name"
                            value={bankPay.ty_pe}
                            onChange={handleChangeII}
                          />
                          <p className="text-danger"></p>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="acc-name" className="form-label">
                            Account Name
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            id="acc-name"
                            required={true}
                            placeholder="Account name"
                            name="acc_name"
                            value={bankPay.acc_name}
                            onChange={handleChangeII}
                          />
                          <p className="text-danger"></p>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="acc-num" className="form-label">
                            Account Number
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            id="acc-num"
                            required={true}
                            placeholder="Account Number"
                            name="acc_num"
                            value={bankPay.acc_num}
                            onChange={handleChangeII}
                          />
                          <p className="text-danger"></p>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="amount" className="form-label">
                            Amount
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            id="payamount"
                            required={true}
                            placeholder="Amount"
                            name="amount"
                            value={bankPay.amount}
                            onChange={handleChangeII}
                          />
                          <p className="text-danger"></p>
                        </div>

                        <div className="mb-3">
                          <div className="d-grid gap-2">
                            <button
                              className="btn btn-primary custom mt-3"
                              type="submit"
                              disabled={loading}
                            >
                              {loading ? (
                                <i className="fa fa-spinner fa-spin fa-1x formLoader"></i>
                              ) : null}
                              Submit
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/* <!--tab pane ends--> */}
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

export default Withdrawal;
