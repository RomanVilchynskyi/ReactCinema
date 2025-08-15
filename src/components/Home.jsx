import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd';
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
            <Row gutter={[16, 20]}>
                {products.map(i =>
                    <Col className="gutter-row" span={6}>
                        {/* <Link to={`/details/${i.id}`}> */}
                        <Card
                            hoverable
                            style={{ width: 240, minHeight: '100%', backgroundColor: '#f0f2f5', padding: '10px' }}
                            cover={<img alt={i.title} src={i.posterUrl} height={260} style={{ objectFit: "contain" }} />}
                            actions={

                                [
                                    isFav(i.id) ?
                                        <LikeOutlined key="fav-no"
                                            style={{ color: '#eb2f96' }}
                                            onClick={e => {
                                                remove(i.id);
                                            }} />
                                        :
                                        <LikeFilled twoToneColor="#eb2f96" key="fav-yes"
                                            onClick={e => {
                                                add(i.id);
                                            }} />
                                ]

                            }
                        >
                            <Meta title={i.title} description={
                                <>
                                {`${i.description} - ${i.rating}⭐`}
            
                                {/* Список сеансів */}
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
                        {/* </Link> */}
                    </Col>
                )}
            </Row>
        </div>
    )
}