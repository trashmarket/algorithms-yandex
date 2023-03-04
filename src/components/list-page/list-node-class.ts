export class  LinkedListNode<T> {
    value: T
    next:  LinkedListNode<T> | null
    constructor(value: T, next?:  LinkedListNode<T> | null) {
      this.value = value;
      this.next = (next === undefined ? null : next);
    }
  }

  interface ILinkedList<T> {
    append: (element: T) => void;
    getLength: () => number;
    appendHead: (element: T) => void;
    appendTail:  (element: T) => void;
  }
  
  export class LinkedList<T> implements ILinkedList<T> {
    private head:  LinkedListNode<T> | null;
    private arrNode!: Array<LinkedListNode<T>> ;

    constructor(arr: Array<T>) {
      this.head = null;
        
      arr.forEach(item => {
        this.append(item);
      })

      this.toArray();
    }
  
    append(element: T) {
      const node = new  LinkedListNode(element);

      if (this.head === null) {
        this.head = node;
      } else {
        let current = this.head;
        while (current.next !== null) {
          current = current.next;
        }
        current.next = node
      }
    }

    appendTail = (element: T) => {
        this.append(element)
        this.toArray();
    }

    appendHead = (element: T) => {
        const node = new LinkedListNode(element)
        node.next = this.head
        this.head = node;
        this.toArray()
    }

    toArray() {
      let newArr = [];
      let current = this.head;
      
      while(current) {
        newArr.push(current)
        current = current.next;
      }

      this.arrNode = newArr;
    }

    getElements = () => this.arrNode

    getLength = () => this.arrNode?.length;
  }