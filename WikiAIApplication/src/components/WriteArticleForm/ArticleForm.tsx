import React, { useState } from 'react';
import style from "./ArticleForm.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FieldArray} from 'formik';
import * as Yup from 'yup';
import { useUser } from '../../Context/UserContext'
import axios from 'axios';
import ThemeSelector from '../ThemesPanel/ThemesPanel';

interface ArticleFormValues {
  title: string;
  content: string;
  themes: number[];
  previewImage: File | null;
}

interface Theme {
  id: number;
  name: string;
  slug: string;
}

const WriteArticleForm: React.FC = () => {
  const { userId } = useUser(); // Получаем userId из контекста
  
  const initialValues: ArticleFormValues = {
    title: '',
    content: '',
    themes: [],
    previewImage: null,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Обязательное поле'),
    content: Yup.string().required('Обязательное поле'),
    themes: Yup.array().of(Yup.string()).min(1, 'Выберите хотя бы одну тему'),
  });

  const onSubmit = async (values: ArticleFormValues, actions: FormikHelpers<ArticleFormValues>) => {
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      if (userId === null) {
        console.log("Автор не отправлен");
      }
      else
      {
        console.log("Автор отправлен");
        formData.append('author', userId.toString());
      }
      formData.append('themes', values.themes.join(','));
      if (values.previewImage) {
        formData.append('preview', values.previewImage);
      }

      const response = await axios.post('http://localhost:3001/post-article', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        alert('Статья успешно опубликована!');
        actions.resetForm();
      }
    } catch (error) {
      console.error('Ошибка при отправке статьи:', error);
      alert('Произошла ошибка при публикации статьи');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className={style.pageСontainer}>
          <h1>Заполните статью</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
          {({ setFieldValue, values }) => (
            <Form>
              <div className={style.articleFormСontainer}>
                  <div className={style.formContainer}>
                      <div className={style.formWrapper}>
                          <div className="form-group">
                              <label htmlFor="previewImage" className={style.subformLabel}>Превью статьи</label>
                              <div
                                  className={style.imageUploadContainer}
                                  onClick={() => document.getElementById('hidden-file-input')?.click()}
                              >
                                  <img
                                      src={values.previewImage ? URL.createObjectURL(values.previewImage) : 'placeholder-image.jpg'}
                                      alt="Выберете картинку"
                                      className={style.previewImage}
                                  />
                                  <input
                                      id="hidden-file-input"
                                      type="file"
                                      name="previewImage"
                                      onChange={(event) => {
                                          setFieldValue("previewImage", event.currentTarget.files?.[0] || null);
                                      }}
                                      className={style.hiddenFileInput}
                                  />
                              </div>
                          </div>                      
                          <div className={style.subformContainer}>
                              <label htmlFor="title" className={style.subformLabel}>Название статьи</label>
                              <Field type="text" id="title" name="title" className={style.formTitleInput} />
                              <ErrorMessage name="title" component="div" className={style.errorMsg} />
                          </div>         
                          <div className={style.subformContainer}>
                              <label htmlFor="content" className={style.subformLabel}>Текст статьи</label>
                              <Field as="textarea" id="content" name="content" className={style.formTextInput} style={{ resize: 'none' }}/>
                              <ErrorMessage name="content" component="div" className={style.errorMsg} />
                          </div>
                      </div>
                  </div>
                  <div className={style.themesContainer}>
                    <label>Темы</label>
                    <ThemeSelector name="themes" />
                    <ErrorMessage name="themes" component="div" className={style.errorMsg} />
                  </div>
              </div>
              <button type="submit" className={style.submitButton}>
                  Опубликовать
              </button>
            </Form>
          )}
          </Formik> 
    </div>
  );
};

export default WriteArticleForm;