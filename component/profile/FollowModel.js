import React from "react";

const FollowModel = ({ followData: { data, type } }) => {
  return (
    <>
      <div
        class="modal fade"
        id="followModel"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog follow_prof_modal">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {type && type}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {(!data || data.length == 0) && (
                <h4 className="text-center text-secondary mt-3">No {type} found</h4>
              )}
              {data &&
                data.map((data) => (
                  <div className="d-flex align-items-center mt-3">
                    <div className="main_logo">
                      <img
                        src={
                          type == "Following"
                            ? data.followingimg
                            : data.followerimg
                        }
                        alt="inst-cont"
                        className="img-fluid h-100"
                      />
                    </div>
                    <div className="ps-2 main_con">
                      <h6 className="mb-1">
                        {type == "Following"
                          ? data.followingName
                          : data.followerName}
                      </h6>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowModel;
