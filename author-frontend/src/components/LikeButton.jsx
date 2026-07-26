import { useState } from "react";
import { useNavigate } from "react-router";
import { like } from "../api/posts.js";
import style from "../styles/components/LikeButton.module.css";

function LikeButton({ postLikes, isLiked, postId }) {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(postLikes);
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const result = await like(postId);
      setLikes(result.totalPostLikes);
      setLiked(Boolean(result.isLiked));
    } catch (err) {
      navigate("/log-in");
      console.error(err);
    }
  };

  return (
    <div className={style["like-wrapper"]}>
      <button
        type="button"
        aria-label="Like button"
        aria-pressed={liked}
        onClick={handleClick}
        className={`${style["like-btn"]} ${liked ? style["like-btn--liked"] : ""}`}
      >
        <i className={`fa-solid fa-heart ${style["like-btn__icon"]}`}></i>
        <span className={style["like-btn__count"]}>{likes}</span>
      </button>
    </div>
  );
}

export default LikeButton;
