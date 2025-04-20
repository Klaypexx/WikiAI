import style from "./Article.module.css"
import { Link } from 'react-router-dom';

interface ArticleProps {
    id: number;
    title: string;
    text: string;
    themes?: string[];
}

function Article({id, title, text, themes = []}: ArticleProps) {
    return (
        <div className={style.article} >
            <div className={style.backgroundArticle}></div>
            <div className={style.articleBase}>
                <Link to={`/article/${id}`} className={style.articleHeader}>{title}</Link>
                <p className={style.articleTheme}>{themes.join(" + ")}</p>                
            </div>
            <div className={style.articleDescription}>
                <p className={style.articleText}>{text}</p>
            </div>
        </div>
    );
}

export default Article;