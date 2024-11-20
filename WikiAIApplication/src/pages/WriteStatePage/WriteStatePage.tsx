import React from 'react';
import style from "./WriteStatePage.module.css";
import WriteArticleForm from '../../components/WriteArticleForm/ArticleForm';

const WriteStatePage: React.FC = () => {
    return(
        <div className={style.pageContainer}>
            <WriteArticleForm />
        </div>
    );
};

export default WriteStatePage;