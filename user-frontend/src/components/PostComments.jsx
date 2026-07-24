import { useContext, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../App";
import { comment } from "../api/posts";
import Comment from "./Comment";
import FormInput from "./FormInput";
import style from "../styles/components/PostComments.module.css";

function PostComments({ comments, postId }) {
  const [textarea, setTextarea] = useState("");
  const [error, setError] = useState(null);
  const uc = useContext(UserContext);

  const comms = comments.map((c) => {
    return <Comment key={c.id} comment={c} />;
  });

  const l = comments.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await comment(postId, textarea);
      if (result.errors) {
        setError(result.errors);
      } else {
        setTextarea("");
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setTextarea(e.target.value);
  };

  return (
    <section className={style["comments"]}>
      <header className={style["comments__header"]}>
        <h2 className={style["comments__title"]}>
          {l} {l === 1 ? "Comment" : "Comments"}
        </h2>
      </header>

      <div className={style["comments__form-wrapper"]}>
        {uc?.user ? (
          <form onSubmit={handleSubmit} className={style["comments__form"]}>
            <FormInput
              type="textarea"
              label="Add a comment"
              name="comment"
              id="comment"
              value={textarea}
              placeholder="I really like this article because..."
              onChange={handleChange}
              isRequired={true}
              error={error?.comment}
            />
            <div className={style["comments__submit-btn"]}>
              <button type="submit" className="btn btn--primary">
                Submit
              </button>
            </div>
          </form>
        ) : (
          <div className={style["comments__auth-prompt"]}>
            <p>You must log in to add comments.</p>
            <Link to="/log-in" className="btn btn--secondary">
              Log in
            </Link>
          </div>
        )}
      </div>

      {l > 0 ? (
        <div className={style["comments__list"]}>{comms}</div>
      ) : (
        <div className={style["comments__empty"]}>
          <h3>There's no comments yet</h3>
          <p>Be the first!</p>
        </div>
      )}
    </section>
  );
}

export default PostComments;
