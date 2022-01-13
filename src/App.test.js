import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

// find an element with a role of a button and text of 'change color to MidnightBlue'
test("button has correct initial color", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });

  //  expect the background to color to be MediumVioletRed
  expect(colorButton).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  // click button
  fireEvent.click(colorButton);

  // expect background color to be MidnightBlue
  expect(colorButton).toHaveStyle({ backgroundColor: "MidnightBlue" });

  // expect the button text to be 'Change to MediumVioletRed'
  expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
});

test("initial conditions", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  // check that the button starts out enabled
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).not.toBeChecked();
});

// Quiz 1

test("checkbox disables button on first click and enables on second click", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  expect(colorButton).toBeEnabled();

  fireEvent.click(checkBox);

  expect(colorButton).toBeDisabled();

  fireEvent.click(checkBox);
  expect(colorButton).toBeEnabled();
});

// Quiz 2

test("checkbox disables button changing button to gray, second click enables button MediumVioletRed", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle("background-color: gray");

  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle("background-color: MediumVioletRed");
});

test("click button to Change to Midnight Blue, click checkbox to disable button and change it to gray", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: "Change to Midnight Blue",
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle("background-color: MidnightBlue");

  fireEvent.click(checkBox);
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle("background-color: gray");

  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle("background-color: MidnightBlue");
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
