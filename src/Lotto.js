import { Random } from "@woowacourse/mission-utils";

class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = numbers;
  }

  #validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    this.#checkNumberRange(numbers);
    this.#checkDuplicates(numbers);
  }

  #checkNumberRange(numbers) {
    if (!numbers.every(num => num >= 1 && num <= 45)) {
      throw new Error("[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.");
    }
  }

  #checkDuplicates(numbers) {
    const uniqueNumbers = new Set(numbers);
    if (uniqueNumbers.size !== 6) {
      throw new Error("[ERROR] 로또 번호는 중복되지 않아야 합니다.");
    }
  }

  static generateRandomLotto() {
    return new Lotto(Random.pickUniqueNumbersInRange(1, 45, 6));
  }

  getNumbers() {
    return [...this.#numbers].sort((a, b) => a - b);
  }
}

export default Lotto;
