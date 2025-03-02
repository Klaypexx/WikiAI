import { useState } from 'react';
import style from "../ArticlePage/ArticlePage.module.css"

const ArticlePage = () => {
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className={style.articlePage}>
      <h1 className={style.articleTitle}>Название статьи</h1>
      <div className={style.articleContent}>
        <p>
          Это текст статьи. Здесь может быть много информации, которая относится к теме статьи.
          Например, это может быть руководство, новость или аналитический материал.
        </p>
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

      {/* Список комментариев */}
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