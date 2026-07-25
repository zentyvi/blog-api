import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { useParams } from "react-router";
import { getUserInfo, deleteUser } from "../api/users";
import { removeToken } from "../api/auth";
import Loader from "../components/Loader";
import UserProfileItems from "../components/UserProfileItems";
import style from "../styles/pages/UserProfilePage.module.css";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [isContextOpened, setIsContextOpened] = useState(false);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [navActive, setNavActive] = useState("coms");
  const [loading, setLoading] = useState(true);
  const uc = useContext(UserContext);
  const { userId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const result = await getUserInfo(userId);
        setUser(result);
        if (uc?.user?.id === result.id) {
          setIsMyProfile(true);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId, uc]);

  const handleContextClick = () => {
    setIsContextOpened(() => !isContextOpened);
    const closeMenu = (e) => {
      if (e.target.classList.contains(style["overlay"])) {
        setIsContextOpened(false);
        document.removeEventListener("click", closeMenu);
      }
    };
    document.addEventListener("click", closeMenu);
  };

  const handleLogOut = () => {
    if (confirm("Are you sure that you want to log out?")) {
      removeToken();
      uc.setUser(null);
      window.location.reload();
    }
  };

  const handleDeletion = async () => {
    try {
      if (
        confirm(
          "Are you sure that you want to delete this account? All your comments and likes are going to be deleted as well.",
        )
      ) {
        await deleteUser(uc.user.id);
        removeToken();
        uc.setUser(null);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNavClick = (value) => {
    setNavActive(value);
  };

  const contextMenu = (
    <div className={style["context-menu"]}>
      <button
        type="button"
        className={`${style["context-menu__item"]} ${style["context-menu__item--danger"]}`}
        onClick={handleLogOut}
      >
        <i className="fa-solid fa-right-from-bracket"></i> Log out
      </button>
      <button
        type="button"
        className={`${style["context-menu__item"]} ${style["context-menu__item--danger"]}`}
        onClick={handleDeletion}
      >
        <i className="fa-solid fa-trash"></i> Delete
      </button>
    </div>
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <main className={style["profile-page"]}>
      <header className={style["profile-card"]}>
        <div className={style["profile-card__info"]}>
          <div className="avatar">
            <i className="fa-solid fa-user"></i>
          </div>

          <div className={style["profile-card__details"]}>
            <div className={style["profile-card__username-wrapper"]}>
              <h2 className={style["profile-card__username"]}>
                @{user.username}
              </h2>
              {isMyProfile && (
                <span className={style["profile-card__badge"]}>You</span>
              )}
            </div>

            <div aria-label="User's stats" className={style["profile-stats"]}>
              <div className={style["profile-stats__item"]}>
                <span className={style["profile-stats__label"]}>Likes</span>
                <span className={style["profile-stats__value"]}>
                  {user.likedPosts.length}
                </span>
              </div>
              <div className={style["profile-stats__item"]}>
                <span className={style["profile-stats__label"]}>Comments</span>
                <span className={style["profile-stats__value"]}>
                  {user.comments.length}
                </span>
              </div>
            </div>
            {isMyProfile && (
              <div className={style["menu-button"]}>
                <button
                  onClick={handleContextClick}
                  type="button"
                  aria-label="Action menu"
                  aria-expanded={isContextOpened}
                >
                  {" "}
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
                {isContextOpened ? (
                  <>
                    <div className={style["overlay"]}></div>
                    {contextMenu}
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>

        <nav className={style["profile-nav"]}>
          <ul className={style["profile-nav__list"]}>
            <li className={style["profile-nav__item"]}>
              <button
                type="button"
                className={`${style["profile-nav__btn"]} ${
                  navActive === "likes" ? style["profile-nav__btn--active"] : ""
                }`}
                onClick={() => handleNavClick("likes")}
              >
                Likes
              </button>
            </li>
            <li className={style["profile-nav__item"]}>
              <button
                type="button"
                className={`${style["profile-nav__btn"]} ${
                  navActive === "coms" ? style["profile-nav__btn--active"] : ""
                }`}
                onClick={() => handleNavClick("coms")}
              >
                Comments
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <UserProfileItems
        likes={user.likedPosts}
        comments={user.comments}
        type={navActive}
      />
    </main>
  );
}

export default UserProfile;
