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

interface Comment {
  id: number;
  userId: number;
  userName: string;
  text: string;
  createdAt?: string;
  rating?: number; // теперь это обязательное поле
  userVote?: number; // -1, 0 или 1
}

const ArticlePage = () => {
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<ArticleData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<{id: number, name: string} | null>(null);
  
    useEffect(() => {
        const checkAuth = async () => {
          const token = localStorage.getItem('authToken');
          if (token) {
            try {
              const response = await fetch('http://localhost:3001/check-auth', {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              
              if (response.ok) {
                const userData = await response.json();
                setIsAuthenticated(true);
                setCurrentUser({ id: userData.id, name: userData.name });
              }
            } catch (err) {
              console.error('Ошибка проверки авторизации:', err);
            }
          }
        };
      
        checkAuth();
        fetchArticle();
        fetchComments();
    }, [id]);

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

    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3001/articles/${id}/comments`);
        if (response.ok) {
          const data = await response.json();
          
          const commentsWithRating = await Promise.all(data.map(async (comment: Comment) => {
            try {
              // Добавляем userId в запрос, если пользователь авторизован
              const url = currentUser 
                ? `http://localhost:3001/comments/${comment.id}/rating?userId=${currentUser.id}`
                : `http://localhost:3001/comments/${comment.id}/rating`;
                
              const ratingResponse = await fetch(url);
              const ratingData = await ratingResponse.json();
              
              return {
                ...comment,
                rating: ratingData.totalRating || 0,
                userVote: ratingData.userGrade || 0
              };
            } catch (err) {
              console.error('Ошибка загрузки рейтинга:', err);
              return { ...comment, rating: 0, userVote: 0 };
            }
          }));
          
          setComments(commentsWithRating);
        }
      } catch (err) {
        console.error('Ошибка загрузки комментариев:', err);
      }
    };

    const handleVote = async (commentId: number, grade: number) => {
      if (!currentUser) return;
    
      try {
        const response = await fetch(`http://localhost:3001/comments/${commentId}/rate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          },
          body: JSON.stringify({
            userId: currentUser.id,
            grade: grade
          })
        });
    
        if (!response.ok) throw new Error('Ошибка сервера');
    
        // После успешного голосования обновляем комментарии
        await fetchComments(); // Просто перезагружаем комментарии с сервера
        
      } catch (err) {
        console.error('Ошибка:', err);
        alert('Не удалось проголосовать');
      }
    };

    const handleAddComment = async () => {
        if (!newComment.trim() || !currentUser) return;
      
        try {
          const response = await fetch(`http://localhost:3001/articles/${id}/comments`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
              text: newComment,
              userId: currentUser.id
            })
          });
      
          if (!response.ok) throw new Error('Ошибка сервера');
      
          const addedComment = await response.json();
          
          // Используем дату с сервера или генерируем локально
          setComments(prev => [{
            id: addedComment.id,
            userId: currentUser.id,
            userName: currentUser.name,
            text: addedComment.text,
            createdAt: addedComment.createdAt || new Date().toISOString() // Запасной вариант
          }, ...prev]);
          
          setNewComment('');
        } catch (err) {
          console.error('Ошибка:', err);
          alert('Не удалось добавить комментарий');
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
          {isAuthenticated ? (
            <>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Напишите ваш комментарий..."
                className={style.commentInput}
              />
              <button 
                onClick={handleAddComment} 
                className={style.commentButton}
                disabled={!newComment.trim()}
              >
                Добавить комментарий
              </button>
            </>
          ) : (
            <p>Для добавления комментария необходимо авторизоваться</p>
          )}
        </div>

        <div className={style.commentList}>
          <h3>Комментарии ({comments.length})</h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className={style.commentItem}>
                <p><strong>{comment.userName}</strong></p>
                <p>{comment.text}</p>
                <div className={style.commentRating}>
                  <button 
                    onClick={() => handleVote(comment.id, 1)}
                    disabled={!isAuthenticated || comment.userVote === 1}
                  >
                    ↑
                  </button>
                  <span>{comment.rating}</span>
                  <button 
                    onClick={() => handleVote(comment.id, -1)}
                    disabled={!isAuthenticated || comment.userVote === -1}
                  >
                    ↓
                  </button>
                </div>
                <p className={style.commentDate}>
                    {comment.createdAt ? new Date(comment.createdAt).toLocaleString() : 'Только что'}
                </p>
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