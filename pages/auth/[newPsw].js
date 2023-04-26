import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { passwordValid } from "../../helper/common";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { withSessionSsr } from "../../helper/ironSession";

const newPsw = ({ otp }) => {
  const router = useRouter();
  const [newPsw, setNewPsw] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loader, setLoader] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    setTimeout(() => {
      alert(otp);
    }, 800);
  }, []);

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setNewPsw({ ...newPsw, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!newPsw.otp || newPsw.otp.trim() === "") {
      return toast.error("Please enter otp");
    }

    if (!newPsw.newPassword || newPsw.newPassword.trim() === "") {
      return toast.error("Please enter new password");
    } else if (!passwordValid.test(newPsw.newPassword)) {
      return toast.error("Please enter valid password");
    }

    if (!newPsw.confirmPassword || newPsw.confirmPassword.trim() === "") {
      return toast.error("Please enter confirm password");
    } else if (newPsw.newPassword !== newPsw.confirmPassword) {
      return toast.error("New password & Confirm password doesn't match");
    }

    setLoader(true);
    const res = await fetch(
      `${process.env.baseUrl}/api/auth/new_password`,
      {
        method: "POST",
        body: JSON.stringify({ userId: router.query.newPsw, newPsw }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    setLoader(false);

    if (data.status) {
      return toast.success(data.message);
    } else {
      return toast.error(data.message);
    }
  };

  return (
    <>
      <div className="login_body">
        <div className="login_container">
          <form onSubmit={submitHandler}>
            <div className="title">Your Otp will be valid for 5 min</div>
            <div className="input-box underline">
              <input
                type="number"
                placeholder="Enter Your otp"
                onChange={changeHandler}
                name="otp"
                required
              />
              <div className="underline"></div>
            </div>
            <div className="input-box underline">
              <input
                type="password"
                placeholder="Enter New Password"
                onChange={changeHandler}
                name="newPassword"
                required
              />
              <div className="underline"></div>
            </div>
            <div className="input-box underline">
              <input
                type="password"
                placeholder="Confirm Password"
                onChange={changeHandler}
                name="confirmPassword"
                required
              />
              <div className="underline"></div>
            </div>
            {errMsg !== "" && <p className="my-2 text-danger">{errMsg}</p>}
            <div className="input-box button">
              <button type="submit" className="btn" disabled={loader}>
                {loader ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>Continue</>
                )}
              </button>
            </div>
          </form>
          <div className="d-flex justify-content-between">
            <div className="creat_ac text-center">
              <Link href="/auth/registration" className="btn btn-link">
                Create Account
              </Link>
            </div>
            <div className="creat_ac text-center">
              <Link href="/auth/login" className="btn btn-link">
                Loggin
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
export const getServerSideProps = async ({ req, query }) => {
  const userId = query.newPsw;

  const userRes = await fetch(
    `${process.env.baseUrl}/api/userdata/${userId}`
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
  return {
    props: {
      otp: userData.data.otp,
    },
  };
};

export default newPsw;
