import Comment from "./Comment";
import ArticleCard from "./ArticleCard";
import style from "../styles/components/UserProfileItems.module.css";

function UserProfileItems({ comments = [], likes = [], type }) {
  const isComs = type == "coms";

  const items = isComs
    ? comments.map((c) => {
        return <Comment key={c.id} comment={c} includeLink={true} />;
      })
    : likes.map((l) => {
        return <ArticleCard key={l.id} post={l} />;
      }) || [];

  const emptyMessage = isComs
    ? "This user hasn't written any comments yet"
    : "This user hasn't liked any posts yet";

  return (
    <div
      className={isComs ? style["profile__comments"] : style["profile__feed"]}
    >
      {items?.length > 0 ? (
        items
      ) : (
        <div className={style["profile__empty"]}>
          <h2>There is nothing</h2>
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}

export default UserProfileItems;
