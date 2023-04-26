import React, { useState } from "react";
import { getPostData, imgUploadHandler } from "../../../helper/common";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { nameValid } from "../../../helper/common";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const PostModel = ({ userName, userImg, userId, onSetData }) => {
  const [image, setImage] = useState([]);
  const [location, setLocation] = useState("");

  const changeHandler = async (e) => {
    const img = await imgUploadHandler(e.target.files[0]);
    setImage([...image, `assets/video/${img}`]);
  };

  const postAddHandler = async () => {
    if (image.length == 0) {
      return toast.error("Please upload an image or video");
    }

    if (!location || location == "") {
      return toast.error("Please enter a location");
    } else if (!nameValid.test(location)) {
      return toast.error("Please enter a valid location");
    }

    const postData = {
      userName,
      userImg,
      userId,
      location,
      file: image.map((v) => `/assets/video/${v}`),
    };

    const res = await fetch(`${process.env.baseUrl}/api/posts`, {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    setLocation("");
    setImage([]);
    if (data.status) {
      const postData = await getPostData();
      onSetData(postData.data);
      return toast.success(data.message);
    } else {
      return toast.error(data.message);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel2"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel2">
                Add Posts
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                                      Your browser does not support the video
                                      tag.
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
                                <img
                                  src={image[0]}
                                  className="img-fluid w-100"
                                />
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
              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter Your Location"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={postAddHandler}
                className="btn btn-warning text-white"
                data-bs-dismiss={`${
                  image.length == 0 ||
                  location == "" ||
                  !nameValid.test(location)
                    ? ""
                    : "modal"
                }`}
              >
                Add Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default PostModel;
