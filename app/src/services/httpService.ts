import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(
  () => { },
  (error: AxiosError) => {
    const { response } = error;
    if (!response) {
      toast.error("Check your internet connection");
      return Promise.reject(error);
    }
    const expectedError =
      response &&
      response.status >= 400 &&
      response.status < 500;

    if (expectedError) {
      toast.error("something went wrong");
    }
    else {
      logger.log(error);
      toast.error("An unexpected error occurred");
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
