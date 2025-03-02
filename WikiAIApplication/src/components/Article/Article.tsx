import style from "./Article.module.css"
import { Link } from 'react-router-dom';

function Article() {
    return (
        <div className={style.article} >
            <div className={style.backgroundArticle}></div>
            <div className={style.articleBase}>
                <Link to = "/article" className={style.articleHeader}>Пажилая статья об искусственном интеллигентике</Link>
                <p className={style.articleTheme}>Набор тематик /пример: Медицина + мехатроника + биология/</p>                
            </div>
            <div className={style.articleDescription}>
                <p className={style.articleText}>Очень пажилое описание сие чуда и статьи впринципе
                    и я думаю тут очень много текста делать не надо,
                    чисто о том о чём статья + ознакомительные вопроса
                    чтобы заинтересовать читателя её прочитать.
                </p>
            </div>
        </div>
    );
}

export default Article;