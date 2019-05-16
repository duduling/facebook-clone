import axios from "axios";

const feedSection = document.getElementById("feedSection");
const jsUserProfile = document.getElementById("jsUserProfile").src;
const jsUserName = document.getElementById("jsUserName").innerText;
const jsCommentListMore = document.getElementById("jsCommentListMore");

let tempCommentSubMenuDocument;
let tempCommentEditDocument;

const whatTimeIsIt = targetDate => {
  if (targetDate !== false) {
    const nowTime = new Date();
    const targetDateObj = new Date(targetDate);

    if (nowTime.getFullYear() !== targetDateObj.getFullYear()) {
      return `${nowTime.getFullYear() - targetDateObj.getFullYear()} year`;
    }

    if (nowTime.getMonth() !== targetDateObj.getMonth()) {
      return `${nowTime.getMonth() - targetDateObj.getMonth()} mon`;
    }

    if (nowTime.getDate() !== targetDateObj.getDate()) {
      return `${nowTime.getDate() - targetDateObj.getDate()} day`;
    }

    if (nowTime.getHours() !== targetDateObj.getHours()) {
      if (
        nowTime.getHours() - targetDateObj.getHours() === 1 &&
        nowTime.getMinutes() - targetDateObj.getMinutes() < 0
      ) {
        return `${nowTime.getMinutes() - targetDateObj.getMinutes() + 60} min`;
      }
      return `${nowTime.getHours() - targetDateObj.getHours()} hr`;
    }

    if (nowTime.getMinutes() !== targetDateObj.getMinutes()) {
      return `${nowTime.getMinutes() - targetDateObj.getMinutes()} min`;
    }
  }

  return "Now";
};

// Comment HTML
export const handleAddCommentDocu = (comment, type) => {
  let htmlBlock = "";
  let editBlock = "";

  // cocoment가 있는지 없는지 확인 후 htmlBlock 생성
  if (comment.commentCount > 1) {
    htmlBlock = `
    <div class="feedBlock__comment-block--cocomment", value="true">
      <a role="button", value="false">
        <img src="/img/cocomment_arrow.png" alt="cocomment_arrow">
        <span id="cocomentBtn">답글 보기 ${comment.commentCount - 1}개</span>
      </a>
    </div>
    `;
  } else {
    htmlBlock = `
    <div class="feedBlock__comment-block--cocomment",  value="true", style="display: none"></div>
    `;
  }
  if (comment.edited === " ·　Edited") {
    editBlock = `<span>${comment.edited}</span>`;
  }

  const addCommentHTML = `
  <div id="jsCommentBlockIdx${comment.idx}">
    <div class="feedBlock__comment-non-Re">
      <div class="feedBlock__comments-single">
        <a href="#">
          <img src="${comment.profile}" , alt="userProfile" />
        </a>
        <div class="feedBlock__comments-single--body">
          <div class="feedBlock__comment-block">
            <div class="feedBlock__comment-block--description">
              <a href="">${comment.name}</a>
              <span>${comment.description} </span>
            </div>
            <div class="feedBlock__comment-subMenu">
              <i class="fas fa-ellipsis-h" , id="commentSubMenuBtn">
                <div class="feedBlock__comment-subMenuBox" , style="display: none">
                  <button id="jsCommentEditBtn" , value="${comment.idx}">
                    <i class="far fa-edit">
                      <span>수정하기</span>
                    </i>
                  </button>
                  <button id="jsCommentDeleteBtn" , value="${comment.idx}">
                    <i class="far fa-trash-alt">
                      <span>삭제하기</span>
                    </i>
                  </button>
                </div>
              </i>
            </div>
          </div>
          <div class="feedBlock__comment-block--fuction">
            <a role="button", value="true">답글 달기</a>
            <span>·</span>
            <span>${whatTimeIsIt(comment.createdAt)}</span>
            ${editBlock}
          </div>
          ${htmlBlock}
        </div>
      </div>
      <div class="feedBlock__comments-single--edit", style="display: none">
        <form onsubmit="return false;">
          <img src="${comment.profile}" alt="userProfile" />
          <input type="text" textarea="commentWrite", required/>
          <input type="submit" value="Edit" />
          <input type="hidden" name="targetIdx" value="${comment.idx}" />
        </form>
        <span>취소하려면 Esc를 눌러주세요.</span>
      </div>
    </div>
    <div class="feedBlock__comments-Re-write", id="jsCocommentWriteIdx${
      comment.idx
    }", style="display: none">
      <form onsubmit="return false;">
        <img src="${comment.profile}" alt="userProfile" />
        <input type="text" textarea="commentWrite", id="cocommentInputIdx${
          comment.idx
        }", autocomplete="off", required/>
        <input type="submit" value="Add" />
        <input type="hidden" name="targetIdx" value="${comment.idx}" />
      </form>
    </div>
  </div>
`;

  document
    .getElementById(`jsCommetListIdx${comment.feedIdx}`)
    .insertAdjacentHTML(type, addCommentHTML);
};

