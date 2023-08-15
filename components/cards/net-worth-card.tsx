import { BarChart4 } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function NetWorthCard({
  netWorth,
  fuRatio,
}: {
  netWorth: number;
  fuRatio: number;
}) {
  return (
    <Card className="grow w-60 min-w-[15rem] whitespace-nowrap">
      <CardHeader>
        <CardDescription className="flex justify-between items-center gap-5">
          <div>Net Worth</div>
          <BarChart4 />
        </CardDescription>
        <CardTitle
          className={`${
            fuRatio < 30
              ? "text-green-300"
              : fuRatio < 60
              ? "text-green-400"
              : "text-green-500"
          }`}
        >
          {Intl.NumberFormat().format(netWorth)} €
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
