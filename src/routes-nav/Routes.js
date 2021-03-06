import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import Nav from "./Nav";
import CompanyList from "../companies/CompanyList";
import CompanyDetail from "../companies/CompanyDetail";
import JobList from "../jobs/JobList";
import LoginForm from "../auth/LoginForm";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profiles/ProfileForm";
import UserContext from "../userContext";
import { useContext } from "react";

/** Routes Component
 * 
 * Props:
 * - currentUser: {}
 * - logout: function passed from App
 * - login: function passed from App
 * - signup: function passed from App
 * - applyToJob: function passed from App
 * 
 * State: none
 * 
 * App -> Routes -> {Homepage, CompanyList, CompanyDetail, JobList, LoginForm, SignupForm, ProfileForm}
 * */

function Routes({ login, logout, signup, updateProfile, applyToJob }) {
  const currentUser = useContext(UserContext);

  return (
    <>
      <Nav logout={logout} />
      <div className="pt-5">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/companies">
            {currentUser ? <CompanyList /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/companies/:handle">
            {currentUser ? <CompanyDetail applyToJob={applyToJob} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/jobs">
            {currentUser ? <JobList applyToJob={applyToJob} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/profile">
            {currentUser ? <ProfileForm updateProfile={updateProfile} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/login">
            {!currentUser ? <LoginForm login={login} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/signup">
            {!currentUser ? <SignupForm signup={signup} /> : <Redirect to="/" />}
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
}

export default Routes;