import { useMemo, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PostModel from "../component/posts/modal/PostModel";
import PostsData from "../component/posts/PostsData";
import StoryBox from "../component/story/StoryBox";
import { withSessionSsr } from "../helper/ironSession";
import SugesstionsBox from "../component/SugesstionsBox";
import SideMenu from "../component/SideMenu";
import ResMenu from "../component/ResMenu";
import StoryModal from "../component/story/StoryModal";
import ShowStoryModel from "../component/story/ShowStoryModel";
import ResTopBar from "../component/ResTopBar";
import { getStoryData } from "../helper/common";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1400 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1399, min: 1200 },
    items: 5,
  },
  laptop: {
    breakpoint: { max: 1199, min: 992 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 991, min: 768 },
    items: 5,
  },
  mobile: {
    breakpoint: { max: 767, min: 576 },
    items: 5,
  },
  smallMobile: {
    breakpoint: { max: 575, min: 0 },
    items: 4,
  },
};

export default function Home({
  user,
  postData,
  allUser,
  followData,
  storyData,
  home,
}) {
  const [data, setData] = useState(postData);
  const [updFollow, setUpdFollow] = useState(followData);
  const [updStory, setUpdStory] = useState(storyData);

  const [showStory, setShowStory] = useState("");
  const [userSelf, setUserSelf] = useState(false);

  const nextStoryHandler = async (data) => {
    setUserSelf(false);
    const storyData = await getStoryData()
    setUpdStory(storyData.data);

    // const nextIndex = updStory.indexOf(data) + 1;
    // if (updStory[nextIndex]) {
    //   setShowStory(updStory[nextIndex]);
    // }
  };

  return (
    <>
      <div className="container-fluid main">
        <div className="row justify-content-evenly mt-5">
          <SideMenu home={home} user={user} />
          <div className="col-12 col-md-10 col-xl-6 bg-white rounded-4">
            <ResMenu home={home} user={user} />
            <div className="insta_head pt-4">
              <ResTopBar />
              <Carousel
                arrows
                autoPlaySpeed={3000}
                containerClass="container-with-dots"
                draggable
                focusOnSelect={false}
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={responsive}
                rewind={false}
                rewindWithAnimation={false}
                rtl={false}
                shouldResetAutoplay
                showDots={false}
                sliderClass=""
                slidesToSlide={1}
                swipeable
              >
                {updStory.filter((fil) => fil.userId == user._id).length > 0 ? (
                  updStory
                    .filter((fil) => fil.userId == user._id)
                    .map((v, i) => (
                      <div
                        className="m-auto px-1 text-center"
                        data-bs-toggle="modal"
                        data-bs-target="#showStoryModal"
                        onClick={() => {
                          setUserSelf(true);
                          setShowStory(v);
                        }}
                      >
                        <div className="position-relative">
                          <img
                            src={v.userData[0].image}
                            className="img-fluid h-100 rounded-4"
                            style={{
                              border: "3px solid #fe004d",
                              padding: "2px",
                              width: "75px",
                              height: "75px",
                            }}
                          />
                          <button
                            className="btn p-0 position-absolute fs-3"
                            data-bs-toggle="modal"
                            data-bs-target="#storyModal"
                            style={{
                              top: "57%",
                              right: "22%",
                              color: "#fe004d",
                            }}
                          >
                            <i class="bi bi-plus-circle-fill"></i>
                          </button>
                        </div>
                        <small className="mt-1 fs-6">Your Story</small>
                      </div>
                    ))
                ) : (
                  <div className="m-auto px-1 text-center">
                    <div>
                      <button
                        className="rounded-4"
                        data-bs-toggle="modal"
                        data-bs-target="#storyModal"
                        style={{
                          border: "3px solid #fe004d",
                          padding: "2px",
                          width: "75px",
                          height: "75px",
                        }}
                      >
                        <i className="bi bi-plus-lg fs-2 fw-bold"></i>
                      </button>
                    </div>
                    <small className="mt-1 fs-6">Add Your Story</small>
                  </div>
                )}
                {updStory
                  .filter((fil) => fil.userId != user._id)
                  .map((v, i) => (
                    <StoryBox
                      logUserId={user._id}
                      key={v._id}
                      onSetUserSelf={setUserSelf}
                      onSetShowStory={setShowStory}
                      data={v}
                    />
                  ))}
              </Carousel>
            </div>
            <hr className="mt-4" />
            <div className="insta_content mt-4 px-md-5 ">
              {[...data].map((posts) => (
                <>
                  <PostsData
                    key={posts._id}
                    posts={posts}
                    userData={user}
                    onSetData={setData}
                  />
                  <hr className="mt-4" />
                </>
              ))}
              {/* <div className="slider">
                <div className="head d-flex justify-content-between align-items-center">
                  <h6 className="fw-bold text-secondary opacity-75">
                    Suggestions for you
                  </h6>
                  <a href="#" className="btn text-primary fw-bold">
                    See all
                  </a>
                </div>
                <div className="img">
                  <Carousel
                    arrows
                    autoPlaySpeed={3000}
                    containerClass="container-with-dots"
                    draggable
                    focusOnSelect={false}
                    infinite
                    keyBoardControl
                    minimumTouchDrag={80}
                    pauseOnHover
                    renderArrowsWhenDisabled={false}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    responsive={responsiveCard}
                    rewind={false}
                    rewindWithAnimation={false}
                    rtl={false}
                    shouldResetAutoplay
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                  >
                    <div className="card">
                      <div className="px-5 py-3 d-flex justify-content-center">
                        <img
                          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                          className="img-fluid"
                          style={{
                            borderRadius: "50%",
                            width: "120px",
                            height: "120px",
                          }}
                        />
                      </div>
                      <div className="card-body text-center">
                        <h5 className="card-title">Yuvraj Singh</h5>
                        <p className="card-text mb-2">
                          Followed by Dr A.R. Lathiya
                        </p>
                        <a href="#" className="btn btn-primary">
                          Follow
                        </a>
                      </div>
                    </div>
                    <div className="card">
                      <div className="px-5 py-3 d-flex justify-content-center">
                        <img
                          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                          className="img-fluid"
                          style={{
                            borderRadius: "50%",
                            width: "120px",
                            height: "120px",
                          }}
                        />
                      </div>
                      <div className="card-body text-center">
                        <h5 className="card-title">Yuvraj Singh</h5>
                        <p className="card-text mb-2">
                          Followed by Dr A.R. Lathiya
                        </p>
                        <a href="#" className="btn btn-primary">
                          Follow
                        </a>
                      </div>
                    </div>
                    <div className="card">
                      <div className="px-5 py-3 d-flex justify-content-center">
                        <img
                          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                          className="img-fluid"
                          style={{
                            borderRadius: "50%",
                            width: "120px",
                            height: "120px",
                          }}
                        />
                      </div>
                      <div className="card-body text-center">
                        <h5 className="card-title">Yuvraj Singh</h5>
                        <p className="card-text mb-2">
                          Followed by Dr A.R. Lathiya
                        </p>
                        <a href="#" className="btn btn-primary">
                          Follow
                        </a>
                      </div>
                    </div>
                    <div className="card">
                      <div className="px-5 py-3 d-flex justify-content-center">
                        <img
                          src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                          className="img-fluid"
                          style={{
                            borderRadius: "50%",
                            width: "120px",
                            height: "120px",
                          }}
                        />
                      </div>
                      <div className="card-body text-center">
                        <h5 className="card-title">Yuvraj Singh</h5>
                        <p className="card-text mb-2">
                          Followed by Dr A.R. Lathiya
                        </p>
                        <a href="#" className="btn btn-primary">
                          Follow
                        </a>
                      </div>
                    </div>
                  </Carousel>
                </div>
              </div>
              <hr className="mt-4" /> */}
            </div>
            <div className="d-md-none mb-5"></div>
          </div>
          <SugesstionsBox
            user={user}
            allUser={allUser}
            flData={updFollow}
            onSetUpdFollow={setUpdFollow}
          />
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="share"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-body">
              <div className="d-flex modal_head me-2">
                <div className="col-11 text-center">
                  <h4>Share</h4>
                </div>
                <div className="col-1 d-flex justify-content-end">
                  <i
                    className="bi bi-pencil-square fw-bold fs-4"
                    style={{ color: "#fe004d" }}
                  ></i>
                </div>
              </div>
              <div className="modal_con">
                <div className="input d-flex mt-3 mb-4 border-bottom border-dark border-1 mb-3">
                  <i className="bi bi-search fs-5 fw-bold ps-2 me-2"></i>
                  <input
                    type="text"
                    className="border-0 fs-5 w-100"
                    placeholder="search"
                  />
                </div>
                <div className="image d-flex flex-wrap gap-3">
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="img mb-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/24.jpg"
                        className="img-fluid"
                      />
                    </div>
                    <h6 style={{ fontSize: "12px" }}>James carter</h6>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="img mb-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/12.jpg"
                        className="img-fluid"
                      />
                    </div>
                    <h6 style={{ fontSize: "12px" }}>Dameon Drill</h6>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="img mb-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/34.jpg"
                        className="img-fluid"
                      />
                    </div>
                    <h6 style={{ fontSize: "12px" }}>James carter</h6>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="img mb-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/5.jpg"
                        className="img-fluid"
                      />
                    </div>
                    <h6 style={{ fontSize: "12px" }}>James Shelby</h6>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="img mb-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/30.jpg"
                        className="img-fluid"
                      />
                    </div>
                    <h6 style={{ fontSize: "12px" }}>Michel Jordenr</h6>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="img mb-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/14.jpg"
                        className="img-fluid"
                      />
                    </div>
                    <h6 style={{ fontSize: "12px" }}>Kevin Bills</h6>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="img mb-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/18.jpg"
                        className="img-fluid"
                      />
                    </div>
                    <h6 style={{ fontSize: "12px" }}>Mikel carter</h6>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="img mb-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/22.jpg"
                        className="img-fluid"
                      />
                    </div>
                    <h6 style={{ fontSize: "12px" }}>Harley james</h6>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="img mb-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/21.jpg"
                        className="img-fluid"
                      />
                    </div>
                    <h6 style={{ fontSize: "12px" }}>Charlie Cons</h6>
                  </div>
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ flexDirection: "column" }}
                  >
                    <div className="img mb-2">
                      <img
                        src="https://randomuser.me/api/portraits/men/40.jpg"
                        className="img-fluid"
                      />
                    </div>
                    <h6 style={{ fontSize: "12px" }}>Suresh Parmar</h6>
                  </div>
                </div>
              </div>
              <div className="d-flex modal_foot justify-content-center mt-3 me-2">
                <button
                  type="button"
                  className="btn btn-primary py-3 px-4 ms-2"
                  style={{ fontSize: "14px" }}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PostModel
        userName={user.userName}
        userImg={user.image}
        userId={user._id}
        onSetData={setData}
      />

      <StoryModal user={user} onSetUpdStory={setUpdStory} />

      {useMemo(
        () => (
          <ShowStoryModel
            showStory={showStory}
            userId={user._id}
            onSetShowStory={setShowStory}
            onNextStory={nextStoryHandler}
            userSelf={userSelf}
          />
        ),
        [showStory]
      )}
    </>
  );
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;

  if (user) {
    const userRes = await fetch(
      `${process.env.baseUrl}/api/userdata/${user.userId}`
    );
    const userData = await userRes.json();

    const postRes = await fetch(`${process.env.baseUrl}/api/posts/gets_posts`);
    const postData = await postRes.json();

    const allUserRes = await fetch(
      `${process.env.baseUrl}/api/userdata/all_user`
    );
    const allUser = await allUserRes.json();

    const followRes = await fetch(
      `${process.env.baseUrl}/api/follow/${userData.data._id}`
    );
    const followData = await followRes.json();

    const storyRes = await fetch(`${process.env.baseUrl}/api/story/get_story`);
    const storyData = await storyRes.json();
    return {
      props: {
        home: true,
        user: userData.data,
        allUser: allUser.data,
        postData: postData.data,
        followData: followData.data,
        storyData: storyData.data,
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
