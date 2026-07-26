import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getSinglePost, editPost, publishPost, deletePost } from "../api/posts";
import Loader from "../components/Loader";
import LikeButton from "../components/LikeButton";
import PostComments from "../components/PostComments";
import style from "../styles/pages/SingleArticlePage.module.css";
import FormInput from "../components/FormInput";

function SingleArticlePage() {
  const [post, setPost] = useState(null);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const { postId } = useParams("postId");
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const post = await getSinglePost(postId);
        setPost(post);
        setText(post.content);
        setTitle(post.title);
        setPublished(post.published);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        title,
        content: text,
      };
      const result = await editPost(postId, data);
      setError("");
      if (result.errors) {
        setError(result.errors);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      const result = await publishPost(postId);
      setPublished(result.published);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure that you want to delete this post?")) {
      try {
        await deletePost(postId);
        navigate("/", { replace: true });
      } catch (err) {
        console.error(err);
      }
    }
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

      <form className={style["post"]} onSubmit={handleSubmit}>
        <header className={style["post__header"]}>
          <div className={style["post__meta"]}>
            <FormInput
              isRequired={true}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              type="text"
              id="title"
              label="Title"
              error={error.title}
            />
            <div className={style["post__info"]}>
              <span>
                Created at:{" "}
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </span>
              <span aria-hidden="true"> | </span>
              <span>
                Published at:{" "}
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })
                  : "No"}
              </span>
              <span aria-hidden="true"> | </span>
              <span>
                Updated at:{" "}
                {new Date(post.updatedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                }) || "No"}
              </span>
            </div>
          </div>
        </header>

        <div className={style["post__content"]}>
          <FormInput
            type="textarea"
            name="content"
            isRequired={true}
            onChange={(e) => setText(e.target.value)}
            value={text}
            id="content"
            label="Content"
            error={error.content}
            rows={15}
          />
        </div>
        <div className={style["post__actions"]}>
          <div>
            <button type="submit" className="btn btn--primary">
              Save
            </button>
          </div>
          <div>
            <button type="button" className="btn" onClick={handlePublish}>
              {published ? "Unpublish" : "Publish"}
            </button>
          </div>
          <div>
            <button
              type="button"
              aria-label="Delete button"
              className="btn btn--danger"
              onClick={handleDelete}
            >
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </div>
          <LikeButton
            postId={postId}
            postLikes={post._count.likedBy}
            isLiked={Boolean(post.likedBy[0])}
          />
        </div>
      </form>

      <PostComments comments={post.comments} postId={postId} />
    </main>
  );
}

export default SingleArticlePage;
