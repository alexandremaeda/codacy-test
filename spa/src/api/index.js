import axios from "axios";
import Swal from "sweetalert2";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  crossdomain: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use(
  async function (config) {
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (err) {
    // check for errorHandle config
    if (
      Object.prototype.hasOwnProperty.call(err.config, "errorHandle") &&
      err.config.errorHandle === false
    ) {
      return Promise.reject(err);
    }

    if (err.response) {
      Swal.fire({
        title: "Erro!",
        text: err.message,
        icon: "error",
        confirmButtonText: "Fechar",
      });
    }
  }
);

export default () => {
  return instance;
};
