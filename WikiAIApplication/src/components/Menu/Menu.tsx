import style from "./Menu.module.css"

function Menu() {
    return(
        <nav className={style.menu}>
            <div className={style.menuPanel}>
                <a href="" className={style.buttonPanel}>Главная</a>
                <a href="#" className={style.buttonPanel}>Хранилище</a>
                <a href="#" className={style.buttonPanel}>Моё хранилище</a>
                <a href="#" className={style.buttonPanel}>Написать статью</a>   
                <a href="#" className={style.buttonPanel}>Поиск по LLM</a>
            </div>
            <div className={style.menuAuthorization}>
                <a href="#" className={style.buttonAuthorization}>Log In</a>
                <a href="#" className={style.buttonAuthorization}>Sign Up</a>
            </div>
        </nav>
    );
}

export default Menu;