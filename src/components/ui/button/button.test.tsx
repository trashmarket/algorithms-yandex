import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, ButtonProps } from "./button";
import { Direction } from "../../../types/direction";
describe("button test ui", () => {

  it("button with text", () => {
    const { getByRole } = render(<Button text="Hello" />);
    const button = getByRole("button");
    expect(button).toMatchSnapshot();
  });

  it('button without text', () => {
    const { getByRole } = render(<Button/>);
    const butto = getByRole('button');
    expect(butto).toMatchSnapshot();
  })

  it('button disabled', () => {
    const { getByRole } = render(<Button disabled={true}/>);
    const butto = getByRole('button');
    expect(butto).toMatchSnapshot();
  })

  it('button is loder', () => {
    const { getByRole } = render(<Button isLoader={true}/>);
    const butto = getByRole('button');
    expect(butto).toMatchSnapshot();
  })

  it('check click', async () => {
    const mockHandleClick = jest.fn();
    const { getByRole,  } = render(<Button onClick={mockHandleClick}/>);
    const button = getByRole('button');

    expect(mockHandleClick).not.toBeCalled();

    await userEvent.click(button);

    expect(mockHandleClick).toBeCalled();

  })

  it('check sorting button', () => {
    const { getByRole } = render(<Button sorting={Direction.Ascending}/>);
    const button = getByRole('button');

    expect(button).toMatchSnapshot();
  })

  it('check linkedList small button', () => {
    const { getByRole } = render(<Button linkedList="small"/>);
    const button = getByRole('button');

    expect(button).toMatchSnapshot();
  })

  it('check linkedList big button', () => {
    const { getByRole } = render(<Button linkedList="big"/>);
    const button = getByRole('button');

    expect(button).toMatchSnapshot();
  })
});
