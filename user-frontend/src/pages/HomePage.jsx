import { useState } from "react";
import { useEffect } from "react";
import { getPosts } from "../api/posts";
import Loader from "../components/Loader";
import ArticleCard from "../components/ArticleCard";
import style from "../styles/pages/HomePage.module.css";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const posts = await getPosts();
        setPosts(posts);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const articles = posts.map((p) => {
    return <ArticleCard key={p.id} post={p} />;
  });

  const l = posts.length;

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={style["homepage"]}>
      <header className={style["homepage__header"]}>
        <h2 className={style["homepage__title"]}>
          {l} {l === 1 ? "Article" : "Articles"}
        </h2>
      </header>
      <div className={style["homepage__content"]}>
        {l > 0 ? (
          <div className={style["homepage__feed"]}>{articles}</div>
        ) : (
          <div className={style["homepage__empty"]}>
            <h3>There's no published posts yet :&lt;</h3>
          </div>
        )}
      </div>
    </main>
  );
}

export default HomePage;
