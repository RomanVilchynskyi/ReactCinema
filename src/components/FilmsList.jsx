import React, { useEffect } from 'react';
import { Table } from 'antd';

const columns = [
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
];

const api = "https://www.omdbapi.com/?s=movies&apikey=9e3753ca&";

const FilmsList = () => {

    const [films, setFilms] = React.useState([]);

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
    return (
        <>
            <h2>FilmsList</h2>
            <Table columns={columns} dataSource={films} />
        </>
    )
};
export default FilmsList;