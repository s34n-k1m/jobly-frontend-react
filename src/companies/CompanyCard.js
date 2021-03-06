import { Link } from "react-router-dom";
import "./CompanyCard.css";

/** CompanyCard Component
 * 
 * Props:
 * - company: { company data }
 * 
 * State: none
 * 
 * CompanyList -> CompanyCard
*/

function CompanyCard({ company }) {
  return (
    <Link to={`/companies/${company.handle}`} className="CompanyCard card">
        <div className="CompanyCard-body card-body">
          {company.logoUrl
            ? <img className="float-right" src={company.logoUrl} alt={company.handle}/>
            : null}
          <h5 className="CompanyCard-title card-title text-left">{company.name}</h5>
          <p className="CompanyCard-description text-left">{company.description}</p>
        </div>
    </Link>
  );
}

export default CompanyCard;