import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Rate, Space, Table } from 'antd';
import { useMessage } from '../hooks/useMessage';
import { deleteFilm, editFilm, loadFilmById } from '../services/films.service';
import { Link } from 'react-router-dom';
import FilmForm from './CreateFilmForm';
import { LikeOutlined } from '@ant-design/icons';

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const getColumns = (onDelete, onToggleFavorite, isFavorite) => [
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
        title: 'Trailer',
        dataIndex: 'trailerUrl',
        key: 'trailer',
        render: (url) => {
            if (!url) return "No trailer";

            // замінюємо "watch?v=" на "embed/"
            const embedUrl = url.replace("watch?v=", "embed/");

            return (
                <iframe
                    width="200"
                    height="120"
                    src={embedUrl}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            );
        },
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
        title: 'Sessions',
        dataIndex: 'startTime',
        key: 'startTime',
        render: text => <span>{text}</span>,
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
                // Ініціалізуємо поле favorite, якщо його немає
                const filmsWithFavorite = data.map(film => ({
                    ...film,
                    favorite: film.favorite ?? false,
                }));
                setFilms(filmsWithFavorite);
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

    const onToggleFavorite = async (film) => {
        try {
            const updatedFilm = { ...film, favorite: !film.favorite };
            console.log('Updating favorite:', updatedFilm);
            const result = await editFilm(updatedFilm);
            console.log('Result from API:', result);

            if (result) {
                setFilms(prevFilms => prevFilms.map(f => f.id === film.id ? updatedFilm : f));
                showSuccess(`"${film.title}" favorite status updated!`);
            } else {
                showError('Failed to update favorite status!');
            }
        } catch (e) {
            showError('Failed to update favorite status!');
            console.error(e);
        }
    };



    const isFavorite = (id) => {
        const film = films.find(f => f.id === id);
        return film ? film.favorite : false;
    };



    return (
        <>
            {contextHolder}
            <h2>FilmsList</h2>

            <Link to="/create">
                <Button type="primary" style={{ marginBottom: '12px' }}>Create New Film</Button>
            </Link>

            <Table columns={getColumns(onFilmDelete, onToggleFavorite, isFavorite)} dataSource={films} rowKey={i => i.id} />

        </>
    );
};

export default FilmsList;
