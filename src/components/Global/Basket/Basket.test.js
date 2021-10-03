import React from "react";
import { shallow } from "enzyme";
import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Basket from "./Basket";

configure({ adapter: new Adapter() });

describe("should hover and render mini basket to screen", () => {
  it("is mini cart rendering on Hover", () => {
    const wrapper = shallow(<Basket />);
    // Find basket button hover on it and check for mini-cart rendered in page
    const button = wrapper.find('[data-test="basketButton"]');
    button.prop("onMouseOver")({
      currentTarget: {
        textContent: "Sepetim",
      },
    });
    wrapper.update();
    expect(wrapper.find("#mini-cart")).toHaveLength(1);
  });
});
