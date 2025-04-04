import style from "./MyStoragePage.module.css"
import Article from "../Article/Article"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '../../Context/UserContext'

interface Article {
    id: number;
    title: string;
    content: string;
  }

function MyStorage () {
    const { userId } = useUser(); // Получаем userId из контекста
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      if (!userId) {
        setLoading(false);
        return;
    }

    const fetchArticles = async () => {
      try {
        const response = await axios.get<Article[]>(`http://localhost:3001/my-articles?userId=${userId}`);
        setArticles(response.data);
        setError(null);
      } catch (err) {
        console.error('Ошибка при загрузке статей:', err);
        setError('Не удалось загрузить статьи');
      } finally {
        setLoading(false);
      }
    };

      fetchArticles();
    }, [userId]);

    if (loading) {
      return <div>Загрузка...</div>;
    }

    if (error) {
      return <div style={{ color: 'red' }}>{error}</div>;
    }


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
                </div>
                <div className={style.storagePageList}>
                    <Article/>
                    <Article/>
                    <Article/>
                    <Article/>
                </div>
            </div>
        </>
    );
};

export default MyStorage;