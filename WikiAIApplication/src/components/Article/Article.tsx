import style from "./Article.module.css"
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ArticleProps {
    id: number;
    title: string;
    text: string;
    themes?: string[];
    previewPath?: string;
}

function Article({id, title, text, themes = [], previewPath}: ArticleProps) {
    //загружаем картинку
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    // Обрезаем текст до 200 символов и добавляем многоточие, если текст длиннее
    const truncatedText = text.length > 200 
    ? `${text.substring(0, 200)}...` 
    : text;

    useEffect(() => {
        if (previewPath) {
            // Заменяем все обратные слеши на прямые
            const normalizedPath = previewPath
                .replace(/\\/g, '/') // Заменяем \ на /
                .replace(/^.*\/uploads\/articles\//, ''); // Удаляем часть пути до uploads/articles/
            
            setImageUrl(`http://localhost:3001/uploads/articles/${normalizedPath}`);
        }
    }, [previewPath]);

    return (
        <div className={style.article} >
            <div className={style.backgroundArticle}>
                {imageUrl && (
                    <img 
                        src={imageUrl} 
                        alt="Article preview" 
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                )}
            </div>
            <div className={style.articleBase}>
                <Link to={`/article/${id}`} className={style.articleHeader}>{title}</Link>
                <p className={style.articleTheme}>{themes.join(" + ")}</p>                
            </div>
            <div className={style.articleDescription}>
                <p className={style.articleText}>{truncatedText}</p>
            </div>
        </div>
    );
}

export default Article;