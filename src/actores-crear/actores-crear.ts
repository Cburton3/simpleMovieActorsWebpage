import { crearActor } from "./actores-crear.api";
import { Actor } from "./actores-crear.model";

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

const creaActor = async (evento: Event): Promise<void> => {
  evento.preventDefault();

  const actor: Actor = {
    name: obtenerValorCampo("name"),
    movies: obtenerValorCampo("movies").split(","),
    bio: obtenerValorCampo("bio"),
    image: obtenerValorCampo("imagen"),
  };

  try {
    await crearActor(actor);
    window.location.href = "../actores-listado.index.html";
    alert("Actor creada con exito");
  } catch (error) {
    alert(error);
  }
};

const iniciarFormulario = () => {
  const formulario = document.querySelector("#formulario");

  if (formulario && formulario instanceof HTMLFormElement) {
    formulario.addEventListener("submit", creaActor);
  } else {
  }
};

document.addEventListener("DOMContentLoaded", iniciarFormulario);
