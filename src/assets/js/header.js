import axios from "axios";

const jsHeaderFriend = document.getElementById("jsHeaderFriend");
const jsHeaderFriendBtn = document.getElementById("jsHeaderFriendBtn");
let doubleClick = false;

const handleConfirmFriend = async event => {
  if (!doubleClick) {
    doubleClick = true;
    const targetIdx = event.target.parentElement.id.split("jsConfirmBtn")[1];
    const response = await axios({
      url: "/api/acceptFriend",
      method: "POST",
      data: {
        targetIdx
      }
    });
    if (response.status === 200) {
      document.getElementById(`waitFriendBlock${targetIdx}`).remove();
      doubleClick = false;
    }
  }
};

const ViewWaitFriendList = () => {
  if (jsHeaderFriend.style.visibility === "collapse") {
    jsHeaderFriendBtn.style.color = "white";
    jsHeaderFriend.style.visibility = "visible";
    jsHeaderFriend.style.top = "50px";
    jsHeaderFriend.style.left = `${jsHeaderFriendBtn.offsetLeft -
      (jsHeaderFriend.clientWidth / 2 - 14)}px`;
  } else {
    jsHeaderFriendBtn.style.color = "";
    jsHeaderFriend.style.visibility = "collapse";
  }
};

const init = () => {
  // 초기화
  jsHeaderFriend.style.visibility = "collapse";
  jsHeaderFriend.addEventListener("click", handleConfirmFriend);
  jsHeaderFriendBtn.addEventListener("click", ViewWaitFriendList);
  // jsHeaderFriendBtn.style.color = "white";
  // jsHeaderFriend.style.visibility = "visible";
  // jsHeaderFriend.style.top = "50px";
  // jsHeaderFriend.style.left = `${jsHeaderFriendBtn.offsetLeft -
  //   (jsHeaderFriend.clientWidth / 2 - 14)}px`;
};

if (jsHeaderFriendBtn) {
  init();
}
