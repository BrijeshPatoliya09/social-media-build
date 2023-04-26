import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { characterLength,
  emailValid,
  lowercaseLetter,
  nameValid,
  number,
  special,
  uppercaseLetter, } from "../../helper/common";
import { withSessionSsr } from "../../helper/ironSession";

const Registraion = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
  });
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const [pswLength, setPswLength] = useState(false);
  const [pswLowercase, setPswLowercase] = useState(false);
  const [pswNumber, setPswNumber] = useState(false);
  const [pswUppercase, setPswUppercase] = useState(false);
  const [pswSpecialCha, setPswSpecialCha] = useState(false);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "password") {
      if (characterLength.test(value)) {
        setPswLength(true);
      } else {
        setPswLength(false);
      }
      if (lowercaseLetter.test(value)) {
        setPswLowercase(true);
      } else {
        setPswLowercase(false);
      }
      if (number.test(value)) {
        setPswNumber(true);
      } else {
        setPswNumber(false);
      }
      if (uppercaseLetter.test(value)) {
        setPswUppercase(true);
      } else {
        setPswUppercase(false);
      }
      if (special.test(value)) {
        setPswSpecialCha(true);
      } else {
        setPswSpecialCha(false);
      }
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!user.userName || user.userName.trim() === "") {
      return toast.error("Please enter username");
    }

    if (!user.name || user.name.trim() === "") {
      return toast.error("Please enter name");
    } else if (!nameValid.test(user.name)) {
      return toast.error("Please enter valid name");
    }

    if (!user.email || user.email.trim() === "") {
      return toast.error("Please enter email");
    } else if (!emailValid.test(user.email)) {
      return toast.error("Please enter valid email");
    }

    if (!user.password || user.password.trim() === "") {
      return toast.error("Please enter password");
    } else if (
      !pswLength ||
      !pswLowercase ||
      !pswNumber ||
      !pswSpecialCha ||
      !pswUppercase
    ) {
      return toast.error("Please enter valid password");
    }

    const userData = {
      name: user.name.trim(),
      userName: user.userName.trim(),
      email: user.email.trim(),
      password: user.password,
    };

    setLoader(true);
    const res = await fetch(
      `${process.env.baseUrl}/api/auth/registeration`,
      {
        method: "POST",
        body: JSON.stringify(userData),
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
      <div className="registeraton_body">
        <div className="registeraton_container">
          <form onSubmit={submitHandler}>
            <div className="title">Register</div>
            <div className="input-box underline">
              <input
                type="text"
                placeholder="Enter Your Username"
                name="userName"
                onChange={changeHandler}
              />
              <div className="underline"></div>
            </div>
            <div className="input-box underline">
              <input
                type="text"
                placeholder="Enter Your Name"
                name="name"
                onChange={changeHandler}
              />
              <div className="underline"></div>
            </div>
            <div className="input-box">
              <input
                type="email"
                placeholder="Enter Your Email"
                name="email"
                onChange={changeHandler}
              />
              <div className="underline"></div>
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Enter Your Password"
                name="password"
                onChange={changeHandler}
              />
              <div className="underline"></div>
            </div>
            <div className="mt-5 d-flex flex-wrap">
              <div className="form-check col-6">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={pswLength}
                  id="length"
                  disabled
                />
                <label
                  className={`form-check-label ${
                    pswLength ? "text-green" : "text-red"
                  }`}
                  for="length"
                >
                  8 to 32 characters
                </label>
              </div>
              <div className="form-check col-6">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  checked={pswLowercase}
                  id="lower"
                  disabled
                />
                <label
                  className={`form-check-label ${
                    pswLowercase ? "text-green" : "text-red"
                  }`}
                  for="lower"
                >
                  lowercase letter(a-z)
                </label>
              </div>
              <div className="form-check col-6">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="num"
                  checked={pswNumber}
                  disabled
                />
                <label
                  className={`form-check-label ${
                    pswNumber ? "text-green" : "text-red"
                  }`}
                  for="num"
                >
                  numerical digit
                </label>
              </div>
              <div className="form-check col-6">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  checked={pswUppercase}
                  id="upper"
                  disabled
                />
                <label
                  className={`form-check-label ${
                    pswUppercase ? "text-green" : "text-red"
                  }`}
                  for="upper"
                >
                  uppercase letter
                </label>
              </div>
              <div className="form-check col-6">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  checked={pswSpecialCha}
                  id="special"
                  disabled
                />
                <label
                  className={`form-check-label ${
                    pswSpecialCha ? "text-green" : "text-red"
                  }`}
                  for="special"
                >
                  special character
                </label>
              </div>
            </div>
            <div className="input-box button">
              <button type="submit" className="btn" disabled={loader}>
                {loader ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                ) : (
                  <>Register</>
                )}
              </button>
            </div>
            <div className="have_ac text-center">
              <Link href="/auth/login" className="btn btn-link">
                Alread have an account
              </Link>
            </div>
          </form>
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

export default Registraion;