// Cocoment HTML
export const handleAddCocommentDocu = cocomment => {
  let editBlock = "";

  if (cocomment.edited === " ·　Edited") {
    editBlock = `<span>${cocomment.edited}</span>`;
  }

  const addCocommentHTML = `
    <div class="feedBlock__comments-Re", id="jsCocommentBlockIdx${
      cocomment.idx
    }">
      <div class="feedBlock__comments-single">
        <a href="#">
          <img src="${cocomment.profile}" , alt="userProfile" />
        </a>
        <div class="feedBlock__comments-single--body">
          <div class="feedBlock__comment-block">
            <div class="feedBlock__comment-block--description">
              <a href="">${cocomment.name}</a>
              <span>${cocomment.description} </span>
            </div>
            <div class="feedBlock__comment-subMenu">
              <i class="fas fa-ellipsis-h" , id="commentSubMenuBtn">
                <div class="feedBlock__comment-subMenuBox-Re" , style="display: none">
                  <button id="jsCocommentEditBtn" , value="${cocomment.idx}">
                    <i class="far fa-edit">
                      <span>수정하기</span>
                    </i>
                  </button>
                  <button id="jsCocommentDeleteBtn" , value="${cocomment.idx}">
                    <i class="far fa-trash-alt">
                      <span>삭제하기</span>
                    </i>
                  </button>
                </div>
              </i>
            </div>
          </div>
          <div class="feedBlock__comment-block--fuction">
            <a role="button", value="false">답글 달기</a>
            <span>·</span>
            <span>${whatTimeIsIt(cocomment.createdAt)}</span>
            ${editBlock}
          </div> 
        </div>
      </div>
      <div class="feedBlock__comments-single--edit-Re", style="display: none">
        <form onsubmit="return false;">
          <img src="${cocomment.profile}" alt="userProfile" />
          <input type="text" textarea="commentWrite", autocomplete="off", required/>
          <input type="submit" value="Edit" />
          <input type="hidden" name="targetIdx" value="${cocomment.idx}" />
        </form>
        <span>취소하려면 Esc를 눌러주세요.</span>
      </div>
    </div>
`;

  document
    .getElementById(`jsCocommentWriteIdx${cocomment.commentIdx}`)
    .insertAdjacentHTML("beforebegin", addCocommentHTML);
};

// Select Comment Fucntion--------------------------------------------------------------------------
const selectCommentPaging = async targetIdx => {
  const targetCommentDocument = document.getElementById(
    `jsCommetListIdx${targetIdx}`
  );
  const pageNumber = targetCommentDocument.getAttribute("value");

  const commentData = await axios({
    url: "/api/selectComment",
    method: "POST",
    data: {
      targetIdx,
      pageNumber,
      fristPaging: false
    }
  }).catch(err => {
    console.log(err);
  });

  if (commentData.status === 200) {
    const returnCommentList = commentData.data.commentList;

    if (returnCommentList.length !== 0) {
      for (let i = 0; i < returnCommentList.length; i++) {
        handleAddCommentDocu(returnCommentList[i], "beforeend");
      }

      targetCommentDocument.setAttribute("value", Number(pageNumber) + 1);
    } else {
      alert("마지막 댓글 입니다.");
    }
  }
};

