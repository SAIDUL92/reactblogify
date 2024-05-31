import { Link, useNavigate } from "react-router-dom";
import Field from "../common/Filed";
import { useForm } from 'react-hook-form';
import axios from "axios";

export default function RegistrationForm() {

    const navigate = useNavigate()
    const { register, handleSubmit, setError, formState: { errors } } = useForm();

    const submitForm = async (formData) => {


        try {

            const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`, formData);

            if (response.status === 201) {

                navigate('/login')

            }

        }

        catch (error) {
            setError('root.random', {
                type: 'random',
                message: 'Somthing went wrong'
            })
        }

    }

    return (<>


        <form action="#" autoComplete="off" onSubmit={handleSubmit(submitForm)}>
            <Field label="First Name" error={errors.firstName}>

                <input
                    {...register('firstName', { required: 'firstName is required' })}
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none focus:border-indigo-500 ${!!errors.firstName ? 'border-red-500' : 'border-white/20'}`} />
            </Field>

            <Field label="Last Name" error={errors.firstName}>

                <input
                    {...register('lastName', { required: 'lastName is required' })}
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={`w-full p-3 bg-[#030317] border rounded-md focus:outline-none focus:border-indigo-500 ${!!errors.lastName ? 'border-red-500' : 'border-white/20'}`} />
            </Field>


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
                    Create Account
                </button>
            </Field>


            <p className="text-center">
                Already have account? <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
            </p>
        </form>

    </>)
}