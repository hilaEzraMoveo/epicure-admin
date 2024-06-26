import React, { useState, useEffect, ChangeEvent } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IChef } from "@/models/chef.model";
import { IDish } from "@/models/dish.model";
import { IRestaurant } from "@/models/restaurant.model";
import { HttpClientService } from "@/services/HttpClient.service";
import { ImageUploader } from "cloudinary-react";

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
  const [newIngredient, setNewIngredient] = useState("");
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [allChefs, setAllChefs] = useState<IChef[]>([]);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  useEffect(() => {
    if (open) {
      fetchRestaurants();
      fetchChefs();
    }
  }, [open]);

  const fetchRestaurants = async () => {
    try {
      const response = await HttpClientService.get<IRestaurant[]>(
        "/restaurants/all"
      );
      const restaurantsData = response.data;
      setRestaurants(restaurantsData);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const fetchChefs = async () => {
    try {
      const response = await HttpClientService.get<IChef[]>("/chefs");
      const fetchChefs = response.data;
      setAllChefs(fetchChefs);
    } catch (error) {
      console.error("Error fetching chefs:", error);
    }
  };

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

  const renderIngredientsMenu = () => {
    const ingredients: string[] = formData?.ingredients || [];

    return ingredients.map((ingredient: string) => (
      <FormControlLabel
        key={ingredient}
        control={
          <Checkbox checked={formData.ingredients.includes(ingredient)} />
        }
        label={ingredient}
        onChange={() => handleIngredientToggle(ingredient)}
      />
    ));
  };

  const handleIngredientToggle = (ingredient: string) => {
    let updatedIngredients: string[];
    if (formData.ingredients.includes(ingredient)) {
      updatedIngredients = formData.ingredients.filter(
        (item: string) => item !== ingredient
      );
    } else {
      updatedIngredients = [...formData.ingredients, ingredient];
    }

    setFormData({
      ...formData,
      ingredients: updatedIngredients,
    });
  };

  const handleAddNewIngredient = () => {
    if (newIngredient.trim() !== "") {
      setFormData({
        ...formData,
        ingredients: [...(formData?.ingredients || []), newIngredient.trim()],
      });
      setNewIngredient("");
    }
  };

  const renderTagsMenu = () => {
    const tagOptions = ["spicy", "vegan", "vegetarian"];

    return tagOptions.map((tag: string) => (
      <FormControlLabel
        key={tag}
        control={
          <Checkbox
            checked={formData?.tags?.includes(tag) || false}
            onClick={() => handleTagClick(tag)}
          />
        }
        label={tag}
        onChange={() => handleTagToggle(tag)}
      />
    ));
  };

  const handleTagToggle = (tag: string) => {
    const updatedTags = formData?.tags?.includes(tag)
      ? formData.tags.filter((item: string) => item !== tag)
      : [...(formData.tags ?? []), tag];

    setFormData({
      ...formData,
      tags: updatedTags,
    });
  };

  const handleTagClick = (tag: string) => {
    let updatedTags: string[];

    if (formData.tags?.includes(tag)) {
      updatedTags = formData.tags.filter((item: string) => item !== tag);
    } else {
      updatedTags = [...(formData.tags ?? []), tag];
    }

    setFormData({
      ...formData,
      tags: updatedTags,
    });
  };

  const handleImageUpload = (info: any) => {
    if (info.event === "success") {
      const imageUrl = info.info.secure_url;
      setFormData({ ...formData, imageUrl });
    }
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
          }
          // else if (prop.columnDef === "image") {
          //   return (
          //     <ImageUploader
          //       cloudName="dv08nbdyh"
          //       uploadPreset="nmbcn6cc"
          //       onStart={() => console.log("Upload started")}
          //       onSuccess={handleImageUpload}
          //       onError={(error: any) =>
          //         console.error("Error uploading image:", error)
          //       }
          //       buttonText="Upload Image"
          //       buttonClass="btn btn-primary"
          //     />
          //   );
          // }
          else if (
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
            return (
              <TextField
                key={prop.columnDef}
                select
                name={prop.columnDef}
                label={prop.header}
                value={"hilaa"}
                // value={(formData && formData[prop.columnDef]) || ""}
                // value={
                //   formData &&
                //   formData[prop.columnDef] &&
                //   allChefs.find((chef) => chef._id === formData[prop.columnDef])
                //     ? allChefs.find(
                //         (chef) => chef._id === formData[prop.columnDef]
                //       )?.title ?? ""
                //     : ""
                // }
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
          } else if (prop.columnDef === "ingredients") {
            return (
              <div key={prop.columnDef}>
                <h4>{prop.header}</h4>
                {renderIngredientsMenu()}
                <div>
                  <TextField
                    name="newIngredient"
                    label="Add New Ingredient"
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <Button onClick={handleAddNewIngredient} variant="contained">
                    Add
                  </Button>
                </div>
              </div>
            );
          } else if (prop.columnDef === "tags") {
            return (
              <div key={prop.columnDef}>
                <h4>{prop.header}</h4>
                {renderTagsMenu()}
              </div>
            );
          } else if (prop.columnDef === "restaurant") {
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
                {restaurants.map((restaurant: IRestaurant) => (
                  <MenuItem key={restaurant._id} value={restaurant._id}>
                    {restaurant.title}
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
