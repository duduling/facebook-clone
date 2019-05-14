import axios from "axios";

const feedSection = document.getElementById("feedSection");
const jsUserProfile = document.getElementById("jsUserProfile").src;
const jsUserName = document.getElementById("jsUserName").innerText;

let tempCommentSubMenuDocument;
let tempCommentEditDocument;
let tempCommentCocomentDocument;

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
export const handleAddCommentDocu = comment => {
  let htmlBlock = "";

  // cocoment가 있는지 없는지 확인 후 htmlBlock 생성
  if (comment.commentCount !== 0) {
    htmlBlock = `
    <div class="feedBlock__comment-block--cocomment">
      <a role="button">
        <img src="/img/cocomment_arrow.png" alt="cocomment_arrow">
        <span>답글 보기 ${comment.commentCount}개</span>
      </a>
    </div>
    `;
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
            <a role="button">답글 달기</a>
            <span>·</span>
            <span>${whatTimeIsIt(comment.createdAt)}</span>
          </div>
          ${htmlBlock}
        </div>
      </div>
      <div class="feedBlock__comments-single--edit", style="display: none">
        <form onsubmit="return false;">
          <img src="${comment.profile}" alt="userProfile" />
          <input type="text" textarea="commentWrite" />
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
        <input type="text" textarea="commentWrite" />
        <input type="submit" value="Edit" />
        <input type="hidden" name="targetIdx" value="${comment.idx}" />
      </form>
    </div>
  </div>
`;

  document
    .getElementById(`jsCommetListIdx${comment.feedIdx}`)
    .insertAdjacentHTML("afterbegin", addCommentHTML);
};

// Cocoment HTML
export const handleAddCocommentDocu = cocomment => {
  const addCocommentHTML = `
    <div class="feedBlock__comments-Re", id="jsCommentBlockIdx${cocomment.idx}">
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
                <div class="feedBlock__comment-subMenuBox" , style="display: none">
                  <button id="jsCommentEditBtn" , value="${cocomment.idx}">
                    <i class="far fa-edit">
                      <span>수정하기</span>
                    </i>
                  </button>
                  <button id="jsCommentDeleteBtn" , value="${cocomment.idx}">
                    <i class="far fa-trash-alt">
                      <span>삭제하기</span>
                    </i>
                  </button>
                </div>
              </i>
            </div>
          </div>
          <div class="feedBlock__comment-block--fuction">
          <a role="button">답글 달기</a>
          <span>·</span>
          <span>${whatTimeIsIt(cocomment.createdAt)}</span>
          </div> 
        </div>
      </div>
      <div class="feedBlock__comments-single--edit", style="display: none">
        <form onsubmit="return false;">
          <img src="${cocomment.profile}" alt="userProfile" />
          <input type="text" textarea="commentWrite" />
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

// Add Comment Fucntion
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
    document.getElementById(`commentInputIdx${event.target[2].value}`).value =
      "";
    const comment = {
      idx: response.data.insertId,
      feedIdx,
      description,
      profile: jsUserProfile,
      name: jsUserName,
      createdAt: false
    };
    handleAddCommentDocu(comment);
  }
};

// SubMenu Toggle Process---------------------------------------------------------------
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
const handleEditCommentOn = commentToggleDocu => {
  const targetDocu = commentToggleDocu;
  const CommentInnerText =
    targetDocu[0].lastElementChild.firstElementChild.firstElementChild
      .lastElementChild.innerText;

  // Edit Input에 기존 Text 넣어주기
  targetDocu[1].children[0][0].value = CommentInnerText;

  targetDocu[0].style.display = "none";
  targetDocu[1].style.display = "block";
};

const handleEditCommentOff = commentToggleDocu => {
  const targetDocu = commentToggleDocu;

  targetDocu[0].style.display = "grid";
  targetDocu[1].style.display = "none";
};

const handleCommentEdit = eventPath => {
  const targetIdx = eventPath.filter(e => {
    return e.id === "jsCommentEditBtn";
  })[0].value;

  const targetDocuChild = document.getElementById(
    `jsCommentBlockIdx${targetIdx}`
  ).children[0].children;

  if (tempCommentEditDocument) {
    handleEditCommentOff(tempCommentEditDocument, null);
  }

  if (targetDocuChild[1].style.display === "none") {
    tempCommentEditDocument = targetDocuChild;
    handleEditCommentOn(targetDocuChild);
  } else {
    tempCommentEditDocument = false;
    handleEditCommentOff(targetDocuChild, null);
  }
};

