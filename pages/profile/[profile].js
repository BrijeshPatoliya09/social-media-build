import React, { useState } from "react";
import UserEditModal from "../../component/profile/UserEditModal";
import { withSessionSsr } from "../../helper/ironSession";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TopBar from "../../component/TopBar";
import ResMenu from "../../component/ResMenu";
import ResTopBar from "../../component/ResTopBar";
import Link from "next/link";
import FollowModel from "../../component/profile/FollowModel";

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

const profile = ({ profUser, user, postData, followData, logUserData }) => {
  const [userData, setUserData] = useState(user);
  const [follow, setFollow] = useState(followData);

  const [follShow, setFollShow] = useState("");

  const [followLoader, setFollowLoader] = useState(false);

  const followHandler = async () => {
    const followingData = {
      followingId: userData._id,
      followingName: userData.userName,
      followingimg: userData.image,
    };
    const followerData = {
      followerId: logUserData._id,
      followerName: logUserData.userName,
      followerimg: logUserData.image,
    };

    setFollowLoader(true);
    const res = await fetch(`${process.env.baseUrl}/api/follow/following`, {
      method: "PUT",
      body: JSON.stringify({ followingData, followerData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setFollowLoader(false);
    if (data.status) {
      const followRes = await fetch(
        `${process.env.baseUrl}/api/follow/${logUserData._id}`
      );
      const followData = await followRes.json();
      setFollow(followData.data);
    }
  };

  return (
    <>
      <div className="container-fluid main follow_page search">
        <div className="row justify-content-evenly mt-5 px-lg-5">
          <TopBar profUser={profUser} user={profUser ? user : logUserData} />
          <div className="d-flex flex-wrap px-0">
            <div className="col-4 p-3">
              <div className="my-4 d-none d-lg-block bg-white rounded-4 p-3 prof_head py-5">
                <div className="image m-auto">
                  <img src={userData.image} className="img-fluid" />
                </div>
                <div className="content text-center mt-4 px-5">
                  <h2 className="mb-2">{userData.userName}</h2>
                  <h5 className="text-secondary opacity-75 mb-2">
                    {userData.name}
                  </h5>
                  {profUser ? (
                    <button
                      className="btn btn-light border"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_Prof"
                    >
                      Edit
                    </button>
                  ) : (
                    <div className="d-flex mt-4 justify-content-evenly">
                      {follow.following.filter(
                        (filt) => filt.followingId === userData._id
                      ).length > 0 ? (
                        <button
                          className="btn btn-secondary"
                          onClick={followHandler}
                          disabled={followLoader}
                        >
                          {followLoader ? (
                            <div
                              className="spinner-border text-light"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            <>Unfollow</>
                          )}
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary"
                          onClick={followHandler}
                          disabled={followLoader}
                        >
                          {followLoader ? (
                            <div
                              className="spinner-border text-light"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            <>Follow</>
                          )}
                        </button>
                      )}
                      <Link href="/search" className="btn btn-light border">
                        Message
                      </Link>
                    </div>
                  )}
                </div>
                <div className="bio px-5 mt-4">
                  <p className="text-secondary">{userData.bio || ""}</p>
                </div>
                <div className="mt-5 d-flex justify-content-center gap-5">
                  <div className="mt-3 text-center">
                    <h3 className="m-0">{postData.length}</h3>
                    <p className="ms-2 p-0">Post</p>
                  </div>
                  <div className="mt-3 text-center">
                    <button
                      className="btn p-0"
                      data-bs-toggle="modal"
                      data-bs-target="#followModel"
                      onClick={() =>
                        setFollShow({
                          data: follow.follower,
                          type: "Followers",
                        })
                      }
                    >
                      <h3 className="m-0">{follow.follower.length}</h3>
                      <p className="ms-2 p-0">Followers</p>
                    </button>
                  </div>
                  <div className="mt-3 text-center">
                    <button
                      className="btn p-0"
                      data-bs-toggle="modal"
                      data-bs-target="#followModel"
                      onClick={() =>
                        setFollShow({
                          data: follow.following,
                          type: "Following",
                        })
                      }
                    >
                      <h3 className="m-0">{follow.following.length}</h3>
                      <p className="ms-2 p-0">Following</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 col-lg-8 col-12">
              <ResMenu user={profUser ? user : logUserData} />
              <div className="my-4 bg-white rounded-4 p-4">
                <ResTopBar />
                <div className="prof_head_full d-lg-none px-lg-5">
                  <div className="d-flex justify-content-center align-items-baseline">
                    <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                      <div className="image">
                        <img src={userData.image} className="img-fluid" />
                      </div>
                      <div className="content mt-3 text-center">
                        <h2 className="mb-2">{userData.userName}</h2>
                        <h5 className="text-secondary opacity-75 mb-2">
                          {userData.name}
                        </h5>
                      </div>
                    </div>
                    <div className="col-8">
                      <div className="mt-5 d-flex justify-content-evenly">
                        <div className="mt-3 text-center">
                          <h3 className="m-0">{postData.length}</h3>
                          <p className="ms-2 p-0">Post</p>
                        </div>
                        <div className="mt-3 text-center">
                          <button
                            className="btn p-0"
                            data-bs-toggle="modal"
                            data-bs-target="#followModel"
                            onClick={() =>
                              setFollShow({
                                data: follow.follower,
                                type: "Followers",
                              })
                            }
                          >
                            <h3 className="m-0">
                              {follow.follower.length}
                            </h3>
                            <p className="ms-2 p-0">Followers</p>
                          </button>
                        </div>
                        <div className="mt-3 text-center">
                          <button
                            className="btn p-0"
                            data-bs-toggle="modal"
                            data-bs-target="#followModel"
                            onClick={() =>
                              setFollShow({
                                data: follow.following,
                                type: "Following",
                              })
                            }
                          >
                            <h3 className="m-0">
                              {follow.following.length}
                            </h3>
                            <p className="ms-2 p-0">Following</p>
                          </button>
                        </div>
                      </div>
                      {profUser ? (
                        <div className="d-flex mt-4 justify-content-center">
                          <button
                            className="btn btn-light border col-8"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_Prof"
                          >
                            Edit
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex mt-4 justify-content-center">
                          {/* <button className="btn btn-primary col-4 me-3">
                            Follow
                          </button> */}
                          {follow.following.filter(
                            (filt) => filt.followingId === userData._id
                          ).length > 0 ? (
                            <button
                              className="btn btn-secondary col-4 me-3"
                              onClick={followHandler}
                              disabled={followLoader}
                            >
                              Unfollow
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary col-4 me-3"
                              onClick={followHandler}
                              disabled={followLoader}
                            >
                              Follow
                            </button>
                          )}
                          <Link
                            href="/search"
                            className="btn btn-light border col-4"
                          >
                            Message
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="bio px-5 mt-4 text-center">
                    <p className="text-secondary">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      At enim veniam cumque? Tempora accusamus sint eum
                      voluptatem accusantium dolor debitis quibusdam ullam vitae
                      ad. Adipisci consectetur commodi nihil corporis iusto?
                    </p>
                  </div>
                  <hr className="my-4" />
                </div>
                <div className="prof_img">
                  {postData.map((posts) => (
                    <div className="col-6 col-md-4 p-2">
                      <div className="image position-relative">
                        {posts.file.length > 1 ? (
                          <Carousel
                            responsive={postResponsive}
                            showDots={true}
                            arrows
                          >
                            {posts.file.map((pImg) => (
                              <>
                                {pImg.split(".").pop() == "mp4" ? (
                                  <div className="ratio ratio-16x9">
                                    <video
                                      className="img-fluid ratio ratio-16x9 h-100"
                                      autoPlay
                                      muted
                                      loop
                                    >
                                      <source src={pImg} type="video/mp4" />
                                      Your browser does not support the video
                                      tag.
                                    </video>
                                  </div>
                                ) : (
                                  <div className="ratio ratio-16x9">
                                    <img
                                      src={pImg}
                                      className="img-fluid ratio ratio-16x9 h-100"
                                    />
                                  </div>
                                )}
                              </>
                            ))}
                          </Carousel>
                        ) : (
                          <>
                            {posts.file[0].split(".").pop() == "mp4" ? (
                              <div className="ratio ratio-16x9">
                                <video
                                  className="img-fluid ratio ratio-16x9 h-100"
                                  autoPlay
                                  muted
                                  loop
                                >
                                  <source
                                    src={posts.file[0]}
                                    type="video/mp4"
                                  />
                                  Your browser does not support the video tag.
                                </video>
                              </div>
                            ) : (
                              <div className="ratio ratio-16x9">
                                <img
                                  src={posts.file[0]}
                                  className="img-fluid ratio ratio-16x9 h-100"
                                />
                              </div>
                            )}
                          </>
                        )}
                        <div className="position-absolute like-comment">
                          <ul
                            className="list-unstyled d-flex gap-4 fs-3 m-0"
                            style={{ height: "100%" }}
                          >
                            <li>
                              <i className="bi bi-heart-fill"></i>{" "}
                              {posts.like.length}
                            </li>
                            <li>
                              <i className="bi bi-chat-fill"></i>{" "}
                              {posts.comments.length}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-md-none mb-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserEditModal userData={user} onSetUserData={setUserData} />
      <FollowModel followData={follShow} />
    </>
  );
};

export const getServerSideProps = withSessionSsr(async ({ req, query }) => {
  const user = req.session.user;
  const profId = query.profile;

  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  if (profId === user.userId) {
    const userRes = await fetch(
      `${process.env.baseUrl}/api/userdata/${profId}`
    );
    const userData = await userRes.json();

    const postRes = await fetch(`${process.env.baseUrl}/api/posts/gets_posts`);
    const postData = await postRes.json();
    const userPost = postData.data.filter((fil) => fil.userId === profId);

    const followRes = await fetch(
      `${process.env.baseUrl}/api/follow/${userData.data._id}`
    );
    const followData = await followRes.json();
    return {
      props: {
        profUser: true,
        user: userData.data,
        postData: userPost,
        followData: followData.data,
      },
    };
  } else {
    const logUserRes = await fetch(
      `${process.env.baseUrl}/api/userdata/${user.userId}`
    );
    const logUserData = await logUserRes.json();
    const userRes = await fetch(
      `${process.env.baseUrl}/api/userdata/${profId}`
    );
    const userData = await userRes.json();
    if (!userData.status) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }
    const postRes = await fetch(`${process.env.baseUrl}/api/posts/gets_posts`);
    const postData = await postRes.json();
    const userPost = postData.data.filter((fil) => fil.userId === profId);

    const followRes = await fetch(
      `${process.env.baseUrl}/api/follow/${logUserData.data._id}`
    );
    const followData = await followRes.json();
    return {
      props: {
        profUser: false,
        logUserData: logUserData.data,
        user: userData.data,
        postData: userPost,
        followData: followData.data,
      },
    };
  }
});

export default profile;
