import style from "./Header.module.css"
import container from "../../StyleContainer/Container.module.css"
import Menu from "../Menu/Menu"
import icon from "../../resources/HeaderImg/WikiAI.png"

function Header() {
    return(
        <div className={style.header}>
            <div className={container.container}>
                <div className={style.headerMain}>
                    <img src={icon} alt="WikiAI" className={style.header_icon}/>
                    <Menu/>
                </div>
            </div>
        </div>
    );
}

export default Header;