import container from "../StyleContainer/Container.module.css"
import style from "./StoragePage.module.css"
import MyStorage from "../components/MyStoragePage/MyStoragePage"


const MyStoragePage = () => {
    return (
      <div className={style.storagePage}>
        <div className={container.container + ' ' + style.containerStoragePage}>
          <MyStorage />
        </div>
      </div>
    )
  };

export default MyStoragePage