import React, { useCallback, useMemo } from "react";
// import { CityTemperature } from "@visx/mock-data/lib/mocks/cityTemperature";

// import ExampleControls from "./ExampleControls";
// import CustomChartBackground from "./CustomChartBackground";
import { Snapshot } from "@/lib/fire";

import { format, parseISO } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

export default function SavingsTable({
  snapshots,
  fuMoney,
}: {
  snapshots: Snapshot[];
  fuMoney: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <AreaChart
        // width={500}
        // height={250}
        data={snapshots}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorNetWorth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="year"
          // type="number"
          // angle={-90}
          axisLine={false}
          tickLine={false}
          tickFormatter={(year) => new Date().getFullYear() + year}
        />
        <YAxis
          dataKey="net_worth"
          axisLine={false}
          tickLine={false}
          tickCount={8}
          tickFormatter={(money: number) => {
            if (money >= 1000000) {
              return `€ ${(money / 1000000).toFixed(1)}M`;
            }
            if (money >= 1000) {
              return `€ ${(money / 1000).toFixed(0)}k`;
            }
            return `€ ${money.toFixed(0)}`;
          }}
        />
        <CartesianGrid strokeOpacity={0.2} />
        <ReferenceLine y={fuMoney} label="FU Money" stroke="red" />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="principal"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorPrincipal)"
        />
        <Area
          type="monotone"
          dataKey="net_worth"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorNetWorth)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className="bg-secondary p-2 rounded">
        <h3 className="label font-bold">{`${
          new Date().getFullYear() + label
        }`}</h3>
        <p className="flex gap-1 justify-between">
          <span>Principal:</span>
          <span>
            {Intl.NumberFormat().format(payload?.[0].value as number)} €
          </span>
        </p>
        <p className="flex gap-3 justify-between">
          <span>Net Worth:</span>
          <span>
            {Intl.NumberFormat().format(payload?.[1].value as number)} €
          </span>
        </p>
      </div>
    );
  }

  return null;
};

function formatToCurrency(amount: number) {
  return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
