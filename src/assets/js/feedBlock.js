import axios from "axios";
import { handleAddCommentDocu } from "./feedComment";

// const jsFeedBolckBtn = document.getElementById("jsFeedBolckBtn");
// const jsFeedBlockSubMenu = document.getElementById("jsFeedBlockSubMenu");
const feedSection = document.getElementById("feedSection");

// Edit Variables
const jsEditUploadTextarea = document.getElementById("jsEditUploadTextarea");
const jsEditFeedUpload = document.getElementById("jsEditFeedUpload");
const JsEditUploadpreviewBox = document.getElementById(
  "JsEditUploadpreviewBox"
);
const jsEditUploadPreview = document.getElementById("jsEditUploadPreview");
const jsEditImgDeleteBtn = document.getElementById("jsEditImgDeleteBtn");
const jsFeedBlockEditCover = document.getElementById("jsFeedBlockEditCover");
const jsFeedInputIdx = document.getElementById("jsFeedInputIdx");

const postForm = document.createElement("form");

let tempSubMenuDocument;

// Like Process-------------------------------------------------------------------------
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
    }).catch(error => {
      console.log(error);
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
    }).catch(error => {
      console.log(error);
    });
  }

  if (response.status === 200) {
    document.getElementById(`jsLikeCountNumberIdx${targetIdx}`).innerText =
      response.data.likeCount;
  }
};

// Comment Process-------------------------------------------------------------------------
const handleCommentToggle = async targetIdx => {
  const targetDocument = document.getElementById(`commentIdx${targetIdx}`);
  const targetCommentDocument = document.getElementById(
    `jsCommetListIdx${targetIdx}`
  );

  if (
    targetCommentDocument.value === true &&
    targetDocument.style.display === "none"
  ) {
    targetDocument.style.display = "block";
  } else if (
    targetCommentDocument.value !== true &&
    targetDocument.style.display === "none"
  ) {
    const commentData = await axios({
      url: "/api/selectComment",
      method: "POST",
      data: {
        targetIdx
      }
    }).catch(err => {
      console.log(err);
    });

    if (commentData.status === 200) {
      const returnCommentList = commentData.data.commentList;
      for (let i = 0; i < returnCommentList.length; i++) {
        handleAddCommentDocu(returnCommentList[i]);
      }
      targetCommentDocument.value = true;
      targetDocument.style.display = "block";
    }
  } else {
    targetDocument.style.display = "none";
  }
};

// Edit Proess--------------------------------------------------------------------------

// Img 처리하는 동안 Progress 띄우기 and Image section display: none -> block
const editFileOnCss = () => {
  document.getElementsByClassName(
    "feedBlock-edit-wrapper"
  )[0].style.gridTemplateRows = "1fr 10fr";
  document.getElementsByClassName(
    "feedBlock-edit__upload-form"
  )[0].style.gridTemplateRows = "2fr 2fr 1fr";
  JsEditUploadpreviewBox.style.display = "block";
  jsEditUploadTextarea.setAttribute("rows", "4");
  jsEditUploadPreview.setAttribute("src", "/img/progress.gif");
};

// Image section display: block -> none
const editFileOffCss = () => {
  document.getElementsByClassName(
    "feedBlock-edit-wrapper"
  )[0].style.gridTemplateRows = "1fr 7fr";
  document.getElementsByClassName(
    "feedBlock-edit__upload-form"
  )[0].style.gridTemplateRows = "4fr 1fr";
  JsEditUploadpreviewBox.style.display = "none";
  jsEditUploadTextarea.setAttribute("rows", "8");
  jsEditUploadPreview.setAttribute("src", "");
  jsEditFeedUpload.value = "";
};

const inputEditFileChange = inputFile => {
  if (inputFile.target.files && inputFile.target.files[0]) {
    const file = inputFile.target.files[0];
    const reader = new FileReader();

    editFileOnCss();

    reader.onload = e => {
      jsEditUploadPreview.setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    editFileOffCss();
  }
};

const editUploadImgDelete = () => {
  jsEditUploadPreview.setAttribute("src", "");
  editFileOffCss();
};

const handleFeedEdit = event => {
  const targetIdx = event.composedPath().filter(e => {
    return e.id === "jsFeedBlockEdit";
  })[0].value;

  const editImageElement = document.getElementById(
    `feedBlockImgIdx${targetIdx}`
  );

  if (editImageElement) {
    editFileOnCss();
    jsEditUploadPreview.setAttribute(
      "src",
      editImageElement.getAttribute("src")
    );
  } else {
    editFileOffCss();
  }

  jsEditUploadTextarea.innerText = document.getElementById(
    `feedBlockDescriptionIdx${targetIdx}`
  ).innerText;

  jsFeedInputIdx.setAttribute("value", targetIdx);

  jsFeedBlockEditCover.style.display = "block";
};

const checkEditExit = () => {
  if (confirm("수정을 종료하시겠습니까?")) {
    jsFeedBlockEditCover.style.display = "none";
  }
};

// Delete Process ----------------------------------------------------------------------
const handleFeedDelte = event => {
  const deleteFeedIdx = event.composedPath().filter(e => {
    return e.id === "jsFeedBlockDelete";
  })[0].value;
  postForm.setAttribute("charset", "UTF-8");
  postForm.setAttribute("method", "Post");
  postForm.setAttribute("action", `/feeds/${deleteFeedIdx}/delete`);

  document.body.appendChild(postForm);
  postForm.submit();
};

// SubMenu Toggle Process---------------------------------------------------------------
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

  //   Click Event Feed Edit
  if (
    eventPath[0].id === "jsFeedBlockEdit" ||
    eventPath[1].id === "jsFeedBlockEdit" ||
    eventPath[2].id === "jsFeedBlockEdit"
  ) {
    handleFeedEdit(event);
  } else if (event.target.id === "jsFeedBlockEditCover") {
    checkEditExit();
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

  //  Click Event CommentBtn
  if (
    eventPath[0].id === "jdCommentBtn" ||
    eventPath[1].id === "jdCommentBtn"
  ) {
    handleCommentToggle(event.srcElement.offsetParent.attributes.value.value);
  }
};

const init = () => {
  jsEditFeedUpload.addEventListener("change", inputEditFileChange);
  jsEditImgDeleteBtn.addEventListener("click", editUploadImgDelete);
  window.addEventListener("click", subMenuClickEvent);
};

if (feedSection) {
  init();
}
