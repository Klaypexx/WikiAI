import style from "./SignUpForm.module.css";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignUpForm = () => {
    const formik = useFormik({
        initialValues: {
          name: '',
          login: '',
          password: '',
          email: '',
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .min(1, 'Name must be at least 1 character')
            .required('Required'),
          login: Yup.string()
            .min(3, 'Login must be at least 3 characters')
            .required('Required'),
          password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
        }),
        onSubmit: (values) => {
          // Здесь вы можете обработать отправку формы, например, отправить данные на сервер
          console.log('Form submitted with values:', values);
        },
      });

    return(
        <form className={style.signUpContainer} onSubmit={formik.handleSubmit}>
        <label className={style.signUpLabel} htmlFor="name">Ваше имя:</label>
        <input 
          type="text" 
          className={style.signUpInput}
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <div>{formik.errors.name}</div>
        ) : null}

        <label className={style.signUpLabel} htmlFor="login">Логин:</label>
        <input
          type="text"
          className={style.signUpInput}
          id="login"
          name="login"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.login}
        />
        {formik.touched.login && formik.errors.login ? (
          <div>{formik.errors.login}</div>
        ) : null}

        <label className={style.signUpLabel} htmlFor="password">Пароль:</label>
        <input
          type="text"
          className={style.signUpInput}
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <label className={style.signUpLabel} htmlFor="email">Почта:</label>
        <input
          className={style.signUpInput}
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <button className={style.buttonSignUp} type="submit">Зарегистрироваться</button>
    </form>
    )
};

export default SignUpForm