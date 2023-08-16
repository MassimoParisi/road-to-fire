"use client";

import { FuckYouRatioCard } from "@/components/cards/fu-ratio-card";
import { NetWorthCard } from "@/components/cards/net-worth-card";
import { PrincipalCard } from "@/components/cards/principal-card";
import { Phase, PhaseCard } from "@/components/phase-card";
import SavingsChart from "@/components/savings-chart";
import { SavingsTable } from "@/components/savings-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Snapshot, fire } from "@/lib/fire";
import { LayoutGroup, motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import Balancer from "react-wrap-balancer";

export default function Home() {
  const [initialValue, setInitialValue] = useState("0");
  const [interest, setInterest] = useState("4.5");
  const [phases, setPhases] = useState<Phase[]>([
    { id: crypto.randomUUID(), amount: 500, years: 30 },
  ]);
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

  const handlePhaseDelete = (index: number) => {
    if (phases.length > 1) {
      setPhases(phases.slice(0, index).concat(phases.slice(index + 1)));
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-3 md:p-24">
      <Balancer className="sm:text-5xl text-4xl text-center">
        Road To F.I.R.E. 🔥
      </Balancer>
      <div className="bg-secondary w-full p-5 rounded-xl flex flex-col justify-between gap-5">
        <div className="flex gap-10">
          <div className="flex flex-wrap w-full gap-5 whitespace-nowrap justify-center">
            <div className="flex grow flex-col gap-1.5">
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
            <div className="flex grow flex-col gap-1.5">
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
            <div className="flex grow flex-col gap-1.5">
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
            <div className="flex grow flex-col gap-1.5">
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
            <div className="flex grow flex-col gap-1.5">
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
          <div className="flex flex-col sm:flex-row sm:flex-nowrap gap-3 items-center scrollbar-hide h-[20rem] sm:h-auto overflow-y-scroll sm:overflow-x-scroll px-6 py-5">
            {phases.map((phase, i) => (
              <PhaseCard
                key={phase.id}
                {...phase}
                onlyOne={phases.length == 1}
                onChange={(updatedPhase: Phase) =>
                  handlePhaseChange(i, updatedPhase)
                }
                onDelete={() => handlePhaseDelete(i)}
                index={i}
              />
            ))}

            <motion.button
              layout
              onClick={() => {
                const newPhase = {
                  id: crypto.randomUUID(),
                  amount: 500,
                  years: 10,
                };
                setPhases([...phases, newPhase]);
              }}
            >
              <PlusCircle className="bg-white stroke-background w-12 h-12 p-0.5 rounded-full" />
            </motion.button>
          </div>
          <div className="absolute pointer-events-none sm:left-0 top-0 h-8 w-full rounded-xl sm:h-full sm:w-16 sm:bg-gradient-to-r bg-gradient-to-b from-background to-transparent" />
          <div className="absolute pointer-events-none sm:right-0 sm:top-0 bottom-0 w-full h-8 rounded-xl sm:h-full sm:w-16 sm:bg-gradient-to-l bg-gradient-to-t from-background to-transparent" />
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
      <div className="flex flex-wrap gap-3 px-10 justify-center w-full">
        <PrincipalCard principal={finalPrincipal} />
        <NetWorthCard netWorth={finalNetWorth} fuRatio={finalFuRatio} />
        <FuckYouRatioCard fuRatio={finalFuRatio} />
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
              {/* <div className="flex flex-wrap gap-3 px-10 justify-center">
                <PrincipalCard principal={finalPrincipal} />
                <NetWorthCard netWorth={finalNetWorth} fuRatio={finalFuRatio} />
                <FuckYouRatioCard fuRatio={finalFuRatio} />
              </div> */}
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
