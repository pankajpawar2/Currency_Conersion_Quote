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
    <div className="jumbotron m-3">
      <h4 className="card-title">
        <span className="border-bottom border-dark ">Quote Summary</span>
      </h4>
      <p className="lead ">OFX Customer Rate</p>
      <span className="text-success display-5 shadow p-2 mb-5 bg-light rounded">
        <strong>{customerRate}</strong>
      </span>

      <p className="lead mt-4 display-7">From:</p>
      <p className="text-info display-6">
        <span className="text-dark">{fromCurrency} </span>
        <strong>{Number(amount).toFixed(2)}</strong>
      </p>
      <hr className="my-2" />
      <p className="lead display-7">To:</p>
      <p className="text-info display-6 ">
        <span className="text-dark">{toCurrency} </span>
        <strong>{Number(customerAmount).toFixed(2)}</strong>
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
