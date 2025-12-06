import Form  from 'react-bootstrap/Form';
import  Button from 'react-bootstrap/Button';
import { useState, type ChangeEvent } from 'react';
import { NavLink } from 'react-router';
import ApiClient from '../../../../utils/ApiClient';
import { useNavigate } from 'react-router';

interface SignInForm {
    email : string,
    password : string
}

function SignIn() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState<SignInForm>({
        email : "",
        password : ""
    })

    const onHandleChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setForm({
            ...form,
            [name] : value
        })
    }

    const onSubmit = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await ApiClient.post("/signin", form)
            console.log(response.data);

            if (response.status === 200) {
                localStorage.setItem("AuthToken", response.data.data.token)
                navigate("/movie" ,{
                    replace : true
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return <div>
        <h2>Sign In</h2>
         <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                    value={form.email}
                    onChange={onHandleChange}
                    name="email" 
                    type="text" 
                    placeholder="Email"/>
                </Form.Group>   
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                    value={form.password}
                    onChange={onHandleChange}
                    name="password" 
                    type="text" 
                    placeholder="Password"/>
                </Form.Group>
                <Button variant='primary' type='submit' disabled={isLoading}>{isLoading ? "Loading..." : "Sign In"}</Button>
                <NavLink to ="/">Sign Up</NavLink>
            </Form>
    </div>
}

export default SignIn