import axios from "axios";
import { Actor } from "./actores-editar.model";

export const obtenerActor = async (id: string): Promise<Actor> => {
  try {
    const { data } = await axios.get(`http://localhost:3000/actors/${id}`);
    return data;
  } catch (error) {
    throw new Error("Error al obtener la pelicula");
  }
};

export const actualizarActor = async (actor: Actor): Promise<void> => {
  try {
    await axios.put(`http://localhost:3000/actors/${actor.id}`, actor);
  } catch (error) {
    throw new Error("Error al actualizar pelicula");
  }
};
