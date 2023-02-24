import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { DELAY_IN_MS } from "../../constants/delays";
import { Circle } from "../ui/circle/circle";
import { LetterStep } from '../../types/string-types';
import { ElementStates } from '../../types/element-states';
import styles from "./string.module.css";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState<LetterStep[]>([]);
  const [startEnd, setStartEnd] = useState<any[]>([null, null]);
  const [loder, setLoder] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (typeof startEnd[0] === 'number' && typeof startEnd[1] === 'number') {
        if (startEnd[0] < startEnd[1]) {
          setInputValue((arr) => {
            let arrNew = [...arr];
            arrNew[startEnd[0] + 1].state = ElementStates.Changing;
            arrNew[startEnd[1] - 1].state = ElementStates.Changing;
  
            arrNew[startEnd[0]].state = ElementStates.Modified;
            arrNew[startEnd[1]].state = ElementStates.Modified;
  
            [arrNew[startEnd[0]], arrNew[startEnd[1]]] = [arrNew[startEnd[1]], arrNew[startEnd[0]]];
  
            return [...arrNew];
          });
  
          setStartEnd((numArr) => {
            let newArr = [...numArr];
            newArr[0] = newArr[0] + 1;
            newArr[1] = newArr[1] - 1;
  
            return newArr;
          });
        }
          if (startEnd[0] === startEnd[1]) {
          setInputValue( (numArr) => {
            let newArr = [...numArr];
            newArr[startEnd[0]].state = ElementStates.Modified;
            return newArr;
          })
          setLoder(false);
        }
      }
 
    }, DELAY_IN_MS);
  }, [startEnd]);

  const onSubmit = (event: any) => {
    event.preventDefault();
 
    const form = event.target;
    const text: string =  form.elements.textFied.value;
    const valueArray =  Array.from(text);

    const letterStep = valueArray.map(((item, index): LetterStep => {
      if (index === 0 && index === valueArray.length - 1) {
        return {
          letter: item,
          state: ElementStates.Modified,
          index
        }
      }

      if (index === 0 || index === valueArray.length - 1) {
        return {
          letter: item,
          state: ElementStates.Changing,
          index
        }
      }

      return {
        letter: item,
        state: ElementStates.Default,
        index
      }
    }))
    
    setLoder(true);
    
    setInputValue(letterStep);

    setStartEnd((numArr) => {
      let newArr = [...numArr];
      newArr[0] = 0;
      newArr[1] = valueArray.length - 1;
      return newArr;
    });
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.wrapper}>
        <form className={styles.inputWarapper} onSubmit={onSubmit}>
          <Input  max={11} isLimitText={true} maxLength={11} name='textFied' />
          <Button text="Развернуть" type='submit' isLoader={loder}/>
        </form> 
        <div className={styles.circleConteiner}>
          {inputValue.map((item, index) => <Circle letter={item.letter} state={item.state} key={item.index}/>)} 
        </div>
      </div>
    </SolutionLayout>
  );
};
