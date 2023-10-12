import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// const notify = (message) => {
//     toast.info(message);
//   };

  export function notifySuccess(message) {
    toast.success(message);
  }

  export function notifyError(message) {
    toast.error(message);
  }

  export function notifyWarning(message) {
    toast.warn(message);
  }
