import { Link } from "react-router";
import style from "../styles/pages/ErrorPage.module.css";

function ErrorPage() {
  return (
    <main className={style["error-page"]}>
      <div className="gradient-banner"></div>
      <div className="gradient-banner bottom"></div>

      <div className={style["error-card"]}>
        <h1 className={style["error-title"]}>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved</p>
        <Link to="/" className="btn btn--primary">
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default ErrorPage;
