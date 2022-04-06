import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import QuotePrice from "./QuotePrice";

//Importing Currency Data stored in an array
import currencyData from "../currencyData";

export default function QuoteForm(props) {
  //quoteData state to store response object from OFX API call
  const [quoteData, setQuoteData] = useState({
    CustomerRate: "",
    CustomerAmount: "",
    Message: "",
  });

  //useState hook to set state of form elements, which will be set when onChange event is triggered on the form element
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    // Added default value of 1000
    amount: 1000,
    fromCurrency: "",
    toCurrency: "",
    phoneCountry: "",
    error: "",
  });

  const { fromCurrency, toCurrency, amount } = formData;

  // Validator function to check whether to and from currency are same
  function validateCurrency() {
    fromCurrency === toCurrency
      ? setFormData((prevFormData) => {
          return {
            ...prevFormData,
            error: "From and To currency can not be same",
          };
        })
      : axios
          .get(
            `https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/${fromCurrency}/${toCurrency}/${Number(
              amount
            ).toString()}?format=json`
          )
          .then((res) => {
            console.log(res);
            setQuoteData(res.data);
          })
          .catch((err) => console.log(err));
  }

  // OFX API call on form submit
  function handleSubmit(event) {
    event.preventDefault();
    validateCurrency();
  }

  // triggers on onChange event on form elements and sets state for the elements
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
        // Reset error
        error: "",
      };
    });
  }

  return (
    // Used bootstrap classes to style form elements
    <div className="d-flex flex-row ">
      <div className="card w-50 m-2 card-container">
        <div className="card-body">
          <h4 className="card-title">
            <span className="border-bottom border-dark">Quick Quote</span>
          </h4>

          <form onSubmit={handleSubmit}>
            <div className="form-group required ">
              <label className="control-label" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
            </div>

            <div className="form-group required ">
              <label className="control-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            <div className="form-group ">
              <label htmlFor="phone">Telephone/Mobile</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
              />
            </div>

            <div className="form-group required ">
              <label htmlFor="fromCurrency">
                <span className="control-label">From Currency</span>
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
            </div>

            <div className="form-group required">
              <label htmlFor="toCurrency">
                <span className="control-label">To Currency</span>
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
            </div>

            {formData.error && (
              <span class="bg-danger p-1">{formData.error}</span>
            )}
            <div className="form-group required">
              <label className="control-label" htmlFor="amount">
                Amount:
              </label>
              <input
                type="number"
                step="0.0001"
                className="form-control"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <button className="btn btn-warning text-dark bg-gradient m-2">
              Get Quote
            </button>
          </form>
        </div>
      </div>
      <div>
        {/* Conditional rendering of QuotePrice component after API call on form submit */}
        {/* Checking the message in response object(which is stored in state quoteData) to see if currency transfer is allowed */}
        {quoteData.Message.includes("do not transfer") ? (
          <h3>{quoteData.Message}</h3>
        ) : (
          quoteData.CustomerAmount && (
            <QuotePrice
              fromCurrency={fromCurrency}
              toCurrency={toCurrency}
              amount={amount}
              customerRate={quoteData.CustomerRate}
              customerAmount={quoteData.CustomerAmount}
            />
          )
        )}
      </div>
    </div>
  );
}
