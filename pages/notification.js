import React, { useState } from "react";
import ResMenu from "../component/ResMenu";
import SideMenu from "../component/SideMenu";
import SugesstionsBox from "../component/SugesstionsBox";
import { withSessionSsr } from "../helper/ironSession";
import ResTopBar from "../component/ResTopBar";

const notification = ({ user, allUser, followData }) => {
  const [updFollow, setUpdFollow] = useState(followData);
  const [followLoader, setFollowLoader] = useState(false);
  const [remFollowLoader, setRemFollowLoader] = useState(false);

  const followHandler = async (followData, type) => {
    let followingData;
    if (type === "follower") {
      followingData = {
        followingId: followData.followerId,
        followingName: followData.followerName,
        followingimg: followData.followerimg,
      };
    } else {
      followingData = {
        followingId: followData.followingId,
        followingName: followData.followingName,
        followingimg: followData.followingimg,
      };
    }

    const followerData = {
      followerId: user._id,
      followerName: user.userName,
      followerimg: user.image,
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
        `${process.env.baseUrl}/api/follow/${user._id}`
      );
      const followResData = await followRes.json();
      setUpdFollow(followResData.data);
    }
  };

  const removeFollower = async (followData) => {
    const followerData = {
      followerId: followData.followerId,
      followerName: followData.followerName,
      followerimg: followData.followerImg,
    };

    const followingData = {
      followingId: user._id,
      followingName: user.userName,
      followingimg: user.image,
    };

    setRemFollowLoader(true);
    const res = await fetch(
      `${process.env.baseUrl}/api/follow/remove_follower`,
      {
        method: "PUT",
        body: JSON.stringify({ followingData, followerData }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    setRemFollowLoader(false);

    if (data.status) {
      const followRes = await fetch(
        `${process.env.baseUrl}/api/follow/${user._id}`
      );
      const followResData = await followRes.json();
      setUpdFollow(followResData.data);
    }
  };

  return (
    <>
      <div className="container-fluid main follow_page">
        <div className="row justify-content-evenly mt-5">
          <SideMenu user={user} />
          <div className="col-12 col-md-10 col-xl-6 bg-white p-5 rounded-4">
            <ResMenu user={user} />
            <ResTopBar />
            <div className="followings">
              <h5 className="fw-semibold text-secondary opacity-75 fs-3">
                Following
              </h5>
              {updFollow.following.length == 0 && (
                <h3 className="mt-3 ms-3 text-danger">No following data</h3>
              )}
              {updFollow.following.map((v) => (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center mt-3">
                    <div className="main_logo">
                      <img
                        src={v.followingimg}
                        alt="inst-cont"
                        className="img-fluid h-100"
                      />
                    </div>
                    <div className="ps-2 main_con">
                      <h6 className="mb-1">{v.followingName}</h6>
                    </div>
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => followHandler(v, "following")}
                    disabled={followLoader}
                  >
                    Unfollow
                  </button>
                </div>
              ))}
            </div>
            <div className="followings mt-4">
              <h5 className="fw-semibold text-secondary opacity-75 fs-3">
                Followers
              </h5>
              {updFollow.follower.length == 0 && (
                <h3 className="mt-3 ms-3 text-danger">No following data</h3>
              )}
              {updFollow.follower.map((v) => (
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <div className="d-flex align-items-center mt-3">
                    <div className="main_logo">
                      <img
                        src={v.followerimg}
                        alt="inst-cont"
                        className="img-fluid h-100"
                      />
                    </div>
                    <div className="ps-2 main_con">
                      <h6 className="mb-1">{v.followerName}</h6>
                    </div>
                  </div>
                  {!(
                    updFollow.following.filter(
                      (fil) => fil.followingId === v.followerId
                    ).length > 0
                  ) && (
                    <button
                      className="btn btn-link"
                      onClick={() => followHandler(v, "follower")}
                      disabled={followLoader}
                    >
                      Follow
                    </button>
                  )}
                  <button
                    className="btn btn-danger text-white"
                    onClick={() => removeFollower(v)}
                    disabled={remFollowLoader}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="d-md-none mb-4"></div>
          </div>
          <SugesstionsBox
            user={user}
            allUser={allUser}
            flData={updFollow}
            onSetUpdFollow={setUpdFollow}
          />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;

  if (user) {
    const userRes = await fetch(
      `${process.env.baseUrl}/api/userdata/${user.userId}`
    );
    const userData = await userRes.json();

    const allUserRes = await fetch(
      `${process.env.baseUrl}/api/userdata/all_user`
    );
    const allUser = await allUserRes.json();

    const followRes = await fetch(
      `${process.env.baseUrl}/api/follow/${userData.data._id}`
    );
    const followData = await followRes.json();
    return {
      props: {
        user: userData.data,
        allUser: allUser.data,
        followData: followData.data,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
});

export default notification;
