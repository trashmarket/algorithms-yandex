export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    elements: () => T[];
    clear: () => void;
  }

  export class Stack<T> implements IStack<T> {
     container: T[] = [];

    push = (item: T): void => {
      this.container.push(item);
    };
  
    pop = (): void => {
      // ...
      if (this.container[0]) {this.container.pop();}
    };
  
    peak = (): T | null => {
      // ...
      if (!this.container[0]) return null;
      return this.container[this.container.length - 1];
    };
  
    getSize = () => this.container.length;

    elements = () =>  this.container;

    clear = () => this.container = [];
  }