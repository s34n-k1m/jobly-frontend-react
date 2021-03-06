import JoblyApi from "../api/api";
import { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import SearchForm from "../common/SearchForm";

/*  CompanyList Component

Props: none

State: 
  companies [company,...]
  isLoading : T/F
  searchTerm: "account"
  searchResultStr: "search results for 'account' "

App -> Routes -> CompanyList -> CompanyCard
*/

function CompanyList() {
  const [companies, setCompanies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResultStr, setSearchResultStr] = useState(null);

  /* get companies */
  useEffect(function getCompanies() {
    async function getCompaniesWithApi() {
      const resCompanies = await JoblyApi.getCompanies();
      setCompanies(resCompanies);
      setIsLoading(false);
    }
    getCompaniesWithApi();
  }, []);

  /* set search term and search result string for the company by name */
  function searchCompany(name) {
    setSearchTerm(name);
    setSearchResultStr(`search results for '${name}'`)
  }

  /* search for company by name */
  useEffect(function search() {
    async function searchCompanyByName() {
      const resCompanies = await JoblyApi.getCompanies(searchTerm);
      setCompanies(resCompanies);
      setSearchTerm(null);
    }

    if (searchTerm) {
      searchCompanyByName();
    }
  }, [searchTerm]);

  if (isLoading) return <div>Loading...</div>;
  if (searchTerm) return <div>Searching...</div>;
  if (companies.length === 0) {
    return (
      <div className="CompanyList col-md-8 offset-md-2">
        <h5>
          <SearchForm search={searchCompany} />
          No results found.
        </h5>
      </div>
    );
  }

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchForm search={searchCompany} />
      {
        searchResultStr
          ? <h5>{companies.length} {searchResultStr}</h5>
          : null
      }
      {companies.map(c => <CompanyCard key={c.handle} company={c} />)}
    </div>
  );
}


export default CompanyList;