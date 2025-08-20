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
import { createFilm, editFilm, loadFilmById, loadGenres } from '../services/films.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useMessage } from '../hooks/useMessage';
const { TextArea } = Input;

// const normFile = (e) => {
//     return e?.file.originFileObj;
// };

const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

const FilmForm = () => {
    const [genres, setGenres] = useState([]);
    const { contextHolder, showSuccess, showError } = useMessage();
    const navigate = useNavigate();
    let params = useParams();
    const [editMode, setEditMode] = useState(false);

    const [form] = Form.useForm();

    useEffect(() => {
        fetchGenres();

        if (params.id) {
            setEditMode(true);
            loadFilms(params.id);
        }
    }, []);

    async function fetchGenres() {
        const data = await loadGenres();
        setGenres(data || []);
    }

    async function loadFilms(id) {
        const product = await loadFilmById(id);
        form.setFieldsValue(product);
    }

    const onSubmit = async (item) => {
    if (item.trailerUrl) {
        item.trailerUrl = item.trailerUrl.replace("watch?v=", "embed/");
    }

    let res = false;
    if (editMode) {
        item.id = params.id;
        res = await editFilm(item);
    } else {
        res = await createFilm(item);
    }

    if (!res) {
        showError(`Failed to ${editMode ? "update" : "create"} film!`);
    } else {
        showSuccess(`Film ${editMode ? "updated" : "created"} successfully!`);
    }
};

    const onCancel = () => {
        navigate(-1);
    };

    return (
        <>
            {contextHolder}
            <h2>{editMode ? 'Edit Film' : 'Create New Film'}</h2>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{ maxWidth: 600 }}
                onFinish={onSubmit}
                form={form}
            >
                <Form.Item
                    name="posterUrl"
                    label="Film poster URL"
                >
                    <Input placeholder="Enter poster image URL" />
                </Form.Item>
                <Form.Item
                    name="trailerUrl"
                    label="Film trailer URL"
                >
                    <Input placeholder="Enter film trailer URL" />
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
                            {editMode ? "Edit" : "Create"}
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