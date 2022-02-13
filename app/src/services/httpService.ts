import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.interceptors.response.use(
  () => {},
  (error: AxiosError) => {
    const { response } = error;

    const expectedError =
      response && response.status >= 400 && response.status < 500;

    if (!expectedError) {
      logger.log(error);
      toast.error("An unexpected error occured");
    }
    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
