import './App.css';
import { useState, useEffect } from "react";
import Routes from "./routes-nav/Routes";
import { BrowserRouter } from 'react-router-dom';
import JoblyApi from "./api/api";
import jwt from "jsonwebtoken";
import UserContext from "./userContext";
import useLocalStorage from "./hooks/useLocalStorage";

/** App Component
 * 
 * Props: none
 * 
 * State: 
 * - currentUser: {}
 * - token : null
 * - receivedCurrUser: T/F
 * 
 * App -> Routes
 * */

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("token", null);
  const [receivedCurrUser, setReceivedCurrUser] = useState(false);

  /* Logout function, sets currentUser to null */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /* signup function, set token */
  async function signup(formData) {
    try {
      const resToken = await JoblyApi.signup(formData);
      setToken(resToken);

      return ["Signup successful"]
    } catch (err) {
      return err;
    }
  }

  /* login function, set token */
  async function login(formData) {
    try {
      const resToken = await JoblyApi.login(formData);
      setToken(resToken);

      return ["Login successful"];
    } catch (err) {
      return err;
    }
  }

  /* update user profile */
  async function updateProfile(formData) {
    try {
      await JoblyApi.updateProfile(formData);
      const user = await JoblyApi.getUser(currentUser.username);
      setCurrentUser({ ...user, applications: new Set(user.applications) });

      return ["Profile update successful"];
    } catch (err) {
      let errorMsg = err;
      if (err[0] === "instance.password does not meet minimum length of 5") {
        errorMsg[0] = "Password does not meet minimum length of 5"
      }
      return errorMsg;
    }
  };

  /* apply to job, re-set currentUser with Set of jobs applied to */
  async function applyToJob(id) {
    await JoblyApi.applyJob(currentUser.username, id);
    const user = await JoblyApi.getUser(currentUser.username);
    setCurrentUser({ ...user, applications: new Set(user.applications) });
  }

  useEffect(function getCurrentUser() {
    async function getCurrentUserApiCall() {
      if (token !== null) {
        JoblyApi.token = token;

        const payload = jwt.decode(token);
        const user = await JoblyApi.getUser(payload.username);

        setCurrentUser({ ...user, applications: new Set(user.applications) });
      }

      setReceivedCurrUser(true);
    };

    setReceivedCurrUser(false);
    getCurrentUserApiCall();
  }, [token])

  if (!receivedCurrUser) return <div> Loading... </div>;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value={currentUser} >
          <Routes
            logout={logout}
            signup={signup}
            login={login}
            updateProfile={updateProfile}
            applyToJob={applyToJob} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
