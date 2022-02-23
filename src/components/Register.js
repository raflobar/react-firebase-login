import {useState} from "react";
import {useAuth} from '../context/authContext';
import {Link,useNavigate} from "react-router-dom";
import { Alert } from "./Alert";

export function Register(){
	const [user, setUser ] = useState(
		{
			email:'',
			password:'',	
		}
	);

	const { signup } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState();


	const handleChange = ({target:{ name, value }}) => {
		setUser({...user, [name]: value})
	};

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('');
		try {
			await signup( user.email, user.password );	
			navigate('/');	
		} catch (error) {
			console.log(error.code)
			if( error.code === 'auth/invalid-email'){setError('Email Invalido')}
			if( error.code === 'auth/weak-password'){setError('El password debe ser igual o mayor de 6 digitos')}
			if( error.code === 'auth/email-already-in-use'){setError('El email ya se encuentra registrado')}
		}
		
	}

	return (

		<div className="w-full max-w-xs m-auto">
		{error && <Alert message={error} />}

		<form onSubmit={handleSubmit} className="bg-white shadow-md round px-8 pt-6 pb-8 mb-4">
			<div className="mb-4">
				<label htmlFor="email">Email</label>
				<input 
					type='email' 
					name='email' 
					placeholder='tuemail@compania.ltd'
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline"  
					onChange={handleChange} 
				/>
			</div>
			<div className="mb-4">
				<label htmlFor="password">Password</label>
				<input 
					type="password"
					name="password" 
					id="password" 
					onChange={handleChange}
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" 
					placeholder="******" 
				/>
			</div>			

			<button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</button>
		</form>
		<p className="my-4 text-sm flex justify-between px-3">Ya tienes una cuenta...<Link to='/'>Login</Link></p>
		</div>
	);
}
