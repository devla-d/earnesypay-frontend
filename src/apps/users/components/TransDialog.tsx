import ReactDOM from "react-dom";
import React from "react";
import { TransactionsType } from "../helper";

interface diaLogType {
  isActive: boolean;
  handleClose: () => void;
  transaction: TransactionsType | undefined;
}

const TransDialog = (props: diaLogType) => {
  const { isActive, handleClose, transaction } = props;
  const closedialog = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
  };

  const dialogs = document.getElementById("dialogs") as HTMLElement;
  return ReactDOM.createPortal(
    <div
      id="trans-dialog"
      className={"trans-dialog " + (isActive ? "active" : null)}
    >
      <div className="trans-dialog-content">
        <div className="trans-header">
          <h3>Transaction Detail</h3>
          <a onClick={closedialog} href="#" id="closeTransDialog">
            <i className="fas fa-times"></i>
          </a>
        </div>
        <div className="trans-table">
          <div className="table-responsive table-upgrade">
            {transaction ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>{transaction.mode}</th>
                    <th className="text-center">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>User</td>
                    <td className="text-center">
                      <span id="with-user">{transaction.user.full_name}</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Amount</td>
                    <td className="text-center text-danger">
                      $<span id="with-amount">{transaction.amount}</span>
                    </td>
                  </tr>

                  {transaction.bank_details ? (
                    <tr>
                      <td>Bank</td>
                      <td className="text-center text-warning">
                        <span id="with-method">
                          {transaction.bank_details.ty_pe}
                        </span>
                      </td>
                    </tr>
                  ) : null}

                  {transaction.bank_details ? (
                    <tr>
                      <td>Acc Num</td>
                      <td className="text-center text-warning">
                        <span id="with-method">
                          {transaction.bank_details.acc_num}
                        </span>
                      </td>
                    </tr>
                  ) : null}

                  {transaction.bank_details ? (
                    <tr>
                      <td>Acc Name</td>
                      <td className="text-center text-warning">
                        <span id="with-method">
                          {transaction.bank_details.acc_name}
                        </span>
                      </td>
                    </tr>
                  ) : null}

                  {!transaction.bank_details ? (
                    <tr>
                      <td>Acc Name</td>
                      <td className="text-center text-warning">
                        <span id="with-method">{transaction.paymethod}</span>
                      </td>
                    </tr>
                  ) : null}

                  <tr>
                    <td>Date</td>
                    <td className="text-center">
                      <span id="with-date">{transaction.date}</span>
                    </td>
                  </tr>

                  <tr>
                    <td>Status</td>
                    <td className="text-center text-success">
                      <span id="with-status">{transaction.status}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>,
    dialogs
  );
};

export default TransDialog;
