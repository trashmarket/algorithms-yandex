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