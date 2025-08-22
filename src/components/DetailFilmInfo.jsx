import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Rate, Tag, Button } from 'antd';

const { Meta } = Card;

const api = import.meta.env.VITE_API_PATH; 

export default function FilmDetailPage() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadFilmById = async (id) => {
    try {
      const res = await axios.get(`${api}movies/${id}`);
      return res.data;
    } catch (err) {
      console.error(err);
      setError('Помилка завантаження фільму');
      return null;
    }
  };

  useEffect(() => {
    const fetchFilm = async () => {
      setLoading(true);
      const data = await loadFilmById(id);
      setFilm(data);
      setLoading(false);
    };
    fetchFilm();
  }, [id]);

  if (loading) return <div>Downloading film...</div>;
  if (error) return <div>{error}</div>;
  if (!film) return <div>Film not found</div>;

  return (
    <Card
      hoverable
      style={{ width: 400, margin: '20px auto', backgroundColor: '#f0f2f5' }}
      cover={
        <img
          alt={film.title}
          src={film.posterUrl}
          style={{ objectFit: 'contain', height: 400 }}
        />
      }
      actions={[
        <Button key="trailer" type="link" onClick={() => window.open(film.trailerUrl, '_blank')}>
          Переглянути трейлер
        </Button>
      ]}
    >
      <Meta
        title={`${film.title} (${film.year})`}
        description={
          <>
            <div style={{ margin: '10px 0' }}>
              <strong>Жанр:</strong> {film.genre}
            </div>
            <div style={{ margin: '10px 0' }}>
              <strong>Оцінка:</strong> <Rate disabled defaultValue={film.rating} />
            </div>
            <div style={{ margin: '10px 0' }}>
              <strong>Опис:</strong> {film.description}
            </div>

          </>
        }
      />
    </Card>
  );
}
