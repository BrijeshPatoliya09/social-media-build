import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { withSessionSsr } from "../../helper/ironSession";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const changeHandler = (e) => {
    const { value, name } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    if (!Cookies.get("switch_tok")) {
      Cookies.set("switch_tok", JSON.stringify([]));
    }
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user.email) {
      return toast.error("Please enter email");
    }

    if (!user.password) {
      return toast.error("Please enter password");
    }

    setLoader(true);
    const res = await fetch(`${process.env.baseUrl}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setLoader(false);

    if (!data.status) {
      return toast.error(data.message);
    } else {
      const userData = JSON.parse(Cookies.get("switch_tok"));
      if (
        userData.filter((fil) => fil.userId === data.data.userId).length > 0
      ) {
        router.push("/");
      } else {
        const sssres = await fetch(`${process.env.baseUrl}/api/auth/get_token`);
        const sedata = await sssres.json();
        const switchData = { ...data.data, token: sedata.data };
        Cookies.set("switch_tok", JSON.stringify([...userData, switchData]));
        router.push("/");
      }
    }
  };

  return (
    <>
      <div className="login_body">
        <div className="login_container">
          <form onSubmit={submitHandler}>
            <div className="title">Login</div>
            <div className="input-box underline">
              <input
                type="text"
                placeholder="Enter Your Email"
                onChange={changeHandler}
                name="email"
                required
              />
              <div className="underline"></div>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Enter Your Password"
                onChange={changeHandler}
                name="password"
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
              <Link href="/auth/forget-password" className="btn btn-link">
                Forget Password
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

export default Login;
