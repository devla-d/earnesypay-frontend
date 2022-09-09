import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxios from "../../../hook/useAxios";
import TransactionCard from "../components/TransactionCard";
import TransDialog from "../components/TransDialog";
import { TransactionsType } from "../helper";

const Transactions = () => {
  const [dialogActive, setDialogActive] = useState(false);
  const [authRequest] = useAxios();
  const [transactionLog, settransactionLog] = useState<TransactionsType[]>();
  const [trxDetails, settrxDetails] = useState<TransactionsType>();
  const [loading, setloading] = useState(false);

  const getTransById = async (id: string) => {
    try {
      const { data } = await authRequest.post("/transaction-log/", { id });
      settrxDetails(data);
    } catch (error) {
      let err = error as AxiosError;
      // console.log(err.message);
      toast.warn(err.message);
    }
    setDialogActive(!dialogActive);
  };
  const closeDialog = () => {
    setDialogActive(false);
  };
  const getUserTranslog = async () => {
    setloading(true);
    try {
      const { data } = await authRequest.get("/transaction-log/");
      // console.log(data);
      settransactionLog(data);
    } catch (error) {
      let err = error as AxiosError;
      // console.log(err.message);
      toast.warn(err.message);
    }
    setloading(false);
  };

  useEffect(() => {
    getUserTranslog();
    return () => {
      settransactionLog([]);
    };
  }, []);

  return (
    <>
      <div className="in-section">
        <div className="container">
          <div className="col-lg-12">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">
                Transactions {transactionLog?.length}
              </h1>
              <ol className="breadcrumb" style={{ marginBottom: 0 }}>
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  transactions
                </li>
              </ol>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {transactionLog ? (
                transactionLog.map((trx) => (
                  <TransactionCard
                    key={trx.id}
                    trans_type={trx.mode}
                    amount={trx.amount.toString()}
                    date={trx.date}
                    id={trx.id.toString()}
                    handleOpen={getTransById}
                    stat={loading}
                  />
                ))
              ) : (
                <p className="text-center">Loading....</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <TransDialog
        transaction={trxDetails}
        isActive={dialogActive}
        handleClose={closeDialog}
      />
    </>
  );
};

export default Transactions;
