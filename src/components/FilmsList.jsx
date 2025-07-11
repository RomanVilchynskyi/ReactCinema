import React, { useEffect } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { useMessage } from '../hooks/useMessage';
import { deleteFilm } from '../services/films.service';

const getColumns = (onDelete) => [
    {
        title: 'Poster',
        dataIndex: 'Poster',
        key: 'poster',
        render: (text, record) => <img src={text} alt={record.Title} style={{ width: 100, height: 100 }} />,
    },
    {
        title: 'Title',
        dataIndex: 'Title',
        key: 'title',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Year',
        dataIndex: 'Year',
        key: 'year',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Type',
        dataIndex: 'Type',
        key: 'type',
        render: text => <span>{text}</span>,
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
            <Space size="middle">
                <Button type="primary">Edit</Button>
                <Popconfirm
                    title="Delete the film"
                    description={`Are you sure to delete ${record.Title}?`}
                    onConfirm={() => onDelete(record.imdbID)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger>Delete</Button>
                </Popconfirm>
            </Space>
        ),
    },
];

const api = "https://www.omdbapi.com/?s=movies&apikey=9e3753ca&";

const FilmsList = () => {

    const [films, setFilms] = React.useState([]);
    const { contextHolder, showSuccess, showError } = useMessage();

    useEffect(() => {
        fetchFilms();
    }, []);


    function fetchFilms()
    {
        fetch(api).then(res => res.json())
        .then(data => {
            setFilms(data.Search);
        })
    }

    const onFilmDelete = async (imdbID) => {
        const res = await deleteFilm(imdbID);
        if (res) {
            setFilms(films.filter(i => i.imdbID !== imdbID));

            showSuccess('Film deleted successfully!');
        }
        else
            showError('Failed to delete film!');
    };

    return (
        <>
            {contextHolder}
            <h2>FilmsList</h2>
            <Table columns={getColumns(onFilmDelete)} dataSource={films} rowKey={i => i.imdbID}/>
        </>
    )
};
export default FilmsList;