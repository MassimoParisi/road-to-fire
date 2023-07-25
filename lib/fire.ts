export interface Snapshot {
  net_worth: number;
  principal: number;
  year: number;
  fu_ratio: number;
}

export function fire({
  initialValue,
  interest,
  monthlyGoal,
  ter,
}: {
  initialValue: number;
  interest: number;
  monthlyGoal: number;
  ter: number;
}) {
  const FU_MONEY = Math.ceil((monthlyGoal * 12 * 33.3) / 1000) * 1000;

  const YEAR_INTEREST_RATE = (interest - ter) / 100;
  const MONTH_INTEREST_RATE = YEAR_INTEREST_RATE / 12;
  const INITIAL_NW = initialValue;

  console.log("we want to reach FU = ", FU_MONEY);

  const phases = [
    [1000, 5],
    [2000, 5],
    [3000, 10],
  ];

  let data: Snapshot[] = [];

  let net_worth = INITIAL_NW;
  let principal = INITIAL_NW;
  let year = 1;
  for (const phase of phases) {
    const [amount, time] = phase;
    for (let i = 0; i < time; i++) {
      for (let j = 0; j < 12; j++) {
        net_worth = (net_worth + amount) * (1 + MONTH_INTEREST_RATE);
        principal += amount;
        console.log(net_worth);
      }
      data.push({
        net_worth: Math.round(net_worth),
        principal: Math.round(principal),
        year,
        fu_ratio: Math.round((net_worth * 100) / FU_MONEY),
      });
      year += 1;
    }
  }
  return data;
}
