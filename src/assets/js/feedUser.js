import axios from "axios";

const jsAddFriend = document.getElementById("jsAddFriend");
const jsAddFriendText = document.getElementById("jsAddFriendText");

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
  jsAddFriend.addEventListener("click", handleFriend);
};

if (jsAddFriend) {
  init();
}
