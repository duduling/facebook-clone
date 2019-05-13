import axios from "axios";

const jsDropMenuAnimation = document.getElementById("jsDropMenuAnimation");
const jsHeaderFriend = document.getElementById("jsHeaderFriend");
const jsHeaderFriendBtn = document.getElementById("jsHeaderFriendBtn");
const jsHeaderFriendBgc = document.getElementById("jsHeaderFriendBgc");

let doubleClick = false;

const toggleDropMenu = event => {
  const eventPath = event.composedPath();

  // Drop Menu Btn Click Event -> Toggle
  if (eventPath[0].id === "jsDropMenuBtn") {
    jsDropMenuAnimation.classList.toggle("header__dropMenu-list--open");
  } else if (
    // wait friend box 이외에 영역 클릭시 hidden
    eventPath[1].id !== "jsDropMenuAnimation" &&
    eventPath[2].id !== "jsDropMenuAnimation"
  ) {
    jsDropMenuAnimation.classList.remove("header__dropMenu-list--open");
  }
};

const jsHeaderFriendExceptClick = event => {
  const eventPath = event.composedPath();

  // wait friend box 이외의 것을 클릭중인지 확인
  if (
    eventPath[0].id !== "jsHeaderFriend" &&
    eventPath[1].id !== "jsHeaderFriend" &&
    eventPath[2].id !== "jsHeaderFriend"
  ) {
    // Media Qurey 768px 이상 (wait friend box가 화면에 보이는 경우)
    if (matchMedia("screen and (min-width: 768px)").matches) {
      jsHeaderFriendBtn.style.color = "";
      jsHeaderFriend.style.visibility = "collapse";
      // Media Qurey 768px 미만 (wait friend box가 화면에 보이는 경우)
    } else if (matchMedia("screen and (max-width: 768px)").matches) {
      jsHeaderFriend.style.visibility = "collapse";
      jsHeaderFriendBgc.style.visibility = "collapse";
    }
  }
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
  } else if (
    jsDropMenuAnimation.classList.contains("header__dropMenu-list--open")
  ) {
    jsDropMenuAnimation.classList.remove("header__dropMenu-list--open");
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
      }).catch(error => {
        console.log(error);
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
      }).catch(error => {
        console.log(error);
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
    jsDropMenuAnimation.classList.remove("header__dropMenu-list--open");

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
  // wait friend box가 화면에 보이는 경우
  if (jsHeaderFriend.style.visibility === "visible") {
    jsHeaderFriendExceptClick(event);
    // wait friend box가 화면에 안보이는 경우
  } else if (event.target.id === "jsHeaderFriendBtn") {
    // collraps -> visible
    ViewWaitFriendList();
  } else if (event.composedPath()[1].id === "jsWaitFriendDiv") {
    // collraps -> visible
    ViewWatirFriendListResponsive();
  } else if (
    jsDropMenuAnimation.classList.value.split(" header__dropMenu-list--")[1] ===
    "close"
  ) {
    //  Show Drop Menu Item List
    toggleDropMenu(event);
  }
};

const init = () => {
  jsHeaderFriend.addEventListener("click", handleConfirmFriend);
  window.addEventListener("resize", responsiveFriendBox);
  window.addEventListener("click", checkVisiblity);
};

if (jsHeaderFriendBtn) {
  init();
}
