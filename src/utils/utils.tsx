import React, { Dispatch , SetStateAction } from "react"

export const checkVal = (setDisable: Dispatch<SetStateAction<boolean>>, event: any) => {
    if (event.target.value.length !== 0) {
        setDisable(false);
      } else {
        setDisable(true);
      }
}