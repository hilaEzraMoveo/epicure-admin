import { IRestaurant } from "./restaurant.model";

export interface IChef {
  _id?: string;
  title: string;
  image: string;
  description: string;
  restaurants: IRestaurant[];
  isChefOfTheWeek: boolean;
  status: string;
}
