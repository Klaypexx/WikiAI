import style from "./Menu.module.css"
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';

function Menu() {
    const { isAuthenticated, logout, userName } = useAuth();

    return(
        <nav className={style.menu}>
            <div className={style.menuPanel}>
                <Link to = "/" className={style.buttonPanel}>Главная</Link>
                <Link to = "/storage" className={style.buttonPanel}>Хранилище</Link>
                <Link to = "/my_storage" className={style.buttonPanel}>Моё хранилище</Link>
                <Link to = "/write_state" className={style.buttonPanel}>Написать статью</Link>   
            </div>
            {isAuthenticated ? (
                <div className={style.menuUserAuthorization}>
                    <div className={style.menuUser}>{userName}</div>
                    <button onClick={logout}>Выйти</button>
                </div>
            ) : (
                <div className={style.menuAuthorization}>
                    <Link to="/LogIn" className={style.buttonAuthorization}>Log In</Link>
                    <Link to="/SignUp" className={style.buttonAuthorization}>Sign Up</Link>
                </div>
            )}
        </nav>
    );
}

export default Menu;