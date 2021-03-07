import { useState } from "react";

/* SearchForm Component

Props: search function from CompanyList, JobList

State: formData {searchTerm:""}

App -> CompanyList, JobList -> SearchForm
*/

function SearchForm({ search }) {
  const [formData, setFormData] = useState({ searchTerm: "" });

  /* Handles form submission */
  function handleSubmit(evt) {
    evt.preventDefault();
    search(formData.searchTerm);
  }

  /* Handles form data changes */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData({ [name]: value });
  }

  return (
    <div className="SearchForm mb-4">
      <form className="SearchForm-form form-inline" onSubmit={handleSubmit}>
        <input
          className="SearchForm-searchTerm form-control flex-grow-1"
          name="searchTerm"
          id="searchTerm"
          value={formData.searchTerm}
          placeholder="Enter search term here..."
          onChange={handleChange}
          minLength="3"
          required
        >
        </input>
        <button className="btn btn-primary">Search</button>
      </form>
    </div>
  );
}

export default SearchForm;