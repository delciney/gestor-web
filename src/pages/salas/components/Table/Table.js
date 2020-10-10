import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@material-ui/core";

// components
import { Button } from "../../../../components/Wrappers";

const states = {
  sent: "success",
  pending: "warning",
  declined: "secondary",
};
const statesB = {
  sent: "Disponível",
  pending: "Reservada",
  declined: "secondary",
};

export default function TableComponent({ data }) {
  var keys = Object.keys(data[0]).map((i) => i.toUpperCase());
  keys.shift(); // delete "id" key

  return (
      <div style={{ overflowX: "auto"}}>
    <Table className="mb-0">
      <TableHead>
        <TableRow>
          {keys.map((key) => (
            <TableCell key={key}>{key}</TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map(
          ({ id, sala, equipamentos, inicio, encerramento, status }) => (
            <TableRow key={id}>
              <TableCell className="pl-3 fw-normal">{sala}</TableCell>
              <TableCell>{equipamentos}</TableCell>
              <TableCell>{inicio}</TableCell>
              <TableCell>{encerramento}</TableCell>
              <TableCell>
                <Button
                  color={states[status.toLowerCase()]}
                  size="small"
                  className="px-2"
                  variant="contained"
                >
                  {statesB[status.toLowerCase()]}
                </Button>
              </TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
    </div>
  );
}
