import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getSinglePost } from "../api/posts";
import Loader from "../components/Loader";
import LikeButton from "../components/LikeButton";
import PostComments from "../components/PostComments";
import style from "../styles/pages/SingleArticlePage.module.css";

function SingleArticlePage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams("postId");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const post = await getSinglePost(postId);
        setPost(post);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  const handleBack = () => {
    history.back();
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={style["post-page"]}>
      <div className={style["post-page__navigation"]}>
        <button
          type="button"
          aria-label="Back"
          onClick={handleBack}
          className={style["post-page__back-btn"]}
        >
          <i className="fa-solid fa-arrow-left-long"></i>
        </button>
      </div>

      <article className={style["post"]}>
        <header className={style["post__header"]}>
          <div className={style["post__meta"]}>
            <h1 className={style["post__title"]}>{post.title}</h1>
            <div className={style["post__info"]}>
              <span aria-label="Created at">
                {new Date(
                  post.publishedAt || post.createdAt,
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
              <span> by </span>
              <span aria-label="Author's username" className="username">
                @{post.author.username}
              </span>
            </div>
          </div>

          <div className={style["post__actions"]}>
            <LikeButton
              postId={postId}
              postLikes={post._count.likedBy}
              isLiked={Boolean(post.likedBy[0])}
            />
          </div>
        </header>

        <div className={style["post__content"]}>
          <p className={style["post__text"]}>{post.content}</p>
        </div>
      </article>

      <PostComments comments={post.comments} postId={postId} />
    </main>
  );
}

export default SingleArticlePage;
