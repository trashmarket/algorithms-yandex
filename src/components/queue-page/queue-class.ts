export interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    elements: () => Array<T | null> ;
    getTail: () => number;
    getHead: () => number;
    isEmpty: () => boolean;
    clear: () => void;
  }
  
  export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;
  
    constructor(size: number) {
      this.size = size;
      this.container = [...Array(this.size)];
    }
  
    enqueue = (item: T) => {
      if (this.length >= this.size || this.head >= this.size ) {
        throw new Error("Maximum length exceeded");
      } else {
      this.container[this.tail % this.size] = item;
      this.length++;
      this.tail++;      
      }
  
    };
  
    dequeue = () => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      } 
       else {
        this.container[this.head % this.size] = null;
        this.length--;
        let h =  this.head + 1;

        if (h <= this.length){
          this.head++;
        } 

      }
      
    };
  
    peak = (): T | null => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
      return this.container[this.head]
    };
  
    isEmpty = () => this.length === 0;

    elements = () => this.container;

    getTail = () => this.tail;

    getHead = () => this.head;

    clear = () => {
      this.container = [...Array(this.size)];
      this.length = 0;
      this.head = 0;
      this.tail = 0;    
    }
  }
  