import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./queue-page.module.css";
import { Wrapper } from "../wrapper/wrapper";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { Queue, IQueue } from "./queue-class";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { setState } from "../../utils/utils";

export const QueuePage: React.FC = () => {
  const [queue, setQueue] = useState<IQueue<string>>(new Queue<string>(4));
  const [value, setValue] = useState("");
  const [head, setHead] = useState(false);
  const [tail, setTail] = useState(false);
  const [stateIndex, setStateIndex] = useState<number | null>(null);

  const handlerOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
  };

  const setEnqueue = () => {
    setStateIndex(queue.getTail());

    setTimeout(() => {
      queue.enqueue(value);
      setState(queue, setQueue);
      setValue("");
      setHead(true);
      setTail(true);
      setTimeout(() => setStateIndex(null), 300);
    }, 500);
  };

  const setDequeue = () => {
    setStateIndex(queue.getHead());

    setTimeout(() => {
      queue.dequeue();
      setState(queue, setQueue);
      setStateIndex(null);
      setValue("");
    }, 500);
  };

  const clear = () => {
    queue.clear();
    setState(queue, setQueue);
    setHead(false)
  };

  return (
    <SolutionLayout title="Очередь">
      <Wrapper>
        <form className={styles.form}>
          <fieldset className={styles.fieldset}>
            <Input
              maxLength={4}
              isLimitText={true}
              onChange={handlerOnChange}
              value={value}
            />
            <Button
              text="Добавить"
              onClick={setEnqueue}
              disabled={!value ? true : false}
              extraClass='ml-5'
            />
            <Button
              text="Удалить"
              onClick={setDequeue}
              disabled={queue.isEmpty() ? true : false}
              extraClass='ml-5'

            />
          </fieldset>
          <Button
            text="Очистить"
            disabled={queue.getHead() || queue.getTail() ? false : true}
            onClick={clear}
          />
        </form>
        <div className={styles.circleContainer}>
          {queue.elements().map((item, index) => (
            <Circle
              key={index}
              index={index}
              extraClass="ml-5"
              letter={item ? item : ""}
              tail={
                queue.getTail() - 1 === index &&
                tail &&
                queue.getHead() < queue.elements().length
                  ? "tail"
                  : ""
              }
              head={
                (queue.getHead() === index && head) ||
                (queue.getHead() >= queue.elements().length &&
                  index == queue.elements().length - 1)
                  ? "head"
                  : ""
              }
              state={
                stateIndex === index
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
            />
          ))}
        </div>
      </Wrapper>
    </SolutionLayout>
  );
};
