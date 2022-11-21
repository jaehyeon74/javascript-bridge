const Model = require('./Model');
const InputView = require('./InputView');
const OutputView = require('./OutputView');
const BridgeMaker = require('./BridgeMaker');
const { generate } = require('./BridgeRandomNumberGenerator');
const BridgeGame = require('./BridgeGame');

class Controller {
  constructor() {
    this.model = new Model();
  }

  startGame() {
    OutputView.printGameStart();
    this.inputBridgeSize();
  }

  inputBridgeSize() {
    const readBridgeSizeCallback = (input) => {
      const num = parseInt(input, 10);
      this.model.setBridgeSize(num);
      this.model.setComputerBridgeArr(BridgeMaker.makeBridge(num, generate));
      return this.inputMoving();
    };
    InputView.readBridgeSize(readBridgeSizeCallback);
  }

  inputMoving() {
    const callback = (input, index) => {
      const bridgeSize = this.model.getBridgeSize();
      const computerBridgeArr = this.model.getComputerBridgeArr();
      const OX = input === computerBridgeArr[index] ? ' O ' : ' X ';
      BridgeGame.move(input, OX, this.model);
      OutputView.printMap(this.model);
      if (OX === ' X ') return this.inputGameCommand();
      if (index === bridgeSize - 1) return OutputView.printResult('성공', this.model);
    };
    InputView.readMoving(callback, 0, this.model);
  }

  inputGameCommand() {
    const callback = (input) => {
      if (input === 'Q') return OutputView.printResult('실패', this.model);
      BridgeGame.retry(this.model);
      return this.inputMoving();
    };
    InputView.readGameCommand(callback);
  }
}
module.exports = Controller;
