import { Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";
import PrizeChecker from "./PrizeChecker.js";

class App {
  async run() {
    try {
      const purchaseAmount = await this.getPurchaseAmount();
      const lottoCount = purchaseAmount / 1000;
      const lottos = this.generateLottos(lottoCount);

      this.printLottoPurchaseDetails(lottoCount, lottos);

      const winningNumbers = await this.getWinningNumbers();
      const bonusNumber = await this.getBonusNumber();

      this.printResultsAndRevenueRate(purchaseAmount, lottos, winningNumbers, bonusNumber);
    } catch (error) {
      Console.print(error.message);
    }
  }

  async getUserInput(message) {
    const input = await Console.readLineAsync(message);
    return input.trim();
  }

  async getPurchaseAmount() {
    const input = await this.getUserInput(`구입 금액을 입력해주세요.\n`);
    const amount = parseInt(input);
    this.validatePurchaseAmount(amount);
    return amount;
  }

  validatePurchaseAmount(amount) {
    if (isNaN(amount) || amount % 1000 !== 0) {
      throw new Error("[ERROR] 천 원 단위로 입력해야 합니다.");
    }
  }

  generateLottos(lottoCount) {
    return Array.from({ length: lottoCount }, () => Lotto.generateRandomLotto());
  }

  async getWinningNumbers() {
    const input = await this.getUserInput("당첨 번호를 입력해주세요. 번호는 쉼표(,)로 구분됩니다.\n");
    const numbers = input.split(",").map(num => parseInt(num.trim()));
    const winningLotto = Lotto.validateWinningNumbers(numbers);
    return winningLotto.getNumbers();
  }

  async getBonusNumber() {
    const input = await this.getUserInput("보너스 번호를 입력해주세요.\n");
    const bonusNumber = parseInt(input);
    Lotto.validateBonusNumber(bonusNumber);
    return bonusNumber;
  }

  printLottoPurchaseDetails(lottoCount, lottos) {
    Console.print(`${lottoCount}개를 구매했습니다.`);
    lottos.forEach(lotto => Console.print(`[${lotto.getNumbers().join(", ")}]`));
  }  

  printResultsAndRevenueRate(purchaseAmount, lottos, winningNumbers, bonusNumber) {
    const result = PrizeChecker.checkResults(lottos, winningNumbers, bonusNumber);
    this.printResultDetails(result);
    const revenueRate = PrizeChecker.calculateRevenueRate(purchaseAmount, result);
    Console.print(`총 수익률은 ${revenueRate}%입니다.`);
  }

  printResultDetails(result) {
    Console.print(`3개 일치 (5,000원) - ${result['3개 일치']}개`);
    Console.print(`4개 일치 (50,000원) - ${result['4개 일치']}개`);
    Console.print(`5개 일치 (1,500,000원) - ${result['5개 일치']}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${result['5개 일치 (보너스 볼 일치)']}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${result['6개 일치']}개`);
  }
}

export default App;