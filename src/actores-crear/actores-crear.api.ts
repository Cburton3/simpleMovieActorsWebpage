import axios from "axios";
import { Actor } from "./actores-crear.model";

export const crearActor = async (actor: Actor): Promise<Actor> => {
  const url = "http://localhost:3000/actors";
  const response = await axios.post<Actor>(url, actor);

  return response.data;
};
