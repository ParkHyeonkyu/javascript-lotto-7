//수익률 계산
class PrizeChecker {
    static checkResults(lottos, winningNumbers, bonusNumber) {
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
  
    static getMatchingCount(lottoNumbers, winningNumbers) {
      return lottoNumbers.filter(number => winningNumbers.includes(number)).length;
    }
  
    static updateResult(result, matchingNumbers, lottoNumbers, bonusNumber) {
      if (matchingNumbers === 6) result['6개 일치']++;
      if (matchingNumbers === 5 && lottoNumbers.includes(bonusNumber)) {
        result['5개 일치 (보너스 볼 일치)']++;
      }
      if (matchingNumbers === 5) result['5개 일치']++;
      if (matchingNumbers === 4) result['4개 일치']++;
      if (matchingNumbers === 3) result['3개 일치']++;
    }
  
    static calculateRevenueRate(purchaseAmount, result) {
      const totalPrizeMoney = this.calculateTotalPrizeMoney(result);
      return ((totalPrizeMoney / purchaseAmount) * 100).toFixed(1);
    }
  
    static calculateTotalPrizeMoney(result) {
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
  
  export default PrizeChecker;