import style from "./LogInForm.module.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';

const LogInForm = () => {
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
        onSubmit: (values) => {
          // Здесь вы можете обработать отправку формы, например, отправить данные на сервер
          console.log('Form submitted with values:', values);
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