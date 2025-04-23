import style from "./Menu.module.css"
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import { useEffect, useState } from 'react';

function Menu() {
    const { isAuthenticated, logout } = useAuth();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            // Получаем имя пользователя из localStorage
            const name = localStorage.getItem('userName');
            if (name) {
                setUserName(name);
            }
        }
    }, [isAuthenticated]);

    return(
        <nav className={style.menu}>
            <div className={style.menuPanel}>
                <Link to = "/" className={style.buttonPanel}>Главная</Link>
                <Link to = "/storage" className={style.buttonPanel}>Хранилище</Link>
                <Link to = "/my_storage" className={style.buttonPanel}>Моё хранилище</Link>
                <Link to = "/write_state" className={style.buttonPanel}>Написать статью</Link>   
            </div>
            {isAuthenticated ? ( // Условный рендеринг
                <div className={style.menuUserAuthorization}>
                <div className={style.menuUser}>{userName}</div>
                <button onClick={logout}>Выйти</button> {/* Кнопка выхода */}
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