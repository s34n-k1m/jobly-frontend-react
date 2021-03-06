import UserContext from "../userContext";
import {useContext, useEffect, useState} from "react";
import "./JobCard.css"; 

/** JobCard Component
 * 
 * Props:
 * - job: { job data }
 * - applyToJob function 
 * 
 * State:
 * - isApplied - T/F
 * 
 * JobList -> JobCard
*/

function JobCard({ job, applyToJob }) {
  const currentUser = useContext(UserContext);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(
    function setJobApplicationStatus(){
      const applied = currentUser.applications.has(job.id);
      setIsApplied(applied);
    }, [job.id, currentUser.applications])

  /* handle click */
  function handleClick(evt){
    applyToJob(job.id);
    setIsApplied(true);
  }

  return (
    <div className="JobCard card">
      <div className="JobCard-body card-body">
        <h5 className="JobCard-title card-title text-left">{job.title}</h5>
        {job.companyName
          ? <h6 className="JobCard-companyName text-left">{job.companyName}</h6>
          : null}
        <p className="JobCard-salary text-left">Salary: {job.salary}</p>
        <p className="JobCard-equity text-left">Equity: {job.equity}</p>
        <div className="JobCard-button">
          <button onClick={handleClick} disabled={isApplied} className="JobCard-apply btn btn-danger font-weight-bold text-uppercase float-right">{isApplied ? "Applied" : "Apply"}</button>
        </div>
      </div>

    </div>
  );
}

export default JobCard;