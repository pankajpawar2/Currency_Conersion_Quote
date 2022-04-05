import React from "react";

import { render } from "@testing-library/react";
import QuoteForm from "./components/QuoteForm";
/**
 * Test What user would see
 */
test("renders the form correctly", () => {
  const { getByText, getByLabelText } = render(<QuoteForm />);
  const nameLabel = getByText(/First Name/i);
  const amountLabel = getByText(/Amount/i);
  expect(nameLabel).toBeInTheDocument();
  expect(amountLabel).toBeInTheDocument();
  const input = getByLabelText(/Amount/i);
  expect(input).toHaveAttribute("type", "number");
});

test("Checks for the required fields - First Name, Last Name, Amount", () => {
  const { getByLabelText } = render(<QuoteForm />);
  const firstname = getByLabelText(/First Name/i);
  expect(firstname).toHaveAttribute("required");
  const lastname = getByLabelText(/LAst Name/i);
  expect(lastname).toHaveAttribute("required");
  const input = getByLabelText(/Amount/i);
  expect(input).toHaveAttribute("required");
});
