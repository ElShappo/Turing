class TapeException extends Error {
  constructor(message) {
    super(message);
    this.name_ = this.constructor.name;
  }
}

class Tape {
// infinite in both directions

  #right_; // right part of the tape (indexes 0,1,2,...)
  #left_; // left part of the tape (indexes -1,-2,-3,...)

  push(symbols, index = this.right_.length) {
  // push symbols with the initial index at 'index'

    let position = index;

    try {
      if (index < 0 && Math.abs(index) >= this.left_.length) {
        throw TapeException('index out of range');
      }
      if (index >= 0 && index >= this.right_.length) {
        throw TapeException('index out of range');
      }
    } catch (obj) {
      console.log(obj.name_);
    }

    for (const symbol of symbols) {
      if (position < 0) {
        this.left_.splice(Math.abs(position), 0, symbol); // add symbol to the index = position
      }
      else {
        this.right_.splice(position, 0, symbol);
      }
      ++position;
    }
  }

  constructor(word) {
    this.right_ = [];
    this.left_ = [];
    this.push(word);
  }

  pop(index) {

    try {
      if (index < 0 && Math.abs(index) >= this.left_.length) {
        throw TapeException('index out of range');
      }
      if (index >= 0 && index >= this.right_.length) {
        throw TapeException('index out of range');
      }
    } catch (obj) {
      console.log(obj.name_);
    }

    if (index < 0) {
      this.left_.splice(Math.abs(index), 1); // remove one element with index equals index
    }
    else {
      this.right_.splice(index, 1);
    }
  }

  erase() {
    this.right_ = [];
    this.left_ = [];
  }
}

export {TapeException, Tape}
