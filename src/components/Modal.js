import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal");

const Modal = ({ children, toggleModalLogin }) => {
  const containerDiv = document.createElement("div");

  useEffect(() => {
    modalRoot.appendChild(containerDiv);
    function keyListener(e) {
      if (e.keyCode === 27) {
        toggleModalLogin();
      }
    }
    document.addEventListener("keydown", keyListener);
    return () => modalRoot.removeChild(containerDiv);
  }, [containerDiv, toggleModalLogin]);

  return createPortal(children, containerDiv);
};

export default Modal;
