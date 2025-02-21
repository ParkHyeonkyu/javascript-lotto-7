import { Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    try {
      const purchaseAmount = await this.getPurchaseAmount();
      const lottoCount = purchaseAmount / 1000;

      const lottos = this.generateLottos(lottoCount);

      Console.print(`${lottoCount}개를 구매했습니다.`);
      lottos.forEach(lotto => {
        Console.print(lotto.getNumbers());
      });

      const winningNumbers = await this.getWinningNumbers();
      const bonusNumber = await this.getBonusNumber();

      // 당첨 번호 및 보너스 번호 출력
      Console.print(`당첨 번호: ${winningNumbers}`);
      Console.print(`보너스 번호: ${bonusNumber}`);

    } catch (error) {
      Console.print(error.message);
    }
  }

  async getPurchaseAmount() {
    const input = await Console.readLineAsync(`구입 금액을 입력해주세요.\n`);
    const amount = parseInt(input);

    if (isNaN(amount) || amount % 1000 !== 0) {
      throw new Error("[ERROR] 천 원 단위로 입력해야 합니다.");
    }
    return amount;
  }

  generateLottos(lottoCount) {
    const lottos = [];
    for (let i = 0; i < lottoCount; i++) {
      const lotto = Lotto.generateRandomLotto();
      lottos.push(lotto);
    }
    return lottos;
  }

  async getWinningNumbers() {
    const input = await Console.readLineAsync("당첨 번호를 입력해주세요. 번호는 쉼표(,)로 구분됩니다.\n");
    const numbers = input.split(",").map(num => parseInt(num.trim()));

    if (numbers.length !== 6 || numbers.some(num => num < 1 || num > 45 || isNaN(num))) {
      throw new Error("[ERROR] 당첨 번호는 1부터 45 사이의 숫자 6개여야 합니다.\n");
    }
    return numbers.sort((a, b) => a - b);
  }

  async getBonusNumber() {
    const input = await Console.readLineAsync("보너스 번호를 입력해주세요.");
    const bonusNumber = parseInt(input);

    if (bonusNumber < 1 || bonusNumber > 45 || isNaN(bonusNumber)) {
      throw new Error("[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.");
    }
    return bonusNumber;
  }
}

export default App;
