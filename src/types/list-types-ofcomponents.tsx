import { ElementStates } from "./element-states";

export interface LetterStep {
    letter: string;
    state?: ElementStates;
    index: number
}

export interface TFibStep {
    index: number,
    fibNum: number
}

export interface IColumn {
    index: number,
    state: ElementStates
    keuId: number
}