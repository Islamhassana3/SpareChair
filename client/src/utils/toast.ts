import { toast } from 'react-toastify';

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 3000,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
  });
};

export const showInfoToast = (message: string) => {
  toast.info(message, {
    position: 'top-right',
    autoClose: 4000,
  });
};

export const showWarningToast = (message: string) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 4000,
  });
};
