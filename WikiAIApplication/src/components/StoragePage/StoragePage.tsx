import style from "./StoragePage.module.css"
import Article from "../Article/Article"
import React, { useEffect, useState } from "react";

interface Article {
    id: number;
    title: string;
    text: string;
    themes?: string[];
    preview_path?: string;
}

function StoragePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await fetch('http://localhost:3001/articles'); // Используем /articles
          if (!response.ok) {
            throw new Error('Ошибка загрузки статей');
          }
          const data = await response.json();
          setArticles(data);
          setFilteredArticles(data);
          setError(null);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        } finally {
          setLoading(false);
        }
      };
    
      fetchArticles();
  }, []);

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
    return <div>Загрузка статей...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <div className={style.storagePageWrapper}>
        <div className={style.storagePageImage}></div>
        {/* <input type="text" className={style.storagePageSearch}/> */}
        <input 
          type="text" 
          className={style.storagePageSearch}
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Поиск по названию статьи"
        />
        {/* <button className={style.storagePageButtonSearch}>Поиск</button> */}
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
              <div>Нет статей по выбранной тематике или поисковому запросу</div>
          )}
        </div>                
      </div>
    </>   
  );
};

export default StoragePage;