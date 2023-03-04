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
    addByIndex: (element: T, index: number) => void;
    deleteByIndex: (element: T, index: number) => void;
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

    addByIndex = (element: T, index: number) => {
        const node = new LinkedListNode(element);

        if (index === 0) {
            // ваш код ...
            let curr = this.head
            this.head = node;
            this.head.next = curr
            
          }
        let curr = this.head;
        let currIndex = 0;
        let parentNode ;

        while (currIndex < index) {
            parentNode = curr 
            curr = curr && curr.next;
            currIndex++
          }
          const afterCurr = curr;

          if (parentNode) {
            parentNode.next = node;
            if (parentNode.next) {
              parentNode.next.next = afterCurr;
            }
          }
        this.toArray();
    }

    deleteByIndex = (element: T , index: number) => {
        let dummyHead = new LinkedListNode(element);
        dummyHead.next = this.head;
        
        let curr: LinkedListNode<T> | null = dummyHead;
        let prev = dummyHead;
        let i = 0 ;
        let newIndex = index + 1;

        while(i <= newIndex && curr) {
            if ( i === newIndex) {
                prev.next = curr.next
            } else {
                
                prev = curr;
                curr = curr.next
            }
            i++;
        }

        this.head = dummyHead.next;
        this.toArray();
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