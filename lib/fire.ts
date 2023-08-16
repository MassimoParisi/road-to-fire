import { Phase } from "@/components/phase-card";

export interface Snapshot {
  net_worth: number;
  principal: number;
  year: number;
  fu_ratio: number;
}

export function fire({
  initialValue,
  interest,
  fuMoney,
  ter,
  phases,
}: {
  initialValue: number;
  interest: number;
  fuMoney: number;
  ter: number;
  phases: Phase[];
}) {
  const yearlyInterestRate = (interest - ter) / 100;
  const monthlyInterestRate = yearlyInterestRate / 12;
  const initialNetWorth = initialValue;

  let net_worth = initialNetWorth;
  let principal = initialNetWorth;
  let year = 1;
  let data: Snapshot[] = [
    {
      net_worth: net_worth,
      principal: principal,
      year: 0,
      fu_ratio: Math.round((net_worth * 100) / fuMoney),
    },
  ];
  for (const phase of phases) {
    const { amount, years } = phase;
    for (let i = 0; i < years; i++) {
      for (let j = 0; j < 12; j++) {
        net_worth = (net_worth + amount) * (1 + monthlyInterestRate);
        principal += amount;
        // console.log(net_worth);
      }
      data.push({
        net_worth: Math.round(net_worth),
        principal: Math.round(principal),
        year,
        fu_ratio: Math.round((net_worth * 100) / fuMoney),
      });
      year += 1;
    }
  }
  return data;
}

export function formatMoney(money: number) {
  if (money >= 1000000000) {
    return `${(money / 1000000000).toFixed(1)}B €`;
  }
  if (money >= 1000000) {
    return `${(money / 1000000).toFixed(1)}M €`;
  }
  if (money >= 1000) {
    return `${(money / 1000).toFixed(0)}k €`;
  }
  return `${money.toFixed(0)} €`;
}
