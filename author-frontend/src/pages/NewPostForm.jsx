import { useState } from "react";
import { useNavigate } from "react-router";
import { createPost } from "../api/posts";
import FormInput from "../components/FormInput";
import Loader from "../components/Loader";
import style from "../styles/pages/Form.module.css";

function NewPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      title,
      content,
      published,
    };

    try {
      const result = await createPost(data);
      setError("");
      if (result.errors) {
        setError(result.errors);
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={style["auth-page"]}>
      <div className={style["auth-card"]}>
        <div className={style["auth-card__header"]}>
          <h2 className={style["auth-card__title"]}>Create post</h2>
          <p className={style["auth-card__subtitle"]}>Create your own post!</p>
        </div>

        <form onSubmit={handleSubmit} className={style["auth-form"]}>
          <FormInput
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isRequired={true}
            label="Title"
            error={error?.title}
          />

          <FormInput
            type="textarea"
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            isRequired={true}
            label="Content"
            error={error?.content}
          />

          <div className={style["auth-card__options"]}>
            <div className={style["auth-card__checkbox"]}>
              <div className={style["checkbox-wrapper"]}>
                <input
                  type="checkbox"
                  name="published"
                  id="published"
                  onChange={(e) => setPublished(e.target.checked)}
                />
                <label htmlFor="published" aria-hidden="true"></label>
              </div>
              <label htmlFor="published">Publish now</label>
            </div>
          </div>

          <div className={style["auth-form__submit"]}>
            <button type="submit" className="btn btn--primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default NewPostForm;
