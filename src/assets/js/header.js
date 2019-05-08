import axios from "axios";

const jsHeaderFriend = document.getElementById("jsHeaderFriend");
const jsHeaderFriendBtn = document.getElementById("jsHeaderFriendBtn");
const jsWaitFriendDiv = document.getElementById("jsWaitFriendDiv");
const jsHeaderFriendBgc = document.getElementById("jsHeaderFriendBgc");

let doubleClick = false;

const responsiveFriendBox = () => {
  if (jsHeaderFriend.style.visibility === "visible") {
    if (matchMedia("screen and (min-width: 768px)").matches) {
      jsHeaderFriend.style.left = `${jsHeaderFriendBtn.offsetLeft -
        (jsHeaderFriend.clientWidth / 2 - 14)}px`;
    } else {
      jsHeaderFriendBtn.style.color = "";
      jsHeaderFriend.style.visibility = "collapse";
      jsHeaderFriendBgc.style.visibility = "collapse";
    }
  }
};

const handleConfirmFriend = async event => {
  if (!doubleClick) {
    if (event.target.textContent === " Confirm") {
      doubleClick = true;
      const targetIdx = event.target.parentElement.id.split("jsConfirmBtn")[1];
      const response = await axios({
        url: "/api/confirmFriend",
        method: "POST",
        data: {
          targetIdx
        }
      });
      if (response.status === 200) {
        document.getElementById(`waitFriendBlock${targetIdx}`).remove();
        doubleClick = false;
      }
    } else if (event.target.textContent === " Reject") {
      doubleClick = true;
      const targetIdx = event.target.parentElement.id.split("jsDeleteBtn")[1];
      const response = await axios({
        url: "/api/cancelFriend",
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

const ViewWatirFriendListResponsive = () => {
  if (jsHeaderFriend.style.visibility === "collapse") {
    jsHeaderFriend.style.top = "calc(50vh - 100px)";
    jsHeaderFriend.style.left = "calc(50% - 125px)";
    jsHeaderFriend.style.visibility = "visible";
    jsHeaderFriendBgc.style.visibility = "visible";
  } else {
    jsHeaderFriend.style.visibility = "collapse";
    jsHeaderFriendBgc.style.visibility = "collapse";
  }
};

const checkVisiblity = event => {
  if (matchMedia("screen and (min-width: 768px)").matches) {
    if (jsHeaderFriend.style.visibility === "visible") {
      if (
        event.path[0].id !== "jsHeaderFriend" &&
        event.path[1].id !== "jsHeaderFriend" &&
        event.path[2].id !== "jsHeaderFriend"
      ) {
        jsHeaderFriendBtn.style.color = "";
        jsHeaderFriend.style.visibility = "collapse";
      }
    } else if (event.target.id === "jsHeaderFriendBtn") {
      ViewWaitFriendList();
    }
  } else if (matchMedia("screen and (max-width: 768px)").matches) {
    if (jsHeaderFriend.style.visibility === "visible") {
      if (
        event.path[0].id !== "jsHeaderFriend" &&
        event.path[1].id !== "jsHeaderFriend" &&
        event.path[2].id !== "jsHeaderFriend"
      ) {
        jsHeaderFriend.style.visibility = "collapse";
        jsHeaderFriendBgc.style.visibility = "collapse";
      }
    } else if (event.path[1].id === "jsWaitFriendDiv") {
      ViewWatirFriendListResponsive();
    }
  }
};

const init = () => {
  // 초기화
  jsHeaderFriend.style.visibility = "collapse";
  jsHeaderFriend.addEventListener("click", handleConfirmFriend);
  // jsWaitFriendDiv.addEventListener("click", ViewWatirFriendListResponsive);
  window.addEventListener("resize", responsiveFriendBox);
  window.addEventListener("click", checkVisiblity);
};

if (jsHeaderFriendBtn) {
  init();
}
