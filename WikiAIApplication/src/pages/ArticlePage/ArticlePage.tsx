import { useState, useEffect } from 'react';
import style from "../ArticlePage/ArticlePage.module.css"
import { useParams } from 'react-router-dom';

interface ArticleData {
  id: number;
  title: string;
  text: string;
  themes?: string[];
  date_of_publication: string;
  author_id: number;
  rating: number;
}

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
        try {
            const response = await fetch(`http://localhost:3001/articles/${id}`);
            if (!response.ok) {
                throw new Error('Статья не найдена');
            }
            const data = await response.json();
            setArticle(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Неизвестная ошибка');
        } finally {
            setLoading(false);
        }
    };

    fetchArticle();
  }, [id]);

  const handleAddComment = () => {
      if (newComment.trim()) {
          setComments([...comments, newComment]);
          setNewComment('');
      }
  };

  if (loading) {
      return <div>Загрузка статьи...</div>;
  }

  if (error) {
      return <div>Ошибка: {error}</div>;
  }

  if (!article) {
      return <div>Статья не найдена</div>;
  }

  return (
    <div className={style.articlePage}>
        <h1 className={style.articleTitle}>{article.title}</h1>
        <div className={style.articleContent}>
            <p>{article.text}</p>
            {article.themes && article.themes.length > 0 && (
                <p>Темы: {article.themes.join(', ')}</p>
            )}
        </div>
        <div className={style.commentSection}>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Напишите ваш комментарий..."
                className={style.commentInput}
            />
            <button onClick={handleAddComment} className={style.commentButton}>
                Добавить комментарий
            </button>
        </div>

        <div className={style.commentList}>
            <h3>Комментарии ({comments.length})</h3>
            {comments.length > 0 ? (
                comments.map((comment, index) => (
                    <div key={index} className={style.commentItem}>
                        <p>{comment}</p>
                    </div>
                ))
            ) : (
                <p>Пока нет комментариев. Будьте первым!</p>
            )}
        </div>
    </div>
  );
};

export default ArticlePage;