import React from "react";
import DragSelection from ".";
import { mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

let wrapper = mount(<DragSelection>Hey, stranger</DragSelection>);

beforeEach(() => {
  wrapper = mount(<DragSelection>Hey, stranger</DragSelection>);
});

afterEach(() => {
  if (wrapper) {
    wrapper.unmount();
  }
});

it("renders the children", () => {
  expect(wrapper.contains("Hey, stranger")).toBe(true);
});

it("renders the drag selection when a user clicks and drags", () => {
  wrapper.simulate("mousedown", {
    pageX: 0,
    pageY: 0
  });

  wrapper.simulate("mousemove", {
    pageX: 20,
    pageY: 20
  });

  expect(document.querySelector(".selection-border")).toBeTruthy();
});

it("does not render the drag selection when a user clicks and drags outside of the element", () => {
  document.dispatchEvent(new MouseEvent("mousedown"));

  document.dispatchEvent(
    new MouseEvent("mousemove", {
      movementX: 20,
      movementY: 20
    })
  );

  expect(document.querySelector(".selection-border")).toBeFalsy();
});
