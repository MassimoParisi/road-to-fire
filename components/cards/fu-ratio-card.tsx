import { Goal } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function FuckYouRatioCard({ fuRatio }: { fuRatio: number }) {
  return (
    <Card className="grow w-60 min-w-[15rem] whitespace-nowrap">
      <CardHeader>
        <CardDescription className="flex justify-between items-center gap-5">
          <div>Fuck You Ratio</div>
          <Goal />
        </CardDescription>
        <CardTitle
          className={`${fuRatio > 100 ? "text-green-500" : "text-red-500"}`}
        >
          {fuRatio.toFixed(1)} %
        </CardTitle>
      </CardHeader>
    </Card>
  );
}
