import axios from "axios";
import { handleAddCommentDocu, whatTimeIsIt } from "./feedComment";

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

const jsFeedImageZoom = document.getElementById("jsFeedImageZoom");
const jsImageZoom = document.getElementById("jsImageZoom");
const jsImgCloseBtn = document.getElementById("jsImgCloseBtn");

const postForm = document.createElement("form");

let tempSubMenuDocument;

const handleAddFeedDocu = feed => {
  const fromFeedCheck = () => {
    if (feed.otherName && feed.otherName !== feed.writer) {
      return `
      <div class="feedBolck__header-from-userName">
        <span> 👉🏻</span>
        <span>${feed.otherName}</span>
      </div>
  `;
    }
    return ``;
  };

  const editFeedCheck = () => {
    if (feed.edited === 1) {
      return `
      <span>${whatTimeIsIt(feed.createdAt)} · Edited</span>
  `;
    }
    return `<span>${whatTimeIsIt(feed.createdAt)}</span>`;
  };

  const fileUrlCheck = () => {
    if (feed.fileUrl !== null) {
      return `
      <img src="${feed.fileUrl}" alt="content img" id="feedBlockImgIdx${
        feed.idx
      }"/>
  `;
    }
    return ``;
  };

  const commentCountCheck = () => {
    if (feed.edited === 1) {
      return `
      <span id="jsFeedCommentCountIdx${feed.idx}"> 0</span>

  `;
    }
    return `
      <span id="jsFeedCommentCountIdx${feed.idx}">${feed.comments}</span>
`;
  };

  const likeStyleCheck = () => {
    if (feed.edited === 1) {
      return `
      <i class="far fa-thumbs-up" id="LikeBtnIdx${
        feed.idx
      }" style="font-weight: 600; color: rgb(32, 120, 244)"> Like</i>
  `;
    }
    return `
    <i class="far fa-thumbs-up" id="LikeBtnIdx${
      feed.idx
    }" style="font-weight: 400"> Like</i>
`;
  };

  const addFeedHTML = `
<article class="feedBlock" id="feedBlockIdx${feed.idx}" value="${feed.idx}">
  <div class="feedBlock__header">
    <a href="/feeds/${feed.writer_idx}">
      <img src="${feed.profile}" alt="userProfile" />
    </a>
    <div class="feedBlock__header-grid">
      <div class="feedBolck__header-userName">
        <a href="/feeds/${feed.writer_idx}">
          <span>${feed.writer}</span>
        </a>
        ${fromFeedCheck(feed)}
      </div>
      ${editFeedCheck(feed)}
    </div>
    <div class="feedBlock__header-subMenuBtn" id="jsFeedBolckBtnIdx">
      <i class="fas fa-ellipsis-h"></i>
    </div>
  </div>
  <div
    class="feedBlock__subMenu"
    id="jsFeedBlockSubMenuIdx${feed.idx}"
    style="display: none"
  >
    <button id="jsFeedBlockEdit" value="${feed.idx}">
      <i class="far fa-edit">
        <span>수정하기</span>
      </i>
    </button>
    <button id="jsFeedBlockDelete" value="${feed.idx}">
      <i class="far fa-trash-alt">
        <span>삭제하기</span>
      </i>
    </button>
  </div>
  <div class="feedBlock__body">
    <span id="feedBlockDescriptionIdx${feed.idx}">${feed.description}</span>
    <div class="feedBlock__body-img">
      ${fileUrlCheck(feed)}
    </div>
  </div>
  <div class="feedBlock__footer">
    <div class="feedBlock__footer-top">
      <div class="feedBlock__footer-like">
        <img src="/img/like_on.png" alt="like img" />
        <span id="jsLikeCountNumberIdx${feed.idx}">${feed.likes}</span>
      </div>
      <div class="feedBlock__footer-comment">
        <img src="/img/comment_on.png" alt="comment img" />
        ${commentCountCheck(feed)}
      </div>
    </div>
    <div class="feedBlock__designLine"></div>
    <div class="feedBlock__footer-btn">
      <button id="jsLikeBtn">
        ${likeStyleCheck(feed)}
      </button>
      <button id="jsCommentBtn">
        <i class="far fa-comment-alt" id="CommentBtnIdx${feed.idx}"> Comment</i>
      </button>
    </div>
  </div>
  <div
    class="feedBlock__comments"
    id="commentIdx${feed.idx}"
    value="${feed.idx}"
    style="display: none;"
  >
    <div class="feedBlock__comments-write">
      <form onsubmit="return false">
        <img src="${feed.profile}" alt="userProfile" />
        <input
          type="text"
          textarea="commentWrite"
          id="commentInputIdx${feed.idx}"
          autocomplete="off"
          required
        />
        <input type="submit" value="Add" name="targetIdx" value="${feed.idx}" />
        <input type="hidden" />
      </form>
    </div>
    <div
      class="feedBlock__comments-commentsList"
      id="jsCommetListIdx${feed.idx}"
      value="0"
    ></div>
    <div class="feedBlock__comments-pagingBtn">
      <a role="button">댓글 더보기</a>
    </div>
  </div>
</article>
`;

  feedSection.insertAdjacentHTML("beforeend", addFeedHTML);
};

