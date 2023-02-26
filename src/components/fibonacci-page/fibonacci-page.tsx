import React, { useState, useEffect, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css';
import { Wrapper } from "../wrapper/wrapper";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import { TFibStep } from "../../types/list-types-ofcomponents";
import { checkVal } from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
  const [numArray, setNumArray] = useState<TFibStep[]>([]);
  const [num, setNum] = useState(0);
  const [index, setIndex] = useState<null | number>(null);
  const [loder, setLoder] = useState(false);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    setTimeout(() => {
    if (typeof index === 'number') {
      if (index <= num) {
        if (index == 0 || index == 1) {
        setNumArray((arr) => [...arr, {
          index,
          fibNum: 1
        }]);

        } else {
        setNumArray((arr) => {
          let newArr = [...arr];
          const sumFibOne: TFibStep = newArr[index - 1];
          const sumFibTwo: TFibStep = newArr[index - 2];
          return [...newArr,{index, fibNum: sumFibOne.fibNum + sumFibTwo.fibNum}];
        })          
        }
        setIndex(index + 1);
      } else {
        setLoder(false)
      }
    }
    }, DELAY_IN_MS)
  }, [index, num])

  const handlerSubmit = (event: any) => {
    event.preventDefault();
    setLoder(true);
    setNumArray([]);
    const form = event.target;
    const num = parseInt(form.elements.numInput.value);

    setNum(num);
    setIndex(0);
  }

  const handlerOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    checkVal(setDisable, event);
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <Wrapper>
      <form className={styles.formWrapper} onSubmit={handlerSubmit}>
        <Input type="number" min='1' max='19' isLimitText={true} name="numInput" onChange={handlerOnChange}/>
        <Button text="Развернуть" type='submit' isLoader={loder} disabled={disable} />
      </form>
      <div className={styles.circleConteiner}>
        {numArray.map((item => <Circle letter={String(item.fibNum)} tail={String(item.index)  }/>))}        
      </div>
     </Wrapper>
    </SolutionLayout>
  );
};
