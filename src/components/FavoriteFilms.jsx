import React from 'react';
import { useSelector } from 'react-redux';
import { selectNearestFavoriteSession } from '../redux/selFav/selFav.selector';


function formatDateTime(iso) {
  const d = new Date(iso);
  // локальний формат (Україна)
  return d.toLocaleString('uk-UA', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit'
  });
}

export default function FavoriteFilms() {
  const nearest = useSelector(selectNearestFavoriteSession);

  return (
    <div style={{ padding: 10, background: '#fafafa', borderBottom: '1px solid #eee' }}>
      {nearest ? (
        <div>
          Найближчий вибраний сеанс: <strong>{nearest.movieTitle}</strong>{' '}
          — <strong>{formatDateTime(nearest.start)}</strong>
        </div>
      ) : (
        <div>Найближчі вибрані сеанси відсутні</div>
      )}
    </div>
  );
}
