import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { getPostData } from "../../helper/common";

const postResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1200 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1199, min: 992 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 991, min: 768 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 0 },
    items: 1,
  },
};

const PostsData = ({ posts, userData, onSetData, type }) => {
  const [likeLoader, setLikeLoader] = useState(false);
  const [bookmarkLoader, setBookmarkLoader] = useState(false);
  const [commentLoader, setCommentLoader] = useState(false);

  const [comment, setComment] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);

  const likeHandler = async () => {
    const likeData = {
      likeId: userData._id,
      likeName: userData.userName,
      likeImg: userData.image,
    };

    setLikeLoader(true);
    const res = await fetch(`${process.env.baseUrl}/api/posts/likes`, {
      method: "PUT",
      body: JSON.stringify({ postId: posts._id, likeData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setLikeLoader(false);
    if (data.status) {
      if (type === "BM") {
        const userRes = await fetch(
          `${process.env.baseUrl}/api/posts/${userData._id}`
        );
        const postsData = await userRes.json();
        onSetData(postsData.data);
        return;
      }

      const postData = await getPostData();
      onSetData(postData.data);
    }
  };

  const bookMarkHandler = async () => {
    setBookmarkLoader(true);
    const res = await fetch(`${process.env.baseUrl}/api/posts/save`, {
      method: "PUT",
      body: JSON.stringify({ postId: posts._id, userId: userData._id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setBookmarkLoader(false);
    if (data.status) {
      if (type === "BM") {
        const userRes = await fetch(
          `${process.env.baseUrl}/api/posts/${userData._id}`
        );
        const postsData = await userRes.json();
        onSetData(postsData.data);
        return;
      }

      const postData = await getPostData();
      debugger;
      onSetData(postData.data);
    }
  };

  const addCommentHandler = async () => {
    if (!comment || comment.trim() == "") {
      return toast.error("Please enter comment");
    }

    const commentData = {
      commentId: userData._id,
      comments: comment,
      commentName: userData.userName,
    };

    setCommentLoader(true);
    const res = await fetch(
      `${process.env.baseUrl}/api/posts/add_comment`,
      {
        method: "PUT",
        body: JSON.stringify({ postId: posts._id, commentData }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    setCommentLoader(false);
    if (data.status) {
      setComment("");
      setCommentToggle(false);

      const postData = await getPostData();
      onSetData(postData.data);
    } else {
      return toast.error(data.message);
    }
  };

  return (
    <>
      <div>
        <div className="insta_main_head mb-3 d-flex justify-content-between">
          <div className="col-10 d-flex align-items-center">
            <div className="p-1 insta_mainh_img">
              <img
                src={posts.userImg}
                alt="inst-cont"
                className="img-fluid rounded-circle h-100"
              />
            </div>
            <div className="ps-2 insta_mainh_con">
              <h6 className="mb-1">{posts.userName}</h6>
              <p className="mb-0">{posts.location}</p>
            </div>
          </div>
          <div className="col-1 logo dropdown">
            <button
              className="btn p-0 fs-5"
              data-bs-toggle="dropdown"
              data-bs-display="static"
              aria-expanded="false"
            >
              <i className="bi bi-three-dots-vertical"></i>
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link
                  href={`/profile/${posts.userId}`}
                  className="dropdown-item"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {posts.file.length > 1 ? (
          <Carousel responsive={postResponsive} showDots={true} arrows>
            {posts.file.map((pImg) => (
              <>
                {pImg.split(".").pop() == "mp4" ? (
                  <div className="rounded-4 insta_main_img w-100 h-100">
                    <video width="100%" height="100%" autoPlay muted loop>
                      <source src={pImg} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="rounded-4 insta_main_img w-100 h-100">
                    <img src={pImg} className="img-fluid w-100 h-100" />
                  </div>
                )}
              </>
            ))}
          </Carousel>
        ) : (
          <>
            {posts.file[0].split(".").pop() == "mp4" ? (
              <div className="rounded-4 insta_main_img me-2">
                <video width="100%" height="100%" autoPlay muted loop>
                  <source src={posts.file[0]} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="rounded-4 insta_main_img me-2">
                <img src={posts.file[0]} className="img-fluid w-100" />
              </div>
            )}
          </>
        )}
        <div className="insta_main_con mt-3">
          <div className="logo d-flex justify-content-between">
            <div className="d-flex">
              {posts.like.filter((v) => v.likeId == userData._id).length > 0 ? (
                <button
                  className="btn ms-3 p-0"
                  disabled={likeLoader}
                  onClick={likeHandler}
                >
                  <i className="bi bi-heart-fill text-danger"></i>
                </button>
              ) : (
                <button
                  className="btn ms-3 p-0"
                  disabled={likeLoader}
                  onClick={likeHandler}
                >
                  <i className="bi bi-heart"></i>
                </button>
              )}
              <button
                className="btn ms-3 p-0"
                onClick={() => setCommentToggle(!commentToggle)}
              >
                <i className="bi bi-chat"></i>
              </button>
              <button
                className="btn ms-3 p-0"
                data-bs-toggle="modal"
                data-bs-target="#share"
              >
                <i className="bi bi-send"></i>
              </button>
            </div>
            <div>
              <div className="me-3">
                {posts.bookmark.filter((v) => v == userData._id).length > 0 ? (
                  <button
                    className="btn p-0"
                    disabled={bookmarkLoader}
                    onClick={bookMarkHandler}
                  >
                    <i className="bi bi-bookmark-fill text-primary"></i>
                  </button>
                ) : (
                  <button
                    className="btn p-0"
                    disabled={bookmarkLoader}
                    onClick={bookMarkHandler}
                  >
                    <i className="bi bi-bookmark"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="img_con mt-3 d-flex justify-content-between">
            {posts.like.length > 0 && (
              <div className="d-flex ms-3">
                <div className="img_1 rounded-3">
                  <img
                    src={posts.like[0].likeImg}
                    className="img-fluid h-100"
                  />
                </div>
                {posts.like
                  .filter((fil, ind) => ind !== 0 && ind < 4)
                  .map((likeV) => (
                    <div className="img rounded-3">
                      <img src={likeV.likeImg} className="img-fluid h-100" />
                    </div>
                  ))}
              </div>
            )}
            {posts.like.length > 0 && (
              <div className="me-3">
                <p>
                  liked{" "}
                  <span className="fw-bold">
                    {posts.like[posts.like.length - 1].likeName}
                  </span>{" "}
                  {posts.like.length - 1 > 0 && (
                    <>
                      {" "}
                      and{" "}
                      <span className="fw-bold">
                        {posts.like.length - 1} more
                      </span>
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
          <div className="text mt-3">
            {posts.comments.length > 0 && (
              <div className="comment-scroll">
                {[...posts.comments].reverse().map((comData) => (
                  <p>
                    <span className="fw-bold">{comData.commentName}</span>{" "}
                    {comData.comments}
                  </p>
                ))}
              </div>
            )}
            {commentToggle && (
              <div className="com_input d-flex justify-content-between mt-2">
                <div className="w-100 pe-3">
                  <input
                    type="text"
                    placeholder="Add Comments"
                    className="w-100 h-100 p-2 border border-top-0 border-start-0 border-end-0 border-secondary border-1"
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="me-3">
                  <button
                    className="btn btn-warning text-white px-3"
                    onClick={addCommentHandler}
                    disabled={commentLoader}
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PostsData;
