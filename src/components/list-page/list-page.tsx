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

const appendBeforeOrAfter = ({ ...props }, isHead: boolean) => {
  if (isHead) {
    props.linkedList.appendHead(props.textInput);
  } else {
    props.linkedList.appendTail(props.textInput);
  } 
  props.setcircleHead(null);
  props.setcircleTail(null);
  setState(props.linkedList, props.setLinked);
  props.setIndexModified(props.modifiedProp);
  setTimeout(() => {
    props.setIndexModified(null);
  }, 500);
};

export const ListPage: React.FC = () => {
  const [linkedList, setLinked] = useState(
    new LinkedList<string>(["0", "34", "8", "1"])
  );
  const [circleHead, setcircleHead] = useState<CircleProps | null>(null);
  const [circleTail, setcircleTail] = useState<CircleProps | null>(null);
  const [textInput, setTextInput] = useState("");
  const [indexModified, setIndexModified] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<string>("");
  const [maxChanginIndex, setMaxChengin] = useState<number | null>(null);
  const [markerDell, setMarkerDell] = useState<number | null>(null);

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTextInput(val);
  };

  const handlerChangeCurrentIndex = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCurrentIndex(val);
  };

  const handlerClickHead = () => {
    setcircleHead({
      index: 0,
      letter: textInput,
    });
    setTimeout(() => {
      appendBeforeOrAfter({
        linkedList,
        textInput,
        setcircleHead,
        setcircleTail,
        setState,
        setLinked,
        setIndexModified,
        modifiedProp: 0,
      }, true);
    }, 1000);
  };

  const handlerClickTail = () => {
    setcircleTail({
      index: linkedList.getLength() - 1,
      letter: textInput,
    });
    setTimeout(() => {
      appendBeforeOrAfter({
        linkedList,
        textInput,
        setcircleHead,
        setcircleTail,
        setState,
        setLinked,
        setIndexModified,
        modifiedProp: linkedList.getLength(),
      }, false);
    }, 1000);
  };

  const handlerAddIndexCyrcle = () => {
    const targetIndex = parseInt(currentIndex);
    let i = 0;
    let indexCyrle = 0;
    setcircleHead({
      letter: textInput,
      index: indexCyrle,
    });
    const appendElem = () => {
      if (i < targetIndex) {
        setMaxChengin(i);
        indexCyrle++;
        i++;
        setcircleHead({
          letter: textInput,
          index: indexCyrle,
        });
        setTimeout(() => appendElem(), 1000);
      } else {
        setcircleHead(null);
        setMaxChengin(null);
        linkedList.addByIndex(textInput, targetIndex);
        setState(linkedList, setLinked);
        setIndexModified(targetIndex);
        setTimeout(() => setIndexModified(null), 500);
      }
    };
    setTimeout(() => appendElem(), 1000);
  };

  const handlerDellIndexCyrcle = () => {
    const targetIndex = parseInt(currentIndex);
    let i = 0;
    const dellEllem = () => {
      if (i <= targetIndex) {
        setMaxChengin(i);

        if (i === targetIndex) {
          setTimeout(() => {
            setMarkerDell(i);
            setMaxChengin(i - 1);

            setTimeout(() => {
              linkedList.deleteByIndex("hello", targetIndex);
              setState(linkedList, setLinked);
              setMarkerDell(null);
              setMaxChengin(null);
            }, 1000);
          }, 1000);
          return;
        }

        i++;

        setTimeout(() => dellEllem(), 1000);
      }
    };

    setTimeout(() => dellEllem(), 1000);
  };

  const handlerDellHead = () => {
    setTimeout(()=>{
      setMarkerDell(0);
      setTimeout(() => {
        linkedList.deleteByIndex("hello", 0);
        setState(linkedList, setLinked);
        setMarkerDell(null);
      }, 1000)
    }, 1000)
  }

  

  return (
    <SolutionLayout title="Связный список">
      <Wrapper>
        <form>
          <fieldset className={styles.fieldset}>
            <Input value={textInput} onChange={handlerChange} />
            <Button text="Добавить в head" onClick={handlerClickHead} />
            <Button text="Добавить в tail" onClick={handlerClickTail} />
            <Button text="Удалить из head" onClick={handlerDellHead}/>
            <Button text="Удалить из tail" />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Input
              value={currentIndex}
              onChange={handlerChangeCurrentIndex}
              type="number"
            />
            <Button
              text="Добавить по индексу"
              onClick={handlerAddIndexCyrcle}
            />
            <Button
              text="Удалить по индексу"
              onClick={handlerDellIndexCyrcle}
            />
          </fieldset>
        </form>
        <div className={styles.containerCircle}>
          {linkedList.getElements()?.map((item, index) => {
            return (
              <div key={nanoid()}>
                <Circle
                  key={index}
                  letter={
                    typeof markerDell === "number" && markerDell == index
                      ? ""
                      : item.value
                  }
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
                  tail={
                    typeof markerDell === "number" && markerDell == index ? (
                      <Circle
                        isSmall={true}
                        state={ElementStates.Changing}
                        letter={item.value}
                      />
                    ) : index == linkedList.getLength() - 1 ? (
                      "tail"
                    ) : (
                      ""
                    )
                  }
                  state={
                    typeof maxChanginIndex === "number" &&
                    index <= maxChanginIndex
                      ? ElementStates.Changing
                      : indexModified === index
                      ? ElementStates.Modified
                      : ElementStates.Default
                  }
                  index={index}
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
