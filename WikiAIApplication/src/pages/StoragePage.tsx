import container from "../StyleContainer/Container.module.css"
import style from "./StoragePage.module.css"
import Storage from "../components/StoragePage/StoragePage"

const StoragePage = () => {
    return (
    	<div className={style.storagePage}>
    		<div className={container.container + ' ' + style.containerStoragePage}>
				<Storage />
        	</div>
      	</div>
    )
  };

export default StoragePage