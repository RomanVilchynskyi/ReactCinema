import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import {
    LikeOutlined,
    DislikeOutlined
} from '@ant-design/icons';

const { Meta } = Card;

const api = import.meta.env.VITE_API_PATH + 'movies';

export default function Home() {
    const [products, setProducts] = useState([]);

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
                        <Link to={`/details/${i.id}`}>
                            <Card
                                hoverable
                                style={{ width: 240, minHeight: '100%', backgroundColor: '#f0f2f5', padding: '10px' }}
                                cover={<img alt={i.title} src={i.posterUrl} height={260} style={{ objectFit: "contain" }} />}
                                actions={[
                                    <LikeOutlined
                                        key="like"
                                        onClick={e => {
                                            e.stopPropagation();
                                            e.preventDefault();

                                        }} />,
                                        <DislikeOutlined
                                        key="dislike"
                                        onClick={e => {
                                            e.stopPropagation();
                                            e.preventDefault();

                                        }} />
                                ]}
                            >
                                <Meta title={i.title} description={`${i.description}$ - ${i.rating}⭐`} />
                            </Card>
                        </Link>
                    </Col>
                )}
            </Row>
        </div>
    )
}