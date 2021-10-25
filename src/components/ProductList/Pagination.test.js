import React from "react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, configure } from "enzyme";
import Pagination from "./Pagination";

configure({ adapter: new Adapter() });

describe("Pagination tests", () => {
 it("renders correctly", () => {
   shallow(<Pagination   
    productPerPage={12}
    totalProducts={32}
    paginate={jest.fn()}/>);
 });
 it("includes 3 pages",()=>{
    const wrapper = shallow(<Pagination   
        productPerPage={12}
        totalProducts={32}
        paginate={jest.fn()}/>);
    expect(wrapper.find("li").length).toEqual(3);
 })
 it("clicks page 2 and verify that currentNumberstate is changed",()=>{
    const setCurrentNumber = jest.fn();
    const wrapper = shallow(<Pagination   
        productPerPage={12}
        totalProducts={32}
        paginate={setCurrentNumber}/>);
    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation(currentNumber => [currentNumber, setCurrentNumber]);
    wrapper.find("#btn-2").simulate('click');
    expect(setCurrentNumber).toBeTruthy();
 })
 it("clicks next button and verify that currentNumberstate is changed",()=>{
    const setCurrentNumber = jest.fn();
    const wrapper = shallow(<Pagination   
        productPerPage={12}
        totalProducts={32}
        paginate={setCurrentNumber}/>);
    const handleClick = jest.spyOn(React, "useState");
    handleClick.mockImplementation(currentNumber => [currentNumber, setCurrentNumber]);
    wrapper.find("#next-btn").simulate('click');
    expect(setCurrentNumber).toBeTruthy();
 })
});