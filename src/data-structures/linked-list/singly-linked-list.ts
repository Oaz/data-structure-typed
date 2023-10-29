/**
 * data-structure-typed
 *
 * @author Tyler Zeng
 * @copyright Copyright (c) 2022 Tyler Zeng <zrwusa@gmail.com>
 * @license MIT License
 */
export class SinglyLinkedListNode<E = any> {
  /**
   * The constructor function initializes an instance of a class with a given value and sets the next property to null.
   * @param {E} val - The "val" parameter is of type E, which means it can be any data type. It represents the value that
   * will be stored in the node of a linked list.
   */
  constructor(val: E) {
    this._val = val;
    this._next = null;
  }

  private _val: E;

  get val(): E {
    return this._val;
  }

  set val(value: E) {
    this._val = value;
  }

  private _next: SinglyLinkedListNode<E> | null;

  get next(): SinglyLinkedListNode<E> | null {
    return this._next;
  }

  set next(value: SinglyLinkedListNode<E> | null) {
    this._next = value;
  }
}

export class SinglyLinkedList<E = any> {
  /**
   * The constructor initializes the linked list with an empty head, tail, and length.
   */
  constructor() {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }

  private _head: SinglyLinkedListNode<E> | null;

  get head(): SinglyLinkedListNode<E> | null {
    return this._head;
  }

  set head(value: SinglyLinkedListNode<E> | null) {
    this._head = value;
  }

  private _tail: SinglyLinkedListNode<E> | null;

  get tail(): SinglyLinkedListNode<E> | null {
    return this._tail;
  }

  set tail(value: SinglyLinkedListNode<E> | null) {
    this._tail = value;
  }

  private _length: number;

  get length(): number {
    return this._length;
  }

  /**
   * The `fromArray` function creates a new SinglyLinkedList instance and populates it with the elements from the given
   * array.
   * @param {E[]} data - The `data` parameter is an array of elements of type `E`.
   * @returns The `fromArray` function returns a `SinglyLinkedList` object.
   */
  static fromArray<E>(data: E[]) {
    const singlyLinkedList = new SinglyLinkedList<E>();
    for (const item of data) {
      singlyLinkedList.push(item);
    }
    return singlyLinkedList;
  }

  /**
   * The `push` function adds a new node with the given val to the end of a singly linked list.
   * @param {E} val - The "val" parameter represents the value that you want to add to the linked list. It can be of
   * any type (E) as specified in the generic type declaration of the class or function.
   */
  push(val: E): void {
    const newNode = new SinglyLinkedListNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    this._length++;
  }

  /**
   * The `push` function adds a new node with the given val to the end of a singly linked list.
   * @param {E} val - The "val" parameter represents the value that you want to add to the linked list. It can be of
   * any type (E) as specified in the generic type declaration of the class or function.
   */
  addLast(val: E): void {
    this.push(val);
  }

  /**
   * The `pop()` function removes and returns the value of the last element in a linked list, updating the head and tail
   * pointers accordingly.
   * @returns The method `pop()` returns the value of the node that is being removed from the end of the linked list. If
   * the linked list is empty, it returns `null`.
   */
  pop(): E | undefined {
    if (!this.head) return undefined;
    if (this.head === this.tail) {
      const val = this.head.val;
      this.head = null;
      this.tail = null;
      this._length--;
      return val;
    }

    let current = this.head;
    while (current.next !== this.tail) {
      current = current.next!;
    }
    const val = this.tail!.val;
    current.next = null;
    this.tail = current;
    this._length--;
    return val;
  }

  /**
   * The `popLast()` function removes and returns the value of the last element in a linked list, updating the head and tail
   * pointers accordingly.
   * @returns The method `pop()` returns the value of the node that is being removed from the end of the linked list. If
   * the linked list is empty, it returns `null`.
   */
  popLast(): E | undefined {
    return this.pop();
  }

  /**
   * The `shift()` function removes and returns the value of the first node in a linked list.
   * @returns The value of the node that is being removed from the beginning of the linked list.
   */
  shift(): E | undefined {
    if (!this.head) return undefined;
    const removedNode = this.head;
    this.head = this.head.next;
    this._length--;
    return removedNode.val;
  }

