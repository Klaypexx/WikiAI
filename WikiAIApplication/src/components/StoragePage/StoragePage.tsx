import style from "./StoragePage.module.css"
import Article from "../Article/Article"
import { useEffect, useState } from "react";

interface ArticleData {
    id: number;
    title: string;
    text: string;
    date_of_publication: string;
    author_id: number;
    rating: number;
    themes?: string[];
}

function StoragePage() {
    const [articles, setArticles] = useState<ArticleData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
        const fetchArticles = async () => {
          try {
            const response = await fetch('http://localhost:3001/articles'); // Используем /articles
            if (!response.ok) {
              throw new Error('Ошибка загрузки статей');
            }
            const data = await response.json();
            setArticles(data);
          } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
          } finally {
            setLoading(false);
          }
        };
      
        fetchArticles();
      }, []);
  
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
            {articles.length > 0 ? (
              articles.map(article => (
                <Article 
                  key={article.id}
                  id={article.id}
                  title={article.title}
                  text={article.text}
                  themes={article.themes}
                />
              ))
            ) : (
              <div>Статьи не найдены</div>
            )}
          </div>                
        </div>
      </>   
    );
  };
// function StoragePage () {
//     return(
//         <>
//         <div className={style.storagePageWrapper}>
//             <div className={style.storagePageImage}></div>
//             <input type="text" className={style.storagePageSearch}/>
//             <button className={style.storagePageButtonSearch}>Поиск</button>
//         </div>
            
//         <div className={style.storagePageMenu}>
//             <div className={style.storagePagePanel}>
//                 <div className={style.catalogStoragePagePanel}>
//                     <h3 className={style.catalogHeader}>Тематика:</h3>
//                     <div className={style.catalogSubject}>
//                         <span className={style.catalogTextSubject}>История</span>
//                         <span className={style.catalogTextSubject}>Космология</span>
//                         <span className={style.catalogTextSubject}>Биология</span>
//                         <span className={style.catalogTextSubject}>Математика</span>
//                         <span className={style.catalogTextSubject}>Программирование</span>
//                         <span className={style.catalogTextSubject}>Дизайн</span>
//                         <span className={style.catalogTextSubject}>Социология</span>
//                         <span className={style.catalogTextSubject}>Философия</span>
//                         <span className={style.catalogTextSubject}>Машиностроение</span>
//                         <span className={style.catalogTextSubject}>Мехатроника</span>
//                         <span className={style.catalogTextSubject}>Кулинария</span>
//                         <span className={style.catalogTextSubject}>Медицина</span>
//                     </div>
//                 </div>
//                 <div className={style.catalogStoragePagePanel}>
//                     <h3 className={style.catalogHeader}>Тематика:</h3>
//                     <div className={style.catalogSubject}>
//                         <span className={style.catalogTextSubject}>История</span>
//                         <span className={style.catalogTextSubject}>Космология</span>
//                         <span className={style.catalogTextSubject}>Биология</span>
//                         <span className={style.catalogTextSubject}>Математика</span>
//                         <span className={style.catalogTextSubject}>Программирование</span>
//                         <span className={style.catalogTextSubject}>Дизайн</span>
//                         <span className={style.catalogTextSubject}>Социология</span>
//                         <span className={style.catalogTextSubject}>Философия</span>
//                         <span className={style.catalogTextSubject}>Машиностроение</span>
//                         <span className={style.catalogTextSubject}>Мехатроника</span>
//                         <span className={style.catalogTextSubject}>Кулинария</span>
//                         <span className={style.catalogTextSubject}>Медицина</span>
//                     </div>
//                 </div>
//             </div>
//             <div className={style.storagePageList}>
//                 <Article/>
//             </div>                
//         </div>
//         </>   
//     );
// };

export default StoragePage;