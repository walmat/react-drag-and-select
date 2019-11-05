import React from "react";
import DragSelection from ".";
import { mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

it("renders the children", () => {
  const wrapper = mount(<DragSelection>Hey, stranger</DragSelection>);

  expect(wrapper.contains("Hey, stranger")).toBe(true);
});

it("renders the drag selection when a user clicks and drags", () => {
  const wrapper = mount(<DragSelection />);

  wrapper.simulate("mousedown", {
    pageX: 0,
    pageY: 0
  });

  wrapper.simulate("mousemove", {
    pageX: 20,
    pageY: 20
  });

  expect(wrapper.find("div > .selection-border").length).toBe(1);
});

it("does not render the drag selection when a user clicks and drags outside of the element", () => {
  const wrapper = mount(<DragSelection />);

  document.dispatchEvent(new MouseEvent("mousedown"));

  wrapper.simulate("mousemove", {
    pageX: 20,
    pageY: 20
  });

  expect(wrapper.find("div > .selection-border").length).toBe(0);
});
