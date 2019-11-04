import React from "react";
import ReactDOM from "react-dom";
import DragSelection from ".";
import renderer from "react-test-renderer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DragSelection />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("works", () => {
  const component = renderer.create(<DragSelection />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
