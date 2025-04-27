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
                        WikiAI — это хранилище статей, которые пишут сами пользователи.<br/><br/>
                        Платформа предлагает интуитивно понятный интерфейс для создания и редактирования статей, что позволяет пользователям делиться своими знаниями и опытом.
                        <br/><br/>
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