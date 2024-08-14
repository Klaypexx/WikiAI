import "./Body.css"
import "../../StyleContainer/Container.css"

function Body() {
    return(
        <div className="main">
            <div className="container">
                <div className="bodyMain">
                    <div className="backgroundMain"></div>
                    <div className="bodyMainText">
                        <h1 className="bodyTitle">Добро пожаловать в WikiAI</h1>
                        <p className="bodyText">
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