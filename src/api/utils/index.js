import axios from "axios";

export class RequestUtils {
  static async get(url, params) {
    return this.executeRequest("GET", url, {
      params: {
        ...params
      }
    });
  }

  static async post(url, payload) {
    return this.executeRequest("POST", url, payload);
  }

  static async put(url, payload) {
    return this.executeRequest("PUT", url, payload);
  }

  static async executeRequest(type, url, payload) {
    let response = this.fetchResponse(type, url, payload);
    response.catch(console.error);
    return (await response).data;
  }

  static fetchResponse(type, url, payload) {
    switch (type) {
      case "GET":
        return axios.get(url, payload);
      case "POST":
        return axios.post(url, payload);
      case "PUT":
        return axios.put(url, payload);
      default:
        console.error(
          `You are trying to execute the following type of request, which doesn't exist: ${type}`
        );
        return {};
    }
  }
}
