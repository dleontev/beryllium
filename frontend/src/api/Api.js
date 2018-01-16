import axios from "axios";

const API = "http://localhost:4000/api"; // process.env.REACT_APP_API_URL;

export default {
  get(url) {
    return axios({
      method: "GET",
      headers: { "Content-Type": "application/json" },
      url: `${API}${url}`
    })
      .catch(error => {
        console.log(error);
      });
  },

  post(url, data) {
    return axios({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      url: `${API}${url}`,
      data: data
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
