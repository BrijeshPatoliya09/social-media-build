import React from "react";

const StorySeen = ({ close, userData }) => {
  return (
    <>
      <div className="h-100 w-100" style={{ backdropFilter: "blur(5px)" }}>
        <div>
          <h3 className="text-white text-center mt-3" onClick={close}>
            Viewers
          </h3>
        </div>
        <hr className="m5-2 text-white" />
        <div className="seen_view px-3 h-75">
          <div className="h-100 story_seen">
            {userData[0].seenUser.map((v) => {
              const newTime = new Date();
              const timer = userData[0].story.seen.filter(
                (fil) => fil.userId == v._id
              )[0].timeStamp;
              const timeSt = new Date(timer * 1000);
              return (
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="d-flex align-items-center">
                    <div
                      className="text-dark overflow-hidden rounded-circle"
                      style={{
                        width: "50px",
                        height: "50px",
                        border: "3px solid rgb(255 255 255 / 75%)",
                      }}
                    >
                      <img
                        src={v.image}
                        alt="inst-cont"
                        className="img-fluid h-100"
                      />
                    </div>
                    <div className="ps-3 con text-white">
                      <h6 className="mb-1 fs-6 fw-bold">{v.userName}</h6>
                      <p className="mb-0" style={{ fontSize: "12px" }}>
                        {(newTime - timeSt) / 60000 > 60
                          ? `${(
                              (newTime - timeSt) /
                              (60000 * 60)
                            ).toFixed()} hour ago`
                          : (newTime - timeSt) / 60000 > 1
                          ? `${(
                              (newTime - timeSt) /
                              60000
                            ).toFixed()} minute ago`
                          : `${(
                              (newTime - timeSt) /
                              1000
                            ).toFixed()} seconds ago`}
                      </p>
                    </div>
                  </div>
                  <div>
                    <a className="btn text-white fs-4">
                      <i class="bi bi-three-dots-vertical"></i>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-3">
            <button className="btn text-white" onClick={close}>
              <i class="bi bi-arrow-left"></i> Go back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StorySeen;
