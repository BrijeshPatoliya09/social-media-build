import Link from "next/link";
import React from "react";

const ResMenu = ({ user, home }) => {
  return (
    <>
      <div className="menu_bar_res d-md-none">
        <ul
          className="d-flex justify-content-around p-0"
          style={{ listStyle: "none" }}
        >
          <li>
            <Link href="/" className="btn fs-5">
              <i className="bi bi-house-door-fill"></i>
            </Link>
          </li>
          <li>
            <Link href="/search" className="btn fs-5">
            <i className="bi bi-send "></i>
            </Link>
          </li>
          {home && <li>
            <button
              className="btn fs-5"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal2"
            >
              <i className="bi bi-plus-square"></i>
            </button>
          </li>}
          <li>
            <Link href="/bookmark" className="btn fs-5">
              <i className="bi bi-camera-reels"></i>
            </Link>
          </li>
          <li>
            <Link href={`/profile/${user._id}`} className="btn fs-5">
              <i className="bi bi-person-circle"></i>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ResMenu;
