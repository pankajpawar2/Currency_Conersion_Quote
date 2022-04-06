import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import QuotePrice from "./QuotePrice";
//Importing Currency Data
import currencyData from "../currencyData";

export default function QuoteForm(props) {
  //quoteData state to store response object from OFX API call
  const [quoteData, setQuoteData] = useState({});

  //useState hook to set state of form elements, which will be set when onChange event is triggered on the element
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: undefined,
    // Added default value of 1000
    amount: 1000,
    fromCurrency: "",
    toCurrency: "",
    phoneCountry: "",
    nameError: "",
  });

  // OFX API call on form submit
  function handleSubmit(event) {
    event.preventDefault();
    axios
      .get(
        `https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/${formData.fromCurrency}/${formData.toCurrency}/${formData.amount}?format=json`
      )
      .then((res) => setQuoteData(res.data))
      .catch((err) => console.log(err));
  }

  // triggers on onChange event on form elements and sets state for the elements
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }

  return (
    // Used bootstrap classes to style form elements
    <div className="d-flex flex-row">
      <div className="card w-50 m-2">
        <div className="card-body">
          <h4 className="card-title">Quick Quote</h4>

          <form onSubmit={handleSubmit}>
            <div className="form-group required ">
              <label className="control-label" htmlFor="first">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="first"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>

            <div className="form-group required ">
              <label className="control-label" htmlFor="last">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="last"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="em">Email:</label>
              <input
                type="text"
                className="form-control"
                id="em"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="ph">Telephone/Mobile:</label>
              <br />

              <select
                id="phoneCountry"
                name="phoneCountry"
                value={formData.phoneCountry}
                onChange={handleChange}
              >
                <option value="+61">+61</option>
                <option value="+91">+91</option>
              </select>
              <input
                id="ph"
                value={formData.phone}
                type="number"
                name="phone"
                className="m-1"
              />
            </div>

            <label htmlFor="fromCurrency">
              <span>From Currency</span>
              <br />
              <select
                id="fromCurrency"
                name="fromCurrency"
                value={formData.fromCurrency}
                onChange={handleChange}
                required
              >
                <option value="">--Choose--</option>
                {currencyData.map((currency) => (
                  <option
                    key={currencyData.indexOf(currency)}
                    value={currency.slice(0, 3)}
                  >
                    {currency}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="toCurrency" className="float-right">
              <span>To Currency</span>
              <br />
              <select
                id="toCurrency"
                name="toCurrency"
                value={formData.toCurrency}
                onChange={handleChange}
                required
              >
                <option value="">--Choose--</option>
                {currencyData.map((currency) => (
                  <option
                    key={currencyData.indexOf(currency)}
                    value={currency.slice(0, 3)}
                  >
                    {currency}
                  </option>
                ))}
              </select>
            </label>

            <div className="form-group">
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-info bg-gradient m-2">Get Quote</button>
          </form>
        </div>
      </div>
      <div>
        {/* Conditional rendering of QuotePrice component after API call on form submit */}
        {quoteData.CustomerRate && (
          <QuotePrice
            from={formData.fromCurrency}
            to={formData.toCurrency}
            amount={formData.amount}
            quote={quoteData}
          />
        )}
      </div>
    </div>
  );
}
