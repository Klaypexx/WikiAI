import React from 'react';
import style from "./ArticleForm.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FieldArray} from 'formik';
import * as Yup from 'yup';

interface ArticleFormValues {
  title: string;
  content: string;
  themes: string[];
  previewImage: File | null;
}

const WriteArticleForm: React.FC = () => {
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

  const onSubmit = (values: ArticleFormValues, actions: FormikHelpers<ArticleFormValues>) => {
    console.log('Form data', values);
    // Здесь можно добавить логику для отправки данных на сервер
    actions.setSubmitting(false);
  };

  const themes = [
    { value: 'technology', label: 'Технологии' },
    { value: 'science', label: 'Наука' },
    { value: 'health', label: 'Здоровье' },
    { value: 'education', label: 'Образование' },
    { value: 'history', label: 'История' },
    { value: 'cosmetology', label: 'Косметология' },
    { value: 'biology', label: 'Биология' },
    { value: 'mathematics', label: 'Математика' },
    { value: 'programming', label: 'Программирование' },
    { value: 'design', label: 'Дизайн' },
    { value: 'sociology', label: 'Социология' },
    { value: 'phylosofy', label: 'Философия' },
    { value: 'construct', label: 'Машиностроение' },
    { value: 'Mechatronics', label: 'Мехатроника' },
    { value: 'cooking', label: 'Кулинария' },
    { value: 'medicine', label: 'Медицина' },
  ];

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
                    <FieldArray name="themes">
                        {({ }) => (
                            <div className={style.themesWrapper}>
                                <div className="themes-list">
                                    {themes.map((theme) => (
                                        <div key={theme.value} className="theme-item">
                                            <Field
                                                type="checkbox"
                                                name="themes"
                                                value={theme.value}
                                                id={theme.value}
                                            />
                                            <label htmlFor={theme.value}>{theme.label}</label>
                                        </div>
                                     ))}
                                </div>
                                 <ErrorMessage name="themes" component="div" className={style.errorMsg} />
                            </div>
                        )}
                    </FieldArray>
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