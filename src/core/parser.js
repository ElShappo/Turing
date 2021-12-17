import {State, Instruction} from './turing.js';

class ParserException extends Error {
  constructor(message) {
    super(message);
    this.name_ = this.constructor.name;
  }
}

function parse5Command(command) {
  try {
    var parsed = command.split(" "); // parts of the command should be separated with whitespaces

    if (parsed.length != 5)
      throw ParserException('command size does not correspond to the 5-format');

  } catch (obj) {
    console.log(obj.name_);
  }

  return {
    condition: {
      state: State(parsed[0]).getState(),
      symbol: parsed[1],
    },
    action: {
      symbol: parsed[2],
      state: State(parsed[3]).getState(),
      instruction: Instruction(parsed[4]).getState(),
    }
  };
}

class Parser {
// TM command parser

  parseCommands(commands, parseFunction = parse5Command) {
  // format is expected to be one of the methods of this class with a name parse/some_number/Command

    if (typeof parseFunction !== 'function')
      throw new ParserException('Illegal parser function');

    return commands
      .split('\n') // split into lines of commands
      .map(function (item, index) { // parse each line via parseFunction()
        try {
          parseFunction(item)
        } catch (err) {
          throw new ParserException('Parse error', item, index); // for now this won't work
        }
      })
  }
}

export {Parser, ParserException}
