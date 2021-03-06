import { Link, useHistory } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../userContext";
import "./Homepage.css";

/* Homepage Component
Homepage with signup and login option 

Props: none

State: none

App -> Routes -> Homepage
*/

function Homepage() {
  const currentUser = useContext(UserContext);
  const history = useHistory();

  if (currentUser) history.push("/companies");

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h3 className="mb-4 font-weight-bold"> Jobly</h3>
        <p>All the jobs in one, convenient place.</p>
        <Link to="/login" className="btn btn-primary m-1">Login</Link>
        <Link to="/signup" className="btn btn-primary m-1">SignUp</Link>
      </div>
    </div >
  );
}

export default Homepage;