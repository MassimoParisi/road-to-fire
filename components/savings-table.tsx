import { Snapshot } from "@/lib/fire";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

export function SavingsTable({ snapshots }: { snapshots: Snapshot[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Year</TableHead>
          <TableHead className="text-right">Principal</TableHead>
          <TableHead className="text-right">Net Worth</TableHead>
          <TableHead className="text-right">Interest</TableHead>
          <TableHead className="text-right">FU %</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {snapshots.map((snap) => (
          <TableRow key={snap.year}>
            <TableCell className="font-medium">{snap.year}</TableCell>
            <TableCell className="text-right">
              {Intl.NumberFormat().format(snap.principal)} €
            </TableCell>
            <TableCell className="text-right">
              {Intl.NumberFormat().format(snap.net_worth)} €
            </TableCell>
            <TableCell className="text-right">
              +{((snap.net_worth * 100) / snap.principal - 100).toFixed(1)}%
            </TableCell>
            <TableCell className="text-right">{snap.fu_ratio}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
