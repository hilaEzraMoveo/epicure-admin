// import React, { useState } from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import MenuItem from "@mui/material/MenuItem";

// interface Column {
//   columnDef: string;
//   header: string;
//   cell?: (row: any) => React.ReactNode;
// }

// interface Props {
//   open: boolean;
//   data: any;
//   props: Column[];
//   onClose: () => void;
//   onSubmit: (data: any) => void;
// }

// const GenericDialog: React.FC<Props> = ({
//   open,
//   data = {},
//   props,
//   onClose,
//   onSubmit,
// }) => {
//   const [selectedStatus, setSelectedStatus] = useState(data?.status || "");
//   const [selectedChefOfWeek, setSelectedChefOfWeek] = useState(
//     data?.isChefOfTheWeek || ""
//   );

//   const handleSubmit = () => {
//     data.status = selectedStatus;
//     data.isChefOfTheWeek = selectedChefOfWeek;
//     onSubmit(data);
//     onClose();
//   };

//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = event.target;
//     data[name] = value;
//   };

//   const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setSelectedStatus(event.target.value as string);
//   };

//   const handleChefOfWeekChange = (
//     event: React.ChangeEvent<{ value: unknown }>
//   ) => {
//     setSelectedChefOfWeek(event.target.value as string);
//   };

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogContent>
//         {props.map((prop) => {
//           if (prop.columnDef === "status") {
//             return (
//               <TextField
//                 key={prop.columnDef}
//                 select
//                 name={prop.columnDef}
//                 label={prop.header}
//                 value={selectedStatus}
//                 onChange={handleSelectChange}
//                 fullWidth
//                 margin="normal"
//               >
//                 <MenuItem value="active">Active</MenuItem>
//                 <MenuItem value="deleted">Deleted</MenuItem>
//               </TextField>
//             );
//           } else if (
//             prop.columnDef === "isChefOfTheWeek" ||
//             prop.columnDef === "isPopular"
//           ) {
//             return (
//               <TextField
//                 key={prop.columnDef}
//                 select
//                 name={prop.columnDef}
//                 label={prop.header}
//                 value={selectedChefOfWeek.toString()}
//                 onChange={handleChefOfWeekChange}
//                 fullWidth
//                 margin="normal"
//               >
//                 <MenuItem value="true">Yes</MenuItem>
//                 <MenuItem value="false">No</MenuItem>
//               </TextField>
//             );
//           } else {
//             return (
//               <TextField
//                 key={prop.columnDef}
//                 name={prop.columnDef}
//                 label={prop.header}
//                 value={
//                   data && (prop.cell ? prop.cell(data) : data[prop.columnDef])
//                 }
//                 onChange={handleInputChange}
//                 fullWidth
//                 margin="normal"
//               />
//             );
//           }
//         })}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSubmit}>Submit</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default GenericDialog;

import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { IChef } from "@/models/chef.model";
import { IDish } from "@/models/dish.model";

interface Column {
  columnDef: string;
  header: string;
  cell?: (row: any) => React.ReactNode;
}

interface Props {
  open: boolean;
  allData: any[];
  data: any;
  props: Column[];
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const GenericDialog: React.FC<Props> = ({
  open,
  allData,
  data = {},
  props,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    columnName: string
  ) => {
    const value = event.target.value as string;
    setFormData({ ...formData, [columnName]: value });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        {props.map((prop) => {
          if (prop.columnDef === "status") {
            return (
              <TextField
                key={prop.columnDef}
                select
                name={prop.columnDef}
                label={prop.header}
                value={(formData && formData[prop.columnDef]) || ""}
                onChange={(event) => handleSelectChange(event, prop.columnDef)}
                fullWidth
                margin="normal"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="deleted">Deleted</MenuItem>
              </TextField>
            );
          } else if (
            prop.columnDef === "isChefOfTheWeek" ||
            prop.columnDef === "isPopular"
          ) {
            return (
              <TextField
                key={prop.columnDef}
                select
                name={prop.columnDef}
                label={prop.header}
                value={(formData && formData[prop.columnDef]?.toString()) || ""}
                onChange={(event) => handleSelectChange(event, prop.columnDef)}
                fullWidth
                margin="normal"
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </TextField>
            );
          } else if (prop.columnDef === "rating") {
            return (
              <TextField
                key={prop.columnDef}
                select
                name={prop.columnDef}
                label={prop.header}
                value={(formData && formData[prop.columnDef]?.toString()) || ""}
                onChange={(event) => handleSelectChange(event, prop.columnDef)}
                fullWidth
                margin="normal"
              >
                {[1, 2, 3, 4, 5].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            );
          } else if (prop.columnDef === "chef") {
            const allChefs: IChef[] = [];
            allData.forEach((restaurant) => {
              allChefs.push(restaurant.chef);
            });

            return (
              <TextField
                key={prop.columnDef}
                select
                name={prop.columnDef}
                label={prop.header}
                value={(formData && formData[prop.columnDef]) || ""}
                onChange={(event) => handleSelectChange(event, prop.columnDef)}
                fullWidth
                margin="normal"
              >
                {allChefs.map((chef) => (
                  <MenuItem key={chef._id} value={chef._id}>
                    {chef.title}
                  </MenuItem>
                ))}
              </TextField>
            );
          } else if (prop.columnDef === "signatureDish") {
            const allSignatureDishes: IDish[] = [];

            if (formData && formData.dishes) {
              formData.dishes.forEach((dish: IDish) => {
                allSignatureDishes.push(dish);
              });
            }
            return (
              <TextField
                key={prop.columnDef}
                select
                name={prop.columnDef}
                label={prop.header}
                value={(formData && formData[prop.columnDef]) || ""}
                onChange={(event) => handleSelectChange(event, prop.columnDef)}
                fullWidth
                margin="normal"
              >
                {allSignatureDishes.map((dish) => (
                  <MenuItem key={dish._id} value={dish._id}>
                    {dish.title}
                  </MenuItem>
                ))}
              </TextField>
            );
          } else {
            return (
              <TextField
                key={prop.columnDef}
                name={prop.columnDef}
                label={prop.header}
                value={
                  formData &&
                  (prop.cell ? prop.cell(formData) : data[prop.columnDef])
                }
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            );
          }
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
