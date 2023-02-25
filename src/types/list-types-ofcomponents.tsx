import { ElementStates } from "./element-states";

export interface LetterStep {
    letter: string;
    state?: ElementStates;
    index: number
}

export interface FibStep {
    index: number,
    fibNum: number
}