import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("circle test", () => {
  it("circle whithout all", () => {
    const { getByTestId } = render(<Circle />);
    const circle = getByTestId("testCicrle");
    expect(circle).toMatchSnapshot();
  });

  it("circle whith letter", () => {
    const { getByTestId } = render(<Circle letter="hello" />);
    const circle = getByTestId("testCicrle");
    expect(circle).toMatchSnapshot();
  });

  it("circle whith head", () => {
    const { getByTestId } = render(<Circle head="hello head" />);
    const circle = getByTestId("testCicrle");
    expect(circle).toMatchSnapshot();
  });

  it("circle whith React element", () => {
    const { getByTestId } = render(<Circle head={<div>react Element</div>} />);
    const circle = getByTestId("testCicrle");
    expect(circle).toMatchSnapshot();
  });

  it("circle whith React element tail", () => {
    const { getByTestId } = render(<Circle tail={<div>react Element</div>} />);
    const circle = getByTestId("testCicrle");
    expect(circle).toMatchSnapshot();
  });

  it("circle whith tail", () => {
    const { getByTestId } = render(<Circle tail="tail" />);
    const circle = getByTestId("testCicrle");
    expect(circle).toMatchSnapshot();
  });

  it("circle whith index", () => {
    const { getByTestId } = render(<Circle index={1} />);
    const circle = getByTestId("testCicrle");
    expect(circle).toMatchSnapshot();
  });

  it("circle whith small props", () => {
    const { getByTestId } = render(<Circle isSmall={true} />);
    const circle = getByTestId("testCicrle");
    expect(circle).toMatchSnapshot();
  });

  it("circle whith default", () => {
    const { getAllByTestId } = render(
      <>
        <Circle state={ElementStates.Default} />
        <Circle state={ElementStates.Changing} />
        <Circle state={ElementStates.Modified} />
      </>
    );
    const circle = getAllByTestId("testCicrle");
    expect(circle).toMatchSnapshot();
  });
});
