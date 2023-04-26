import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const SideMenu = ({ user, home }) => {
  const router = useRouter();
  const logoutHandler = async () => {
    const res = await fetch(`${process.env.baseUrl}/api/auth/logout`);
    const data = await res.json();
    if (data.message) {
      router.push("/auth/login");
    }
  };

  return (
    <>
      <div className="col-2 rounded-4"></div>
      <div className="col-1 position-fixed d-none menu_bar vh-100 d-md-flex d-xl-none flex-column justify-content-around align-items-center bg-white py-3 rounded-4">
        <div className="logo">
          <i className="bi bi-instagram pe-2 fs-2"></i>
        </div>
        <div className="item">
          <ul className="p-0" style={{ listStyle: "none" }}>
            <li className="mb-3">
              <Link href="/" className="btn">
                <i className="bi bi-house-door-fill pe-2 fs-2"></i>
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/bookmark" className="btn">
                <i className="bi bi-camera-reels pe-2 fs-2"></i>
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/search" className="btn">
                <i className="bi bi-send pe-2 fs-2"></i>
              </Link>
            </li>
            <li className="mb-3">
              <Link href="/notification" className="btn">
                <i className="bi bi-heart pe-2 fs-2"></i>
              </Link>
            </li>
            {home && <li className="mb-3">
              <button
                href="#"
                className="btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
              >
                <i className="bi bi-plus-square pe-2 fs-2"></i>
              </button>
            </li>}
            <li className="mb-3">
              <Link href={`/profile/${user._id}`} className="btn fs-5">
                <i className="bi bi-person-circle pe-2 fs-2"></i>
              </Link>
            </li>
          </ul>
        </div>
        <div className="foot dropdown">
          <button
            className="btn"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-list pe-2 fs-2"></i>
          </button>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                Logout
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-2 position-fixed menu_bar vh-100 d-xl-flex flex-column justify-content-around bg-white p-3 rounded-4">
        <div className="logo" style={{ width: "150px" }}>
          <img src="/assets/image/insta.png" className="img-fluid" />
        </div>
        <div className="item">
          <ul className="p-0" style={{ listStyle: "none" }}>
            <li className="mb-2">
              <Link href="/" className="btn fs-5">
                <i className="bi bi-house-door-fill pe-2 fs-4"></i>
                Home
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/bookmark" className="btn fs-5">
                <i className="bi bi-camera-reels pe-2 fs-4"></i>
                Bookmark
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/search" className="btn fs-5">
                <i className="bi bi-send pe-2 fs-4"></i>
                Messages
              </Link>
            </li>
            <li className="mb-2">
              <Link href="/notification" className="btn fs-5">
                <i className="bi bi-heart pe-2 fs-4"></i>
                Notifications
              </Link>
            </li>
            {home && <li className="mb-2">
              <button
                className="btn fs-5"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal2"
              >
                <i className="bi bi-plus-square pe-2 fs-4"></i>
                Create
              </button>
            </li>}
            <li className="mb-2">
              <Link href={`/profile/${user._id}`} className="btn fs-5">
                <i className="bi bi-person-circle pe-2 fs-4"></i>
                Profile
              </Link>
            </li>
          </ul>
        </div>
        <div className="foot dropdown">
          <button
            className="btn fs-5"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-list pe-2 fs-4"></i>
            More
          </button>
          <ul className="dropdown-menu">
            <li>
              <button className="dropdown-item" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
