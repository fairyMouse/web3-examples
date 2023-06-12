import { toast } from 'react-toastify';

export default function handleError(error: any) {
  let msg = 'unknown error';
  if (error.info?.error) {
    msg = error.info?.error.message;
  } else {
    msg = error.toString();
  }
  toast.error(msg);
}
