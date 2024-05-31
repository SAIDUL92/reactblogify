import { Link, useNavigate } from "react-router-dom";
import Field from "../common/Filed";
import { useForm } from 'react-hook-form';
import { useAuth } from '../../hooks/useAuth';
import axios from "axios";

export default function LogInForm() {
    const { setAuth } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const submitForm = async (formData) => {


        try {

            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`, formData);

            if (response.status === 200) {
                const { token, user } = response.data;
              
                if (token) {

                    const authToken = token.accessToken;
                    const refreshToken = token.refreshToken;

                    console.log(`Login time auth token:${authToken}`)

                    setAuth({ user, authToken, refreshToken })
                    navigate('/')
                }

            }

        }

        catch (error) {
            console.log(error)

            setError('root.random', {
                type: 'random',
                message: 'User with email ' + formData.email + ' is not found'
            })
        }

    }

    return (<>


        <form action="#" onSubmit={handleSubmit(submitForm)} autoComplete="off">
            <Field label="Email" error={errors.email}>

                <input
                    {...register('email', { required: 'Email Id is required' })}
                    type="email"
                    id="email"
                    name="email"
                    className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none focus:border-indigo-500 ${!!errors.email ? 'border-red-500' : 'border-white/20'}`} />
            </Field>


            <Field label="Password" error={errors.password}>

                <input
                    {...register('password', {
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Your password must be at least 8 characters'
                        }
                    })}
                    type="password"
                    id="password"
                    name="password"
                    className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none focus:border-indigo-500 ${!!errors.password ? ' border-red-500' : 'border-white/20'}`} />
            </Field>

            <p>{errors?.root?.random?.message}</p>
            <Field>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                    Login
                </button>
            </Field>


            <p className="text-center">
                Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
            </p>
        </form>

    </>)
}