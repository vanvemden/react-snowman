import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Snowman from "./Snowman";
import { ENGLISH_WORDS, randomWord } from "./words";

// beforeEach(function () {
//   Math.random = jest.fn(() => 0);

//   jest
//     .spyOn(Math, "random")
//     .mockReturnValueOnce(0);

// });

// afterEach(function () {
//   //  randomWord.mockRestore();
// });

it("renders without crashing", function () {
  render(<Snowman />);
});

it("matches the snapshot", function () {
  const { asFragment } = render(<Snowman />);
  expect(asFragment()).toMatchSnapshot();
});

it("changes the image to img1 after the first incorrect guess", function () {
  const { getByTestId, getByText } = render(<Snowman words={["apple"]} />);
  const button = getByText("z");
  fireEvent.click(button);
  // expect.stringContaining(string) matches the received value 
  // if it is a string that contains the exact expected string.
  expect(getByTestId("snowman-image").src).toEqual(expect.stringContaining('1.png'));
});

it("does not change image but reveals letters change after correct guess", function () {
  const { queryByText, getByTestId, getByText } = render(<Snowman words={["apple"]} />);
  const wordBefore = queryByText('_____');
  expect(wordBefore).toBeTruthy();

  const button = getByText("a");
  fireEvent.click(button);

  const wordAfter = queryByText('a____');
  expect(wordAfter).toBeTruthy();

  expect(getByTestId("snowman-image").src).toEqual(expect.stringContaining('0.png'));
});

it("game ends after max. number of wrong guesses", function () {
  const { asFragment, getByText } = render(<Snowman words={["apple"]} />);
  // how to test if defaultProps are not set (but set as default values)??
  const maxWrong = Snowman.defaultProps.maxWrong;
  const word = "apple";
  const chars = "abcdefghijklmopqrstuvwxyz".split('').filter(c => !word.includes(c)).slice(0, maxWrong);
  for (let char of chars) {
    let button = getByText(char);
    fireEvent.click(button);
  }
  expect(asFragment()).toMatchSnapshot();
});

it("basic test for restart; game restarts after clicking on Restart button", function () {
  const { queryByText, getByTestId, getByText } = render(<Snowman words={["apple"]} />);
  const button = getByText("z");
  fireEvent.click(button);
  expect(queryByText('Number wrong: 1')).toBeInTheDocument();
  expect(getByTestId("snowman-image").src).toEqual(expect.stringContaining('1.png'));

  const restartButton = getByText("Restart Game");
  fireEvent.click(restartButton);
  expect(queryByText('Number wrong: 0')).toBeInTheDocument();
  expect(getByTestId("snowman-image").src).toEqual(expect.stringContaining('0.png'));
})