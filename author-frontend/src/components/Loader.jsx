import style from "../styles/components/Loader.module.css";

function Loader() {
  return (
    <div className={style.loaderWrapper}>
      <div className={style.loader}></div>
    </div>
  );
}

export default Loader;
