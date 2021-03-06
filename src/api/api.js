import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  /** helper method to return axios response based on inputted
  endpoint, data, and method 
  */

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes


  /* login  */

  static async login(userData) {
    const res = await this.request(`auth/token`, { ...userData }, "post");
    return res.token;
  }

  /* signup */
  static async signup(userData) {
    const res = await this.request(`auth/register`, { ...userData }, "post");
    return res.token;
  }

  /* get the user given the username and token */

  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /* update the user given with user inputted form data */

  static async updateProfile(userData) {
    const data = {
       firstName: userData.firstName,
       lastName: userData.lastName,
       email: userData.email,
       password: userData.password
    };

    const res = await this.request(`users/${userData.username}`, data, "patch");
    return res.user;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies */

  static async getCompanies(name) {
    const res = await this.request(`companies`, { name });
    return res.companies;
  }

  /** Get all jobs */

  static async getJobs(title) {
    const res = await this.request(`jobs`, { title });
    return res.jobs;
  }

  /* apply for a job with a logged in user */

  static async applyJob(username, id) {
    const res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
    return res.applied;
  }

}

export default JoblyApi;