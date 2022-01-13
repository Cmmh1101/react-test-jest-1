import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

// find an element with a role of a button and text of 'change color to blue'
test("button has correct initial color", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", { name: "Change to blue" });

  //  expect the background to color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: "red" });

  // click button
  fireEvent.click(colorButton);

  // expect background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: "blue" });

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe("Change to red");
});

test("initial conditions", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  // check that the button starts out enabled
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).not.toBeChecked();
});

test("checkbox disables button on first click and enables on second click", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", { name: "Change to blue" });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  expect(colorButton).toBeEnabled();

  fireEvent.click(checkBox);

  expect(colorButton).toBeDisabled();

  fireEvent.click(checkBox);
  expect(colorButton).toBeEnabled();
});

// test("button turns blue when clicked", () => {
//   render(<App />);
//   const colorButton = screen.getByRole("button", { name: "Change to blue" });
// });
