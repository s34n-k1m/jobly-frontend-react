import JoblyApi from "../api/api";
import { useState, useEffect } from "react";
import { useParams, Redirect } from "react-router-dom";
import JobCard from "../jobs/JobCard";

/*  CompanyDetail Component

Props: applyToJob function 

Params: handle

State: company {handle, name, ...}

App -> Routes -> CompanyDetail
*/

function CompanyDetail({ applyToJob }) {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [isCompanyNotFound, setIsCompanyNotFound] = useState(false);

  /* get company */
  useEffect(function getCompany() {
    async function getCompanyWithApi() {
      try {
        const resCompany = await JoblyApi.getCompany(handle);
        setCompany(resCompany);
      } catch (err) {
        setIsCompanyNotFound(true);
      }
    }
    getCompanyWithApi();
  }, [handle]);

  if (isCompanyNotFound === true) return <Redirect to="/" />
  if (!company) return <div>Loading...</div>;

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h4 className="CompanyDetail-name text-left"> {company.name}</h4>
      <p className="CompanyDetail-description text-left"> {company.description}</p>
      {company.jobs.map(j => <JobCard key={j.id} applyToJob={applyToJob} job={{ ...j, companyName: undefined }} />)}
    </div>
  );
}


export default CompanyDetail;