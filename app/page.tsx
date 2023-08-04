"use client";

import { Phase, PhaseCard } from "@/components/phase-card";
import SavingsChart from "@/components/savings-chart";
import { SavingsTable } from "@/components/savings-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Snapshot, fire } from "@/lib/fire";
import { useState } from "react";

export default function Home() {
  const [initialValue, setInitialValue] = useState("0");
  const [interest, setInterest] = useState("4.5");
  const [phases, setPhases] = useState<Phase[]>([{ amount: 500, years: 30 }]);
  const [ter, setTer] = useState("0.22");
  const [monthlyGoal, setMonthlyGoal] = useState("1500");
  const [swr, setSwr] = useState("3");

  const fuMoney = Math.round(
    parseFloat(monthlyGoal) * 12 * (100 / parseFloat(swr))
  );

  const [errors, setErrors] = useState({
    initialValue: false,
    interest: false,
    ter: false,
    monthlyGoal: false,
    swr: false,
  });

  const [data, setData] = useState<Snapshot[]>(
    fire({
      initialValue: parseFloat(initialValue),
      interest: parseFloat(interest),
      ter: parseFloat(ter),
      fuMoney: fuMoney,
      phases: phases,
    })
  );

  const finalPrincipal = data[data.length - 1].principal;
  const finalNetWorth = data[data.length - 1].net_worth;
  const finalFuRatio = (finalNetWorth * 100) / fuMoney;

  const handlePhaseChange = (index: number, updatedPhase: Phase) => {
    const updatedPhases = [...phases];
    updatedPhases[index] = updatedPhase;
    setPhases(updatedPhases);
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className="text-5xl">Road To F.I.R.E. 🔥</h1>
      <div className="bg-secondary w-full p-5 rounded-xl flex flex-col justify-between gap-5">
        <div className="flex gap-10">
          <div className="flex w-full gap-5 whitespace-nowrap justify-center">
            <div className="flex w-full flex-col gap-1.5">
              <Label htmlFor="initial-nw">Initial Investment (EUR)</Label>
              <Input
                type="text"
                id="initial-nw"
                placeholder="0"
                className={`rounded ${
                  errors.initialValue && "border border-red-500"
                }`}
                value={initialValue}
                onChange={(e) => {
                  setInitialValue(e.target.value);
                  if (isFloat(e.target.value)) {
                    setErrors({ ...errors, initialValue: false });
                  } else {
                    setErrors({ ...errors, initialValue: true });
                  }
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-1.5">
              <Label htmlFor="annual return">Annual return (%)</Label>
              <Input
                type="text"
                id="annual-return"
                placeholder="4.5"
                className={`rounded ${
                  errors.interest && "border border-red-500"
                }`}
                value={interest}
                onChange={(e) => {
                  setInterest(e.target.value);
                  if (isFloat(e.target.value)) {
                    setErrors({ ...errors, interest: false });
                  } else {
                    setErrors({ ...errors, interest: true });
                  }
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-1.5">
              <Label htmlFor="initial-nw">TER (%)</Label>
              <Input
                type="text"
                id="initial-nw"
                placeholder="0"
                className={`rounded ${errors.ter && "border border-red-500"}`}
                value={ter}
                onChange={(e) => {
                  setTer(e.target.value);
                  if (isFloat(e.target.value)) {
                    setErrors({ ...errors, ter: false });
                  } else {
                    setErrors({ ...errors, ter: true });
                  }
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-1.5">
              <Label htmlFor="initial-nw">Monthly Goal (EUR)</Label>
              <Input
                type="text"
                id="initial-nw"
                placeholder="0"
                className={`rounded ${
                  errors.monthlyGoal && "border border-red-500"
                }`}
                value={monthlyGoal}
                onChange={(e) => {
                  setMonthlyGoal(e.target.value);
                  if (isFloat(e.target.value)) {
                    setErrors({ ...errors, monthlyGoal: false });
                  } else {
                    setErrors({ ...errors, monthlyGoal: true });
                  }
                }}
              />
            </div>
            <div className="flex w-full flex-col gap-1.5">
              <Label htmlFor="initial-nw">SWR (%)</Label>
              <Input
                type="text"
                id="swr"
                placeholder="3"
                className={`rounded ${errors.swr && "border border-red-500"}`}
                value={swr}
                onChange={(e) => {
                  setSwr(e.target.value);
                  if (isFloat(e.target.value)) {
                    setErrors({ ...errors, swr: false });
                  } else {
                    setErrors({ ...errors, swr: true });
                  }
                }}
              />
            </div>
          </div>
        </div>
        <div className="relative border border-background bg-background rounded-xl">
          <div className="flex gap-3 items-center scrollbar-hide overflow-x-scroll px-6 py-5">
            {phases.map((phase, i) => (
              <PhaseCard
                key={i}
                {...phase}
                onChange={(updatedPhase: Phase) =>
                  handlePhaseChange(i, updatedPhase)
                }
              />
            ))}

            <Button
              className="h-16 w-16 text-md rounded-xl font-semibold"
              onClick={() => {
                setPhases([...phases, { amount: 500, years: 10 }]);
              }}
            >
              Add
            </Button>
          </div>
          <div className="absolute left-0 top-0 rounded-xl h-full w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 rounded-xl h-full w-16 bg-gradient-to-l from-background to-transparent" />
        </div>
        <Button
          className="px-6 py-3 rounded-xl bg-green-700 hover:bg-green-800 text-white"
          onClick={() => {
            if (
              !isFloat(initialValue) ||
              !isFloat(interest) ||
              !isFloat(ter) ||
              !isFloat(monthlyGoal)
            ) {
              return;
            }
            setData(() =>
              fire({
                initialValue: parseFloat(initialValue),
                interest: parseFloat(interest),
                ter: parseFloat(ter),
                fuMoney: fuMoney,
                phases: phases,
              })
            );
          }}
        >
          Submit
        </Button>
      </div>
      {data.length > 0 ? (
        <Tabs defaultValue="visual" className="w-full">
          <TabsList className="w-min flex gap-2 rounded-xl">
            <TabsTrigger value="visual" className="rounded-xl">
              Visual
            </TabsTrigger>
            <TabsTrigger value="table" className="rounded-xl">
              Table
            </TabsTrigger>
          </TabsList>
          <TabsContent value="visual">
            <div className="flex flex-col gap-3 pt-10">
              <div className="flex gap-3 px-40">
                <Card className="grow">
                  <CardHeader>
                    <CardDescription>Principal</CardDescription>
                    <CardTitle>
                      {Intl.NumberFormat().format(finalPrincipal)} €
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card className="grow">
                  <CardHeader>
                    <CardDescription>Net Worth</CardDescription>
                    <CardTitle
                      className={`${
                        finalFuRatio < 30
                          ? "text-green-300"
                          : finalFuRatio < 60
                          ? "text-green-400"
                          : "text-green-500"
                      }`}
                    >
                      {Intl.NumberFormat().format(finalNetWorth)} €
                    </CardTitle>
                  </CardHeader>
                </Card>
                <Card className="grow">
                  <CardHeader>
                    <CardDescription>Fuck You Ratio</CardDescription>
                    <CardTitle
                      className={`${
                        finalFuRatio > 100 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {finalFuRatio.toFixed(1)} %
                    </CardTitle>
                  </CardHeader>
                </Card>
              </div>
              <SavingsChart snapshots={data} fuMoney={fuMoney} />
            </div>
          </TabsContent>
          <TabsContent value="table" className="pt-10">
            <SavingsTable snapshots={data} />
          </TabsContent>
        </Tabs>
      ) : null}
    </main>
  );
}

function isFloat(value: string): boolean {
  const floatRegex = /^\d+(\.\d+)?$/;
  return floatRegex.test(value);
}
