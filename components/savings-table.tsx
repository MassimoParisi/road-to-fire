import { Snapshot, formatMoney } from "@/lib/fire";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function SavingsTable({ snapshots }: { snapshots: Snapshot[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="tracking-wide rounded-sm">
          <TableHead>Year</TableHead>
          <TableHead className="text-right">Principal</TableHead>
          <TableHead className="text-right">Net Worth</TableHead>
          <TableHead className="text-right">Interest</TableHead>
          <TableHead className="text-right">FU %</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {snapshots.map((snap, i) => {
          let interest: number | string =
            (snap.net_worth * 100) / snap.principal - 100;
          if (isNaN(interest)) {
            interest = 0;
          }
          if (interest >= 0) {
            interest = `+${interest.toFixed(1)}%`;
          } else {
            interest = `${interest.toFixed(1)}%`;
          }

          const isFire = snap.fu_ratio >= 100;
          const isFirstFire = isFire && snapshots[i - 1].fu_ratio < 100;

          return (
            <TableRow
              key={snap.year}
              className={`${
                isFirstFire
                  ? `text-green-500 font-bold text-lg bg-gradient-to-r from-blue-900/20 to-purple-900/20`
                  : isFire
                  ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20"
                  : ""
              }`}
            >
              <TableCell className="font-medium">{snap.year}</TableCell>
              <TableCell className="text-right">
                {formatMoney(snap.principal)}
              </TableCell>
              <TableCell className="text-right">
                {formatMoney(snap.net_worth)}
              </TableCell>
              <TableCell className="text-right">{interest}</TableCell>
              <TableCell className={`text-right`}>
                {isFirstFire ? `🎉 ` : ""} {snap.fu_ratio}%
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
