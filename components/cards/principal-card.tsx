import { PiggyBank } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export function PrincipalCard({ principal }: { principal: number }) {
  return (
    <Card className="grow w-60 min-w-[15rem] whitespace-nowrap gap-5">
      <CardHeader>
        <CardDescription className="flex justify-between items-center gap-5">
          <div>Principal</div>
          <PiggyBank />
        </CardDescription>
        <CardTitle>{Intl.NumberFormat().format(principal)} €</CardTitle>
      </CardHeader>
    </Card>
  );
}
