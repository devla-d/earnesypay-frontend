import React from "react";
interface TransactionCardInterface {
  trans_type: string;
  amount: string;
  id: string;
  date: string;
  handleOpen: (id: string) => void;
  stat: boolean;
}
const inDanger = {
  color: "orangered",
};
const transIcon = {
  backgroundColor: "#bdb6b6",
};
const TransactionCard = (props: TransactionCardInterface) => {
  const { id, trans_type, amount, handleOpen, stat, date } = props;

  const openDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    // console.log(id);
    handleOpen(id);
  };

  let ttype;
  let deposit: boolean;
  if (trans_type == "Deposit") {
    deposit = true;
    ttype = <i className="fas fa-credit-card text-warning"></i>;
  } else {
    deposit = false;
    ttype = <i className="fas fa-download text-danger"></i>;
  }
  return (
    <>
      <div className="in-trans-card">
        <div className="trans-icon" style={transIcon}>
          {ttype}
        </div>
        <div className="trans-name">
          <h4>{trans_type}</h4>
          <p className="in-text-lead">{date}</p>
        </div>
        <div className="trans-amount">
          {deposit ? (
            <h4 className="text-success">+${amount}</h4>
          ) : (
            <h4 style={inDanger}>-${amount}</h4>
          )}
        </div>
        <div className="trans-detail">
          <div>
            <a
              onClick={openDialog}
              href="#"
              className={"openTransdialog " + (stat ? "disable" : null)}
            >
              <i className="fas fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionCard;