// Add Comment Fucntion--------------------------------------------------------------------------
const handleEventAddComment = async event => {
  const feedIdx = event.target[2].value;
  const description = event.target[0].value;

  const response = await axios({
    url: "/api/addComment",
    method: "POST",
    data: {
      feedIdx,
      description
    }
  }).catch(error => {
    console.log(error);
  });

  if (response.status === 200) {
    document.getElementById(`commentInputIdx${feedIdx}`).value = "";
    const comment = {
      idx: response.data.insertIdx,
      feedIdx,
      description,
      profile: jsUserProfile,
      name: jsUserName,
      createdAt: false
    };

    document.getElementById(`jsFeedCommentCountIdx${feedIdx}`).innerText =
      response.data.feedCommentCount;

    handleAddCommentDocu(comment, "afterbegin");
  }
};

// Comment SubMenu Toggle Process---------------------------------------------------------------
const offTheSubMenu = () => {
  tempCommentSubMenuDocument.style.display = "none";
  tempCommentSubMenuDocument = null;
};

const commentSubMenuToggle = targetDocu => {
  const commentSubMenuDocument = targetDocu;

  if (
    commentSubMenuDocument.style.display === "none" &&
    tempCommentSubMenuDocument !== commentSubMenuDocument
  ) {
    if (tempCommentSubMenuDocument) {
      offTheSubMenu();
    }
    commentSubMenuDocument.style.display = "grid";
    tempCommentSubMenuDocument = commentSubMenuDocument;
  } else {
    commentSubMenuDocument.style.display = "none";
    tempCommentSubMenuDocument = null;
  }
};

// Comment Edit Process---------------------------------------------------------------
const handleEditInputOn = commentToggleDocu => {
  const targetDocu = commentToggleDocu;
  const CommentInnerText =
    targetDocu[0].lastElementChild.firstElementChild.firstElementChild
      .lastElementChild.innerText;

  // Edit Input에 기존 Text 넣어주기
  targetDocu[1].children[0][0].value = CommentInnerText;

  targetDocu[0].style.display = "none";
  targetDocu[1].style.display = "block";
};

const handleEditInputOff = commentToggleDocu => {
  const targetDocu = commentToggleDocu;

  targetDocu[0].style.display = "grid";
  targetDocu[1].style.display = "none";
};

const handleEditCommentToggle = eventPath => {
  const targetIdx = eventPath.filter(e => {
    return e.id === "jsCommentEditBtn";
  })[0].value;

  const targetDocuChild = document.getElementById(
    `jsCommentBlockIdx${targetIdx}`
  ).children[0].children;

  if (tempCommentEditDocument) {
    handleEditInputOff(tempCommentEditDocument);
  }

  if (targetDocuChild[1].style.display === "none") {
    tempCommentEditDocument = targetDocuChild;
    handleEditInputOn(targetDocuChild);
  } else {
    tempCommentEditDocument = false;
    handleEditInputOff(targetDocuChild);
  }
};

const handlePostEditComment = async event => {
  const description = event.srcElement[0].value;
  const idx = event.srcElement[2].value;

  const response = await axios({
    url: "/api/editComment",
    method: "POST",
    data: {
      idx,
      description
    }
  }).catch(err => {
    console.log(err);
  });

  if (response.status === 200) {
    const targetDocuChild = document.getElementById(`jsCommentBlockIdx${idx}`)
      .children[0];

    console.log(targetDocuChild);

    targetDocuChild.firstElementChild.lastElementChild.firstElementChild.firstElementChild.lastElementChild.innerText = description;
    handleEditInputOff(targetDocuChild.children);
  }
};

// Comment Delete Process---------------------------------------------------------------
const handleCommentDelete = async eventPath => {
  const commentIdx = eventPath.filter(e => {
    return e.id === "jsCommentDeleteBtn";
  })[0].value;

  const feedIdx = eventPath.filter(e => {
    return e.className === "feedBlock";
  })[0].attributes[2].value;

  const response = await axios({
    url: "/api/deleteComment",
    method: "POST",
    data: {
      commentIdx,
      feedIdx
    }
  }).catch(err => {
    console.log(err);
  });

  if (response.status === 200) {
    document.getElementById(`jsCommentBlockIdx${commentIdx}`).remove();
    document.getElementById(`jsFeedCommentCountIdx${feedIdx}`).innerText =
      response.data.feedCommentCount;
  }
};