const handleEditComment = async event => {
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
      .children;

    targetDocuChild[0].lastElementChild.children[0].firstElementChild.lastElementChild.innerText = description;
    handleEditCommentOff(targetDocuChild);
  }
};

// Comment Delete Process---------------------------------------------------------------
const handleCommentDelete = async eventPath => {
  const commentIdx = eventPath.filter(e => {
    return e.id === "jsCommentDeleteBtn";
  })[0].value;

  const response = await axios({
    url: "/api/deleteComment",
    method: "POST",
    data: {
      commentIdx
    }
  }).catch(err => {
    console.log(err);
  });

  if (response.status === 200) {
    document.getElementById(`jsCommentBlockIdx${commentIdx}`).remove();
  }
};

// Cocomment Toggle Process---------------------------------------------------------------
const handleCocomentToggle = async eventPath => {
  const cocomentWriteDocu = eventPath[4].lastElementChild;

  if (cocomentWriteDocu.style.display === "none") {
    cocomentWriteDocu.style.display = "block";
    if (tempCommentCocomentDocument) {
      tempCommentCocomentDocument.style.display = "none";
    }
    tempCommentCocomentDocument = cocomentWriteDocu;
  } else {
    cocomentWriteDocu.style.display = "none";
    tempCommentCocomentDocument = false;
  }
};

const handleCocomentToggleReal = async (eventPath, number) => {
  let commentIdx;
  let cocommentBtn;
  let cocommentInput;
  const catchEventPath = eventPath;

  console.log(eventPath);

  if (number === 9) {
    [commentIdx, cocommentBtn, cocommentInput] = [
      catchEventPath[5].id.split("jsCommentBlockIdx")[1],
      catchEventPath[2].children[2],
      catchEventPath[5].lastElementChild.lastElementChild.children[1]
    ];
  } else {
    [commentIdx, cocommentBtn, cocommentInput] = [
      catchEventPath[6].id.split("jsCommentBlockIdx")[1],
      catchEventPath[2],
      catchEventPath[6].lastElementChild.lastElementChild.children[1]
    ];
  }
  if (cocommentBtn.style.display !== "none") {
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
const handleCocomentAdd = event => {
  console.log(event.srcElement);
};

// Cocomment Edit Process---------------------------------------------------------------

// Cocomment Delete Process---------------------------------------------------------------

// Window Event Submit
const handleSubmitEvent = event => {
  const eventPath = event.composedPath();

  if (eventPath[4].id === "feedSection") {
    handleEventAddComment(event);
  }

  if (eventPath[6].id === "feedSection") {
    handleEditComment(event);
  }

  if (eventPath[7].id === "feedSection") {
    handleCocomentAdd(event);
  }
};

// Window Event Click
const handleClickEvent = event => {
  const eventPath = event.composedPath();

  if (eventPath[0].id === "commentSubMenuBtn") {
    commentSubMenuToggle(eventPath[0].childNodes[1]);
  } else if (tempCommentSubMenuDocument) {
    offTheSubMenu();
  }

  //   Click Event Comment Edit
  if (
    eventPath[0].id === "jsCommentEditBtn" ||
    eventPath[1].id === "jsCommentEditBtn" ||
    eventPath[2].id === "jsCommentEditBtn"
  ) {
    handleCommentEdit(eventPath);
  }

  //   Click Event Comment Delete
  if (
    eventPath[0].id === "jsCommentDeleteBtn" ||
    eventPath[1].id === "jsCommentDeleteBtn" ||
    eventPath[2].id === "jsCommentDeleteBtn"
  ) {
    handleCommentDelete(eventPath);
  }

  if (
    eventPath.length > 9 &&
    eventPath[9].id === "feedSection" &&
    eventPath[0].style.display !== "none"
  ) {
    console.log("9");
    handleCocomentToggleReal(eventPath, 9);
  }

  if (
    eventPath.length > 10 &&
    eventPath[10].id === "feedSection" &&
    eventPath[2].style.display !== "none"
  ) {
    console.log("10");

    handleCocomentToggleReal(eventPath, 10);
  }
};

// Window Key Up Event
const handleKeyUpEvent = event => {
  if (event.code === "Escape" && tempCommentEditDocument) {
    handleEditCommentOff(tempCommentEditDocument, null);
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
