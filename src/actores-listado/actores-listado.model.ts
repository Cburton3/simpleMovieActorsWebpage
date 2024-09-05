export interface Actor {
    id: string;
    name: string;
    movies: string[];
    bio: string;
    image: string;
}

export interface CrearBotonParams {
    texto: string;
    id: string;
    nombreClase: string;
    onClick: (id: string) => void;
    }

export interface Movie {
    id: string;
    title: string;
}