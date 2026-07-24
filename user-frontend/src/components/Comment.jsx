import { useState, useContext } from "react";
import { UserContext } from "../App";
import { deleteComment } from "../api/posts";
import style from "../styles/components/Comment.module.css";

function Comment({ comment }) {
  const [menuOpened, setMenuOpened] = useState(false);
  const uc = useContext(UserContext);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(comment.content);
    setMenuOpened(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure that you want to delete this comment?")) {
      try {
        await deleteComment(comment.id);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const contextMenu = (
    <div className={style["contextMenu"]}>
      <button
        type="button"
        className={style["contextMenu__item"]}
        onClick={handleCopy}
      >
        <i className="fa-solid fa-copy"></i> Copy
      </button>
      {uc?.user?.id === comment.author.id ? (
        <button
          type="button"
          className={`${style["contextMenu__item"]} ${style["contextMenu__item--danger"]}`}
          onClick={handleDelete}
        >
          <i className="fa-solid fa-trash"></i> Delete
        </button>
      ) : null}
    </div>
  );

  return (
    <div className={style["comment"]}>
      <div className={style["comment__header"]}>
        <div className={style["comment__authorInfo"]}>
          <div className="avatar">
            <i className="fa-solid fa-user"></i>
          </div>
          <span className="username">@{comment.author.username}</span>
          <span className={style["comment__date"]}>
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </span>
        </div>

        <div className={style["comment__actions"]}>
          <button
            type="button"
            className={style["comment__menuBtn"]}
            aria-label="Action menu"
            aria-expanded={menuOpened}
            onClick={() => {
              setMenuOpened(() => !menuOpened);
              const closeMenu = (e) => {
                if (e.target.classList.contains(style["overlay"])) {
                  setMenuOpened(false);
                  document.removeEventListener("click", closeMenu);
                }
              };
              document.addEventListener("click", closeMenu);
            }}
          >
            <i className="fa-solid fa-ellipsis"></i>
          </button>

          {menuOpened ? (
            <>
              <div className={style["overlay"]}></div>
              {contextMenu}
            </>
          ) : null}
        </div>
      </div>

      <div className={style["comment__body"]}>
        <p className={style["comment__text"]}>{comment.content}</p>
      </div>
    </div>
  );
}

export default Comment;
