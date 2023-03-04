import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { LinkedList } from "./list-node-class";
import styles from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { Wrapper } from "../wrapper/wrapper";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { CircleProps } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { nanoid } from "nanoid";

const setState = (stack: any, set: any) => {
  const newStack = { ...stack };
  set(newStack);
};

const appendBeforeOrAfter = (linkedList:any, setCyrcle:any, setState:any, setLinked:any ) => {

}

export const ListPage: React.FC = () => {
  const [linkedList, setLinked] = useState(
    new LinkedList<string>(["0", "34", "8", "1"])
  );
  const [circleHead, setcircleHead] = useState<CircleProps | null>(null);
  const [circleTail, setcircleTail] = useState<CircleProps | null>(null);
  const [textInput, setTextInput] = useState("");
  const [indexModified, setIndexModified] = useState<number | null>(null);

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTextInput(val);
  };

  const handlerClickHead = () => {
    setcircleHead({
      index: 0,
      letter: textInput,
    });
    setTimeout(() => {
      linkedList.appendHead(textInput);
      setcircleHead(null);
      setState(linkedList, setLinked);
      setIndexModified(0);
      setTimeout(() => {
        setIndexModified(null);
      }, 500);
    }, 1000);
  };

  const handlerClickTail = () => {
    setcircleTail({
      index: linkedList.getLength() - 1,
      letter: textInput,
    });
    setTimeout(() => {
      linkedList.appendTail(textInput);
      setcircleTail(null);
      setState(linkedList, setLinked);
      setIndexModified(linkedList.getLength() - 1);
      setTimeout(() => {
        setIndexModified(null);
      }, 500);
    }, 1000);
  };

  return (
    <SolutionLayout title="Связный список">
      <Wrapper>
        <form>
          <fieldset className={styles.fieldset}>
            <Input onChange={handlerChange} />
            <Button text="Добавить в head" onClick={handlerClickHead} />
            <Button text="Добавить в tail" onClick={handlerClickTail}/>
            <Button text="Удалить из head" />
            <Button text="Удалить из tail" />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input type="number" />
            <Button text="Добавить по индексу" />
            <Button text="Удалить по индексу" />
          </fieldset>
        </form>
        <div className={styles.containerCircle}>
          {linkedList.getElements()?.map((item, index) => {
            return (
              <div key={nanoid()}>
                <Circle
                  key={index}
                  letter={item.value}
                  head={
                    circleHead && circleHead.index == index ? (
                      <Circle
                        isSmall={true}
                        state={ElementStates.Changing}
                        letter={circleHead.letter}
                      />
                    ) : circleTail && circleTail.index == index ? (
                      <Circle
                        isSmall={true}
                        state={ElementStates.Changing}
                        letter={circleTail.letter}
                      />
                    ) : index == 0 ? (
                      "head"
                    ) : (
                      ""
                    )
                  }
                  tail={index == linkedList.getLength() - 1 ? "tail" : ""}
                  state={
                    indexModified === index
                      ? ElementStates.Modified
                      : ElementStates.Default
                  }
                />
                {item.next && <ArrowIcon key={nanoid()} />}
              </div>
            );
          })}
        </div>
      </Wrapper>
    </SolutionLayout>
  );
};
