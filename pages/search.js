import React from "react";
import TopBar from "../component/TopBar";
import { withSessionSsr } from "../helper/ironSession";
import ResMenu from "../component/ResMenu";
import ResTopBar from "../component/ResTopBar";

const Search = ({ user }) => {
  return (
    <>
      <div className="container-fluid search">
        <div className="row justify-content-evenly mx-3 mx-xl-5 mt-3">
          <TopBar user={user} />
          <div className="d-flex gap-2 p-0">
            <div className="my-4 col-12 col-xl-4 bg-white p-4 rounded-4">
              <ResMenu user={user} />
              <ResTopBar />
              <div className="d-flex justify-content-center align-items-center">
                <div className="search_input w-100 rounded-4 p-2">
                  <div className="ps-2">
                    <i
                      className="bi bi-search fw-bold fs-4 pe-2"
                      style={{ color: "#abadae" }}
                    ></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-100 border-0"
                    style={{ backgroundColor: "#e5eaee" }}
                  />
                </div>
                <div className="mx-2">
                  <i className="bi bi-pencil-square fs-3 fw-bold text-secondary"></i>
                </div>
              </div>
              <div className="search_con mt-3 px-3">
                <h5 className="fw-bold fs-3">Message</h5>
                <div className="px-3 mt-2">
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <div className="msg_logo rounded-4">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH_UF47j71sVk0tusYIlIQ79OLiR8dzq9jbfqxUg4q5Q&s"
                          alt="inst-cont"
                          className="img-fluid h-100"
                        />
                        <div
                          style={{
                            backgroundColor: "lightgreen",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            zIndex: "10",
                          }}
                        ></div>
                      </div>
                      <div
                        className="rounded-circle position-absolute border border-3 border-white"
                        style={{
                          width: "20px",
                          right: "0%",
                          bottom: "0%",
                          height: "20px",
                          backgroundColor: "lightgreen",
                        }}
                      ></div>
                    </div>
                    <div className="ps-3 msg_con">
                      <h6 className="mb-1">nirav_kumbhani_3093</h6>
                      <p className="mb-0">where ever I am I always rock</p>
                    </div>
                  </div>
                </div>
                <div className="message p-3 mt-2 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="msg_logo rounded-4">
                      <img
                        src="https://randomuser.me/api/portraits/men/88.jpg"
                        alt="inst-cont"
                        className="img-fluid h-100"
                      />
                      <div
                        style={{
                          backgroundColor: "lightgreen",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                    <div className="ps-3 msg_con">
                      <h6 className="mb-1">mikel_james_356</h6>
                      <p className="mb-0">
                        I am at my wedding, but I dont wnat to be hear
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      className="btn-primary text-white rounded-2 text-center"
                      style={{
                        fontSize: "15px",
                        width: "28px",
                        height: "28px",
                        lineHeight: "28px",
                      }}
                    >
                      8
                    </p>
                  </div>
                </div>
                <div className="message p-3 mt-2 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="msg_logo rounded-4">
                      <img
                        src="https://randomuser.me/api/portraits/men/89.jpg"
                        alt="inst-cont"
                        className="img-fluid h-100"
                      />
                      <div
                        style={{
                          backgroundColor: "lightgreen",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                    <div className="ps-3 msg_con">
                      <h6 className="mb-1">naru_modi</h6>
                      <p className="mb-0">Stay at Home and stay safe</p>
                    </div>
                  </div>
                  <div>
                    <p
                      className="btn-primary text-white rounded-2 text-center"
                      style={{
                        fontSize: "15px",
                        width: "28px",
                        height: "28px",
                        lineHeight: "28px",
                      }}
                    >
                      15
                    </p>
                  </div>
                </div>
                <div className="px-3 mt-2">
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <div className="msg_logo rounded-4">
                        <img
                          src="https://randomuser.me/api/portraits/men/40.jpg"
                          alt="inst-cont"
                          className="img-fluid h-100"
                        />
                        <div
                          style={{
                            backgroundColor: "lightgreen",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            zIndex: "10",
                          }}
                        ></div>
                      </div>
                      <div
                        className="rounded-circle position-absolute border border-3 border-white"
                        style={{
                          width: "20px",
                          right: "0%",
                          bottom: "0%",
                          height: "20px",
                          backgroundColor: "lightgreen",
                        }}
                      ></div>
                    </div>
                    <div className="ps-3 msg_con">
                      <h6 className="mb-1">hardik_kothiya</h6>
                      <p className="mb-0">If you like to dance try cricket</p>
                    </div>
                  </div>
                </div>
                <div className="px-3 mt-2">
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <div className="msg_logo rounded-4">
                        <img
                          src="https://randomuser.me/api/portraits/women/39.jpg"
                          alt="inst-cont"
                          className="img-fluid h-100"
                        />
                        <div
                          style={{
                            backgroundColor: "lightgreen",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            zIndex: "10",
                          }}
                        ></div>
                      </div>
                      <div
                        className="rounded-circle position-absolute border border-3 border-white"
                        style={{
                          width: "20px",
                          right: "0%",
                          bottom: "0%",
                          height: "20px",
                          backgroundColor: "lightgreen",
                        }}
                      ></div>
                    </div>
                    <div className="ps-3 msg_con">
                      <h6 className="mb-1">wiliam_knight_01</h6>
                      <p className="mb-0">I dont like to bath</p>
                    </div>
                  </div>
                </div>
                <div className="message p-3 mt-2 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <div className="msg_logo rounded-4">
                      <img
                        src="https://randomuser.me/api/portraits/men/47.jpg"
                        alt="inst-cont"
                        className="img-fluid h-100"
                      />
                      <div
                        style={{
                          backgroundColor: "lightgreen",
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                      ></div>
                    </div>
                    <div className="ps-3 msg_con">
                      <h6 className="mb-1">Nick_Jones_007</h6>
                      <p className="mb-0">
                        I am trying to do my homework but guess I am stupid
                      </p>
                    </div>
                  </div>
                  <div>
                    <p
                      className="btn-primary text-white rounded-2 text-center"
                      style={{
                        fontSize: "15px",
                        width: "28px",
                        height: "28px",
                        lineHeight: "28px",
                      }}
                    >
                      4
                    </p>
                  </div>
                </div>
                <div className="px-3 mt-2">
                  <div className="d-flex align-items-center">
                    <div className="position-relative">
                      <div className="msg_logo rounded-4">
                        <img
                          src="https://randomuser.me/api/portraits/women/65.jpg"
                          alt="inst-cont"
                          className="img-fluid h-100"
                        />
                        <div
                          style={{
                            backgroundColor: "lightgreen",
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            zIndex: "10",
                          }}
                        ></div>
                      </div>
                      <div
                        className="rounded-circle position-absolute border border-3 border-white"
                        style={{
                          width: "20px",
                          right: "0%",
                          bottom: "0%",
                          height: "20px",
                          backgroundColor: "lightgreen",
                        }}
                      ></div>
                    </div>
                    <div className="ps-3 msg_con">
                      <h6 className="mb-1">Elena_James</h6>
                      <p className="mb-0">Try out my new recipe</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-md-none mb-4"></div>
            </div>
            <div className="chat d-none d-xl-block col-xl-8 my-4 bg-white px-4 py-2 rounded-4 position-relative">
              <div className="chat_head d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center mt-3">
                  <div className="main_logo">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH_UF47j71sVk0tusYIlIQ79OLiR8dzq9jbfqxUg4q5Q&s"
                      alt="inst-cont"
                      className="img-fluid h-100"
                    />
                  </div>
                  <div className="ps-3 main_con">
                    <h6 className="mb-1">nirav_kumbhani_3093</h6>
                  </div>
                </div>
                <a href="#">
                  <i className="bi bi-info-circle text-dark fw-bold fs-3"></i>
                </a>
              </div>
              <hr />
              <div>
                <div className="chat_content d-flex align-items-baseline">
                  <div className="user_logo">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH_UF47j71sVk0tusYIlIQ79OLiR8dzq9jbfqxUg4q5Q&s"
                      alt="inst-cont"
                      className="img-fluid h-100 rounded"
                    />
                  </div>
                  <div className="user_con ms-3 rounded-pill">
                    <div className="aud_btn d-flex align-items-center p-3">
                      <a>
                        <i className="bi-play"></i>
                      </a>
                      <div
                        className="ms-2 gap-1 d-flex sound_line align-items-center"
                        style={{ height: "50px" }}
                      >
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-100"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-100"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#fe0251" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#a8abad" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#a8abad" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#a8abad" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#a8abad" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#a8abad" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#a8abad" }}
                        ></span>
                        <span
                          style={{
                            height: "8%",
                            width: "2px",
                            backgroundColor: "#a8abad",
                          }}
                        ></span>
                        <span
                          style={{
                            height: "8%",
                            width: "2px",
                            backgroundColor: "#a8abad",
                          }}
                        ></span>
                        <span
                          style={{
                            height: "8%",
                            width: "2px",
                            backgroundColor: "#a8abad",
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="chat_content d-flex align-items-baseline justify-content-end">
                  <div
                    className="user2_con ms-3 rounded-pill"
                    style={{ backgroundColor: "#0318ffe0" }}
                  >
                    <div className="aud_btn d-flex align-items-center p-3">
                      <a>
                        <i className="bi bi-pause"></i>
                      </a>
                      <div
                        className="ms-2 gap-1 d-flex sound_line align-items-center"
                        style={{ height: "50px" }}
                      >
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#a8abad" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#a8abad" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#a8abad" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#a8abad" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#a8abad" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#a8abad" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-100"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-100"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-100"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-75"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-50"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          className="h-25"
                          style={{ width: "2px", backgroundColor: "#ffffff" }}
                        ></span>
                        <span
                          style={{
                            height: "8%",
                            width: "2px",
                            backgroundColor: "#a8abad",
                          }}
                        ></span>
                        <span
                          style={{
                            height: "8%",
                            width: "2px",
                            backgroundColor: "#a8abad",
                          }}
                        ></span>
                        <span
                          style={{
                            height: "8%",
                            width: "2px",
                            backgroundColor: "#a8abad",
                          }}
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div className="user_logo ms-3">
                    <img
                      src="https://pbs.twimg.com/profile_images/1622285012732350464/H4K7Kwtz_400x400.jpg"
                      alt="inst-cont"
                      className="img-fluid h-100 rounded"
                    />
                  </div>
                </div>
                <div className="chat_content d-flex align-items-baseline mt-4 justify-content-end">
                  <div className="p-2 user_con rounded-pill">Hello</div>
                  <div className="user_logo ms-3">
                    <img
                      src="https://pbs.twimg.com/profile_images/1622285012732350464/H4K7Kwtz_400x400.jpg"
                      alt="inst-cont"
                      className="img-fluid h-100 rounded"
                    />
                  </div>
                </div>
                <div className="chat_content d-flex align-items-baseline mt-4">
                  <div className="user_logo me-3">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH_UF47j71sVk0tusYIlIQ79OLiR8dzq9jbfqxUg4q5Q&s"
                      alt="inst-cont"
                      className="img-fluid h-100 rounded"
                    />
                  </div>
                  <div className="p-2 user_con rounded-pill">Hello</div>
                </div>
                <div className="chat_content d-flex align-items-baseline mt-4 justify-content-end">
                  <div className="p-2 user_con rounded-pill">How are you ?</div>
                  <div className="user_logo ms-3">
                    <img
                      src="https://pbs.twimg.com/profile_images/1622285012732350464/H4K7Kwtz_400x400.jpg"
                      alt="inst-cont"
                      className="img-fluid h-100 rounded"
                    />
                  </div>
                </div>
                <div className="chat_content d-flex align-items-baseline mt-4">
                  <div className="user_logo me-3">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH_UF47j71sVk0tusYIlIQ79OLiR8dzq9jbfqxUg4q5Q&s"
                      alt="inst-cont"
                      className="img-fluid h-100 rounded"
                    />
                  </div>
                  <div className="p-2 user_con rounded-pill">
                    I am fine what about you
                  </div>
                </div>
                <div className="chat_content d-flex align-items-baseline mt-4 justify-content-end">
                  <div className="p-2 user_con rounded-pill">
                    I am well and good
                  </div>
                  <div className="user_logo ms-3">
                    <img
                      src="https://pbs.twimg.com/profile_images/1622285012732350464/H4K7Kwtz_400x400.jpg"
                      alt="inst-cont"
                      className="img-fluid h-100 rounded"
                    />
                  </div>
                </div>
                <div
                  className="chat_content position-absolute px-5"
                  style={{ bottom: "18px", left: "8%", right: "8%" }}
                >
                  <div className="search_input w-100 rounded-4 p-2">
                    <input
                      type="text"
                      placeholder="Message"
                      className="w-100 border-0 ps-4"
                      style={{ backgroundColor: "#f4f7f9" }}
                    />
                    <div className="icons d-flex">
                      <div className="ps-2">
                        <i
                          className="bi bi-heart fw-bold fs-4 pe-2"
                          style={{ color: "#abadae" }}
                        ></i>
                      </div>
                      <div className="ps-2">
                        <i
                          className="bi bi-card-image fw-bold fs-4 pe-2"
                          style={{ color: "#abadae" }}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;

  if (!user) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  const userRes = await fetch(
    `${process.env.baseUrl}/api/userdata/${user.userId}`
  );
  const userData = await userRes.json();

  return {
    props: {
      user: userData.data,
    },
  };
});

export default Search;
