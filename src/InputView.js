const { Console } = require('@woowacourse/mission-utils');
const OutputView = require('./OutputView');
const Validator = require('./Validator');
/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize(callback) {
    Console.readLine('다리의 길이를 입력해주세요. \n', (input) => {
      if (!Validator.validateNumber(input) || !Validator.validateNumberInRange(input)) {
        Console.print('[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.\n');
        return this.readBridgeSize(callback);
      }
      callback(input);
    });
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving(callback, model, index) {
    const bridgeSize = model.getBridgeSize();
    if (index === bridgeSize) return OutputView.printResult();
    Console.readLine('이동할 칸을 선택해주세요. (위: U, 아래: D) \n', (input) => {
      callback(input, index);
      return this.readMoving(callback, model, index + 1);
    });
    return true;
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand() {},
};

module.exports = InputView;
