import axios from "axios";
import { Movie } from "./pelicula-crear.model";

export const crearPelicula = async (pelicula: Movie): Promise<Movie> => {
  const url = "http://localhost:3000/movies";
  const response = await axios.post<Movie>(url, pelicula);

  return response.data;
};
