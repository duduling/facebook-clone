import axios from "axios";

// const jsFeedBolckBtn = document.getElementById("jsFeedBolckBtn");
// const jsFeedBlockSubMenu = document.getElementById("jsFeedBlockSubMenu");
const feedSection = document.getElementById("feedSection");
const jsFeedBlockEdit = document.getElementById("jsFeedBlockEdit");

const postForm = document.createElement("form");

let tempSubMenuDocument;

const handleLikeCount = async targetIdx => {
  const LikeBtnDocument = document.getElementById(`LikeBtnIdx${targetIdx}`);
  let response;

  if (LikeBtnDocument.style.fontWeight === "400") {
    LikeBtnDocument.style.fontWeight = "600";
    LikeBtnDocument.style.color = "rgb(32, 120, 244)";

    response = await axios({
      url: "/api/likeCount",
      method: "POST",
      data: {
        targetIdx,
        action: true
      }
    });
  } else {
    LikeBtnDocument.style.fontWeight = "400";
    LikeBtnDocument.style.color = "black";

    response = await axios({
      url: "/api/likeCount",
      method: "POST",
      data: {
        targetIdx,
        action: false
      }
    });
  }

  if (response.status === 200) {
    document.getElementById(`jsLikeCountNumberIdx${targetIdx}`).innerText =
      response.data.likeCount;
  }
};

const handleFeedEdit = event => {
  const targetIdx = event.composedPath().filter(e => {
    return e.id === "jsFeedBlockEdit";
  })[0].value;

  console.log(`Edit ${targetIdx}`);
};

const handleFeedDelte = event => {
  const deleteFeedIdx = event.composedPath().filter(e => {
    return e.id === "jsFeedBlockDelete";
  })[0].value;
  console.log(deleteFeedIdx);
  //   postForm.setAttribute("charset", "UTF-8");
  //   postForm.setAttribute("method", "Post");
  //   postForm.setAttribute("action", `/feeds/${deleteFeedIdx}/delete`);

  //   document.body.appendChild(postForm);
  //   postForm.submit();
};

// SubMenu Toggle Function
const offTheSubMenu = () => {
  tempSubMenuDocument.style.display = "none";
  tempSubMenuDocument = null;
};

const feedSubMenuToggle = event => {
  const subMenuBtnIdx = event.srcElement.offsetParent.attributes.value.value;
  const subMenuDocument = document.getElementById(
    `jsFeedBlockSubMenuIdx${subMenuBtnIdx}`
  );

  if (
    subMenuDocument.style.display === "none" &&
    tempSubMenuDocument !== subMenuDocument
  ) {
    if (tempSubMenuDocument) {
      offTheSubMenu();
    }
    subMenuDocument.style.display = "grid";
    tempSubMenuDocument = subMenuDocument;
  } else {
    subMenuDocument.style.display = "none";
    tempSubMenuDocument = null;
  }
};

const subMenuClickEvent = event => {
  const eventPath = event.composedPath();

  // Click Event SubMenu
  if (eventPath[1].id === "jsFeedBolckBtnIdx") {
    feedSubMenuToggle(event);
  } else if (tempSubMenuDocument) {
    offTheSubMenu();
  }

  //   Click Event Feed Delete
  if (
    eventPath[0].id === "jsFeedBlockDelete" ||
    eventPath[1].id === "jsFeedBlockDelete" ||
    eventPath[2].id === "jsFeedBlockDelete"
  ) {
    handleFeedDelte(event);
  }

  //  Click Event LikeBtn
  if (eventPath[0].id === "jsLikeBtn" || eventPath[1].id === "jsLikeBtn") {
    handleLikeCount(event.srcElement.offsetParent.attributes.value.value);
  }
};

const init = () => {
  jsFeedBlockEdit.addEventListener("click", handleFeedEdit);
  window.addEventListener("click", subMenuClickEvent);
};

if (feedSection) {
  init();
}
