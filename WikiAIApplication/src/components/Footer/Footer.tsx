import style from "./Footer.module.css"
import container from "../../StyleContainer/Container.module.css"
import icon from "../../resources/HeaderImg/WikiAI.png"

function Body() {
    return(
        <div className={style.footer}>
            <div className={container.container}>
                    <div className={style.footerMain}>
                        <img src={icon} alt="WikiAI" className={style.footer_icon} />
                        <div className={style.footerInfo}>
                            <h2 className={style.infoHeader}>Разработчики:</h2>
                            <p className={style.infoText}>
                                Черепов Даниил<br/>
                                Морозов Дмитрий<br/>
                                Шереметьев Павел
                            </p>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default Body;