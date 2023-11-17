import { Deque, ObjectDeque } from '../../../../src';
import { bigO } from '../../../utils';
import { isDebugTest } from '../../../config';

const isDebug = isDebugTest;
describe('Deque Tests', () => {
  // Test cases for the Deque class (DoublyLinkedList-based)
  describe('Deque (DoublyLinkedList-based)', () => {
    let deque: Deque<number>;

    beforeEach(() => {
      deque = new Deque<number>();
    });

    it('should add elements at the beginning and end', () => {
      deque.addFirst(1);
      deque.addLast(2);
      expect(deque.getFirst()).toBe(1);
      expect(deque.getLast()).toBe(2);
    });

    it('should delete elements from the beginning and end', () => {
      deque.addFirst(1);
      deque.addLast(2);
      deque.popFirst();
      deque.popLast();
      expect(deque.isEmpty()).toBe(true);
    });

    it('should handle edge case when removing from an empty deque', () => {
      const result = deque.popFirst();
      expect(result).toBeUndefined();
    });

    it('should correctly report its size', () => {
      deque.addFirst(1);
      deque.addLast(2);
      expect(deque.size).toBe(2);
    });

    it('should handle adding and removing elements alternately', () => {
      deque.addFirst(1);
      expect(deque.popFirst()).toBe(1);
      deque.addLast(2);
      expect(deque.popLast()).toBe(2);
      expect(deque.isEmpty()).toBe(true);
    });

    it('should handle adding and removing elements in a cyclic manner', () => {
      deque.addFirst(1);
      deque.addLast(2);
      expect(deque.popFirst()).toBe(1);
      deque.addFirst(3);
      expect(deque.popLast()).toBe(2);
      expect(deque.size).toBe(1);
    });
    // Add more test cases as needed
  });

  // Test cases for the ObjectDeque class
  describe('ObjectDeque', () => {
    let objectDeque: ObjectDeque<string>;

    beforeEach(() => {
      objectDeque = new ObjectDeque<string>();
    });

    it('should add elements at the beginning and end', () => {
      objectDeque.addFirst('one');
      objectDeque.addLast('two');
      expect(objectDeque.getFirst()).toBe('one');
      expect(objectDeque.getLast()).toBe('two');
    });

    it('should delete elements from the beginning and end', () => {
      objectDeque.addFirst('one');
      objectDeque.addLast('two');
      objectDeque.popFirst();
      objectDeque.popLast();
      expect(objectDeque.isEmpty()).toBe(true);
    });

    it('should handle edge case when removing from an empty deque', () => {
      const result = objectDeque.popFirst();
      expect(result).toBeUndefined();
    });

    it('should correctly report its size', () => {
      objectDeque.addFirst('one');
      objectDeque.addLast('two');
      expect(objectDeque.size).toBe(2);
    });

    // Add more test cases as needed
  });
});

describe('Deque Performance Test', () => {
  const dataSize = 10000;
  it('should numeric queue be efficient', function () {
    const startTime = performance.now();
    const queue = new Deque<number>();
    for (let i = 0; i < dataSize; i++) {
      queue.unshift(i);
    }
    for (let i = 0; i < dataSize; i++) {
      queue.pop();
    }
    isDebug && console.log(`Queue Deque Test: ${performance.now() - startTime} ms`);
    expect(performance.now() - startTime).toBeLessThan(bigO.LINEAR * 100);
  });
});

describe('Deque', () => {
  let deque: Deque<number>;

  beforeEach(() => {
    deque = new Deque<number>();
  });

  it('should initialize an empty deque', () => {
    expect(deque.size).toBe(0);
    expect(deque.isEmpty()).toBe(true);
  });

  it('should add elements to the front and back', () => {
    deque.addFirst(1);
    deque.addLast(2);

    expect(deque.size).toBe(2);
    expect(deque.getFirst()).toBe(1);
    expect(deque.getLast()).toBe(2);
  });

  it('should remove elements from the front and back', () => {
    deque.addFirst(1);
    deque.addLast(2);

    const firstElement = deque.popFirst();
    const lastElement = deque.popLast();

    expect(deque.size).toBe(0);
    expect(firstElement).toBe(1);
    expect(lastElement).toBe(2);
  });

  it('should get elements by index', () => {
    deque.addLast(1);
    deque.addLast(2);
    deque.addLast(3);

    expect(deque.getAt(0)).toBe(1);
    expect(deque.getAt(1)).toBe(2);
    expect(deque.getAt(2)).toBe(3);
  });

  it('should return null for out-of-bounds index', () => {
    expect(deque.getAt(0)).toBe(undefined);
    expect(deque.getAt(1)).toBe(undefined);
    expect(deque.getAt(-1)).toBe(undefined);
  });

  it('should check if the deque is empty', () => {
    expect(deque.isEmpty()).toBe(true);

    deque.addLast(1);
    expect(deque.isEmpty()).toBe(false);

    deque.popFirst();
    expect(deque.isEmpty()).toBe(true);
  });
});

describe('ObjectDeque', () => {
  let deque: ObjectDeque<number>;

  beforeEach(() => {
    deque = new ObjectDeque<number>();
  });

  it('should add elements to the front of the deque', () => {
    deque.addFirst(1);
    deque.addFirst(2);

    expect(deque.size).toBe(2);
    expect(deque.getFirst()).toBe(2);
    expect(deque.getLast()).toBe(1);
  });

  it('should add elements to the end of the deque', () => {
    deque.addLast(1);
    deque.addLast(2);

    expect(deque.size).toBe(2);
    expect(deque.getFirst()).toBe(1);
    expect(deque.getLast()).toBe(2);
  });

  it('should remove elements from the front of the deque', () => {
    deque.addLast(1);
    deque.addLast(2);

    const removedElement = deque.popFirst();

    expect(deque.size).toBe(1);
    expect(removedElement).toBe(1);
    expect(deque.getFirst()).toBe(2);
  });

  it('should remove elements from the end of the deque', () => {
    deque.addLast(1);
    deque.addLast(2);

    const removedElement = deque.popFirst();

    expect(deque.size).toBe(1);
    expect(removedElement).toBe(1);
    expect(deque.getLast()).toBe(2);
  });

  it('should return the element at the front of the deque without removing it', () => {
    deque.addFirst(1);
    deque.addFirst(2);

    expect(deque.getFirst()).toBe(2);
    expect(deque.size).toBe(2);
  });

  it('should return the element at the end of the deque without removing it', () => {
    deque.addLast(1);
    deque.addLast(2);

    expect(deque.getLast()).toBe(2);
    expect(deque.size).toBe(2);
  });

  it('should return the correct size of the deque', () => {
    deque.addFirst(1);
    deque.addLast(2);
    deque.addLast(3);

    expect(deque.size).toBe(3);
  });

  it('should check if the deque is empty', () => {
    expect(deque.isEmpty()).toBe(true);

    deque.addFirst(1);

    expect(deque.isEmpty()).toBe(false);
  });

  it('should set elements at a specific index', () => {
    deque.addFirst(1);
    deque.addLast(2);
    deque.addLast(3);

    expect(deque.getFirst()).toBe(1);
    expect(deque.get(1)).toBe(2);
    expect(deque.getLast()).toBe(3);
  });

  it('should insert elements at a specific index', () => {
    deque.addFirst(1);
    deque.addLast(2);
    deque.addLast(3);

    expect(deque.size).toBe(3);
    expect(deque.getFirst()).toBe(1);
    expect(deque.get(1)).toBe(2);
    expect(deque.get(2)).toBe(3);
    expect(deque.getLast()).toBe(3);
  });
});
