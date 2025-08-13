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
        setProducts(data);
    }

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
                                <Meta title={i.title} description={`${i.description}$ - ${i.rating}⭐`} />
                            </Card>
                        {/* </Link> */}
                    </Col>
                )}
            </Row>
        </div>
    )
}