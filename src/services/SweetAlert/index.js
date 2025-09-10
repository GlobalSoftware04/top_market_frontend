import { createContext, useContext, useState } from 'react';
import './custom-toast.css';
import { useToast } from 'vyrn';

const SwalContext = createContext();
export const useSwal = () => useContext(SwalContext);

export const SwalProvider = ({ children }) => {
  const toast = useToast();
  const [alertVisible, setAlertVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const alert = (type, message, title = '') => {
    toast[type](message, {
      title: title || type.toUpperCase(),
      duration: 3000,
      //position: 'bottom-right',
      showCloseButton: true,
      backgroundColor: false,
      color: true,
      onDismiss: () => setAlertVisible(false),
      progressBar: false,
      showProgressBar: false,
      className: 'fade-in-up', // Entry animation
    });
  };

  const confirm = (message, title = 'Are you sure?' ,idealPop  = false) => {
  setConfirmVisible(true);

  return new Promise((resolve) => {
    let isDismissed = false;
    const toastIdRef = { current: null }; // ✅ temporary object

    const content = (
      <div
        id={`toast-confirm-box`} // ✅ safe static ID or handle another way
        className="fade-in-up"
        onAnimationEnd={() => {
          if (isDismissed && toastIdRef.current) {
            toast.dismiss(toastIdRef.current);
          }
        }}
      >
        <div className='toastmessage'>
         {!idealPop && (<button
              type="button"
              className='closebtntost'
              onClick={() => {
                toast.dismiss(toastIdRef.current);
                setConfirmVisible(false);
                resolve(false);
              }}
            >
              &times;
            </button>)}

        <span>
          <strong>{title}</strong>
          <p className="mb-0">{message}</p>
        </span>

        <div className="d-flex justify-content-center gap-2">
          <button
            className="btn cancelbtn w-50 py-1"
            onClick={() => {
              isDismissed = true;
              setConfirmVisible(false);
              resolve(false);
              document
                .getElementById('toast-confirm-box')
                ?.classList.replace('fade-in-up', 'fade-out-down');
            }}
          >
            No
          </button>
          <button
            className="btn btngradiant w-50 py-1 logoutTrigger"
            onClick={() => {
              isDismissed = true;
              setConfirmVisible(false);
              resolve(true);
              document
                .getElementById('toast-confirm-box')
                ?.classList.replace('fade-in-up', 'fade-out-down');
            }}
          >
            Yes
          </button>
          </div>
        </div>
      </div>
    );

    // ✅ Now assign toastId after content is defined
    toastIdRef.current = toast.custom(content, {
      duration: 10 * 60 * 1000,
      // position: 'bottom-right',
      className: '',
      progressBar: false,
      showProgressBar: false,
      closeOnEscape: false,
      closeOnClick: false,
      pauseOnHover: true,
      showCloseButton: false,
      draggable: false,
      wipeDirection: null,
      onDismiss: () => setConfirmVisible(false),
    });
  });
};
  // 🔹 New helper for quick success notifications
const notify = (message) => {
  toast.success(message, {
    title: "Notification",
    duration: 3000,
    position: "bottom-right",   
    showCloseButton: true,
    backgroundColor: false,
    color: true,
    progressBar: false,
    showProgressBar: false,
    // className: "fade-in-up",
       className: "custom-bottom-right fade-in-up",
  });
};


  return (
    <SwalContext.Provider value={{ alert, confirm ,notify, setConfirmVisible}}>
      {(alertVisible || confirmVisible) && (
        <div className="toast-containermain show"></div>
      )}
      {children}
    </SwalContext.Provider>
  );
};
