import React, { useState } from "react";
import { imgUploadHandler, nameValid } from "../../helper/common";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const UserEditModal = ({ userData, onSetUserData }) => {
  const [profData, setProfData] = useState({
    userName: userData.userName,
    name: userData.name,
    bio: userData.bio || "",
  });
  const [profImg, setProfImg] = useState(userData.image || "");
  const [imgSett, setImgSett] = useState(false);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setProfData({ ...profData, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!profImg || profImg == "") {
      return toast.error("Please add a profile picture  ");
    }

    if (!profData.userName || profData.userName.trim() === "") {
      return toast.error("Please enter username");
    }

    if (!profData.name || profData.name.trim() === "") {
      return toast.error("Please enter name");
    } else if (!nameValid.test(profData.name)) {
      return toast.error("Please enter valid name");
    }

    const img =
      typeof profImg == "string" && profImg.split("/")[1] == "assets"
        ? profImg.split("/").pop()
        : await imgUploadHandler(profImg);

    const switchData = JSON.parse(Cookies.get("switch_tok"));
    const editSwitchUser = switchData.map((data) => {
      if (data.userId == userData._id) {
        return {
          ...data,
          userName: profData.userName,
          userImg: `/assets/video/${img}`,
        };
      } else {
        return { ...data };
      }
    });
    Cookies.set("switch_tok", JSON.stringify(editSwitchUser));

    const editData = {
      ...profData,
      image: `/assets/video/${img}`,
    };

    const res = await fetch(`${process.env.baseUrl}/api/userdata/edit_user`, {
      method: "PUT",
      body: JSON.stringify({ userId: userData._id, editData }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (data.status) {
      toast.success(data.message);
      onSetUserData(data.data);
    } else {
      return toast.error(data.message);
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="edit_Prof"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="editProfileLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="editProfileLabel">
                Edit profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={submitHandler}>
              <div className="modal-body text-center">
                <div>
                  {profImg ? (
                    <img
                      src={!imgSett ? profImg : URL.createObjectURL(profImg)}
                      alt="profile"
                      className="col-5 rounded-circle img-fluid"
                    />
                  ) : (
                    <img
                      src="https://img.freepik.com/free-icon/user_318-159711.jpg"
                      alt="profile"
                      className="col-5 rounded-circle img-fluid"
                    />
                  )}
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    onChange={(e) => {
                      setProfImg(e.target.files[0]);
                      setImgSett(true);
                    }}
                    className="form-control shadow-none mt-2"
                  />
                </div>
                <div className="text-start mt-3">
                  <label className="ps-1">Username :-</label>
                  <input
                    name="userName"
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Enter your Username"
                    onChange={changeHandler}
                    value={profData.userName}
                  />
                </div>
                <div className="text-start mt-3">
                  <label className="ps-1">Full Name :-</label>
                  <input
                    name="name"
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Enter your Name"
                    onChange={changeHandler}
                    value={profData.name}
                  />
                </div>
                <div className="text-start mt-3">
                  <label className="ps-1">Bio :-</label>
                  <textarea
                    name="bio"
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Bio"
                    onChange={changeHandler}
                    value={profData.bio}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Decline
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss={
                    profImg != "" &&
                    profData.name != "" &&
                    nameValid.test(profData.name)
                      ? "modal"
                      : ""
                  }
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UserEditModal;
