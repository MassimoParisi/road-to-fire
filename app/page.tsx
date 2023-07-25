"use client";

import { PhaseCard } from "@/components/phase-card";
import SavingsChart from "@/components/savings-chart";
import { SavingsTable } from "@/components/savings-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Snapshot, fire } from "@/lib/fire";
import { ScrollAreaThumb } from "@radix-ui/react-scroll-area";
import { useState } from "react";

export default function Home() {
  const [initialValue, setInitialValue] = useState<string>("0");
  const [interest, setInterest] = useState("4.5");
  const [phases, setPhases] = useState([{ amount: 500, years: 30 }]);
  const [ter, setTer] = useState("0.22");
  const [monthlyGoal, setMonthlyGoal] = useState("1500");

  const [errors, setErrors] = useState({
    initialValue: false,
    interest: false,
    ter: false,
    monthlyGoal: false,
  });

  const [data, setData] = useState<Snapshot[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className="text-5xl">Road To F.I.R.E.</h1>
      <div className="bg-secondary w-full p-5 rounded-xl flex flex-col justify-between gap-5">
        <div className="flex gap-10">
          <div className="flex flex-col w-full gap-5 whitespace-nowrap justify-center">
            <div className="flex flex-col gap-1.5">
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
            <div className="flex flex-col gap-1.5">
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
          </div>
          <div className="flex flex-col w-full gap-5 whitespace-nowrap justify-center">
            <div className="flex flex-col gap-1.5">
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
            <div className="flex flex-col gap-1.5">
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
          </div>
        </div>
        {/* <ScrollArea className="border bg-background p-5 rounded-xl">
          <div className="flex gap-3 items-center py-5">
            <div className="px-5">
              {phases.map((phase, i) => (
                <PhaseCard key={i} {...phase} />
              ))}
            </div>
            <Button
              className="h-16 w-16 text-md rounded-xl font-semibold"
              onClick={() => {
                setPhases([...phases, { amount: 500, years: 10 }]);
              }}
            >
              Add
            </Button>
          </div>
          <ScrollBar orientation="horizontal" asChild>
            <ScrollAreaThumb asChild>X</ScrollAreaThumb>
          </ScrollBar>
        </ScrollArea> */}
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
                monthlyGoal: parseFloat(monthlyGoal),
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
            <SavingsChart snapshots={data} />
          </TabsContent>
          <TabsContent value="table">
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
