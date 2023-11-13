class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  prepend(value) {
    this.head = new Node(value, this.head);
    this.size++;
  }
  append(value) {
    if (!this.head) {
      this.prepend(value);
      this.tail = this.head;
    } else {
      const node = new Node(value);
      let current = this.head;
      while (current.nextNode) {
        current = current.nextNode;
      }
      current.nextNode = node;
      this.tail = current.nextNode;
      this.size++;
    }
  }
  at(index) {
    if (index > 0 && index > this.size) return;
    let current, previous;
    current = this.head;
    let count = 0;
    while (count < index) {
      previous = current;
      current = current.nextNode;
      count++;
    }
    return current;
  }
  pop() {
    if (!this.tail) return;
    let current, previous;
    current = this.head;
    while (current.nextNode) {
      previous = current;
      current = current.nextNode;
    }
    previous.nextNode = null;
    this.tail = previous;
  }
  contains(value) {
    let current = this.head;
    while (current.value !== value) {
      current = current.nextNode;
      if (!current) return false;
    }
    return true;
  }
  find(value) {
    let current = this.head;
    let index = 0;
    while (current.value !== value) {
      current = current.nextNode;
      if (!current) return null;
      index++;
    }
    return index;
  }
  toString() {
    let string = "";
    let current = this.head;
    while (current) {
      string += ` -> ( ${current.value} )`;
      current = current.nextNode;
    }
    return string.slice(3);
  }
  insertAt(value, index) {
    if (index > 0 && index > this.size) return;
    if (index === 0) {
      this.prepend(value);
      return;
    }
    const node = new Node(value);
    let current, previous;
    current = this.head;
    let count = 0;
    while (count < index) {
      previous = current;
      current = current.nextNode;
      count++;
    }
    node.nextNode = current;
    previous.nextNode = node;
    this.size++;
  }
  removeAt(index) {
    if (index > 0 && index >= this.size) return;
    let current, previous;
    current = this.head;
    let count = 0;
    if (index === 0) {
      this.head = current.nextNode;
    } else {
      while (count < index) {
        previous = current;
        current = current.nextNode;
        count++;
      }
      previous.nextNode = current.nextNode;
    }
    this.size--;
  }
}

const list = new LinkedList();
list.prepend("3");
console.log(list.toString());
list.prepend("1");
list.prepend("0");
list.append("4");
list.append("5");
list.insertAt("2", 2);
list.insertAt("6", 6);
console.log(list.toString());
list.pop();
console.log(`List contains number 3 = ${list.contains("3")}`);
console.log(`Number 2 is at index = ${list.find("2")}`);
list.removeAt(6);
console.log(list.toString());
console.log(list.tail.value);
console.log(list.head.value);
console.log(list.size);
