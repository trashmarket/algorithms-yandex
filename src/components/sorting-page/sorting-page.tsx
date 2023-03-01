import React, { useState, useEffect } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Wrapper } from "../wrapper/wrapper";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { IColumn } from "../../types/list-types-ofcomponents";
import { getRandomIntInclusive, swap } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";

const paintingCouple = (
  index: number,
  jindex: number | null,
  stateElement: ElementStates,
  arr: Array<IColumn>
) => {
  let newArr: Array<IColumn> = arr.slice();
  newArr = newArr.map((item) => {
    if (item.state !== ElementStates.Modified) {
      item.state = ElementStates.Default;
      return item;
    } else return item;
  });
  newArr[index].state = stateElement;
  if (jindex) newArr[jindex].state = stateElement;
  return newArr;
};

const painitingSingleElem = (
  index: number,
  minIndex: number,
  arr: Array<IColumn>,
  stateElement: ElementStates
) => {
  let newArr = swap(arr, index, minIndex);
  return paintingCouple(index, null, stateElement, newArr);
};

export const SortingPage: React.FC = () => {
  const [columnArr, setColumnArr] = useState<IColumn[]>([]);
  const [selectionSort, setSelectionSort] = useState(true);
  const [bubbleSort, setbubleSort] = useState(false);
  const [disable, setDisable] = useState(false);
  const [diminutionLoder, setDiminutionLoder] = useState(false);
  const [ascendingLoder, setAscendingLoder] = useState(false);

  const handlerOnClickMakerArr = (e: any) => {
    e.preventDefault();
    const num = getRandomIntInclusive(3, 17);
    let numArr: IColumn[] = [];
    let i = 0;

    while (i < num) {
      let randomIndex = getRandomIntInclusive(0, 100);
      numArr = [
        ...numArr,
        {
          index: randomIndex,
          state: ElementStates.Default,
          keuId: i,
        },
      ];
      i++;
    }
    setColumnArr(numArr);
  };

  const sortOfBubble = (arr: Array<IColumn>, ascending: boolean) => {
   const {length} = arr;
   let i = 0;
   let j = 0;
   let jPluse = 1;
   const sorting = () => {
    if (i < length) {
      if (j < length - i - 1) {
        setColumnArr( arr => paintingCouple(j, jPluse, ElementStates.Changing, arr))
        if (ascending) {
          if (arr[j].index > arr[jPluse].index){
            arr = swap(arr, j, jPluse);
            setColumnArr(arr);
          }
        } else {
          if (arr[j].index < arr[jPluse].index){
            arr = swap(arr, j, jPluse);
            setColumnArr(arr);
          }
        } 

        j++;
        jPluse = j + 1
        setTimeout(()=> sorting(), 500);
      } else {
        setColumnArr( arr => paintingCouple(j, null, ElementStates.Modified, arr));
        i++;
        j = 0;
        jPluse = 1;
        setTimeout(()=>sorting(), 500);
      }
    } else {
      setAscendingLoder(false);
      setDisable(false);
      setDiminutionLoder(false);
    }
   }
   setTimeout(() => sorting(), 500);
  }

  const sortOfSelection = (ascending: boolean) => {
    const { length } = columnArr;
    let newColumn = [...columnArr];

    let i = 0;
    let j = 1;
    let minindex = i;
    const sorting = () => {
      if (i < length) {
        if (j < length) {
          setColumnArr((arr) =>
            paintingCouple(i, j, ElementStates.Changing, arr)
          );
          if (ascending) {
            if (newColumn[j].index < newColumn[minindex].index) {
              minindex = j;
            }
          } else {
            if (newColumn[j].index > newColumn[minindex].index) {
              minindex = j;
            }
          }
          j++;
          setTimeout(() => {
            sorting();
          }, 500);
        } else {
          newColumn = painitingSingleElem(
            i,
            minindex,
            newColumn,
            ElementStates.Modified
          );
          if (i !== newColumn.length - 1) {
            newColumn[i + 1].state = ElementStates.Changing;
          }
          setColumnArr(newColumn);
          i++;
          minindex = i;
          j = i + 1;
          setTimeout(() => {
            sorting();
          }, 500);
        }
      } else {
        setAscendingLoder(false);
        setDisable(false);
        setDiminutionLoder(false);
      }

    };
    setTimeout(() => {
      sorting();
    }, 500);
  };

  const handelerClickAscending = (e: any) => {
    e.preventDefault();
    bubbleSort && sortOfBubble(columnArr, true);
    selectionSort && sortOfSelection(true);
    setAscendingLoder(true);
    setDisable(true);
  };

  const handelerClickDiminution = (e: any) => {
    e.preventDefault();
    bubbleSort && sortOfBubble(columnArr, false);
    selectionSort && sortOfSelection(false);
    setDiminutionLoder(true);
    setDisable(true);
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <Wrapper>
        <form className={styles.form}>
          <RadioInput
            label="Выбор"
            checked={selectionSort}
            onChange={() => {
              setSelectionSort(true);
              setbubleSort(false);
            }}
          />
          <RadioInput
            label="Пузырёк"
            checked={bubbleSort}
            onChange={() => {
              setSelectionSort(false);
              setbubleSort(true);
            }}
          />
          <fieldset className={styles.fieldset}>
            <Button
              type="submit"
              text="По возрастанию"
              sorting={Direction.Ascending}
              extraClass="mr-6"
              onClick={handelerClickAscending}
              disabled={disable}
              isLoader={ascendingLoder}
            />
            <Button
              type="submit"
              text="По убыванию"
              sorting={Direction.Descending}
              extraClass="mr-40"
              onClick={handelerClickDiminution}
              disabled={disable}
              isLoader={diminutionLoder}
            />
            <Button
              type="submit"
              text="Новый массив"
              name="makerArr"
              onClick={handlerOnClickMakerArr}
              disabled={disable}
            />
          </fieldset>
        </form>
        <div className={styles.columnWrapper}>
          {columnArr.map((item) => (
            <Column index={item.index} state={item.state} key={item.keuId} />
          ))}
        </div>
      </Wrapper>
    </SolutionLayout>
  );
};
