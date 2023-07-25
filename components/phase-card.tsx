import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function PhaseCard({
  amount,
  years,
}: {
  amount: number;
  years: number;
}) {
  return (
    <div className="h-full bg-secondary p-4 w-52 rounded-xl">
      <div className="flex flex-col gap-5 whitespace-nowrap">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="initial-nw">Monthly Savings (€)</Label>
          <Input
            type="number"
            id="initial-nw"
            placeholder="1000"
            className="rounded"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="annual return"># of Years</Label>
          <Input
            type="number"
            id="annual-return"
            min={1}
            step={1}
            placeholder="10"
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
}
