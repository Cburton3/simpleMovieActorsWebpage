import { obtenerActor, actualizarActor } from "./actores-editar.api";
import { Actor } from "./actores-editar.model";
import axios from "axios";

const capturarIdDeLaUrl = (): string => {
  const parametrosUrl = new URLSearchParams(window.location.search);
  const id = parametrosUrl.get("id") || "";

  return decodeURIComponent(id);
};

console.log("El id de la actor a editar es:", capturarIdDeLaUrl());

const obtenActor = async (): Promise<Actor> => {
  const id = capturarIdDeLaUrl();
  const actor = await obtenerActor(id);

  return actor;
};

const getMoviesTitlesForActors = async (
  movieIds: string[]
): Promise<string[]> => {
  const peliculasPromesa = axios.get("http://localhost:3000/movies");
  const moviesResponse = await peliculasPromesa;
  const movies = moviesResponse.data;

  const movieTitles: string[] = movieIds.map((movieId) => {
    //loop through actors
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].id === movieId) {
        return movies[i].title;
      }
    }
    return "";
  });

  return movieTitles;
};

const pintarDatosActor = async (): Promise<void> => {
  const actor: Actor = await obtenActor();

  const name = document.querySelector("#name");
  const movies = document.querySelector("#movies");
  const bio = document.querySelector("#bio");
  const image = document.querySelector("#imagen");

  if (name && name instanceof HTMLInputElement) {
    name.value = actor.name;
  } else {
    throw new Error("Error al obtener el nombre");
  }

  if (movies && movies instanceof HTMLInputElement) {
    const movieTitles = await getMoviesTitlesForActors(actor.movies);

    movies.value = movieTitles.join(", ");
  } else {
    throw new Error("Error al obtener las peliculas");
  }

  if (bio && bio instanceof HTMLTextAreaElement) {
    bio.value = actor.bio;
  } else {
    throw new Error("Error al obtener el director");
  }

  if (image && image instanceof HTMLInputElement) {
    image.value = actor.image;
  } else {
    throw new Error("Error al obtener el imagen");
  }
};

const obtenerValorCampo = (campo: string): string => {
  const elementoCampo = document.querySelector(`#${campo}`);

  if (
    (elementoCampo && elementoCampo instanceof HTMLInputElement) ||
    elementoCampo instanceof HTMLTextAreaElement
  ) {
    return elementoCampo.value;
  } else {
    throw new Error(`No se ha encontrado el campo ${campo}`);
  }
};

const actualizaActor = async (evento: Event): Promise<void> => {
  evento.preventDefault();

  const actor: Actor = {
    id: capturarIdDeLaUrl(),
    name: obtenerValorCampo("name"),
    movies: obtenerValorCampo("movies").split(","),
    bio: obtenerValorCampo("year"),
    image: obtenerValorCampo("description"),
  };

  try {
    await actualizarActor(actor);
  } catch (error) {
    alert(error);
  }

  window.location.href = "../actor-listado/index.html";
};

const iniciaFormulario = () => {
  const formulario = document.querySelector("#formulario");
  if (formulario && formulario instanceof HTMLFormElement) {
    formulario.addEventListener("submit", actualizaActor);
  } else {
    throw new Error("No se ha encontrado el formulario");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  iniciaFormulario();
  pintarDatosActor();
});
