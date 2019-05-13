import axios from "axios";

const feedSection = document.getElementById("feedSection");
const jsUserProfile = document.getElementById("jsUserProfile").src;
const jsUserName = document.getElementById("jsUserName").innerText;

let tempCommentSubMenuDocument;

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

// HTML
export const handleAddCommentDocu = comment => {
  const addCommentHTML = `
  <div class="feedBlock__comments-single">
  <a href="#">
    <img src="${comment.profile}", alt="userProfile" />
  </a>
  <div class="feedBlock__comments-single--body">
    <div class="feedBlock__comment-block">
      <div class="feedBlock__comment-block--description">
        <a href="">${comment.name}</a>
        <span
          >${comment.description}
        </span>
      </div>
      <div class="feedBlock__comment-subMenu">
        <i class="fas fa-ellipsis-h", id="commentSubMenuBtn">
          <div class="feedBlock__comment-subMenuBox", style="display: none">
            <button>
              <i class="far fa-edit">
                <span>수정하기</span>
              </i>
            </button>
            <button>
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
  </div>
</div>
<div class="feedBlock__comments-single--edit">
  <form onsubmit="return false;">
    <img src="${comment.profile}" alt="userProfile" />
    <input type="text" textarea="commentWrite" />
    <input type="submit" value="Edit" />
    <input type="hidden" name="targetIdx" value="${comment.Idx}" />
  </form>
</div>
`;

  document
    .getElementById(`jsCommetListIdx${comment.feedIdx}`)
    .insertAdjacentHTML("afterbegin", addCommentHTML);
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

// Window Event Click
const handleClickEvent = event => {
  const targetPath = event.composedPath();

  if (targetPath[0].id === "commentSubMenuBtn") {
    commentSubMenuToggle(targetPath[0].childNodes[1]);
  } else if (tempCommentSubMenuDocument) {
    offTheSubMenu();
  }
};

const init = () => {
  window.addEventListener("submit", handleEventAddComment);
  window.addEventListener("click", handleClickEvent);
};

if (feedSection) {
  init();
}
