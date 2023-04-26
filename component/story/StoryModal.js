import React, { useState } from "react";
import { getStoryData, imgUploadHandler } from "../../helper/common";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

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

const StoryModal = ({ user, onSetUpdStory }) => {
  const [image, setImage] = useState([]);

  const changeHandler = async (e) => {
    const img = await imgUploadHandler(e.target.files[0]);
    setImage([...image, `assets/video/${img}`]);
  };

  const addStoryHandler = async () => {
    if (!image || image.length == 0) {
      return toast.error("Please add an image or video");
    }

    const storyData = image.map((v) => {
      const type = v.split(".").pop() == "mp4" ? "video" : "image";
      return {
        url: v,
        type,
        header: [
          {
            heading: user.userName,
            subheading: user.name,
            profileImage: user.image,
          },
        ],
      };
    });

    const res = await fetch(`${process.env.baseUrl}/api/story/add_story`, {
      method: "POST",
      body: JSON.stringify({ userId: user._id, storyData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setImage([]);
    if (data.status) {
      const storyData = await getStoryData()
      onSetUpdStory(storyData.data);
      return toast.success(data.message);
    } else {
      return toast.error(data.message);
    }
  };

  return (
    <>
      <div
        class="modal fade"
        id="storyModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add story
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setTimeout(() => setImage([]), 500)}
              ></button>
            </div>
            {image == "" && (
              <div style={{ color: "#fe004d" }}>
                <div class="modal-body story_modal">
                  <div className="img_upl">
                    <div className="input-group border-2 input">
                      <input
                        type="file"
                        className="form-control"
                        onChange={changeHandler}
                        id="image"
                      />
                    </div>
                    <div className="logo">
                      <i class="bi bi-card-image"></i>
                    </div>
                  </div>
                </div>
                <h2 className="text-center">Add an image</h2>
              </div>
            )}
            {image != "" && (
              <>
                <div className="p-4">
                  <div className="story_image p-4 position-relative text-white">
                    {image.length > 1 ? (
                      <Carousel
                        responsive={postResponsive}
                        showDots={true}
                        arrows
                      >
                        {image.map((pImg, index) => (
                          <>
                            {pImg.split(".").pop() == "mp4" ? (
                              <>
                                <div className="w-100 overflow-hidden rounded-3 px-1">
                                  <video
                                    width="100%"
                                    height="100%"
                                    autoPlay
                                    muted
                                    loop
                                  >
                                    <source src={pImg} type="video/mp4" />
                                    Your browser does not support the video tag.
                                  </video>
                                </div>
                                <button
                                  className="btn p-0 position-absolute fs-1 img_del"
                                  onClick={() => {
                                    const filterData = image.filter(
                                      (data, i) => i != index
                                    );
                                    setImage(filterData);
                                  }}
                                >
                                  <i class="bi bi-trash-fill"></i>
                                </button>
                              </>
                            ) : (
                              <>
                                <div className="w-100 overflow-hidden rounded-3 px-1">
                                  <img
                                    src={pImg}
                                    className="img-fluid w-100 h-100"
                                  />
                                </div>
                                <button
                                  className="btn p-0 position-absolute fs-1 img_del"
                                  onClick={() => {
                                    const filterData = image.filter(
                                      (data, i) => i != index
                                    );
                                    setImage(filterData);
                                  }}
                                >
                                  <i class="bi bi-trash-fill"></i>
                                </button>
                              </>
                            )}
                          </>
                        ))}
                      </Carousel>
                    ) : (
                      <>
                        {image[0].split(".").pop() == "mp4" ? (
                          <>
                            <div className="w-100 overflow-hidden rounded-3">
                              <video
                                width="100%"
                                height="100%"
                                autoPlay
                                muted
                                loop
                              >
                                <source src={image[0]} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                            <button
                              className="btn p-0 position-absolute fs-1 img_del"
                              onClick={() => {
                                const filterData = image.filter(
                                  (data, i) => i != 0
                                );
                                setImage(filterData);
                              }}
                            >
                              <i class="bi bi-trash-fill"></i>
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="w-100 overflow-hidden rounded-3">
                              <img src={image[0]} className="img-fluid w-100" />
                            </div>
                            <button
                              className="btn p-o position-absolute fs-1 img_del"
                              onClick={() => {
                                const filterData = image.filter(
                                  (data, i) => i != 0
                                );
                                setImage(filterData);
                              }}
                            >
                              <i class="bi bi-trash-fill"></i>
                            </button>
                          </>
                        )}
                      </>
                    )}
                    <div
                      className="position-absolute fs-1"
                      style={{ top: "2%", left: "4%", color: "#fe004d" }}
                    >
                      <i class="bi bi-plus-circle-fill"></i>
                    </div>
                    <div
                      className="input-group position-absolute fs-1 opacity-0"
                      style={{
                        width: "10%",
                        top: "6%",
                        left: "2%",
                        color: "#fe004d",
                      }}
                    >
                      <input
                        type="file"
                        className="form-control"
                        onChange={changeHandler}
                        id="image"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setTimeout(() => setImage([]), 500)}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={addStoryHandler}
                data-bs-dismiss={`${image.length == 0 ? "" : "modal"}`}
              >
                Add Story
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />  
    </>
  );
};

export default StoryModal;
