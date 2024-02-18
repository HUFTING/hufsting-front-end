import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const autoClose = 1000;

const StyledToast = () => (
  <ToastContainer
    position="top-center"
    autoClose={autoClose}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss={false}
    draggable
    pauseOnHover={false}
    theme="light"
  />
);

export default StyledToast;
