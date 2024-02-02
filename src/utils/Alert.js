import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "../constant/Alert.css";

const Alert = (
  title = "",
  message = "",
  handleClickYes = () => {},
  isCloseButton = false,
  handleClickNo = () => {},
  afterClose = () => {},
  closeOnClickOutside = true,
  buttonTextYes = "Yes",
  buttonTextNo = "No"
) => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className="custom-ui">
          <span className="heading">{title}</span>
          <span className="message">{message}</span>
          <div className="buttons">
            {isCloseButton && (
              <button
                onClick={() => {
                  handleClickNo();
                  onClose();
                }}
              >
                {buttonTextNo}
              </button>
            )}
            <button
              onClick={() => {
                handleClickYes();
                onClose();
              }}
            >
              {buttonTextYes}
            </button>
          </div>
        </div>
      );
    },
    afterClose: afterClose,
    closeOnClickOutside: closeOnClickOutside,
  });
};
export default Alert;
