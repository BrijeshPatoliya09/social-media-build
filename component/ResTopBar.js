import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const ResTopBar = () => {
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
      <div className="top_bar d-md-none mb-3 d-flex justify-content-between">
        <Link href="/notification" className="btn text-secondary me-3">
          <i className="bi bi-envelope fs-2 fw-bold "></i>
        </Link>
        <div className="dropdown">
          <button
            className="btn fs-5"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-list pe-2 fs-4"></i>
          </button>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start">
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

export default ResTopBar;