  /**
   * The `popFirst()` function removes and returns the value of the first node in a linked list.
   * @returns The value of the node that is being removed from the beginning of the linked list.
   */
  popFirst(): E | undefined {
    return this.shift();
  }

  /**
   * The unshift function adds a new node with the given value to the beginning of a singly linked list.
   * @param {E} val - The parameter "val" represents the value of the new node that will be added to the beginning of the
   * linked list.
   */
  unshift(val: E): void {
    const newNode = new SinglyLinkedListNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this._length++;
  }

  /**
   * The addFirst function adds a new node with the given value to the beginning of a singly linked list.
   * @param {E} val - The parameter "val" represents the value of the new node that will be added to the beginning of the
   * linked list.
   */
  addFirst(val: E): void {
    this.unshift(val);
  }

  /**
   * The function `getAt` returns the value at a specified index in a linked list, or null if the index is out of range.
   * @param {number} index - The index parameter is a number that represents the position of the element we want to
   * retrieve from the list.
   * @returns The method `getAt(index: number): E | null` returns the value at the specified index in the linked list, or
   * `null` if the index is out of bounds.
   */
  getAt(index: number): E | undefined {
    if (index < 0 || index >= this.length) return undefined;
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current!.val;
  }

  /**
   * The function `getNodeAt` returns the node at a given index in a singly linked list.
   * @param {number} index - The `index` parameter is a number that represents the position of the node we want to
   * retrieve from the linked list. It indicates the zero-based index of the node we want to access.
   * @returns The method `getNodeAt(index: number)` returns a `SinglyLinkedListNode<E>` object if the node at the
   * specified index exists, or `null` if the index is out of bounds.
   */
  getNodeAt(index: number): SinglyLinkedListNode<E> | null {
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current!.next;
    }
    return current;
  }

  /**
   * The `deleteAt` function removes an element at a specified index from a linked list and returns the removed element.
   * @param {number} index - The index parameter represents the position of the element that needs to be deleted in the
   * data structure. It is of type number.
   * @returns The method `deleteAt` returns the value of the node that was deleted, or `null` if the index is out of
   * bounds.
   */
  deleteAt(index: number): E | undefined {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const prevNode = this.getNodeAt(index - 1);
    const removedNode = prevNode!.next;
    prevNode!.next = removedNode!.next;
    this._length--;
    return removedNode!.val;
  }

  /**
   * The delete function removes a node with a specific value from a singly linked list.
   * @param {E | SinglyLinkedListNode<E>} valueOrNode - The `valueOrNode` parameter can accept either a value of type `E`
   * or a `SinglyLinkedListNode<E>` object.
   * @returns The `delete` method returns a boolean value. It returns `true` if the value or node is found and
   * successfully deleted from the linked list, and `false` if the value or node is not found in the linked list.
   */
  delete(valueOrNode: E | SinglyLinkedListNode<E> | null | undefined): boolean {
    if (!valueOrNode) return false;
    let value: E;
    if (valueOrNode instanceof SinglyLinkedListNode) {
      value = valueOrNode.val;
    } else {
      value = valueOrNode;
    }
    let current = this.head,
      prev = null;

    while (current) {
      if (current.val === value) {
        if (prev === null) {
          this.head = current.next;
          if (current === this.tail) {
            this.tail = null;
          }
        } else {
          prev.next = current.next;
          if (current === this.tail) {
            this.tail = prev;
          }
        }
        this._length--;
        return true;
      }
      prev = current;
      current = current.next;
    }

    return false;
  }

  /**
   * The `insertAt` function inserts a value at a specified index in a singly linked list.
   * @param {number} index - The index parameter represents the position at which the new value should be inserted in the
   * linked list. It is of type number.
   * @param {E} val - The `val` parameter represents the value that you want to insert into the linked list at the
   * specified index.
   * @returns The `insert` method returns a boolean value. It returns `true` if the insertion is successful, and `false`
   * if the index is out of bounds.
   */
  insertAt(index: number, val: E): boolean {
    if (index < 0 || index > this.length) return false;
    if (index === 0) {
      this.unshift(val);
      return true;
    }
    if (index === this.length) {
      this.push(val);
      return true;
    }

    const newNode = new SinglyLinkedListNode(val);
    const prevNode = this.getNodeAt(index - 1);
    newNode.next = prevNode!.next;
    prevNode!.next = newNode;
    this._length++;
    return true;
  }

  /**
   * The function checks if the length of a data structure is equal to zero and returns a boolean value indicating
   * whether it is empty or not.
   * @returns A boolean value indicating whether the length of the object is equal to 0.
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * The `clear` function resets the linked list by setting the head, tail, and length to null and 0 respectively.
   */
  clear(): void {
    this._head = null;
    this._tail = null;
    this._length = 0;
  }

  /**
   * The `toArray` function converts a linked list into an array.
   * @returns The `toArray()` method is returning an array of type `E[]`.
   */
  toArray(): E[] {
    const array: E[] = [];
    let current = this.head;
    while (current) {
      array.push(current.val);
      current = current.next;
    }
    return array;
  }

  /**
   * The `reverse` function reverses the order of the nodes in a singly linked list.
   * @returns The reverse() method does not return anything. It has a return type of void.
   */
  reverse(): void {
    if (!this.head || this.head === this.tail) return;

    let prev: SinglyLinkedListNode<E> | null = null;
    let current: SinglyLinkedListNode<E> | null = this.head;
    let next: SinglyLinkedListNode<E> | null = null;

    while (current) {
      next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }

    [this.head, this.tail] = [this.tail!, this.head!];
  }

  /**
   * The `find` function iterates through a linked list and returns the first element that satisfies a given condition.
   * @param callback - A function that takes a value of type E as its parameter and returns a boolean value. This
   * function is used to determine whether a particular value in the linked list satisfies a certain condition.
   * @returns The method `find` returns the first element in the linked list that satisfies the condition specified by
   * the callback function. If no element satisfies the condition, it returns `null`.
   */
  find(callback: (val: E) => boolean): E | null {
    let current = this.head;
    while (current) {
      if (callback(current.val)) {
        return current.val;
      }
      current = current.next;
    }
    return null;
  }

  /**
   * The `indexOf` function returns the index of the first occurrence of a given value in a linked list.
   * @param {E} value - The value parameter is the value that you want to find the index of in the linked list.
   * @returns The method is returning the index of the first occurrence of the specified value in the linked list. If the
   * value is not found, it returns -1.
   */
  indexOf(value: E): number {
    let index = 0;
    let current = this.head;

    while (current) {
      if (current.val === value) {
        return index;
      }
      index++;
      current = current.next;
    }

    return -1;
  }

  /**
   * The function finds a node in a singly linked list by its value and returns the node if found, otherwise returns
   * null.
   * @param {E} value - The value parameter is the value that we want to search for in the linked list.
   * @returns a `SinglyLinkedListNode<E>` if a node with the specified value is found in the linked list. If no node with
   * the specified value is found, the function returns `null`.
   */
  getNode(value: E): SinglyLinkedListNode<E> | null {
    let current = this.head;

    while (current) {
      if (current.val === value) {
        return current;
      }
      current = current.next;
    }

    return null;
  }

  /**
   * The `insertBefore` function inserts a new value before an existing value in a singly linked list.
   * @param {E | SinglyLinkedListNode<E>} existingValueOrNode - The existing value or node that you want to insert the
   * new value before. It can be either the value itself or a node containing the value in the linked list.
   * @param {E} newValue - The `newValue` parameter represents the value that you want to insert into the linked list.
   * @returns The method `insertBefore` returns a boolean value. It returns `true` if the new value was successfully
   * inserted before the existing value, and `false` otherwise.
   */
  insertBefore(existingValueOrNode: E | SinglyLinkedListNode<E>, newValue: E): boolean {
    if (!this.head) return false;

    let existingValue: E;
    if (existingValueOrNode instanceof SinglyLinkedListNode) {
      existingValue = existingValueOrNode.val;
    } else {
      existingValue = existingValueOrNode;
    }
    if (this.head.val === existingValue) {
      this.unshift(newValue);
      return true;
    }

    let current = this.head;
    while (current.next) {
      if (current.next.val === existingValue) {
        const newNode = new SinglyLinkedListNode(newValue);
        newNode.next = current.next;
        current.next = newNode;
        this._length++;
        return true;
      }
      current = current.next;
    }

    return false;
  }

  /**
   * The `insertAfter` function inserts a new node with a given value after an existing node in a singly linked list.
   * @param {E | SinglyLinkedListNode<E>} existingValueOrNode - The existing value or node in the linked list after which
   * the new value will be inserted. It can be either the value of the existing node or the existing node itself.
   * @param {E} newValue - The value that you want to insert into the linked list after the existing value or node.
   * @returns The method returns a boolean value. It returns true if the new value was successfully inserted after the
   * existing value or node, and false if the existing value or node was not found in the linked list.
   */
  insertAfter(existingValueOrNode: E | SinglyLinkedListNode<E>, newValue: E): boolean {
    let existingNode: E | SinglyLinkedListNode<E> | null;

    if (existingValueOrNode instanceof SinglyLinkedListNode) {
      existingNode = existingValueOrNode;
    } else {
      existingNode = this.getNode(existingValueOrNode);
    }

    if (existingNode) {
      const newNode = new SinglyLinkedListNode(newValue);
      newNode.next = existingNode.next;
      existingNode.next = newNode;
      if (existingNode === this.tail) {
        this.tail = newNode;
      }
      this._length++;
      return true;
    }

    return false;
  }

  /**
   * The function counts the number of occurrences of a given value in a linked list.
   * @param {E} value - The value parameter is the value that you want to count the occurrences of in the linked list.
   * @returns The count of occurrences of the given value in the linked list.
   */
  countOccurrences(value: E): number {
    let count = 0;
    let current = this.head;

    while (current) {
      if (current.val === value) {
        count++;
      }
      current = current.next;
    }

    return count;
  }

  /**
   * The `forEach` function iterates over each element in a linked list and applies a callback function to each element.
   * @param callback - The callback parameter is a function that takes two arguments: val and index. The val argument
   * represents the value of the current node in the linked list, and the index argument represents the index of the
   * current node in the linked list.
   */
  forEach(callback: (val: E, index: number) => void): void {
    let current = this.head;
    let index = 0;
    while (current) {
      callback(current.val, index);
      current = current.next;
      index++;
    }
  }

  /**
   * The `map` function takes a callback function and applies it to each element in the SinglyLinkedList, returning a new
   * SinglyLinkedList with the transformed values.
   * @param callback - The callback parameter is a function that takes a value of type E (the type of values stored in
   * the original SinglyLinkedList) and returns a value of type U (the type of values that will be stored in the mapped
   * SinglyLinkedList).
   * @returns The `map` function is returning a new instance of `SinglyLinkedList<U>` that contains the mapped values.
   */
  map<U>(callback: (val: E) => U): SinglyLinkedList<U> {
    const mappedList = new SinglyLinkedList<U>();
    let current = this.head;
    while (current) {
      mappedList.push(callback(current.val));
      current = current.next;
    }
    return mappedList;
  }

  /**
   * The `filter` function iterates through a SinglyLinkedList and returns a new SinglyLinkedList containing only the
   * elements that satisfy the given callback function.
   * @param callback - The `callback` parameter is a function that takes a value of type `E` and returns a boolean value.
   * It is used to determine whether a value should be included in the filtered list or not.
   * @returns The filtered list, which is an instance of the SinglyLinkedList class.
   */
  filter(callback: (val: E) => boolean): SinglyLinkedList<E> {
    const filteredList = new SinglyLinkedList<E>();
    let current = this.head;
    while (current) {
      if (callback(current.val)) {
        filteredList.push(current.val);
      }
      current = current.next;
    }
    return filteredList;
  }

  /**
   * The `reduce` function iterates over a linked list and applies a callback function to each element, accumulating a
   * single value.
   * @param callback - The `callback` parameter is a function that takes two arguments: `accumulator` and `val`. It is
   * used to perform a specific operation on each element of the linked list.
   * @param {U} initialValue - The `initialValue` parameter is the initial value of the accumulator. It is the starting
   * point for the reduction operation.
   * @returns The `reduce` method is returning the final value of the accumulator after iterating through all the
   * elements in the linked list.
   */
  reduce<U>(callback: (accumulator: U, val: E) => U, initialValue: U): U {
    let accumulator = initialValue;
    let current = this.head;
    while (current) {
      accumulator = callback(accumulator, current.val);
      current = current.next;
    }
    return accumulator;
  }

  /**
   * The function returns an iterator that iterates over the values of a linked list.
   */
  * [Symbol.iterator]() {
    let current = this.head;

    while (current) {
      yield current.val;
      current = current.next;
    }
  }
}
