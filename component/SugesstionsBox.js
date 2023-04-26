import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { use, useState } from "react";

const SugesstionsBox = ({ user, allUser, flData, onSetUpdFollow }) => {
  const [switchLoader, setSwitchLoader] = useState(false);
  const [followLoader, setFollowLoader] = useState(false);

  const router = useRouter();
  let data = Cookies.get("switch_tok");
  const switchData = data ? JSON.parse(data) : [];

  const switchHandler = async (swUserData) => {
    setSwitchLoader(true);
    const res = await fetch(`${process.env.baseUrl}/api/auth/logout`);
    const resData = await res.json();
    setSwitchLoader(false);
    if (resData.message) {
      Cookies.set("BT_TOKT24", swUserData.token);
      router.reload("/");
    }
  };

  const followHandler = async (followData) => {
    const followingData = {
      followingId: followData._id,
      followingName: followData.userName,
      followingimg: followData.image,
    };
    const followerData = {
      followerId: user._id,
      followerName: user.userName,
      followerimg: user.image,
    };

    setFollowLoader(true);
    const res = await fetch(
      `${process.env.baseUrl}/api/follow/following`,
      {
        method: "PUT",
        body: JSON.stringify({ followingData, followerData }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    setFollowLoader(false);
    if (data.status) {
      const followRes = await fetch(
        `${process.env.baseUrl}/api/follow/${user._id}`
      );
      const followData = await followRes.json();
      onSetUpdFollow(followData.data);
    }
  };

  const addAccountHandler = async () => {
    const res = await fetch(`${process.env.baseUrl}/api/auth/logout`);
    const resData = await res.json();
    if (resData.status) {
      router.push("/auth/login");
    }
  };

  return (
    <>
      <div
        className="col-3 d-xl-block user bg-white rounded-4 p-3"
        style={{ height: "min-content" }}
      >
        <div className="head d-flex justify-content-between align-items-center">
          <div
            className="d-flex align-items-center"
            onClick={() => router.push(`/profile/${user._id}`)}
          >
            <div className="logo text-dark">
              <img
                src={user.image}
                alt="inst-cont"
                className="img-fluid h-100"
              />
            </div>
            <div className="ps-2 con">
              <h6 className="mb-1">{user.userName}</h6>
              <p className="mb-0">{user.name}</p>
            </div>
          </div>
          <div style={{ fontSize: "12px" }}>
            <a
              className="btn text-primary"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Switch
            </a>
          </div>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item border-0">
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <hr className="mt-4" />
              <div className="accordion-body p-0">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item list-group-item-action">
                    <button
                      className="btn text-primary p-0"
                      onClick={addAccountHandler}
                    >
                      Add an aaccount
                    </button>
                  </li>
                  {switchData
                    .filter((fil) => fil.userId !== user._id)
                    .map((v) => (
                      <li className="list-group-item list-group-item-action switch_data">
                        <button
                          className="btn px-0"
                          onClick={() => switchHandler(v)}
                          disabled={switchLoader}
                        >
                          <div className="d-flex align-items-center">
                            <div className="main_logo">
                              <img
                                src={v.userImg}
                                alt="inst-cont"
                                className="img-fluid h-100"
                              />
                            </div>
                            <div className="ps-2 main_con">
                              <h6 className="mb-1">{v.userName}</h6>
                            </div>
                          </div>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-3" />

        <div className="main mt-3">
          <div className="head">
            <div className="d-flex justify-content-between align-items-center">
              <h6
                className="fw-bold text-secondary opacity-75"
                style={{ fontSize: "14px" }}
              >
                Suggestions for you
              </h6>
              <a
                href="#"
                className="btn text-black fw-bold"
                style={{ fontSize: "14px" }}
              >
                See all
              </a>
            </div>
          </div>
          <div className="content">
            {allUser
              .filter((filt) => filt._id !== user._id)
              .map((v) => (
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className="d-flex align-items-center mt-3"
                    onClick={() => router.push(`/profile/${v._id}`)}
                  >
                    <div className="main_logo">
                      <img
                        src={v.image}
                        alt="inst-cont"
                        className="img-fluid h-100"
                      />
                    </div>
                    <div className="ps-2 main_con">
                      <h6 className="mb-1">{v.userName}</h6>
                      <p className="mb-0">{v.name}</p>
                    </div>
                  </div>
                  <div>
                    {flData.following.filter(
                      (filt) => filt.followingId === v._id
                    ).length > 0 ? (
                      <button
                        className="btn text-secondary"
                        style={{ fontSize: "14px" }}
                        onClick={() => followHandler(v)}
                        disabled={followLoader}
                      >
                        Unfollow
                      </button>
                    ) : (
                      <button
                        className="btn text-primary"
                        style={{ fontSize: "14px" }}
                        onClick={() => followHandler(v)}
                        disabled={followLoader}
                      >
                        Follow
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SugesstionsBox;
