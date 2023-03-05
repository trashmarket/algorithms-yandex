import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
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
import { setState } from "../../utils/utils";

const removeLateral = (
  { ...props },
  indexElem: number,
  setLoder: Dispatch<SetStateAction<boolean>>,
  setDiasbletButton: Dispatch<SetStateAction<boolean>>
) => {
  setTimeout(() => {
    props.setMarkerDell(indexElem);
    setTimeout(() => {
      props.linkedList.deleteByIndex("hello", indexElem);
      props.setState(props.linkedList, props.setLinked);
      props.setMarkerDell(null);
      setTimeout(() => {
        setLoder(false);
        setDiasbletButton(false);
      }, 300);
    }, 1000);
  }, 1000);
};

const appendBeforeOrAfter = (
  { ...props },
  isHead: boolean,
  setLoder: Dispatch<SetStateAction<boolean>>
) => {
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
    props.setButtonDisablet(false);
    props.setTextInput("");
    setLoder(false);
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
  const [loderDellTail, setLoderDellTail] = useState(false);
  const [loderDellHead, setLoderDellHead] = useState(false);
  const [buttonDisablet, setButtonDisablet] = useState(false);
  const [loderAddHead, setLoderAddHead] = useState(false);
  const [loaderAddTail, setLoderAddTail] = useState(false);
  const [loderAddbyIndex, setLoderAddbyIndex] = useState(false);
  const [loderRemoveByindex, setLoderRemoveByIndex] = useState(false);

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTextInput(val);
  };

  const handlerChangeCurrentIndex = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCurrentIndex(val);
  };

  const handlerClickHead = () => {
    setButtonDisablet(true);
    setLoderAddHead(true);
    setcircleHead({
      index: 0,
      letter: textInput,
    });
    setTimeout(() => {
      appendBeforeOrAfter(
        {
          linkedList,
          textInput,
          setcircleHead,
          setcircleTail,
          setState,
          setLinked,
          setIndexModified,
          setButtonDisablet,
          setTextInput,
          modifiedProp: 0,
        },
        true,
        setLoderAddHead
      );
    }, 1000);
  };

  const handlerClickTail = () => {
    setLoderAddTail(true);
    setButtonDisablet(true);
    setcircleTail({
      index: linkedList.getLength() - 1,
      letter: textInput,
    });
    setTimeout(() => {
      appendBeforeOrAfter(
        {
          linkedList,
          textInput,
          setcircleHead,
          setcircleTail,
          setState,
          setLinked,
          setIndexModified,
          setButtonDisablet,
          setTextInput,

          modifiedProp: linkedList.getLength(),
        },
        false,
        setLoderAddTail
      );
    }, 1000);
  };

  const handlerAddIndexCyrcle = () => {
    setLoderAddbyIndex(true);
    setButtonDisablet(true);
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
        setTimeout(() => {
          setButtonDisablet(false);
          setCurrentIndex("");
          setTextInput("");
          setLoderAddbyIndex(false);
          setIndexModified(null);
        }, 500);
      }
    };
    setTimeout(() => appendElem(), 1000);
  };

  const handlerDellIndexCyrcle = () => {
    setLoderRemoveByIndex(true);
    setButtonDisablet(true);
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
              setCurrentIndex("");
              setTextInput("");
              setButtonDisablet(false);
              setLoderRemoveByIndex(false);
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
    setLoderDellHead(true);
    setButtonDisablet(true);
    removeLateral(
      {
        setMarkerDell,
        linkedList,
        setLinked,
        setState,
      },
      0,
      setLoderDellHead,
      setButtonDisablet
    );
  };

  const handlerDellTail = () => {
    setLoderDellTail(true);
    setButtonDisablet(true);
    removeLateral(
      {
        setMarkerDell,
        linkedList,
        setLinked,
        setState,
      },
      linkedList.getLength() - 1,
      setLoderDellTail,
      setButtonDisablet
    );
  };

  return (
    <SolutionLayout title="Связный список">
      <Wrapper>
        <form>
          <fieldset className={styles.fieldset}>
            <Input
              maxLength={4}
              isLimitText={true}
              value={textInput}
              onChange={handlerChange}
            />
            <Button
              disabled={
                buttonDisablet ? buttonDisablet : !textInput ? true : false
              }
              text="Добавить в head"
              onClick={handlerClickHead}
              isLoader={loderAddHead}
            />
            <Button
              disabled={
                buttonDisablet ? buttonDisablet : !textInput ? true : false
              }
              text="Добавить в tail"
              onClick={handlerClickTail}
              isLoader={loaderAddTail}
            />
            <Button
              text="Удалить из head"
              isLoader={loderDellHead}
              onClick={handlerDellHead}
              disabled={
                buttonDisablet
                  ? buttonDisablet
                  : linkedList.getLength() === 0
                  ? true
                  : false
              }
            />
            <Button
              text="Удалить из tail"
              isLoader={loderDellTail}
              onClick={handlerDellTail}
              disabled={
                buttonDisablet
                  ? buttonDisablet
                  : linkedList.getLength() === 0
                  ? true
                  : false
              }
            />
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
              isLoader={loderAddbyIndex}
              linkedList="big"
              disabled={
                buttonDisablet
                  ? buttonDisablet
                  : parseInt(currentIndex) > linkedList.getLength() - 1
                  ? true
                  : !currentIndex || !textInput
                  ? true
                  : false
              }
            />
            <Button
              text="Удалить по индексу"
              isLoader={loderRemoveByindex}
              onClick={handlerDellIndexCyrcle}
              linkedList="big"
              disabled={
                buttonDisablet
                  ? buttonDisablet
                  : parseInt(currentIndex) > linkedList.getLength() - 1
                  ? true
                  : !currentIndex
                  ? true
                  : false
              }
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
