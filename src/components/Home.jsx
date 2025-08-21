import React, { useEffect, useState } from 'react'
import { Card, Col, Flex, Input, Row, Select, Space } from 'antd';
import { Link } from 'react-router-dom';
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled
} from '@ant-design/icons';
import { useContext } from 'react';
import { FavoriteContext } from '../context/favorite.context';

const { Meta } = Card;

const api = import.meta.env.VITE_API_PATH + 'movies';

export default function Home() {
  const [products, setProducts] = useState([]);
  const { add, remove, isFav } = useContext(FavoriteContext);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const res = await fetch(api);
    const data = await res.json();

    const withSessions = data.map(m => ({
      ...m,
      sessions: Array.isArray(m.sessions) ? m.sessions : []
    }));

    setProducts(withSessions);
    setFiltered(withSessions);
  }


  const sessionButton = (movie) => (startISO) => (
    <Button
      size="small"
      onClick={(e) => {
        e.stopPropagation();
        dispatch(addFavoriteSession({
          movieId: String(movie.id),
          movieTitle: movie.title,
          start: startISO
        }));
      }}
    >
      Додати у вибране
    </Button>
  );

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Flex gap={30} style={{ marginBottom: 40 }}>
        <Input.Search
          placeholder="Введіть назву фільму"
          variant="outlined"
          style={{ width: "300px" }}
          allowClear
          onSearch={(value) => {
            if (!value) {
              setFiltered(products);
            } else {
              const result = products.filter(p =>
                p.title.toLowerCase().includes(value.toLowerCase())
              );
              setFiltered(result);
            }
          }}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              setFiltered(products);
            }
          }}
        />

        <Select
          defaultValue=""
          style={{ width: 120 }}
          allowClear
          options={[
            { value: "sci-fi", label: "Sci-Fi" },
            { value: "drama", label: "Drama" },
            { value: "adventure", label: "Adventure" },
            { value: "action", label: "Action" },
            { value: "romance", label: "Romance" },
            { value: "crime", label: "Crime" },
            { value: "animation", label: "Animation" },
            { value: "mystery", label: "Mystery" },
            { value: "biography", label: "Biography" },
            { value: "musical", label: "Musical" },
            { value: "thriller", label: "Thriller" },
            { value: "comedy", label: "Comedy" }
          ]}
          placeholder="Виберіть"
          onChange={(value) => {
            if (!value) {
              setFiltered(products); // якщо стерли вибір → показати всі
            } else {
              const result = products.filter(p =>
                p.genre.toLowerCase() === value.toLowerCase()
              );
              setFiltered(result);
            }
          }}
        />
      </Flex>

      <Row gutter={[16, 20]}>
        {filtered.map(i =>
          <Col className="gutter-row" span={6} key={i.id}>
            <Card
              hoverable
              style={{ width: 240, minHeight: '100%', backgroundColor: '#f0f2f5', padding: '10px' }}
              cover={
                <Link to={`/details/${i.id}`}>
                  <img alt={i.title} src={i.posterUrl} height={260} style={{ objectFit: "contain" }} />
                </Link>
              }
              actions={[
                isFav(i.id) ?
                  <LikeFilled key="fav-no"
                    style={{ color: '#2589d0ff' }}
                    onClick={e => {
                      e.stopPropagation(); // щоб клік не пішов на карточку
                      remove(i.id);
                    }} />
                  :
                  <LikeOutlined key="fav-yes"
                    onClick={e => {
                      e.stopPropagation();
                      add(i.id);
                    }} />
              ]}
            >
              <Meta title={i.title} description={
                <>
                  {`${i.description} - ${i.rating}⭐`}
                  {Array.isArray(i.sessions) && i.sessions.length > 0 && (
                    <div style={{ marginTop: 8, textAlign: 'left' }}>
                      <div><strong>Сеанси:</strong></div>
                      <Space direction="vertical" size={6} style={{ width: '100%' }}>
                        {i.sessions.map(s => (
                          <div key={s} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Tag>{new Date(s).toLocaleString('uk-UA', {
                              year: 'numeric', month: '2-digit', day: '2-digit',
                              hour: '2-digit', minute: '2-digit'
                            })}</Tag>
                            {sessionButton(i)(s)}
                          </div>
                        ))}
                      </Space>
                    </div>
                  )}
                </>
              } />
            </Card>
          </Col>

        )}
      </Row>
    </div>
  )
}