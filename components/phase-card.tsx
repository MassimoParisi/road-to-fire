import { Trash2 } from "lucide-react";
import { MutableRefObject, useRef } from "react";
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
  onDelete,
  onlyOne,
}: {
  amount: number;
  years: number;
  onChange: (updatedPhase: Phase) => void;
  onDelete: () => void;
  onlyOne: boolean;
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
    <div className="relative group h-full bg-secondary p-4 w-52 rounded-xl">
      {!onlyOne && (
        <Trash2
          className="absolute hidden group-hover:block hover:cursor-pointer w-4 h-4 rounded-full stroke-red-500 top-3 right-3"
          onClick={onDelete}
        />
      )}
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
