import style from "./LogIn.module.css"
import container from "../../StyleContainer/Container.module.css"

function LogIn() {
    return(
        <div className={style.logIn}>
            <div className={container.container}>
                <form className={style.logInContainer}>
                    <label className={style.logInLabel}>Логин</label>
                    <input type="text" className={style.logInInput}/>

                    <label className={style.logInLabel}>Пароль</label>
                    <input type="text" className={style.logInInput}/>

                    <button className={style.buttonLogIn}>Войти</button>
                </form>
            </div>
        </div>
    );
}

export default LogIn;