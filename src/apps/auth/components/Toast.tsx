import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
const ToastComp = () => {
  const dialogs = document.getElementById("dialogs") as HTMLElement;
  return ReactDOM.createPortal(
    <>
      <ToastContainer />
    </>,
    dialogs
  );
};

export default ToastComp;
