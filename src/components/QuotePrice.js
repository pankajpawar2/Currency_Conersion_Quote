import React from "react";

export default function QuotePrice(props) {
  // Accessing CustomerRate and CustomerAmount properties of res.data object
  // res.data is saved in state(quoteData) maintained in QuoteForm component
  // The entire state object(quoteData) is passed as a prop called quote
  const { CustomerRate, CustomerAmount } = props.quote;

  // Handler to reset page when START NEW QUOTE button is clicked
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="jumbotron m-4">
      <h4 className="card-title">Quick Quote</h4>
      <p className="lead">OFX Customer Rate</p>
      <p className="text-success display-5 ">{CustomerRate}</p>
      <p className="lead display-7">From</p>
      <p className="text-info display-6">
        <span className="text-dark">{props.from}</span> {props.amount}
      </p>
      <p className="lead display-7">To</p>
      <p className="text-info display-6">
        <span className="text-dark">{props.to}</span> {CustomerAmount}
      </p>

      <hr className="my-2" />
      <p className="lead">
        <button
          onClick={refreshPage}
          type="button"
          className="btn btn-info bg-gradient"
        >
          START NEW QUOTE
        </button>
      </p>
    </div>
  );
}