// Cocomment Toggle Process---------------------------------------------------------------
const handleCocomentToggle = async (eventPath, number) => {
  let commentIdx;
  let cocommentBtn;
  let cocommentBtnBoolean;
  let cocommentInput;

  const catchEventPath = eventPath;

  if (number === 0) {
    [cocommentInput] = [
      catchEventPath[5].lastElementChild.lastElementChild.children[1]
    ];
  } else if (number === 9) {
    [commentIdx, cocommentBtn, cocommentBtnBoolean, cocommentInput] = [
      catchEventPath[5].id.split("jsCommentBlockIdx")[1],
      catchEventPath[2].children[2],
      catchEventPath[2].children[2].attributes[2].value,
      catchEventPath[5].lastElementChild.lastElementChild.children[1]
    ];
    catchEventPath[2].children[2].attributes[2].value = false;
  } else if (number === 10) {
    [commentIdx, cocommentBtn, cocommentBtnBoolean, cocommentInput] = [
      catchEventPath[6].id.split("jsCommentBlockIdx")[1],
      catchEventPath[2],
      catchEventPath[2].attributes[2].value,
      catchEventPath[6].lastElementChild.lastElementChild.children[1]
    ];
    catchEventPath[2].attributes[2].value = false;
  }

  // 댓글 대댓글 답글 달기 input 포커스
  if (
    eventPath[4].className !== "feedBlock__comments-Re" &&
    cocommentBtnBoolean === "true" &&
    number !== 0
  ) {
    const response = await axios({
      url: "/api/selectCocomment",
      method: "POST",
      data: {
        commentIdx
      }
    }).catch(err => {
      console.log(err);
    });

    if (response.status === 200) {
      const returnCocommentList = response.data.cocommentList;

      cocommentBtn.style.display = "none";

      for (let i = 0; i < returnCocommentList.length; i++) {
        handleAddCocommentDocu(returnCocommentList[i]);
      }

      document.getElementById(
        `jsCocommentWriteIdx${commentIdx}`
      ).style.display = "block";
    }
  } else {
    cocommentInput.focus();
  }
};

// Cocomment Add Process---------------------------------------------------------------
const handleCocommentAdd = async event => {
  const commentIdx = event.target[2].value;
  const description = event.target[0].value;

  console.log(commentIdx);

  const feedIdx = event.composedPath().filter(e => {
    return e.className === "feedBlock";
  })[0].attributes[2].value;

  const response = await axios({
    url: "/api/addCocomment",
    method: "POST",
    data: {
      commentIdx,
      description,
      feedIdx
    }
  }).catch(error => {
    console.log(error);
  });

  if (response.status === 200) {
    document.getElementById(`cocommentInputIdx${commentIdx}`).value = "";
    const cocomment = {
      idx: response.data.insertIdx,
      commentIdx,
      description,
      profile: jsUserProfile,
      name: jsUserName,
      createdAt: false
    };

    document.getElementById(`jsFeedCommentCountIdx${feedIdx}`).innerText =
      response.data.feedCommentCount;

    handleAddCocommentDocu(cocomment);
  }
};

// Cocomment Edit Process---------------------------------------------------------------
const handleCocommentEditToggle = eventPath => {
  const cocommentIdx = eventPath.filter(e => {
    return e.id === "jsCocommentEditBtn";
  })[0].value;

  const targetDocuChild = document.getElementById(
    `jsCocommentBlockIdx${cocommentIdx}`
  ).children;

  if (tempCommentEditDocument) {
    handleEditInputOff(tempCommentEditDocument);
  }

  if (targetDocuChild[1].style.display === "none") {
    tempCommentEditDocument = targetDocuChild;
    handleEditInputOn(targetDocuChild);
  } else {
    tempCommentEditDocument = false;
    handleEditInputOff(targetDocuChild);
  }
};

const handlePostCocommentEdit = async event => {
  const description = event.srcElement[0].value;
  const cocommentIdx = event.srcElement[2].value;

  const response = await axios({
    url: "/api/editCocomment",
    method: "POST",
    data: {
      idx: cocommentIdx,
      description
    }
  }).catch(err => {
    console.log(err);
  });

  if (response.status === 200) {
    const targetDocuChild = document.getElementById(
      `jsCocommentBlockIdx${cocommentIdx}`
    ).children;

    targetDocuChild[0].lastElementChild.firstElementChild.firstElementChild.lastElementChild.innerText = description;
    handleEditInputOff(targetDocuChild);
  }
};

