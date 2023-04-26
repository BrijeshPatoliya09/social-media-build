export const characterLength = /^[a-zA-Z0-9@\#$%&*()_+\]\[';:?.,!^-]{8,32}$/;
export const lowercaseLetter = /(?=.*[a-z])/;
export const uppercaseLetter = /(?=.*[A-Z])/;
export const number = /(?=.*\d)/;
export const special = /(?=.*\W)/;
export const emailValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;
export const nameValid = /^[a-z ,.'-]+$/i;

export const imgUploadHandler = async (imgData) => {
    const formData = new FormData();
    formData.append("file", imgData);

    const res = await fetch(
      `${process.env.baseUrl}/api/posts/post_img_upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.imgUrl;
  };  

  export const getStoryData = async () => {
    const storyRes = await fetch(`${process.env.baseUrl}/api/story/get_story`);
    const storyData = await storyRes.json();
    return storyData;
  }

  export const getPostData = async () => {
    const postRes = await fetch(`${process.env.baseUrl}/api/posts/gets_posts`);
    const postData = await postRes.json();
    return postData;
  }