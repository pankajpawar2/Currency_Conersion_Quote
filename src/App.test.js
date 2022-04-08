import React from "react";

import { render } from "@testing-library/react";
import QuoteForm from "./components/QuoteForm";
import Header from "./components/Header";
import Footer from "./components/Footer";

/**
 * Test What user would see
 */

test("Checks whether the Header Element is Displayed", () => {
  const { getByText } = render(<Header />);
  const element = getByText(/OFX - GET A QUICK QUOTE/i);
  expect(element).toBeInTheDocument();
});

test("Checks whether the Footer Element is Displayed", () => {
  const { getByText } = render(<Footer />);
  const element = getByText(
    /© 2022 - Created by Pankaj Pawar - All rights reserved/i
  );
  expect(element).toBeInTheDocument();
});

test("Check whether form is rendered correctly", () => {
  const { getByText, getByLabelText } = render(<QuoteForm />);
  const firstName = getByText(/First Name/i);
  const lastName = getByText(/Last Name/i);
  expect(firstName).toBeInTheDocument();
  expect(lastName).toBeInTheDocument();
});

test("Checks the type of input fields are correct", () => {
  const { getByLabelText } = render(<QuoteForm />);
  const firstNameInput = getByLabelText(/First Name/i);
  expect(firstNameInput).toHaveAttribute("type", "text");
  const lastNameInput = getByLabelText(/Last Name/i);
  expect(lastNameInput).toHaveAttribute("type", "text");
});

test("Checks for buttons", () => {
  const { getByText } = render(<QuoteForm />);
  const button = getByText("Get Quote");
  expect(button).toBeInTheDocument();
});
