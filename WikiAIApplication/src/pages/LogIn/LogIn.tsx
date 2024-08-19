import style from "./LogIn.module.css"
import container from "../../StyleContainer/Container.module.css"
import LogInForm from "../../components/LogInForm/LogInForm";

function LogIn() {
    return(
        <div className={style.logIn}>
            <div className={container.container}>
                <LogInForm/>
            </div>
        </div>
    );
}

export default LogIn;