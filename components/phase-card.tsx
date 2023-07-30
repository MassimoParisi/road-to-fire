import { ChangeEventHandler, MutableRefObject, useRef } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export interface Phase {
  amount: number;
  years: number;
}

export function PhaseCard({
  amount,
  years,
  onChange,
}: {
  amount: number;
  years: number;
  onChange: (updatedPhase: Phase) => void;
}) {
  const amountRef = useRef() as MutableRefObject<HTMLInputElement>;
  const yearsRef = useRef() as MutableRefObject<HTMLInputElement>;

  const handleChange = () => {
    onChange({
      amount: parseInt(amountRef.current.value),
      years: parseInt(yearsRef.current.value),
    });
  };

  return (
    <div className="h-full bg-secondary p-4 w-52 rounded-xl">
      <div className="flex flex-col gap-5 whitespace-nowrap">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="initial-nw">Monthly Savings (€)</Label>
          <Input
            type="number"
            ref={amountRef}
            id="initial-nw"
            placeholder="1000"
            value={amount}
            onChange={handleChange}
            className="rounded"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="annual return"># of Years</Label>
          <Input
            type="number"
            ref={yearsRef}
            id="annual-return"
            min={1}
            step={1}
            placeholder="10"
            value={years}
            onChange={handleChange}
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
}
