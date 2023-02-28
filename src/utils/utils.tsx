import React, { Dispatch , SetStateAction } from "react"

export const checkVal = (setDisable: Dispatch<SetStateAction<boolean>>, event: any) => {
    if (event.target.value.length !== 0) {
        setDisable(false);
      } else {
        setDisable(true);
      }
}

export function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

export const swap = (arr: Array<any>, firstIndex: number, secondIndex: number) => {
    let newArr = [...arr]
    const temp = newArr[firstIndex];
    newArr[firstIndex] = newArr[secondIndex];
    newArr[secondIndex] = temp;
    return newArr
  };
  