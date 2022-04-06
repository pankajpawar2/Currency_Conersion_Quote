import React from "react";

export default function QuotePrice({
  fromCurrency,
  toCurrency,
  amount,
  customerAmount,
  customerRate,
}) {
  // Handler to reset page when START NEW QUOTE button is clicked
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <div className="jumbotron m-4">
      <h4 className="card-title">
        <span className="border-bottom border-dark ">Quick Quote</span>
      </h4>
      <p className="lead ">OFX Customer Rate</p>
      <p className="text-success display-5 ">{customerRate}</p>
      <p className="lead display-7">From</p>
      <p className="text-info display-6">
        <span className="text-dark">{fromCurrency} </span>
        {Number(amount).toFixed(2)}
      </p>
      <p className="lead display-7">To</p>
      <p className="text-info display-6">
        <span className="text-dark">{toCurrency} </span>
        {Number(customerAmount).toFixed(2)}
      </p>

      <hr className="my-2" />
      <p className="lead">
        <button
          onClick={refreshPage}
          type="button"
          className="btn btn-warning text-dark bg-gradient"
        >
          Start New Quote
        </button>
      </p>
    </div>
  );
}
