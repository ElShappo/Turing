import {Enum} from 'enumify';
import {Parser} from './parser.js';
import {Tape} from './tape.js';

class Instructions extends Enum {}
Instructions.initEnum(['R', 'L', 'H']);

class State {
// possible states of TM (including terminal state described by Ω)
// note: terminal state is not yet considered as the special state

    // class fields

    state_ = null;
    regex_ = /^[a-zA-Zα-ωΑ-Ω]_?([0-9])*'*$/;

    // ctor and methods

    constructor(state) {

      this.state_ = state.search(this.regex_); // if state doesn't satisfy the regex then search returns -1
      if (this.state_ === -1)
        this.state_ = null;

      try {
        if (this.state_ === null) {
          throw StateException("invalid state");
        }
      } catch (obj) {
        console.log(obj.name_);
      }

    }
    getState() {
      return this.state_;
    }
}

class StateException extends Error {
  constructor(message) {
    super(message);
    this.name_ = this.constructor.name;
  }
}

class Instruction {
// (R, L, or H to perform)

  instruction_ = null;

  constructor(instruction) {
    for (const c of Instructions.enumValues) {
        if (c === instruction)
          this.instruction_ = instruction;
    }
    try {
      if (this.instruction_ === null)
        throw InstructionException("invalid instruction");
    } catch(obj) {
      console.log(obj.name_);
    }
  }

  getInstruction() {
    return this.instruction_;
  }
}

class InstructionException extends Error {
// literally except the name of the class it is identical to StateException - is there some workaround not to copy-paste the code?
  constructor(message) {
    super(message);
    this.name_ = this.constructor.name;
  }
}

const DELTA = 100; // 100 of lambdas are placed after the word
const INITIAL_SYMBOL = 'σ';
class Turing {

  program_ = null; // the program of the MT
  tape_ = new Tape('σ'); // delta_+1 because in the ctor the first lambda will be changed to sigma

  caret_ = 0; // position of the caret
  state_ = 'S0'; // initial state

  constructor(program) {
    this.program_ = Parser.parseCommands(program, "parse5Command");
    this.reset();
  }

  setWord(word) {

    let oldWordLen = this.tape_.len-DELTA;
    let newWordLen = word.len;

    this.tape_ = word;

    let sizeDelta = newWordLen-oldWordLen;

    if (sizeDelta > 0) {
    // if the new word in longer than the previous, extra lambdas (in amount which is equal to sizeDelta) should be pushed back (to make it seem that the tape is infinite on the right side)
      for (let i = 0; i < sizeDelta; i++) {
        this.tape_.push('λ');
      }
    }
  }

  reset() {
  // each MT represents the algorithm itself, so we cannot reset the program, only tape_
    this.caret_ = 0;
    this.tape_[0] = INITIAL_SYMBOL;
  }
  step() {
    // один шаг МТ. возвращает false, если достигнуто терминальное состояние
    // (или, что то же самое, нет команд на исполнение)
    // возвращает true, если команда была исполнена
    // выбрасывает ошибку при неверной команде на перемещение

    const state = this.state_;
    const symbol = this.word_[this.caret_];

    const command = this.program_.find(function (cmd) {
      return cmd.condition.state === state
          && cmd.condition.symbol === symbol;
    });
    if (!command)
      return false;

    this.word_[this.caret_] = command.action.symbol;
    this.state_ = command.action.state;

    switch (command.action.instruction)
    // check whether we cannot shift left because we are at the beginning of the tape_
    {
      case 'R': ++this.caret_; break;
      case 'L': --this.caret_; break;
      case 'H': break;
      default: throw 'instruction syntax error';
    }
    return true;
  }

  run() {
    while (this.step()) {
      // or until timeout, or until error, or until no commands are to ever be executed
    }
  }
}

export {Turing, State, Instruction}
