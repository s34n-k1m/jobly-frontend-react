import { useState, useEffect } from "react";

/* SignupForm Component

Props: signup function from Routes, App

State: 
  formData: { username, password, firstName, lastName, email }
  errorMessages
  isSigningUp: T/F

  App -> Routes -> SignupForm
*/

const initialFormData = { username: "", password: "", firstName: "", lastName: "", email: "" };

function SignupForm({ signup }) {
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(function signupUser() {
    async function signupAPICall() {
      const resSignup = await signup(formData);
      
      if (resSignup[0] === "Signup successful") {
        setFormData(initialFormData);
      } else {
        setErrorMessages(resSignup);
      }
    }
    
    if (isSigningUp) {
      signupAPICall();
      setIsSigningUp(false)
    }
    
  }, [formData, isSigningUp, signup])

  /* Handles form submission */
  function handleSubmit(evt) {
    evt.preventDefault();
    setIsSigningUp(true);
  }

  /* Handles form data changes */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(fData => ({ ...fData, [name]: value }));
  }

  /* Displays error message if wrong login info inputted */
  function displayErrorMessage() {
    return (
      <>
        {
          errorMessages.length > 0
            ? errorMessages.map((e, i) => (
              <div key={i} className="alert alert-danger mt-3">{e}</div>))
            : null
        }
      </>);
  }

  return (
    <div className="SignupForm col-6 container">
      <form className="SignupForm-form my-3 mx-15" onSubmit={handleSubmit}>
        <label htmlFor="username" className="">Username</label>
        <input
          className="SignupForm-username form-control flex-grow-1"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="">Password</label>
        <input
          className="SignupForm-password form-control flex-grow-1"
          name="password"
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="firstName" className="">First Name</label>
        <input
          className="SignupForm-firstName form-control flex-grow-1"
          name="firstName"
          id="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName" className="">Last Name</label>
        <input
          className="SignupForm-lastName form-control flex-grow-1"
          name="lastName"
          id="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />

        <label htmlFor="email" className="">Email</label>
        <input
          className="SignupForm-email form-control flex-grow-1"
          name="email"
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
        {displayErrorMessage()}
        <button className="btn btn-primary mt-3">Sign Up!</button>
      </form>
    </div>
  );
}

export default SignupForm;