import style from "./SignUp.module.css"
import container from "../../StyleContainer/Container.module.css"

function SignUp() {
    return(
        <div className={style.signUp}>
            <div className={container.container}>
                <form className={style.signUpContainer}>
                    <label className={style.signUpLabel}>Ваше имя:</label>
                    <input type="text" className={style.signUpInput}/>

                    <label className={style.signUpLabel}>Логин:</label>
                    <input type="text" className={style.signUpInput}/>

                    <label className={style.signUpLabel}>Пароль:</label>
                    <input type="text" className={style.signUpInput}/>

                    <label className={style.signUpLabel}>Почта:</label>
                    <input type="text" className={style.signUpInput}/>

                    <button className={style.buttonSignUp}>Зарегистрироваться</button>
                </form>
            </div>
        </div>
    );
}

export default SignUp;