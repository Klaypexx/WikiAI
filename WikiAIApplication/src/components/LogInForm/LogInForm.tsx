import style from "./LogInForm.module.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../AuthContext/AuthContext'; // Импортируем useAuth
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigateм
import { useUser } from '../../Context/UserContext';

const LogInForm = () => {
	const { login, setUserName } = useAuth(); // Используем контекст
	const navigate = useNavigate(); // Хук для навигации
	const { userId, setUserId } = useUser();

	const formik = useFormik({
		initialValues: {
			login: '',
			password: '',
		},
		validationSchema: Yup.object({
		login: Yup.string()
			.min(3, 'Login must be at least 3 characters')
			.required('Required'),
		password: Yup.string()
			.min(6, 'Password must be at least 6 characters')
			.required('Required'),
		}),
		onSubmit: async (values) => {
			try {
			  const checkUserResponse = await axios.post('http://localhost:3001/check-user', {
				login: values.login,
			  });
		  
			  if (checkUserResponse.data.exists) {
				const getUserId = await axios.post('http://localhost:3001/get-id', {
				  login: values.login,
				});
				
				if (getUserId.data.exists) {
				  setUserId(getUserId.data.id);
				  const userResponse = await axios.post('http://localhost:3001/get-user', {
					id: getUserId.data.id,
				  });
				  
				  if (userResponse.data) {
					localStorage.setItem('userName', userResponse.data.name);
					setUserName(userResponse.data.name); // Обновляем имя в контексте
				  }
				  
				  localStorage.setItem('authToken', getUserId.data.id.toString());
				  login(getUserId.data.id.toString()); // Передаем токен в login
				  navigate('/my_storage');
				} else {
				  alert('Произошла ошибка на сервере');
				}
			  } else {
				alert('Пользователь не существует');
			  }
			} catch(error) {
			  console.error('Ошибка при логировании', error);
			  alert('Произошла ошибка при логировании');
			}
		},
	});

	return( 
		<form className={style.logInContainer} onSubmit={formik.handleSubmit}>
			<label className={style.logInLabel} htmlFor="login">Логин</label>
			<input
			className={style.logInInput}
			type="text"  
			id="login"
			name="login"
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
			value={formik.values.login}
			/>
			{formik.touched.login && formik.errors.login ? (
			<div>{formik.errors.login}</div>
			) : null}
			
			<label className={style.logInLabel} htmlFor="password">Пароль</label>
			<input 
			type="text"
			className={style.logInInput}
			id="password"
			name="password"
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
			value={formik.values.password}
			/>
			{formik.touched.password && formik.errors.password ? (
			<div>{formik.errors.password}</div>
			) : null}
			
			<button className={style.buttonLogIn} type = "submit">Войти</button>
		</form>
	)
};

export default LogInForm;