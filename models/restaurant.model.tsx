import { IChef } from "./chef.model";
import { IDish } from "./dish.model";

export interface IRestaurant {
  _id: string;
  title: string;
  image: string;
  chef: IChef;
  rating: number;
  dishes: IDish[];
  signatureDish: IDish;
  isPopular: boolean;
  status: string;
}
