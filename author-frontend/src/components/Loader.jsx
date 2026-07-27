import { useEffect, useState } from "react";
import style from "../styles/components/Loader.module.css";

function Loader() {
  const [isWaitingLong, setIsWaitingLong] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsWaitingLong(true);
    }, 3000);
  }, []);

  return (
    <div className={style.loaderWrapper}>
      <div className={style.loader}></div>
      {isWaitingLong && (
        <p className={style.message}>
          This may take some time; <br />
          the server is starting up.
        </p>
      )}
    </div>
  );
}

export default Loader;
