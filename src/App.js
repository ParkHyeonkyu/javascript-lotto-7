import { Console } from "@woowacourse/mission-utils";
import Lotto from "./Lotto.js";

class App {
  async run() {
    try {
      const purchaseAmount = await this.getPurchaseAmount();
      const lottoCount = purchaseAmount / 1000;
      const lottos = this.generateLottos(lottoCount);

      this.printLottoPurchaseDetails(lottoCount, lottos);

      const winningNumbers = await this.getWinningNumbers();
      const bonusNumber = await this.getBonusNumber();

      this.printResultsAndRevenueRate(lottos, winningNumbers, bonusNumber, purchaseAmount);
    } catch (error) {
      Console.print(error.message);
    }
  }

  async getPurchaseAmount() {
    const input = await Console.readLineAsync(`구입 금액을 입력해주세요.\n`);
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

  printLottoPurchaseDetails(lottoCount, lottos) {
    Console.print(`${lottoCount}개를 구매했습니다.`);
    lottos.forEach(lotto => Console.print(lotto.getNumbers()));
  }

  async getWinningNumbers() {
    const input = await Console.readLineAsync("당첨 번호를 입력해주세요. 번호는 쉼표(,)로 구분됩니다.\n");
    const numbers = input.split(",").map(num => parseInt(num.trim()));

    this.validateWinningNumbers(numbers);

    return numbers.sort((a, b) => a - b);
  }

  validateWinningNumbers(numbers) {
    if (numbers.length !== 6 || numbers.some(num => num < 1 || num > 45 || isNaN(num))) {
      throw new Error("[ERROR] 당첨 번호는 1부터 45 사이의 숫자 6개여야 합니다.\n");
    }
  }

  async getBonusNumber() {
    const input = await Console.readLineAsync("보너스 번호를 입력해주세요.\n");
    const bonusNumber = parseInt(input);

    this.validateBonusNumber(bonusNumber);

    return bonusNumber;
  }

  validateBonusNumber(bonusNumber) {
    if (bonusNumber < 1 || bonusNumber > 45 || isNaN(bonusNumber)) {
      throw new Error("[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.");
    }
  }

  calculateResult(lottos, winningNumbers, bonusNumber) {
    const result = {
      '6개 일치': 0,
      '5개 일치 (보너스 볼 일치)': 0,
      '5개 일치': 0,
      '4개 일치': 0,
      '3개 일치': 0
    };

    lottos.forEach(lotto => {
      const matchingNumbers = this.getMatchingCount(lotto.getNumbers(), winningNumbers);
      this.updateResult(result, matchingNumbers, lotto.getNumbers(), bonusNumber);
    });

    return result;
  }

  updateResult(result, matchingNumbers, lottoNumbers, bonusNumber) {
    if (matchingNumbers === 6) result['6개 일치']++;
    if (matchingNumbers === 5 && lottoNumbers.includes(bonusNumber)) result['5개 일치 (보너스 볼 일치)']++;
    if (matchingNumbers === 5) result['5개 일치']++;
    if (matchingNumbers === 4) result['4개 일치']++;
    if (matchingNumbers === 3) result['3개 일치']++;
  }

  getMatchingCount(lottoNumbers, winningNumbers) {
    return lottoNumbers.filter(number => winningNumbers.includes(number)).length;
  }

  printResultsAndRevenueRate(lottos, winningNumbers, bonusNumber, purchaseAmount) {
    const result = this.calculateResult(lottos, winningNumbers, bonusNumber);
    this.printResultDetails(result);

    const revenueRate = this.calculateRevenueRate(purchaseAmount, result);
    Console.print(`총 수익률은 ${revenueRate}%입니다.`);
  }

  printResultDetails(result) {
    Console.print(`3개 일치 (5,000원) - ${result['3개 일치']}개`);
    Console.print(`4개 일치 (50,000원) - ${result['4개 일치']}개`);
    Console.print(`5개 일치 (1,500,000원) - ${result['5개 일치']}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${result['5개 일치 (보너스 볼 일치)']}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${result['6개 일치']}개`);
  }

  calculateRevenueRate(purchaseAmount, result) {
    const totalPrizeMoney = this.calculateTotalPrizeMoney(result);
    const revenueRate = (totalPrizeMoney / purchaseAmount) * 100;

    return revenueRate.toFixed(1);
  }

  calculateTotalPrizeMoney(result) {
    const prizeMoney = {
      '3개 일치': 5000,
      '4개 일치': 50000,
      '5개 일치': 1500000,
      '5개 일치 (보너스 볼 일치)': 30000000,
      '6개 일치': 2000000000
    };

    return Object.entries(result).reduce((total, [key, value]) => total + value * prizeMoney[key], 0);
  }
}

export default App;