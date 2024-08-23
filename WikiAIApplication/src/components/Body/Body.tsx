import style from "./Body.module.css"
import container from "../../StyleContainer/Container.module.css"

function Body() {
    return(
        <div className={style.main}>
            <div className={container.container}>
                <div className={style.backgroundMain}>
                    <div className={style.bodyMainText}>
                        <h1 className={style.bodyTitle}>Добро пожаловать в WikiAI</h1>
                        <p className={style.bodyText}>
                        WikiAI — это хранилище статей, которые пишут сами пользователи. А помочь в написании, поиске статей может LLM.<br/><br/>
                        Платформа предлагает интуитивно понятный интерфейс для создания и редактирования статей, что позволяет пользователям делиться своими знаниями и опытом.
                        С помощью мощной языковой модели (LLM) пользователи могут легко находить нужную информацию, задавая вопросы и получая ответы на основе существующих статей.<br/><br/>
                        WikiAI способствует коллективному обучению и обмену знаниями, обеспечивая доступ к разнообразным темам и материалам. Каждый пользователь может не только искать
                        информацию, но и вносить свой вклад, создавая таким образом обширное и актуальное хранилище знаний.
                        </p>
                    </div>  
                </div>
            </div>
        </div>
    );
}

export default Body;