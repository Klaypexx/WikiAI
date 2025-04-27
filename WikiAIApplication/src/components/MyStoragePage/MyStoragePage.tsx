import style from "./MyStoragePage.module.css"
import Article from "../Article/Article"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useUser } from '../../Context/UserContext'

interface Article {
    id: number;
    title: string;
    text: string;
    themes?: string[];
    preview_path?: string;
  }

function MyStorage () {
    const { userId } = useUser(); // Получаем userId из контекста
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
      if (!userId) {
        setLoading(false);
        return;
    }

    const fetchArticles = async () => {
      try {
        const response = await axios.get<Article[]>(`http://localhost:3001/my-articles?userId=${userId}`);
        setArticles(response.data);
        setFilteredArticles(response.data); // Изначально показываем все статьи
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

    // Фильтрация статей по выбранной теме и поисковому запросу
    useEffect(() => {
      let filtered = [...articles];
      
      if (selectedTheme) {
          filtered = filtered.filter(article => 
              article.themes?.includes(selectedTheme)
          );
      }
      
      if (searchQuery) {
          filtered = filtered.filter(article =>
              article.title.toLowerCase().includes(searchQuery.toLowerCase())
          );
      }
      
      setFilteredArticles(filtered);
    }, [selectedTheme, articles, searchQuery]);

    const handleThemeClick = (theme: string) => {
        setSelectedTheme(prevTheme => prevTheme === theme ? null : theme);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    };

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
                <input 
                  type="text" 
                  className={style.storagePageSearch}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Поиск по названию статьи"
                />
                {/* <input type="text" className={style.storagePageSearch}/>
                <button className={style.storagePageButtonSearch}>Поиск</button> */}
            </div>
            <div className={style.storagePageMenu}>
                <div className={style.storagePagePanel}>
                    <div className={style.catalogStoragePagePanel}>
                        <h3 className={style.catalogHeader}>Тематика:</h3>
                        <div className={style.catalogSubject}>
                          {[
                              "История", "Технологии", "Косметология", "Биология", "Математика",
                              "Программирование", "Наука", "Дизайн", "Социология", "Философия",
                              "Машиностроение", "Мехатроника", "Кулинария", "Медицина",
                              "Здоровье", "Образование"
                            ].map(theme => (
                                <span 
                                    key={theme}
                                    className={`${style.catalogTextSubject} ${
                                        selectedTheme === theme ? style.activeTheme : ''
                                    }`}
                                    onClick={() => handleThemeClick(theme)}
                                >
                                    {theme}
                                </span>
                          ))}
                        </div>
                    </div>
                </div>
                <div className={style.storagePageList}>
                  {filteredArticles.length > 0 ? (
                        filteredArticles.map(article => (
                            <Article
                                key={article.id}
                                id={article.id}
                                title={article.title}
                                text={article.text}
                                themes={article.themes || []}
                                previewPath={article.preview_path}
                            />
                        ))
                    ) : (
                        <div>Нет статей по выбранной тематике</div>
                  )}
                </div>
            </div>
        </>
    );
};

export default MyStorage;