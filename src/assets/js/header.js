import axios from "axios";

const jsDropMenuBtn = document.getElementById("jsDropMenuBtn");
const jsDropMenuAnimation = document.getElementById("jsDropMenuAnimation");
const jsHeaderFriend = document.getElementById("jsHeaderFriend");
const jsHeaderFriendBtn = document.getElementById("jsHeaderFriendBtn");
const jsHeaderFriendBgc = document.getElementById("jsHeaderFriendBgc");

let doubleClick = false;

const toggleDropMenu = () => {
  jsDropMenuAnimation.classList.toggle("header__dropMenu-list--open");
};

// Resize 할 때 box 위치 이동 and 사라지게 하기
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

// Waite Friend Box Data function
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

// 768px 이상일 때 wait friend box visible <-> collapse
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

// 768px 미만일 때 wait friend box visible <-> collapse
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

// wait friend box 말고 다른 곳을 click 했을 시에 사라지게 하는 process
const checkVisiblity = event => {
  // 화면에 보이는지 확인
  if (jsHeaderFriend.style.visibility === "visible") {
    // wait friend box 이외의 것을 클릭중인지 확인
    if (
      event.path[0].id !== "jsHeaderFriend" &&
      event.path[1].id !== "jsHeaderFriend" &&
      event.path[2].id !== "jsHeaderFriend"
    ) {
      // Media Qurey 768px 이상
      if (matchMedia("screen and (min-width: 768px)").matches) {
        jsHeaderFriendBtn.style.color = "";
        jsHeaderFriend.style.visibility = "collapse";
        // Media Qurey 768px 미만
      } else if (matchMedia("screen and (max-width: 768px)").matches) {
        jsHeaderFriend.style.visibility = "collapse";
        jsHeaderFriendBgc.style.visibility = "collapse";
      }
    }
  } else if (event.target.id === "jsHeaderFriendBtn") {
    ViewWaitFriendList();
  } else if (event.path[1].id === "jsWaitFriendDiv") {
    ViewWatirFriendListResponsive();
  }
};

const init = () => {
  // 초기화
  jsHeaderFriend.style.visibility = "collapse";
  jsDropMenuBtn.addEventListener("click", toggleDropMenu);
  jsHeaderFriend.addEventListener("click", handleConfirmFriend);
  window.addEventListener("resize", responsiveFriendBox);
  window.addEventListener("click", checkVisiblity);
};

if (jsHeaderFriendBtn) {
  init();
}
