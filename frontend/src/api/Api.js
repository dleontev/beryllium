import axios from "axios";

const API = "http://localhost:4000/api"; // process.env.REACT_APP_API_URL;

function headers() {
  const token = localStorage.getItem("token");

  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer: ${token}`
  };
}

export default {
  getUserId() {
    var token = localStorage.getItem("token");

    if (token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      return JSON.parse(window.atob(base64)).aud.split(":")[1];
    }

    return null;
  },

  isTeacher(courseId) {
    var promise = Promise.resolve(
      this.get(`/enrollments/user/${courseId}`).then(response => {
        if (typeof response !== "undefined") {
          return response.data.data.role === "teacher";
        }
      })
    );

    return promise;
  },

  get(url, data = null) {
    return axios({
      method: "GET",
      headers: headers(),
      url: `${API}${url}`,
      data: data
    }).catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  },

  delete(url, data = null) {
    return axios({
      method: "DELETE",
      headers: headers(),
      url: `${API}${url}`,
      data: data
    }).catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  },

  post(url, data) {
    return axios({
      method: "POST",
      headers: headers(),
      url: `${API}${url}`,
      data: data
    }).catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  },

  put(url, data) {
    return axios({
      method: "PUT",
      headers: headers(),
      url: `${API}${url}`,
      data: data
    }).catch(function(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  }
};
