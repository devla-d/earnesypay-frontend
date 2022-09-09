import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../hooks";

interface Prop {
  isActive: boolean;
  closeDialog: () => void;
}

const RefDialog = (props: Prop) => {
  const { isActive, closeDialog } = props;
  const user = useAppSelector((state) => state.user.user);
  const closeRefDialog = (e: React.MouseEvent) => {
    e.preventDefault();
    closeDialog();
  };

  const copyFunction = () => {
    // console.log("Click");
    var copyText = document.getElementById("myinput") as HTMLInputElement;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    toast.info("Copied");
  };

  const dialogs = document.getElementById("dialogs") as HTMLElement;
  return ReactDOM.createPortal(
    <div id="refdialog" className={"refdialog " + (isActive ? "active" : null)}>
      <div className="ref-dialog-content">
        <div className="ref-icon animate" style={{ display: "block" }}>
          <i className="fas fa-check"></i>
        </div>
        <h2>Your referrals!</h2>
        <ul className="ref-menu">
          <li>
            <h3>No of Referrals</h3>
            <p>{user.referral}</p>
          </li>
          <li>
            <h3>Referral Bonus</h3>
            <p>${user.referral_balance}</p>
          </li>
        </ul>
        <div>
          <label htmlFor="reflink" className="form-label">
            Referral code
          </label>
          <div className="row">
            <div className="col-10">
              <input
                type="text"
                value={user.username}
                className="form-control"
                id="myinput"
                readOnly={true}
              />
            </div>
            <div className="col-2">
              <button
                onClick={() => copyFunction()}
                style={{ marginLeft: "-25px" }}
                className="btn btn-primary custom copyBtn"
              >
                copy
              </button>
            </div>
          </div>
        </div>
        <div className="close-ref-dialog text-center">
          <a onClick={closeRefDialog} href="#" id="closerefdialog">
            <span>close</span>
          </a>
        </div>
      </div>
    </div>,
    dialogs
  );
};

export default RefDialog;
