import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css';
import { Wrapper } from "../wrapper/wrapper";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import { FibStep } from "../../types/list-types-ofcomponents";

export const FibonacciPage: React.FC = () => {
  const [numArray, setNumArray] = useState<number[]>([]);
  const [num, setNum] = useState(0);
  const [index, setIndex] = useState<null | number>(null);

  useEffect(() => {
    setTimeout(() => {
    if (typeof index === 'number') {
      if (index <= num) {
        if (index == 0 || index == 1) {
        setNumArray((arr) => [...arr, 1]);

        } else {
        setNumArray((arr) => {
          let newArr = [...arr];
          const sumFibOne: number = newArr[index - 1];
          const sumFibTwo: number = newArr[index - 2];
          return [...newArr, sumFibOne + sumFibTwo];
        })          
        }
        setIndex(index + 1);
      }
    }
    }, DELAY_IN_MS)
  }, [index, num])

  const handlerSubmit = (event: any) => {
    event.preventDefault();
    setNumArray([]);
    const form = event.target;
    const num = parseInt(form.elements.numInput.value);

    setNum(num);
    setIndex(0);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <Wrapper>
      <form className={styles.formWrapper} onSubmit={handlerSubmit}>
        <Input type="number" min='1' max='19' isLimitText={true} name="numInput"/>
        <Button text="Развернуть" type='submit' />
      </form>
      <div className={styles.circleConteiner}></div>
     </Wrapper>
    </SolutionLayout>
  );
};
