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
        // asideStyle.style.bottom = userInfoTitle ? "50px" : "20px";
      }
    }
    if (asideStyle.style.position !== "fixed" && asideFixScroll() > 1) {
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
      asideStyle.style.position = "fixed";
      asideStyle.style.width = userInfoTitle ? "29.5%" : "30%";
      jsFakeDivBox.style.display = "block";
    } else if (asideStyle.style.position === "fixed" && asideFixScroll() < 1) {
      asideStyle.style.top = "";
      asideStyle.style.bottom = "";
      asideStyle.style.position = "";
      asideStyle.style.width = "100%";
      jsFakeDivBox.style.display = "none";
    }
  } else {
    asideStyle.style.top = "";
    asideStyle.style.bottom = "";
    asideStyle.style.position = "";
    asideStyle.style.width = "";
    jsFakeDivBox.style.display = "none";
  }
};

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
