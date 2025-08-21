import { message } from "antd";
import axios from "axios";

const api = import.meta.env.VITE_API_PATH;

const deleteFilm = async (id) => {
    try {
        const response = await fetch(`${api}movies/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return true;
    } catch (error) {
        console.error('Error deleting film:', error);
        return false;
    }
}

const loadGenres = async () => {
    try {
        const response = await fetch(`${api}genres`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading genres:', error);
        return null;
    }
}

const createFilm = async (model) => {
    try {
        const res = await axios.post(`${api}movies`, model);
        return res.data;
    } catch (error) {
        console.error('Error posting film:', error);
        return null;
    }
}

const loadFilmById = async (id) => {
    try {
        const res = await axios.get(`${api}movies/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error loading film by id:', error);
        return null;
    }
}

const editFilm = async (model) => {
    try {
        const res = await axios.put(`${api}movies/${model.id}`, model);
        return res.data;
    } catch (error) {
        console.error('Error updating film:', error);
        return null;
    }
}

const searchFilm = async (query) => {
  try {
    const res = await axios.get(`${api}movies`, { params: { q: query } });
    return res.data;
  } catch (error) {
    console.error('Error searching film:', error);
    return [];
  }
};



export { deleteFilm, loadGenres, createFilm, loadFilmById ,editFilm, searchFilm }