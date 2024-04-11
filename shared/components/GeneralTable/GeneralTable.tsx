// import React from "react";
// import styles from "./GeneralTable.module.css";
// import ActionButton from "../ActionButton/ActionButton";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import resources, { Status } from "@/resources/resources";
// interface Column {
//   columnDef: string;
//   header: string;
//   cell?: (row: any) => React.ReactNode;
// }

// interface Props {
//   data: any[];
//   columns: Column[];
//   onEdit?: (rowData: any) => void;
//   onDelete?: (rowData: any) => void;
// }

// const GeneralTable: React.FC<Props> = ({ data, columns, onEdit, onDelete }) => {
//   const renderActionsColumn = (row: any) => {
//     return (
//       <td>
//         {row.status === Status.ACTIVE && onEdit && (
//           <ActionButton
//             label={resources.edit}
//             icon={<EditIcon />}
//             onClick={() => onEdit(row)}
//           />
//         )}
//         {row.status === Status.ACTIVE && onDelete && (
//           <ActionButton
//             label={resources.delete}
//             icon={<DeleteIcon />}
//             onClick={() => onDelete(row)}
//           />
//         )}
//       </td>
//     );
//   };

//   return (
//     <div className={styles["table-container"]}>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             {columns.map((column) => (
//               <th key={column.columnDef}>{column.header}</th>
//             ))}
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex}>
//               {columns.map((column) => {
//                 if (column.cell && column.columnDef !== "image") {
//                   return <td key={column.columnDef}>{column.cell(row)}</td>;
//                 } else if (column.columnDef === "image") {
//                   return (
//                     <td key={column.columnDef}>
//                       <img src={row[column.columnDef]} alt="Image" />
//                     </td>
//                   );
//                 } else {
//                   return (
//                     <td key={column.columnDef}>{row[column.columnDef]}</td>
//                   );
//                 }
//               })}
//               {renderActionsColumn(row)}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GeneralTable;

import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import resources, { Status } from "@/resources/resources";
import { TableContainer } from "./GeneralTable.style";

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
      <TableCell>
        {row.status === Status.ACTIVE && onEdit && (
          <Tooltip title={resources.edit} placement="top">
            <IconButton aria-label={resources.edit} onClick={() => onEdit(row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        )}
        {row.status === Status.ACTIVE && onDelete && (
          <Tooltip title={resources.delete} placement="top">
            <IconButton
              aria-label={resources.delete}
              onClick={() => onDelete(row)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    );
  };

  return (
    <div>
      <TableContainer>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.columnDef}>{column.header}</TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell key={column.columnDef}>
                  {column.columnDef === "image" ? (
                    <img
                      src={row[column.columnDef]}
                      alt="Image"
                      style={{ maxWidth: "100px", maxHeight: "100px" }}
                    />
                  ) : column.cell ? (
                    column.cell(row)
                  ) : (
                    row[column.columnDef]
                  )}
                </TableCell>
              ))}
              {renderActionsColumn(row)}
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </div>
  );
};

export default GeneralTable;
