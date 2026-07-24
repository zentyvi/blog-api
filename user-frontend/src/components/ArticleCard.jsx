import { Link } from "react-router";
import style from "../styles/components/ArticleCard.module.css";

function ArticleCard({ post }) {
  return (
    <article className={style["card"]}>
      <Link to={`/posts/${post.id}`} aria-label={post.title}>
        <header className={style["card__header"]}>
          <span aria-label="Author's username" className={style["author"]}>
            @{post.author.username}
          </span>
          <h3>{post.title}</h3>
        </header>
        <div className={style["card__body"]}>
          <div className={style["card__content"]}>
            <p>{post.content}</p>
          </div>
          <div className={style["card__footer"]}>
            <div>
              <div className={style["card__likes"]}>
                <i className="fa-solid fa-heart"></i>
                <span aria-label="Likes number">{post._count.likedBy}</span>
              </div>
              <div className={style["card__comments"]}>
                <i className="fa-solid fa-message"></i>
                <span aria-label="Comments number">{post._count.comments}</span>
              </div>
            </div>
            <div className={style["separator"]}></div>
            <div className={style["card__date"]}>
              <span aria-label="Published at date">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ArticleCard;