// Auto Scroll Paging Process-------------------------------------------------------------------------

const autoScrollPaging = async () => {
  const feedPagingNumber = feedSection.attributes[1].value;
  const typeOrOtherIdx = window.location.href.split("/feeds/")[1];

  const response = await axios({
    url: "/api/selectFeedPaging",
    method: "POST",
    data: {
      feedPagingNumber,
      typeOrOtherIdx
    }
  }).catch(err => {
    console.log(err);
  });

  if (response.status === 200) {
    const returnFeedList = response.data.feedList;

    if (returnFeedList.length > 0) {
      for (let i = 0; i < returnFeedList.length; i++) {
        handleAddFeedDocu(returnFeedList[i]);
      }

      feedSection.attributes[1].value = Number(feedPagingNumber) + 1;

      window.addEventListener("scroll", autoScrollEvent);
    }
  }
};

const autoScrollEvent = () => {
  window.removeEventListener("scroll", autoScrollEvent);

  const scrollYPostion = window.scrollY + window.innerHeight;

  const autoScrollPagingPostionCheck = () => {
    return scrollYPostion / document.body.clientHeight;
  };

  if (autoScrollPagingPostionCheck() > 1) {
    window.removeEventListener("scroll", autoScrollEvent);
    autoScrollPaging();
  } else {
    window.addEventListener("scroll", autoScrollEvent);
  }
};

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
  const pageNumber = targetCommentDocument.getAttribute("value");

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
        targetIdx,
        pageNumber,
        fristPaging: true
      }
    }).catch(err => {
      console.log(err);
    });

    if (commentData.status === 200) {
      const returnCommentList = commentData.data.commentList;

      for (let i = 0; i < returnCommentList.length; i++) {
        handleAddCommentDocu(returnCommentList[i], "beforeend");
      }
      targetCommentDocument.value = true;
      targetDocument.style.display = "block";
      targetCommentDocument.setAttribute("value", Number(pageNumber) + 1);
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

// Feed Image Click Event------------------------------------------------------------------
const clickImageZoomOn = eventPath => {
  jsImageZoom.src = eventPath[0].src;

  jsFeedImageZoom.style.display = "block";

  document.body.style.overflow = "hidden";
};

const clickImageZoomOff = () => {
  jsFeedImageZoom.style.display = "none";

  document.body.style.overflow = "";
};

// SubMenu Click Event------------------------------------------------------------------
const subMenuClickEvent = event => {
  window.removeEventListener("click", subMenuClickEvent);

  const eventPath = event.composedPath();

  if (eventPath[0].className === "feedBlock-imageZoom") {
    clickImageZoomOff();
  }

  // Image Zoom
  if (eventPath[0].alt === "content img") {
    clickImageZoomOn(eventPath);
  }

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
    eventPath[0].id === "jsCommentBtn" ||
    eventPath[1].id === "jsCommentBtn"
  ) {
    handleCommentToggle(event.srcElement.offsetParent.attributes.value.value);
  }

  window.addEventListener("click", subMenuClickEvent);
};

const init = () => {
  if (
    window.location.href.split("http://localhost:3000/feeds/search")[1] ===
    undefined
  ) {
    window.addEventListener("scroll", autoScrollEvent);
    jsEditFeedUpload.addEventListener("change", inputEditFileChange);
    jsEditImgDeleteBtn.addEventListener("click", editUploadImgDelete);
  }
  jsImgCloseBtn.addEventListener("click", clickImageZoomOff);
  window.addEventListener("click", subMenuClickEvent);
};

if (feedSection) {
  init();
}
