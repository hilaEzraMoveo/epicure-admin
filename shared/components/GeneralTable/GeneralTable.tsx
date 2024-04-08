import React from "react";
import styles from "./GeneralTable.module.css";
import ActionButton from "../ActionButton/ActionButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

interface Column {
  columnDef: string;
  header: string;
  cell?: (row: any) => React.ReactNode;
}

interface Props {
  data: any[];
  columns: Column[];
  onEdit?: (rowData: any) => void;
  onDelete?: (rowData: any) => void;
}

const GeneralTable: React.FC<Props> = ({ data, columns, onEdit, onDelete }) => {
  const renderActionsColumn = (row: any) => {
    return (
      <td>
        {row.status === "active" && onEdit && (
          <ActionButton
            label="Edit"
            icon={<EditIcon />}
            onClick={() => onEdit(row)}
          />
        )}
        {row.status === "active" && onDelete && (
          <ActionButton
            label="Delete"
            icon={<DeleteIcon />}
            onClick={() => onDelete(row)}
          />
        )}
      </td>
    );
  };

  return (
    <div className={styles["table-container"]}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.columnDef}>{column.header}</th>
            ))}
            <th>Actions</th>
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
              {renderActionsColumn(row)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralTable;
