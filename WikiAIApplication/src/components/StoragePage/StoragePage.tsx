import style from "./StoragePage.module.css"
import Article from "../Article/Article"


function StoragePage () {
    return(
        <>
        <div className={style.storagePageWrapper}>
            <div className={style.storagePageImage}></div>
            <input type="text" className={style.storagePageSearch}/>
            <button className={style.storagePageButtonSearch}>Поиск</button>
        </div>
            
        <div className={style.storagePageMenu}>
            <div className={style.storagePagePanel}>
                <div className={style.catalogStoragePagePanel}>
                    <h3 className={style.catalogHeader}>Тематика:</h3>
                    <div className={style.catalogSubject}>
                        <span className={style.catalogTextSubject}>История</span>
                        <span className={style.catalogTextSubject}>Космология</span>
                        <span className={style.catalogTextSubject}>Биология</span>
                        <span className={style.catalogTextSubject}>Математика</span>
                        <span className={style.catalogTextSubject}>Программирование</span>
                        <span className={style.catalogTextSubject}>Дизайн</span>
                        <span className={style.catalogTextSubject}>Социология</span>
                        <span className={style.catalogTextSubject}>Философия</span>
                        <span className={style.catalogTextSubject}>Машиностроение</span>
                        <span className={style.catalogTextSubject}>Мехатроника</span>
                        <span className={style.catalogTextSubject}>Кулинария</span>
                        <span className={style.catalogTextSubject}>Медицина</span>
                    </div>
                </div>
                <div className={style.catalogStoragePagePanel}>
                    <h3 className={style.catalogHeader}>Тематика:</h3>
                    <div className={style.catalogSubject}>
                        <span className={style.catalogTextSubject}>История</span>
                        <span className={style.catalogTextSubject}>Космология</span>
                        <span className={style.catalogTextSubject}>Биология</span>
                        <span className={style.catalogTextSubject}>Математика</span>
                        <span className={style.catalogTextSubject}>Программирование</span>
                        <span className={style.catalogTextSubject}>Дизайн</span>
                        <span className={style.catalogTextSubject}>Социология</span>
                        <span className={style.catalogTextSubject}>Философия</span>
                        <span className={style.catalogTextSubject}>Машиностроение</span>
                        <span className={style.catalogTextSubject}>Мехатроника</span>
                        <span className={style.catalogTextSubject}>Кулинария</span>
                        <span className={style.catalogTextSubject}>Медицина</span>
                    </div>
                </div>
            </div>
            <div className={style.storagePageList}>
                <Article/>
            </div>                
        </div>
        </>   
    );
};

export default StoragePage;