import {useState} from "react";
import {useAuth} from '../context/authContext';
import { Link,useNavigate} from "react-router-dom";
import { Alert } from "./Alert";

export function Login(){
	const [user, setUser ] = useState(
		{
			email:'',
			password:'',	
		}
	);

	const { login, loginWithGoogle, resetPassword } = useAuth();
	const navigate = useNavigate();
	const [error, setError] = useState();


	const handleChange = ({target:{ name, value }}) => {
		setUser({...user, [name]: value})
	};

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError('');
		try {
			await login( user.email, user.password );	
			navigate('/');	
		} catch (error) {
			//console.log(error.code)
			// Validamos los tipos de error que manda el firebase
			if( error.code === 'auth/invalid-email'){setError('Email Invalido')}
			if( error.code === 'auth/weak-password'){setError('El password debe ser igual o mayor de 6 digitos')}
			if( error.code === 'auth/email-already-in-use'){setError('El email ya se encuentra registrado')}
			if( error.code === 'auth/user-not-found'){setError('Email no registrado')}
			if( error.code === 'auth/popup-closed-by-user'){setError('No se selecciono una cuenta de Google')} 
		}
	}

	const handleGoogleSignin = async () =>{
		try {
			await loginWithGoogle();
			navigate('/');	
		} catch (error) {
			setError(error.message);			
		}
	}

	const handleResetPassword = async() =>{
		if(!user.email) return setError("Por favor ingresa tu email");
		try {
			await resetPassword(user.email);
			setError('Te hemos enviando a tu cuenta de correo con un enlace para que pueda resetear tu password.');		
		} catch (error) {
			setError(error.message);
		}
	}

	return (

		<div className="w-full max-w-xs m-auto">
		{ error && <Alert message={error} /> }

		<form onSubmit={handleSubmit} className="bg-white shadow-md round px-8 pt-6 pb-8 mb-4">
			<div className="mb-4">
				<label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
				<input 
					type='email' 
					name='email' 
					placeholder='tuemail@compania.ltd'
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" 
					onChange={handleChange} 
				/>
			</div>
			
			<div className="mb-4">
				<label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
				<input 
					type="password"
					name="password" 
					id="password" 
					onChange={handleChange}
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-light focus:outline-none focus:shadow-outline" 
					placeholder="******" 
				/>
			</div>
			<div className="flex items-center justify-between">
			<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
				Login
			</button>
			<a href="#!" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
				onClick={handleResetPassword} >
				Olvidaste tu Password?
			</a>
			</div>
		</form>


			<p className="my-4 text-sm flex justify-between px-3">No tienes una cuenta...<Link to='/register'>Register</Link></p>

		<button onClick={handleGoogleSignin}
		 className="bg-slate-50 hover:bg-slate-200 text-black shadow-md rounded border-2 border-gray-300 py-2 px-4 w-full">Logeate con Google</button>
		</div>
	);
}
