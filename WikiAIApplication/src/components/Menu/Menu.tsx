import style from "./Menu.module.css"
import { Link } from 'react-router-dom';

function Menu() {
    return(
        <nav className={style.menu}>
            <div className={style.menuPanel}>
                <Link to = "/" className={style.buttonPanel}>Главная</Link>
                <Link to = "/storage" className={style.buttonPanel}>Хранилище</Link>
                <Link to = "/my_storage" className={style.buttonPanel}>Моё хранилище</Link>
                <Link to = "/write_state" className={style.buttonPanel}>Написать статью</Link>   
                <Link to = "/LLMSearch" className={style.buttonPanel}>Поиск по LLM</Link>
            </div>
            <div className={style.menuAuthorization}>
                <Link to = "/LogIn" className={style.buttonAuthorization}>Log In</Link>
                <Link to = "/SignUp" className={style.buttonAuthorization}>Sign Up</Link>
            </div>
        </nav>
    );
}

export default Menu;