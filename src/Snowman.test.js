import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";

it("renders without crashing", function () {
  render(<Snowman />);
});

it("matches the snapshot", function () {
  const { asFragment } = render(<Snowman />);
  expect(asFragment()).toMatchSnapshot();
});

it("changes the image to img1 after the first incorrect guess", function () {
  const { getByTestId, getByText } = render(<Snowman />);
  const button = getByText("z");
  fireEvent.click(button);
  // expect.stringContaining(string) matches the received value 
  // if it is a string that contains the exact expected string.
  expect(getByTestId("snowman-image").src).toEqual(expect.stringContaining('1.png'));
});

it("does not change image but reveals letters change after correct guess", function () {
  const { queryByText, getByTestId, getByText } = render(<Snowman />);
  const wordBefore = queryByText('_____');
  expect(wordBefore).toBeTruthy();

  const button = getByText("a");
  fireEvent.click(button);

  const wordAfter = queryByText('a____');
  expect(wordAfter).toBeTruthy();

  expect(getByTestId("snowman-image").src).toEqual(expect.stringContaining('0.png'));
});