import { IChef } from "@/models/chef.model";
import { IRestaurant } from "@/models/restaurant.model";
import { IDish } from "@/models/dish.model";

export const chefProps: any[] = [
  {
    columnDef: "title",
    header: "Title",
    cell: (element: IChef) => element.title,
  },
  {
    columnDef: "image",
    header: "Image",
    cell: (element: IChef) => element.image,
  },
  {
    columnDef: "description",
    header: "Description",
    cell: (element: IChef) => element.description,
  },
  {
    columnDef: "isChefOfTheWeek",
    header: "Is Chef Of The Week",
    cell: (element: IChef) => (element.isChefOfTheWeek ? "Yes" : "No"),
  },
  ,
  {
    columnDef: "status",
    header: "Status",
    cell: (element: IChef) => element.status,
  },
];

export const RestaurantProps: any[] = [
  {
    columnDef: "title",
    header: "Title",
    cell: (element: IRestaurant) => element.title,
  },
  {
    columnDef: "image",
    header: "Image",
    cell: (element: IRestaurant) => element.image,
  },
  {
    columnDef: "chef",
    header: "Chef",
    cell: (element: IRestaurant) => element.chef?.title || "",
  },
  {
    columnDef: "rating",
    header: "Rating",
    cell: (element: IRestaurant) => element.rating?.toString() || "",
  },
  {
    columnDef: "signatureDish",
    header: "Signature Dish",
    cell: (element: IRestaurant) => element.signatureDish?.title,
  },
  {
    columnDef: "isPopular",
    header: "Is Popular",
    cell: (element: IRestaurant) => (element.isPopular ? "Yes" : "No"),
  },
  {
    columnDef: "status",
    header: "Status",
    cell: (element: IRestaurant) => element.status,
  },
];

export const DishProps: any[] = [
  {
    columnDef: "title",
    header: "Title",
    cell: (element: IDish) => element.title,
  },
  {
    columnDef: "image",
    header: "Image",
    cell: (element: IDish) => element.image,
  },
  {
    columnDef: "ingredients",
    header: "Ingredients",
    cell: (element: IDish) =>
      Array.isArray(element.ingredients) ? element.ingredients.join(", ") : "",
  },
  {
    columnDef: "tags",
    header: "Tags",
    cell: (element: IDish) =>
      Array.isArray(element.tags) ? element.tags.join(", ") : "",
  },
  {
    columnDef: "price",
    header: "Price",
    cell: (element: IDish) => element.price?.toString(),
  },
  {
    columnDef: "status",
    header: "Status",
    cell: (element: IDish) => element.status,
  },
];
