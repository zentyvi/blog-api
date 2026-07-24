import { Link } from "react-router";
import style from "../styles/pages/AboutPage.module.css";

function AboutPage() {
  return (
    <main className={style["about-page"]}>
      <article className={style["about-card"]}>
        <header className={style["about-card__header"]}>
          <h1 className={style["about-card__title"]}>About This Project</h1>
          <p className={style["about-card__subtitle"]}>
            A full-stack RESTful Blog application built as part of The Odin
            Project curriculum.
          </p>
        </header>

        <section className={style["about-section"]}>
          <h2>Project Overview</h2>
          <p>
            This website serves as the reader-facing frontend client for a
            decoupled Blog API. The goal of this project is to demonstrate a
            clear separation of concerns between a Node.js REST API backend and
            a modern React single-page application (SPA).
          </p>
        </section>

        <section className={style["about-section"]}>
          <h2>Tech Stack</h2>
          <div className={style["tech-grid"]}>
            <div className={style["tech-card"]}>
              <h3>Frontend</h3>
              <ul>
                <li>React & React Router</li>
                <li>CSS Modules (Custom Styling)</li>
                <li>Fetch API / Axios</li>
              </ul>
            </div>

            <div className={style["tech-card"]}>
              <h3>Backend</h3>
              <ul>
                <li>Node.js & Express</li>
                <li>Prisma ORM</li>
                <li>PostgreSQL</li>
                <li>JWT (JSON Web Tokens)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className={style["about-section"]}>
          <h2>Key Features</h2>
          <ul className={style["features-list"]}>
            <li>
              <i className="fa-solid fa-check"></i>
              <span>User Authentication & Protected Routes with JWT</span>
            </li>
            <li>
              <i className="fa-solid fa-check"></i>
              <span>Full CRUD operations for comments and posts</span>
            </li>
            <li>
              <i className="fa-solid fa-check"></i>
              <span>
                Interactive features (Like buttons, context action menus)
              </span>
            </li>
          </ul>
        </section>

        <footer className={style["about-card__footer"]}>
          <a
            href="https://www.theodinproject.com/lessons/node-path-nodejs-blog-api"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary"
          >
            <i className="fa-solid fa-book-open"></i> Odin Project Assignment
          </a>
          <Link to="/" className="btn btn--primary">
            Explore Articles
          </Link>
        </footer>
      </article>
    </main>
  );
}

export default AboutPage;
