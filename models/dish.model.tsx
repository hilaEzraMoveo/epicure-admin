import { IRestaurant } from "./restaurant.model";

export interface IDish {
  _id: string;
  title: string;
  image: string;
  ingredients: string[];
  tags: string[];
  price: number;
  restaurant: IRestaurant;
  status: string;
}
