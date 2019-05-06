import axios from "axios";

const jsAddFriend = document.getElementById("jsAddFriend");
const jsAddFriendText = document.getElementById("jsAddFriendText");
const jsResizeTarget = document.getElementById("jsResizeTarget");
const jsResizeImg = document.getElementById("jsResizeImg");
let widthHeight;

const textareaResponsiveImg = () => {
  if (matchMedia("screen and (min-width: 960px)").matches) {
    widthHeight = (jsResizeTarget.clientWidth - 30) / 3;
  } else if (matchMedia("screen and (min-width: 768px)").matches) {
    widthHeight = (jsResizeTarget.clientWidth - 15) / 2;
  } else if (matchMedia("screen and (min-width: 480px)").matches) {
    widthHeight = (jsResizeTarget.clientWidth - 40) / 5;
  } else {
    widthHeight = (jsResizeTarget.clientWidth - 35) / 4;
  }
  jsResizeImg.style.width = `${widthHeight}px`;
  jsResizeImg.style.height = `${widthHeight}px`;
};

const handleFriend = async () => {
  const targetIdx = window.location.href.split("/feeds/")[1];
  if (jsAddFriendText.innerText === " Add Friend") {
    const response = await axios({
      url: `/api/addFriend`,
      method: "POST",
      data: {
        targetIdx
      }
    });
    if (response.status === 200) {
      jsAddFriendText.innerText = " Wait response";
    }
  } else if (jsAddFriendText.innerText === " Wait response") {
    const response = await axios({
      url: "/api/cancelFriend",
      method: "POST",
      data: {
        targetIdx
      }
    });
    if (response.status === 200) {
      jsAddFriendText.innerText = " Add Friend";
    }
  } else if (jsAddFriendText.innerText === " My friend") {
    const response = await axios({
      url: "/api/deleteFriend",
      method: "POST",
      data: {
        targetIdx
      }
    });
    if (response.status === 200) {
      jsAddFriendText.innerText = " Add Friend";
    }
  }
};

const init = () => {
  textareaResponsiveImg();
  window.addEventListener("resize", textareaResponsiveImg);
  jsAddFriend.addEventListener("click", handleFriend);
};

if (jsAddFriend) {
  init();
}
