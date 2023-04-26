import React, { useState } from "react";
import SideMenu from "../component/SideMenu";
import ResMenu from "../component/ResMenu";
import SugesstionsBox from "../component/SugesstionsBox";
import { withSessionSsr } from "../helper/ironSession";
import PostsData from "../component/posts/PostsData";
import ResTopBar from "../component/ResTopBar";

const bookmark = ({ postsData, allUser, followData, userData }) => {
  const [updFollow, setUpdFollow] = useState(followData);
  const [data, setData] = useState(postsData);
  return (
    <>
      <div className="container-fluid main follow_page">
        <div className="row justify-content-evenly mt-5">
          <SideMenu user={userData} />
          <div className="col-12 col-md-10 col-xl-6 bg-white p-5 rounded-4">
            <ResMenu user={userData} />
            <ResTopBar />
            <div className="insta_content mt-4 px-md-5 d-flex justify-content-center align-items-center ">
              {!data ||
                (data.length == 0 && (
                  <div className="text-secondary text-center">
                    <h1>
                      <i className="bi bi-bookmark-x fs-1"></i>
                    </h1>
                    <h2 className="mt-2">
                      No bookmark added
                    </h2>
                  </div>
                ))}
              {data &&
                [...data].reverse().map((posts) => (
                  <>
                    <PostsData
                      posts={posts}
                      userData={postsData[0].userInfo[0]}
                      onSetData={setData}
                      type="BM"
                    />
                    <hr className="mt-4" />
                  </>
                ))}
            </div>
            <div className="d-md-none mb-4"></div>
          </div>
          <SugesstionsBox
            user={userData}
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

    const postsRes = await fetch(
      `${process.env.baseUrl}/api/posts/${user.userId}`
    );
    const postsData = await postsRes.json();

    const allUserRes = await fetch(
      `${process.env.baseUrl}/api/userdata/all_user`
    );
    const allUser = await allUserRes.json();

    const followRes = await fetch(
      `${process.env.baseUrl}/api/follow/${user.userId}`
    );
    const followData = await followRes.json();
    return {
      props: {
        userData: userData.data,
        postsData: postsData.data,
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

export default bookmark;
