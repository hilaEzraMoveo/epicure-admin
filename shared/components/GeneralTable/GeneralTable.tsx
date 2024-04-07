// components/GeneralTable.tsx

import React from "react";
import styles from "./GeneralTable.module.css";

interface Column {
  columnDef: string;
  header: string;
  cell?: (row: any) => React.ReactNode;
}

interface Props {
  data: any[];
  columns: Column[];
}

const GeneralTable: React.FC<Props> = ({ data, columns }) => {
  return (
    <div className={styles["table-container"]}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.columnDef}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => {
                if (column.cell && column.columnDef !== "image") {
                  return <td key={column.columnDef}>{column.cell(row)}</td>;
                } else if (column.columnDef === "image") {
                  return (
                    <td key={column.columnDef}>
                      <img src={row[column.columnDef]} alt="Image" />
                    </td>
                  );
                } else {
                  return (
                    <td key={column.columnDef}>{row[column.columnDef]}</td>
                  );
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralTable;
