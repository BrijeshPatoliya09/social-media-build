import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const TopBar = ({ profUser, user }) => {
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
      <div className="top_bar d-none d-md-flex justify-content-between bg-white p-4 rounded-4">
        <div className="logo col-2" style={{ width: "150px" }}>
          <img src="/assets/image/insta.png" className="img-fluid" alt />
        </div>
        <div className="search_menu col-4">
          <ul
            className="d-flex justify-content-around p-0"
            style={{ listStyle: "none" }}
          >
            <li>
              <Link href="/" className="btn p-0">
                <i className="bi bi-house-door-fill fs-3"></i>
              </Link>
            </li>
            <li>
              <Link href="/notification" className="btn p-0">
                <i className="bi bi-heart fs-3"></i>
              </Link>
            </li>
            <li>
              <Link href="/search" className="btn p-0">
                <i className="bi bi-send fs-3"></i>
              </Link>
            </li>
            <li>
              <Link href="/bookmark" className="btn p-0">
                <i className="bi bi-camera-reels fs-3"></i>
              </Link>
            </li>
            {!profUser && (
              <li>
                <Link href={`/profile/${user._id}`} className="btn p-0">
                  <i className="bi bi-person-circle fs-3"></i>
                </Link>
              </li>
            )}
          </ul>
        </div>
        <div className="dropdown">
          <button
            className="btn fs-5"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-list pe-2 fs-4"></i>
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

export default TopBar;
