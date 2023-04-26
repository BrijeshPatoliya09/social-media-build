import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { withSessionSsr } from "../../helper/ironSession";

const forgetPsw = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email || email.trim() === "") {
      return toast.error("Please enter email");
    }

    setLoader(true);

    const res = await fetch(
      `${process.env.baseUrl}/api/auth/forget_password`,
      {
        method: "POST",
        body: JSON.stringify(email),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    setLoader(false);
    if (data.status) {
      router.push(`/auth/${data.data}`);
    } else {
      return toast.error(data.message);
    }
  };

  return (
    <>
      <div className="login_body">
        <div className="login_container">
          <form onSubmit={submitHandler}>
            <div className="title">Forgot Password</div>
            <div className="input-box underline">
              <input
                type="text"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                required
              />
              <div className="underline"></div>
            </div>
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

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const user = req.session.user;

  if (user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else {
    return {
      props: {}
    }
  }
}); 

export default forgetPsw;
