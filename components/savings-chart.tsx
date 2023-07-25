import React, { useCallback, useMemo } from "react";
// import { CityTemperature } from "@visx/mock-data/lib/mocks/cityTemperature";

// import ExampleControls from "./ExampleControls";
// import CustomChartBackground from "./CustomChartBackground";
import { Snapshot } from "@/lib/fire";
import { AreaSeries, Grid, Tooltip, XYChart, darkTheme } from "@visx/xychart";

export type XYChartProps = {
  width: number;
  height: number;
};

const dateScaleConfig = { type: "band", paddingInner: 0.3 } as const;
const moneyScaleConfig = { type: "linear" } as const;

export default function SavingsTable({ snapshots }: { snapshots: Snapshot[] }) {
  const getPrincipal = useCallback(() => {
    snapshots.map((s) => s.principal);
  }, [snapshots]);
  const getNetWorth = useCallback(() => {
    snapshots.map((s) => s.net_worth);
  }, [snapshots]);
  const getDate = useCallback(() => {
    snapshots.map((s) => s.year);
  }, [snapshots]);

  const accessors = useMemo(
    () => ({
      x: {
        Principal: getPrincipal,
        "Net Worth": getNetWorth,
      },
      y: {
        Principal: getDate,
        "Net Worth": getDate,
      },
      date: getDate,
    }),
    [getDate, getNetWorth, getPrincipal]
  );

  const config = useMemo(
    () => ({
      x: moneyScaleConfig,
      y: dateScaleConfig,
    }),
    []
  );

  return (
    <XYChart
      theme={darkTheme}
      xScale={config.x}
      yScale={config.y}
      height={400}
      //   captureEvents={!editAnnotationLabelPosition}
      //   onPointerUp={(d) => {
      //     setAnnotationDataKey(
      //       d.key as "Principal" | "Net Worth"
      //     );
      //     setAnnotationDataIndex(d.index);
      //   }}
    >
      {/* <CustomChartBackground /> */}
      <Grid
        key={`grid-min`} // force animate on update
        rows
        columns
        // animationTrajectory="min"
        numTicks={10}
      />

      <AreaSeries
        dataKey="Principal"
        data={snapshots}
        xAccessor={accessors.x.Principal}
        yAccessor={accessors.y.Principal}
        fillOpacity={0.4}
        // curve={curve}
      />
      <AreaSeries
        dataKey="Net Worth"
        data={snapshots}
        xAccessor={accessors.x["Net Worth"]}
        yAccessor={accessors.y["Net Worth"]}
        fillOpacity={0.4}
        // curve={curve}
      />
    </XYChart>
  );
}
