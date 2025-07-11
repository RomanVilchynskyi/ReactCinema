import { message } from "antd";

const deleteFilm = async (imdbID) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=9e3753ca&`, {
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

// const deleteFilm = async (imdbID) => {
//     // Simulate API delay
//     return new Promise((resolve) => {
//         setTimeout(() => resolve(true), 500);
//     });
// };

export { deleteFilm }