// Cocomment Delete Process---------------------------------------------------------------
const handleCocommentDelete = async eventPath => {
  const searchCocommentDocu = eventPath.filter(e => {
    return e.id === "jsCocommentDeleteBtn";
  })[0];

  const searchCommentDocu = eventPath.filter(e => {
    return e.className === "feedBlock__comments-Re";
  })[0];

  const feedIdx = eventPath.filter(e => {
    return e.className === "feedBlock";
  })[0].attributes[2].value;

  const cocommentIdx = searchCocommentDocu.value;

  const commentIdx = searchCommentDocu.parentElement.id.split(
    "jsCommentBlockIdx"
  )[1];

  const response = await axios({
    url: "/api/deleteCocomment",
    method: "POST",
    data: {
      commentIdx,
      cocommentIdx,
      feedIdx
    }
  }).catch(err => {
    console.log(err);
  });

  if (response.status === 200) {
    document.getElementById(`jsCocommentBlockIdx${cocommentIdx}`).remove();
    document.getElementById(`jsFeedCommentCountIdx${feedIdx}`).innerText =
      response.data.feedCommentCount;
  }
};

// Window Event Submit

const handleSubmitEvent = event => {
  const eventPath = event.composedPath();

  if (eventPath[1].className === "feedBlock__comments-write") {
    handleEventAddComment(event);
  }

  if (eventPath[1].className === "feedBlock__comments-single--edit") {
    handlePostEditComment(event);
  }

  if (eventPath[1].className === "feedBlock__comments-Re-write") {
    handleCocommentAdd(event);
  }

  if (eventPath[1].className === "feedBlock__comments-single--edit-Re") {
    handlePostCocommentEdit(event);
  }
};

// Window Event Click
const handleClickEvent = event => {
  const eventPath = event.composedPath();

  // More Comment Click Event
  if (eventPath[1].className === "feedBlock__comments-pagingBtn") {
    selectCommentPaging(eventPath[1].attributes[1].value);
  }

  // Comment SubMenu Click Event
  if (eventPath[0].id === "commentSubMenuBtn") {
    commentSubMenuToggle(eventPath[0].childNodes[1]);
  } else if (tempCommentSubMenuDocument) {
    offTheSubMenu();
  }

  // Click Event Comment Edit

  // Comment Edit
  if (
    eventPath[0].id === "jsCommentEditBtn" ||
    eventPath[1].id === "jsCommentEditBtn" ||
    eventPath[2].id === "jsCommentEditBtn"
  ) {
    // Cocomment Edit
    handleEditCommentToggle(eventPath);
  } else if (
    eventPath[0].id === "jsCocommentEditBtn" ||
    eventPath[1].id === "jsCocommentEditBtn" ||
    eventPath[2].id === "jsCocommentEditBtn"
  ) {
    handleCocommentEditToggle(eventPath);
  }

  //   Click Event Comment Delete

  // Comment Delete
  if (
    eventPath[0].id === "jsCommentDeleteBtn" ||
    eventPath[1].id === "jsCommentDeleteBtn" ||
    eventPath[2].id === "jsCommentDeleteBtn"
  ) {
    handleCommentDelete(eventPath);
    // Cocomment Delete
  } else if (
    eventPath[0].id === "jsCocommentDeleteBtn" ||
    eventPath[1].id === "jsCocommentDeleteBtn" ||
    eventPath[2].id === "jsCocommentDeleteBtn"
  ) {
    handleCocommentDelete(eventPath);
  }

  if (
    eventPath[0].innerText === "답글 달기" &&
    eventPath[0].attributes[2].value === "true"
  ) {
    handleCocomentToggle(eventPath, 9);
  } else if (
    eventPath[0].innerText === "답글 달기" &&
    eventPath[0].attributes[2].value === "false"
  ) {
    handleCocomentToggle(eventPath, 0);
  }

  if (
    eventPath[0].id !== "commentSubMenuBtn" &&
    eventPath[0].id === "cocomentBtn"
  ) {
    handleCocomentToggle(eventPath, 10);
  }
};

// Window Key Up Event
const handleKeyUpEvent = event => {
  if (event.code === "Escape" && tempCommentEditDocument) {
    handleEditInputOff(tempCommentEditDocument);
  }
};

const init = () => {
  window.addEventListener("submit", handleSubmitEvent);
  window.addEventListener("click", handleClickEvent);
  window.addEventListener("keyup", handleKeyUpEvent);
};

if (feedSection) {
  init();
}
