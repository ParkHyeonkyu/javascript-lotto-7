import { Console, Random } from "@woowacourse/mission-utils"
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
      const numbers = Random.pickUniqueNumbersInRange(1,45,6);
      lottos.push(new Lotto(numbers));
    }
    return lottos;
  }
}

export default App;
