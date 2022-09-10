import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../../../hook/useAxios";
import { useAppDispatch } from "../../../hooks";
import { upDateUser } from "../../auth/slicers/Userslicer";
import Package from "../components/Package";
import { createInvestmentResponse, PackageResponse } from "../helper";

type Formdata = {
  packId: string;
  amount: number;
};

const CreateInvestment: React.FC = () => {
  const [packages, setPackages] = useState<PackageResponse[]>();
  const [packForm, setpackForm] = useState({ packId: "", amount: 0 });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [authRequest] = useAxios();
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.name, e.target.value);
    setpackForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setpackForm((prev) => ({ ...prev, packId: e.target.value }));
  };

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createInvestment(packForm);
  };

  const createInvestment = async (formData: Formdata) => {
    setLoading(true);
    try {
      const { data } = await authRequest.post<createInvestmentResponse>(
        "/create-investment/",
        formData
      );
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else if (data.msg) {
        dispatch(upDateUser(data.investment.user));
        toast.success(data.msg);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    authRequest
      .get("/get-packages/")
      .then((res) => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));

    return () => {
      setPackages([]);
    };
  }, []);

  return (
    <>
      <div className="in-section">
        <div className="container">
          <div className="col-lg-12">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">Invest</h1>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Create Investment
                </li>
              </ol>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <h2 className=" mt-5">INVESTMENT PRICING.</h2>
              <p className="uk-text-lead">
                {" "}
                You can choose a plan that best suit you.{" "}
              </p>
              <i className="fas fa-chevron-down uk-text-primary"></i>
            </div>
          </div>
          <form action="" onSubmit={handlesubmit}>
            <div className="row ">
              <div className="col-lg-12">
                <div className="row justify-content-center">
                  {packages ? (
                    packages.map((pack) => (
                      <Package
                        key={pack.id}
                        id={pack.id}
                        hours={pack.hours}
                        name={pack.name}
                        percent={pack.percent}
                        min_amount={pack.min_amount}
                        max_amount={pack.max_amount}
                        ref_percent={pack.ref_percent}
                        handleFChange={handleRChange}
                        packFId={packForm.packId}
                      />
                    ))
                  ) : (
                    <span>Loading</span>
                  )}
                </div>
              </div>
              <div className="col-lg-12">
                <div className="mb-3 mt-4">
                  <label htmlFor="btc-address" className="form-label">
                    Amount
                  </label>
                  <input
                    name="amount"
                    type="text"
                    className={"form-control "}
                    id="amount"
                    placeholder="Amount"
                    required={true}
                    onChange={handleChange}
                  />
                </div>
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateInvestment;
