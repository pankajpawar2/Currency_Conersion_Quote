import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "../App.css";
import QuotePrice from "./QuotePrice";

//Importing Currency Data stored in an array
import currencyData from "../currencyData";

export default function QuoteForm(props) {
  //Using useForm hook from reaxct-hook-form - register for registering form input fields so that value is availabe on form submission and validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //quoteData state to store response object from OFX API call
  const [quoteData, setQuoteData] = useState({
    CustomerRate: "",
    CustomerAmount: "",
    Message: "",
    fromCurrency: "",
    toCurrency: "",
    amount: "",
  });

  // OFX API call on form submit
  function onSubmit({ fromCurrency, toCurrency, amount }) {
    fromCurrency === toCurrency
      ? alert("Error - From and To currency can not be same.")
      : axios
          .get(
            `https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/${fromCurrency}/${toCurrency}/${Number(
              amount
            ).toString()}?format=json`
          )
          .then((res) => {
            const { CustomerAmount, CustomerRate, Message } = res.data;
            setQuoteData({
              CustomerRate,
              CustomerAmount,
              Message,
              fromCurrency,
              toCurrency,
              amount,
            });
          })
          .catch((err) => console.log(err));
  }

  return (
    // Used bootstrap classes to style form elements
    <div className="d-flex flex-row ">
      <div className="form-container">
        <div className="card-body">
          <h4 className="card-title">
            <span className="border-bottom border-dark">Quick Quote</span>
          </h4>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group required ">
              <label className="control-label" htmlFor="firstName">
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
                placeholder="First Name"
                type="text"
                className="form-control"
                id="firstName"
              />
              <span class="bg-danger text-white">
                {errors.firstName && errors.firstName.type === "required"
                  ? "**First Name is required**"
                  : errors.firstName &&
                    errors.firstName.type === "pattern" &&
                    "**Please enter a valid first name**"}
              </span>
            </div>

            <div className="form-group required ">
              <label className="control-label" htmlFor="lastName">
                Last Name
              </label>
              <input
                {...register("lastName", {
                  required: true,
                  pattern: /^[A-Za-z]+$/i,
                })}
                type="text"
                className="form-control"
                id="lastName"
                placeholder="Last Name"
              />
              <span class="bg-danger text-white">
                {errors.lastName && errors.lastName.type === "required"
                  ? "**Last Name is required**"
                  : errors.lastName &&
                    errors.lastName.type === "pattern" &&
                    "**Please enter a valid last name**"}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                {...register("email", {
                  pattern:
                    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
                })}
                type="text"
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </div>
            {errors.email && (
              <span class="bg-danger text-white">
                **Please enter a valid Email.**
              </span>
            )}
            <div className="form-group ">
              <label htmlFor="phone">Telephone/Mobile</label>
              <input
                {...register("phone", { minLength: 8, maxLength: 13 })}
                type="number"
                className="form-control"
                id="phone"
                placeholder="Phone Number"
              />
            </div>
            {errors.phone && (
              <span class="bg-danger text-white">
                **Please enter a valid phone number.**
              </span>
            )}
            <div className="form-group required ">
              <label htmlFor="fromCurrency">
                <span className="control-label">From Currency</span>
                <br />
                <select
                  {...register("fromCurrency", { required: true })}
                  id="fromCurrency"
                >
                  <option value="">-- Choose --</option>
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
              <br />
              {errors.fromCurrency && (
                <span class="bg-danger text-white">
                  **From Currency is required**
                </span>
              )}
            </div>

            <div className="form-group required">
              <label htmlFor="toCurrency">
                <span className="control-label">To Currency</span>
                <br />
                <select
                  {...register("toCurrency", { required: true })}
                  id="toCurrency"
                >
                  <option value="">-- Choose --</option>
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
              <br />
              {errors.toCurrency && (
                <span class="bg-danger text-white">
                  **To Currency is required**
                </span>
              )}
            </div>

            <div className="form-group required">
              <label className="control-label" htmlFor="amount">
                Amount
              </label>
              <input
                {...register("amount", { required: true, min: 1 })}
                type="number"
                step="0.0000000000001"
                className="form-control"
                id="amount"
              />
              <span class="bg-danger text-white">
                {errors.amount && errors.amount.type === "required"
                  ? "**Amount is required**"
                  : errors.amount &&
                    errors.amount.type === "min" &&
                    "**Please enter amount greater than 0**"}
              </span>
            </div>

            <button className="btn btn-warning text-dark bg-gradient  mt-2">
              Get Quote
            </button>
          </form>
        </div>
      </div>
      <div>
        {/* Conditional rendering of QuotePrice component after API call on form submit */}
        {/* Checking the message in response object(which is stored in state quoteData) to see if currency transfer is allowed */}
        {quoteData.Message.includes("do not transfer") ? (
          <div class="alert alert-warning mt-5" role="alert">
            😟 {quoteData.Message}. Please select another currency pair.
          </div>
        ) : (
          quoteData.CustomerAmount && (
            <QuotePrice
              fromCurrency={quoteData.fromCurrency}
              toCurrency={quoteData.toCurrency}
              amount={quoteData.amount}
              customerRate={quoteData.CustomerRate}
              customerAmount={quoteData.CustomerAmount}
            />
          )
        )}
      </div>
    </div>
  );
}
