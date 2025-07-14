import { message } from "antd";

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

export { deleteFilm }