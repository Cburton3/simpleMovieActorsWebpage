import axios from "axios";
import { Actor } from "./actores-listado.model";

export const obtenerActores = async (): Promise<Actor[]> => {
  try {
    const { data } = await axios.get(`http://localhost:3000/actors`);
    return data;
  } catch (error) {
    throw new Error("Error al obtener la pelicula");
  }
};

export const borrarActor = async (id: string): Promise<void> => {
  try {
    await axios.delete(`http://localhost:3000/actors/${id}`);
  } catch (error) {
    throw new Error("Error al borrar la película");
  }
};
