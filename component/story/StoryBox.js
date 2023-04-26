import React from "react";

const StoryBox = ({ logUserId, onSetUserSelf, onSetShowStory, data }) => {
  const seen = data.story[data.story.length - 1].seen.filter(
    (data) => data.userId == logUserId
  );
  return (
    <>
      <div
        className={`${seen.length > 0 && "opacity-50"} m-auto px-1 text-center`}
        data-bs-toggle="modal"
        data-bs-target="#showStoryModal"
        onClick={() => {
          onSetUserSelf(false);
          onSetShowStory(data);
        }}
      >
        <div>
          <img
            src={data.userData[0].image}
            className="img-fluid h-100 rounded-4"
            style={{
              border: "3px solid #fe004d",
              padding: "2px",
              width: "75px",
              height: "75px",
            }}
          />
        </div>
        <small className="mt-1 fs-6">{data.userData[0].name}</small>
      </div>
    </>
  );
};

export default StoryBox;
