import { message } from "antd";
import axios from "axios";

const deleteFilm = async (id) => {
    try {
        const response = await fetch(`https://68753704dd06792b9c97355a.mockapi.io/movies/${id}`, {
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
        const response = await fetch(`https://68753704dd06792b9c97355a.mockapi.io/genres`);
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
        const res = await axios.post(`https://68753704dd06792b9c97355a.mockapi.io/movies`, model);
        return res.data;
    } catch (error) {
        console.error('Error posting film:', error);
        return null;
    }
}

const loadFilmById = async (id) => {
    try {
        const res = await axios.get(`https://68753704dd06792b9c97355a.mockapi.io/movies/${id}`);
        return res.data;
    } catch (error) {
        console.error('Error loading film by id:', error);
        return null;
    }
}

const editFilm = async (model) => {
    try {
        const res = await axios.put(`https://68753704dd06792b9c97355a.mockapi.io/movies/${model.id}`, model);
        return res.data;
    } catch (error) {
        console.error('Error updating film:', error);
        return null;
    }
}


export { deleteFilm, loadGenres, createFilm, loadFilmById ,editFilm }