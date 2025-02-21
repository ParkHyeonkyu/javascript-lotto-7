import { Console } from "@woowacourse/mission-utils"

class App {
  async run() {
    try {
      const purchaseAmount = await this.getPurchaseAmount();
      const lottoCount = purchaseAmount / 1000;

      Console.print(`${lottoCount}개를 구매했습니다.`);

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
}

export default App;
