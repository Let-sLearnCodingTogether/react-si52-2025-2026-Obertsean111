import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router";
import ApiClient from "../../utils/ApiClient";
import { Button, Table } from "react-bootstrap";

interface Movie {
    _id: string,
    judul: string,
    tahunRilis: string,
    sutradara: string,
    createdAt : string,
    updatedAt : string
}

function Movie() {
    const [movie, setMovie] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchMovie = useCallback(async () => {
        setLoading(true);
        const response = await ApiClient.get("/movie");

        if(response.status == 200){
            setMovie(response.data.data);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovie();
    }, [fetchMovie]);

    const handleDelete = async (movieId: String) => {
        const response = await ApiClient.delete(`/movie/${movieId}`);

        if(response.status === 200){
            fetchMovie();
        }
    }

    return <div className="container mx-auto">
        <div className="d-flex justify-content-between mb-3">
            <h4>Movie Page</h4>
            <NavLink to="/movie/add-movie" className="btn btn-primary">Add Movie</NavLink>
        </div>
        <div>
            <Table striped bordered hover>
                <thead>
                    <th>No</th>
                    <th>Judul</th>
                    <th>Tahun Rilis</th>
                    <th>Sutradara</th>
                    <th>Aksi</th>
                </thead>
                <tbody>
                    {
                        loading && <tr>
                            <td colSpan={5}>Loading...</td>
                        </tr>
                    }
                    {
                        movie.length > 0 && movie.map((movie, index) =>{
                            return <tr key={movie._id}>
                                <td>{index + 1}</td>
                                <td>{movie.judul}</td>
                                <td>{movie.tahunRilis}</td>
                                <td>{movie.sutradara}</td>
                                <td>
                                    <Button variant="btn btn-danger" onClick={() => handleDelete(movie._id) }>Delete</Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    </div>
}

export default Movie