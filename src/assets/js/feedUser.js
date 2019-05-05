import axios from "axios";

const jsAddFriend = document.getElementById("jsAddFriend");
const jsAddFriendText = document.getElementById("jsAddFriendText");

const handleAddFriend = async () => {
  const userIdx = window.location.href.split("/feeds/")[1];
  const whatDo = jsAddFriendText.innerText === " Add Friend";

  const response = await axios({
    url: `/api/addFriend`,
    method: "POST",
    data: {
      userIdx,
      whatDo
    }
  });
  if (response.status === 200) {
    if (whatDo) {
      jsAddFriendText.innerText = " Wait response";
    } else {
      jsAddFriendText.innerText = " Add Friend";
    }
  }
};

const init = () => {
  jsAddFriend.addEventListener("click", handleAddFriend);
};

if (jsAddFriend) {
  init();
}
