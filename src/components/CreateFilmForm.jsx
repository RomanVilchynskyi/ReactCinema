import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select,
    Space,
    Rate
} from 'antd';
import { createFilm, editFilm, loadGenres } from '../services/films.service';
import { useMessage } from '../hooks/useMessage';
const { TextArea } = Input;

// const normFile = (e) => {
//     return e?.file.originFileObj;
// };

const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const FilmForm = ({ initialValues = {}, onSubmit, onCancel }) => {
    const [genres, setGenres] = useState([]);
    const { contextHolder, showSuccess, showError } = useMessage();

    useEffect(() => {
        fetchGenres();
    }, []);

    async function fetchGenres() {
        const data = await loadGenres();
        setGenres(data || []);
    }

    return (
        <>
            {contextHolder}
            <h2>{initialValues.id ? 'Edit Film' : 'Create New Film'}</h2>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={onSubmit}
                initialValues={initialValues}
            >
                <Form.Item
                    name="posterUrl"
                    label="Film poster URL"
                >
                    <Input placeholder="Enter poster image URL" />
                </Form.Item>

                <Form.Item label="Title" name="title">
                    <Input />
                </Form.Item>

                <Form.Item label="Description" name="description">
                    <TextArea rows={3} />
                </Form.Item>

                <Form.Item label="Year" name="year">
                    <InputNumber />
                </Form.Item>

                <Form.Item label="Genres" name="genre">
                    <Select
                        options={genres.map(genre => ({
                            label: genre.name,
                            value: genre.name
                        }))}
                    />
                </Form.Item>

                <Form.Item label="Rating" name="rating">
                    <Rate />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            {initialValues.id ? 'Save' : 'Create'}
                        </Button>
                        <Button htmlType="button" onClick={onCancel}>
                            Cancel
                        </Button>
                    </Space>
                </Form.Item>
            </Form >
        </>
    );
};
export default FilmForm;