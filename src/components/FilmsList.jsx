import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Rate, Space, Table } from 'antd';
import { useMessage } from '../hooks/useMessage';
import { deleteFilm, editFilm, loadFilmById } from '../services/films.service';
import { Link } from 'react-router-dom';
import FilmForm from './CreateFilmForm';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const getColumns = (onDelete) => [
    {
        title: 'Poster',
        dataIndex: 'posterUrl',
        key: 'poster',
        render: (text, record) => <img src={text} alt={record.title} style={{ width: 100, height: 100 }} />,
    },
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Genre',
        dataIndex: 'genre',
        key: 'genre',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Rating',
        dataIndex: 'rating',
        key: 'rating',
        render: (rating) => {
            const value = Math.round(rating); // Якщо рейтинг від 0 до 10
            return (
                <div>
                    <Rate disabled value={value} tooltips={desc} />
                    {value ? <span style={{ marginLeft: 8 }}>{desc[value - 1]}</span> : null}
                </div>
            );
        },
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
            <Space size="middle">
                 <Link to={`/edit/${record.id}`}>
                    <Button type="primary">Edit</Button>
                </Link>
                <Popconfirm
                    title="Delete the film"
                    description={`Are you sure to delete ${record.title}?`}
                    onConfirm={() => onDelete(record.id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            </Space>
        ),
    },
];

const api = "https://68753704dd06792b9c97355a.mockapi.io/movies";

const FilmsList = () => {
    const [films, setFilms] = React.useState([]);
    const { contextHolder, showSuccess, showError } = useMessage();


    useEffect(() => {
        fetchFilms();
    }, []);

    function fetchFilms() {
        fetch(api)
            .then(res => res.json())
            .then(data => {
                setFilms(data);
            })
            .catch(() => {
                showError('Failed to load films!');
            });
    }

    const onFilmDelete = async (id) => {
        const res = await deleteFilm(id);
        if (res) {
            setFilms(films.filter(i => i.id !== id));
            showSuccess('Film deleted successfully!');
        } else {
            showError('Failed to delete film!');
        }
    };

    

    return (
        <>
            {contextHolder}
            <h2>FilmsList</h2>

            <Link to="/create">
                <Button type="primary" style={{ marginBottom: '12px' }}>Create New Film</Button>
            </Link>

            <Table columns={getColumns(onFilmDelete)} dataSource={films} rowKey={i => i.id} />

        </>
    );
};

export default FilmsList;
