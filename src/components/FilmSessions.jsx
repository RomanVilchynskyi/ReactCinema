import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Select, Space, DatePicker } from 'antd';
import axios from 'axios';
import { ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const api = import.meta.env.VITE_API_PATH + 'movies';

export default function FilmSessions() {
  const [films, setFilms] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [genre, setGenre] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    fetchFilms();
  }, []);

  async function fetchFilms() {
    try {
      const res = await axios.get(api);
      const now = new Date();
      const upcoming = res.data.filter(film => new Date(film.startTime) >= now);
      setFilms(upcoming);
      setFiltered(upcoming);
    } catch (err) {
      console.error(err);
    }
  }

  const applyFilters = (genreValue, dateValue, order) => {
    let filteredFilms = [...films];

    if (genreValue) {
      filteredFilms = filteredFilms.filter(film => film.genre === genreValue);
    }

    if (dateValue) {
      filteredFilms = filteredFilms.filter(film =>
        dayjs(film.startTime).isSame(dateValue, 'day')
      );
    }

    filteredFilms.sort((a, b) => {
      const aTime = new Date(a.startTime);
      const bTime = new Date(b.startTime);
      return order === 'asc' ? aTime - bTime : bTime - aTime;
    });

    setFiltered(filteredFilms);
  };

  const handleGenreFilter = (value) => {
    setGenre(value);
    applyFilters(value, selectedDate, sortOrder);
  };

  const handleSort = (value) => {
    setSortOrder(value);
    applyFilters(genre, selectedDate, value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    applyFilters(genre, date, sortOrder);
  };

  return (
    <div style={{ padding: 20 }}>
      <Space style={{ marginBottom: 20 }}>
        <Select
          placeholder="Film by genre"
          allowClear
          style={{ width: 150 }}
          onChange={handleGenreFilter}
          options={[
            { value: 'Sci-Fi', label: 'Sci-Fi' },
            { value: 'Drama', label: 'Drama' },
            { value: 'Action', label: 'Action' },
            { value: 'Crime', label: 'Crime' },
            { value: 'Comedy', label: 'Comedy' },
            { value: 'Romance', label: 'Romance' },
            { value: 'Adventure', label: 'Adventure' },
            { value: 'Animation', label: 'Animation' },
            { value: 'Mystery', label: 'Mystery' },
            { value: 'Biography', label: 'Biography' },
            { value: 'Thriller', label: 'Thriller' },
            { value: 'Musical', label: 'Musical' }
          ]}
        />

        <DatePicker
          placeholder="Choose date"
          onChange={handleDateChange}
        />

        <Select
          placeholder="Sort by time"
          style={{ width: 180 }}
          defaultValue="asc"
          onChange={handleSort}
          options={[
            { value: 'asc', label: 'For ascend' },
            { value: 'desc', label: 'For decsent' }
          ]}
        />
      </Space>

      <Row gutter={[16, 20]}>
        {filtered.map(film => (
          <Col key={film.id} span={6}>
            <Card
              hoverable
              cover={<img alt={film.title} src={film.posterUrl} style={{ height: 260, objectFit: 'contain' }} />}
            >
              <Card.Meta
                title={film.title}
                description={
                  <>
                    <div>{film.description}</div>
                    <div style={{ marginTop: 8 }}>
                      <ClockCircleOutlined style={{ marginRight: 6 }} />
                      {dayjs(film.startTime).format('DD.MM.YYYY HH:mm')}
                    </div>
                    <div>Жанр: {film.genre}</div>
                    <div>Рейтинг: {film.rating}⭐</div>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
