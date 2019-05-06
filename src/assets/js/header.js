const jsHeaderFriendBtn = document.getElementById("jsHeaderFriendBtn");
const jsHeaderFriend = document.getElementById("jsHeaderFriend");

const ViewWaitFriendList = () => {
  if (jsHeaderFriend.style.visibility === "collapse") {
    jsHeaderFriendBtn.style.color = "white";
    jsHeaderFriend.style.visibility = "visible";
    jsHeaderFriend.style.top = "50px";
    jsHeaderFriend.style.left = `${jsHeaderFriendBtn.offsetLeft - 35}px`;
  } else {
    jsHeaderFriendBtn.style.color = "";
    jsHeaderFriend.style.visibility = "collapse";
  }
};

const init = () => {
  // 초기화
  // jsHeaderFriend.style.visibility = "collapse";
  // jsHeaderFriendBtn.addEventListener("click", ViewWaitFriendList);
  jsHeaderFriendBtn.style.color = "white";
  jsHeaderFriend.style.visibility = "visible";
  jsHeaderFriend.style.top = "50px";
  jsHeaderFriend.style.left = `${jsHeaderFriendBtn.offsetLeft -
    (jsHeaderFriend.clientWidth / 2 - 14)}px`;
};

if (jsHeaderFriendBtn) {
  init();
}
