import style from "./Logln.module.css";
import container from "../../StyleContainer/Container.module.css"

const NotFoundPage = () => {
    return( 
    <div className = {style.notFoundPage}>
      <div className = {container.container}>
         <div className = {style.mainTitle}>404 Not Found</div>
      </div>
    </div>
    )
  };

export default NotFoundPage