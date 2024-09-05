import { CrearBotonParams, Actor } from "./actores-listado.model";
import { borrarActor, obtenerActores } from "./actores-listado.api";
import axios from "axios";

const editaActor = (id: string) => {
  window.location.href = `../actores-editar/index.html?id=${encodeURIComponent(
    id
  )}`;
};

const borraActor = async (id: string) => {
  try {
    await borrarActor(id);
    const listado = document.querySelector("#listado-actores");
    if (listado && listado instanceof HTMLDivElement) {
      listado.innerHTML = "";
      pintarActores();
      alert("Actor borrado con exito");
    } else {
      throw new Error("No se ha encontrado el contenedor listado");
    }
  } catch (error) {
    alert(error);
  }
};

const crearElementoImagen = (image: string, name: string): HTMLImageElement => {
  const imagen = document.createElement("img");
  imagen.src = image;
  imagen.alt = name;
  return imagen;
};

const crearElementoParrafo = (texto: string): HTMLParagraphElement => {
  const parrafo = document.createElement("p");
  parrafo.textContent = texto;
  return parrafo;
};

const crearBoton = (crearBotonParams: CrearBotonParams): HTMLButtonElement => {
  const { texto, id, nombreClase, onClick } = crearBotonParams;
  const boton = document.createElement("button");
  boton.textContent = texto;
  boton.addEventListener("click", () => {
    onClick(id);
  });
  boton.classList.add(nombreClase);

  return boton;
};

const crearGrupoBotones = (id: string): HTMLDivElement => {
  const grupoBotones = document.createElement("div");
  grupoBotones.classList.add("grupo-botones");
  const botonEditar = crearBoton({
    texto: "Editar",
    id: id,
    nombreClase: "boton-editar",
    onClick: () => editaActor(id),
  });
  const botonBorrar = crearBoton({
    texto: "Borrar",
    id: id,
    nombreClase: "boton-borrar",
    onClick: () => borraActor(id),
  });

  grupoBotones.appendChild(botonEditar);
  grupoBotones.appendChild(botonBorrar);

  return grupoBotones;
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

const crearContenedorActor = async (actor: Actor): Promise<HTMLDivElement> => {
  const elementoActor = document.createElement("div");
  elementoActor.classList.add("actores-contenedor");

  const imagen = crearElementoImagen(actor.image, actor.name);
  elementoActor.appendChild(imagen);

  const name = crearElementoParrafo(actor.name);
  elementoActor.appendChild(name);

  const movieTitles = await getMoviesTitlesForActors(actor.movies);

  const sectionTitles = crearElementoParrafo(movieTitles.join(", "));
  elementoActor.appendChild(sectionTitles);

  const bio = crearElementoParrafo(actor.bio.toString());
  elementoActor.appendChild(bio);

  const grupoBotones = crearGrupoBotones(actor.id);
  elementoActor.appendChild(grupoBotones);

  return elementoActor;
};

const pintarActores = async (): Promise<void> => {
  const actores = await obtenerActores();
  const listado = document.querySelector("#listado-actores");

  if (listado && listado instanceof HTMLDivElement) {
    const contenedorPromesas = actores.map((actor) =>
      crearContenedorActor(actor)
    );

    const contenedoresActores = await Promise.all(contenedorPromesas);

    contenedoresActores.forEach((contenedorActor) => {
      listado.appendChild(contenedorActor);
    });
  } else {
    throw new Error("No se ha encontrado el contenedor listado");
  }
};

document.addEventListener("DOMContentLoaded", pintarActores);
