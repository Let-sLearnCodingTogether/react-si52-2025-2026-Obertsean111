import { NavLink, replace, useNavigate, useParams } from "react-router";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form";
import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import ApiClient from "../../utils/ApiClient";

interface FormMovie {
    judul: string,
    tahunRilis: string,
    sutradara: string
}

interface ResponseData {
    data : {
    _id : string,
    judul : string,
    tahunRilis : string,
    sutradara : string,
    updateAt : string,
    createdAt : string,
    _v : string
    }
  
}

function EditMovie() {
    const params = useParams()
    const navigate = useNavigate()
    const [form, setForm] =  useState<FormMovie>({
        judul: "",
        tahunRilis: "",
        sutradara: ""
    });


    const fetchMovie = useCallback (async () => {
    const response = await ApiClient.put(`/movie/${params.id}`);

    if (Response.status === 200) {
        const responseData : ResponseData = response.data
        setForm({
            judul : responseData.data.judul,
            tahunRilis : responseData.data.tahunRilis,
            sutradara : responseData.data.sutradara
        })
    }
},[params])

    const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setForm({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try{
            const response = await ApiClient.put("/movie", form);
            navigate("/movie",{
                replace : true
            })

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchMovie()
    }, [fetchMovie])

    return <div>
        <div>
            <h2>Add Movie</h2>
            <NavLink to="/movie">Movie Page</NavLink>
        </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId='formJudul'>
                    <Form.Label>Judul</Form.Label>
                    <Form.Control 
                    value ={form.judul}
                    onChange={handleInputChange}
                    name="judul"
                    type="text"
                    placeholder="Judul Film"></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='formTahunRilis'>
                    <Form.Label>Judul</Form.Label>
                    <Form.Control 
                    value ={form.tahunRilis}
                    onChange={handleInputChange}
                    name="tahunRilis"
                    type="text"
                    placeholder="Tahun Rilis"></Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId='formSutradara'>
                    <Form.Label>Judul</Form.Label>
                    <Form.Control 
                    value ={form.sutradara}
                    onChange={handleInputChange}
                    name="sutradara"
                    type="text"
                    placeholder="Sutradara"></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">Simpan</Button>
            </Form>
            <div>
                <Button variant="btn btn-success">Tambah</Button>
            </div>
    </div>
}

export default EditMovie;