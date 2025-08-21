import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card } from 'antd';

const { Meta } = Card;
const api = import.meta.env.VITE_API_PATH + 'movies';

export default function FavoriteMovies() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchProducts();

    // отримуємо id улюблених з localStorage
    const favIds = JSON.parse(localStorage.getItem("fav-movies")) || [];
    setFavorites(favIds);
  }, []);

  async function fetchProducts() {
    try {
      const res = await axios.get(api);
      const data = res.data.map(m => ({
        ...m,
        sessions: Array.isArray(m.sessions) ? m.sessions : []
      }));
      setProducts(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  // залишаємо тільки ті фільми, що у favorites
  const favoriteMovies = products.filter(p => favorites.includes(String(p.id)));

  return (
    <Row gutter={[16, 20]}>
      {favoriteMovies.length === 0 && <p>У вас поки що немає улюблених фільмів.</p>}
      {favoriteMovies.map(i => (
        <Col className="gutter-row" span={6} key={i.id}>
          <Card
            hoverable
            style={{ width: 240, minHeight: '100%', backgroundColor: '#f0f2f5', padding: '10px' }}
            cover={
              <img alt={i.title} src={i.posterUrl} height={260} style={{ objectFit: "contain" }} />
            }
          >
            <Meta title={i.title} description={`${i.description} - ${i.rating}⭐`} />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
