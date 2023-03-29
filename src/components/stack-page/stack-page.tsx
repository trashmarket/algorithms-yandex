import React, { useState, useEffect, useMemo, ChangeEvent, Dispatch, SetStateAction } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Stack, IStack } from "./stack";
import { Button } from "../ui/button/button";
import { DELAY_IN_MS } from "../../constants/delays";
import { Wrapper } from "../wrapper/wrapper";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import styles from "./stack-page.module.css";
import { ElementStates } from "../../types/element-states";
import { setState } from "../../utils/utils"; 
export const StackPage: React.FC = () => { 
  const [stack, setStack] = useState<IStack<string>>(new Stack<string>());
  const [value, setValue] = useState("");
  const [chang, setChang] = useState(true);

  const pushStack = () => {
    if (value !== "") {
      stack.push(value);
      setState(stack, setStack)
      setValue("");
      setChang(true)
    }
    setTimeout(()=> setChang(false), DELAY_IN_MS)
  };

  const handlerChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
  };

  const popStack = () => {
    setChang(true);
    setTimeout(() => {
      stack.pop();
      setState(stack, setStack)
      setChang(false);
    }, DELAY_IN_MS)

  };

  const clearStack = () => {
    stack.clear();
    setState(stack, setStack);
  }

  return (
    <SolutionLayout title="Стек">
      <Wrapper>
        <form className={styles.form}>
          <fieldset className={styles.fieldset}>
            <Input
              maxLength={4}
              isLimitText={true}
              onChange={handlerChangeInput}
              value={value}
              data-testid="input"
            />
            <Button text="Добавить" data-testid="button" onClick={pushStack} disabled={!value ? true : false}/>
            <Button text="Удалить" data-testid="buttonDell" onClick={popStack} disabled={stack.peak() ? false : true}/>
          </fieldset>
          <Button text="Очистить" data-testid="buttonCliner" onClick={clearStack} disabled={stack.peak() ? false : true}/>
        </form>
        <div className={styles.circleContainer}>
          {stack.elements().map((item, index) => (
            <Circle
              head={ stack.getSize() - 1 === index ? 'top': ''}
              letter={ item }
              index={index}
              state={stack.getSize() - 1 === index && chang ? ElementStates.Changing: ElementStates.Default}
              extraClass='ml-5'
              key={index}
            />
          ))}
        </div>
      </Wrapper>
    </SolutionLayout>
  );
};
