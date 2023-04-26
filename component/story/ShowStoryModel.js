import React, { useState } from "react";
import Stories from "react-insta-stories";
import StorySeen from "./StorySeen";

const ShowStoryModel = ({
  showStory,
  onSetShowStory,
  userId,
  onNextStory,
  userSelf,
}) => {
  const [seenUser, setSeenUser] = useState("");

  const story =
    showStory &&
    showStory.story.map((v) => {
      if (userSelf) {
        return {
          ...v,
          header: v.header[0],
          seeMore: ({ close }) => {
            return <StorySeen close={close} userData={seenUser} />;
          },
        };
      } else {
        return {
          ...v,
          header: v.header[0],
        };
      }
    });
  const storySeenHandler = async (index) => {
    const res = await fetch(`${process.env.baseUrl}/api/story/story_seen`, {
      method: "POST",
      body: JSON.stringify({ userId, storyId: showStory._id, index }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    setSeenUser(data.data);
  };

  return (
    <>
      <div
        className="modal fade"
        id="showStoryModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="S
        toryModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => onSetShowStory("")}
              ></button>
            </div>
            <div className="modal-body m-auto p-0">
              {showStory !== "" && (
                <Stories
                  stories={story}
                  width={"100%"}
                  height={768}
                  isPaused={true}
                  onStoryStart={storySeenHandler}
                  onAllStoriesEnd={() => {
                    onNextStory(showStory);
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowStoryModel;
