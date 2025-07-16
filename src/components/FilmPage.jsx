import React from 'react';
import { useNavigate } from 'react-router-dom';
import FilmForm from './CreateFilmForm';
import { createFilm } from '../services/films.service';
import { useMessage } from '../hooks/useMessage';

const CreateFilmPage = () => {
  const { showSuccess, showError } = useMessage();
  const navigate = useNavigate();

  const handleCreate = async (filmData) => {
    const created = await createFilm(filmData);
    if (created) {
      showSuccess('Film created successfully!');
      navigate('/films'); // або куди потрібно після створення
    } else {
      showError('Failed to create film!');
    }
  };

  return (
    <FilmForm
      onSubmit={handleCreate}
      onCancel={() => navigate('/films')}  // кнопка відміни повертає на список
    />
  );
};

export default CreateFilmPage;
