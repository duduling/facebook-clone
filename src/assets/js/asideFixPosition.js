const jsFakeDivBox = document.getElementById("jsFakeDivBox");
const asideBreakPoint = document.getElementsByClassName(
  "feed__gridLayout-aside-wrap"
)[0];
const asideStyle = asideBreakPoint ? asideBreakPoint.parentElement : null;
const userInfoTitle = document.getElementsByClassName("feed-user__info")[0];
const friendBox = document.getElementsByClassName("friend-block");
const friendBoxGridBox = document.getElementsByClassName(
  "feed-user__aside-friend-grid"
);

// Auto Scroll Paging Process-------------------------------------------------------------------------
const autoScrollEvent = () => {
  // 스크롤의 위치 값
  const scrollYPostion =
    window.scrollY +
    window.innerHeight -
    (userInfoTitle ? userInfoTitle.clientHeight : 0);

  const asideFixScroll = () => {
    return (
      scrollYPostion /
      (asideBreakPoint.clientHeight + (userInfoTitle ? 100 : 70))
    );
  };

  // Main and Search page aside가 window height보다 작을 경우
  if (
    !userInfoTitle &&
    asideBreakPoint.clientHeight < window.innerHeight - 60 &&
    matchMedia("screen and (min-width: 768px)").matches
  ) {
    asideStyle.style.position = "fixed";
    asideStyle.style.top = "60px";
    jsFakeDivBox.style.display = "block";
    if (matchMedia("screen and (min-width: 1024px)").matches) {
      asideStyle.style.width = "296px";
    } else {
      asideStyle.style.width = "30%";
    }
  } else if (matchMedia("screen and (min-width: 1024px)").matches) {
    asideStyle.style.top = "";
    if (asideFixScroll() > 1) {
      asideStyle.style.position = "fixed";
      asideStyle.style.bottom = userInfoTitle ? "50px" : "20px";
      asideStyle.style.width = "296px";
      jsFakeDivBox.style.display = "block";
    } else if (asideFixScroll() < 1) {
      asideStyle.style.bottom = "";
      asideStyle.style.position = "";
      asideStyle.style.width = "";
      jsFakeDivBox.style.display = "none";
    }
  } else if (matchMedia("screen and (min-width: 768px)").matches) {
    // position이 fixed인 경우 Css Reset
    if (asideStyle.style.position === "fixed") {
      asideStyle.style.width = userInfoTitle ? "29.5%" : "30%";
      if (
        userInfoTitle &&
        matchMedia("screen and (min-width: 960px)").matches &&
        friendBox.length < 4
      ) {
        asideStyle.style.bottom = "0";
        asideStyle.style.top = "60px";
      } else if (
        userInfoTitle &&
        matchMedia("screen and (min-width: 768px)").matches &&
        friendBox.length < 3
      ) {
        asideStyle.style.bottom = "0";
        asideStyle.style.top = "60px";
      } else {
        asideStyle.style.top = "";
      }
    }

    // position이 fixed가 아니면서 스크롤이  breakpoint를 넘었을 경우
    if (asideStyle.style.position !== "fixed" && asideFixScroll() > 1) {
      asideStyle.style.position = "fixed";
      asideStyle.style.width = userInfoTitle ? "29.5%" : "30%";
      jsFakeDivBox.style.display = "block";

      if (
        userInfoTitle &&
        matchMedia("screen and (min-width: 960px)").matches &&
        friendBox.length < 4
      ) {
        asideStyle.style.bottom = "0";
        asideStyle.style.top = "60px";
      } else if (
        userInfoTitle &&
        matchMedia("screen and (min-width: 768px)").matches &&
        friendBox.length < 3
      ) {
        asideStyle.style.bottom = "0";
        asideStyle.style.top = "60px";
      } else {
        asideStyle.style.top = "";
        asideStyle.style.bottom = userInfoTitle ? "50px" : "20px";
      }
      // 스크롤 위로 올라가면 초기화
    } else if (asideStyle.style.position === "fixed" && asideFixScroll() < 1) {
      asideStyle.style.top = "";
      asideStyle.style.bottom = "";
      asideStyle.style.position = "";
      asideStyle.style.width = "100%";
      jsFakeDivBox.style.display = "none";
    }
    // Media Qurey  0 ~ 768px
  } else {
    asideStyle.style.top = "";
    asideStyle.style.bottom = "";
    asideStyle.style.position = "";
    asideStyle.style.width = "";
    jsFakeDivBox.style.display = "none";
  }
};

// Friend Profile Box grid css
const responsiveFriendBox = () => {
  if (matchMedia("screen and (min-width: 960px)").matches) {
    if (friendBox.length < 4) {
      friendBoxGridBox[0].style.gridTemplateRows = "repeat(1, 1fr)";
    } else if (friendBox.length < 7) {
      friendBoxGridBox[0].style.gridTemplateRows = "repeat(2, 1fr)";
    } else {
      friendBoxGridBox[0].style.gridTemplateRows = "repeat(3, 1fr)";
    }
  } else if (matchMedia("screen and (min-width: 768px)").matches) {
    if (friendBox.length < 3) {
      friendBoxGridBox[0].style.gridTemplateRows = "repeat(1, 1fr)";
    } else if (friendBox.length < 5) {
      friendBoxGridBox[0].style.gridTemplateRows = "repeat(2, 1fr)";
    } else {
      friendBoxGridBox[0].style.gridTemplateRows = "repeat(3, 1fr)";
    }
  } else {
    friendBoxGridBox[0].style.gridTemplateRows = "none";
  }
};

const init = () => {
  window.addEventListener("scroll", autoScrollEvent);
  window.addEventListener("resize", autoScrollEvent);
  if (userInfoTitle) {
    responsiveFriendBox();
    window.addEventListener("resize", responsiveFriendBox);
  }
};

if (jsFakeDivBox) {
  init();
}
