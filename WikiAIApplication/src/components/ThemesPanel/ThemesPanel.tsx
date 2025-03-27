import React, { useEffect, useState } from 'react';
import { Field, useField, useFormikContext } from 'formik';
import axios from 'axios';
import style from './ThemesPanel.module.css';

interface Theme {
  id: number;
  name: string;
  slug: string;
}

interface ThemeSelectorProps {
  name: string;
  //selectedThemes: number[];
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ name }) => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setFieldValue } = useFormikContext();
  const [field] = useField<number[]>(name);

  // Запрос тем только при первом рендере
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get<Theme[]>('http://localhost:3001/themes', {
          // Добавляем отмену запроса при размонтировании
          //cancelToken: new axios.CancelToken(c => c)
        });
        
        setThemes(response.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('Ошибка при загрузке тем:', err);
          setError('Не удалось загрузить список тем');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();

    // Функция очистки для отмены запроса
    return () => {
      axios.CancelToken.source().cancel('Компонент размонтирован');
    };
  }, []); // Пустой массив зависимостей = только при монтировании

  const handleChange = (themeId: number) => {
    const currentValues = field.value || [];
    const newValues = currentValues.includes(themeId)
      ? currentValues.filter(id => id !== themeId)
      : [...currentValues, themeId];
    
    setFieldValue(name, newValues);
  };

  if (loading && themes.length === 0) {
    return <div className={style.loading}>Загрузка тем...</div>;
  }

  if (error) {
    return <div className={style.error}>{error}</div>;
  }

  return (
    <div className={style.themesContainer}>
      <div className={style.themesGrid}>
        {themes.map(theme => (
          <div key={theme.id} className={style.themeItem}>
            <input
              type="checkbox"
              id={`theme-${theme.id}`}
              name={name}
              value={theme.id}
              checked={field.value?.includes(theme.id) || false}
              onChange={() => handleChange(theme.id)}
              className={style.themeCheckbox}
            />
            <label 
              htmlFor={`theme-${theme.id}`} 
              className={style.themeLabel}
            >
              {theme.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ThemeSelector);