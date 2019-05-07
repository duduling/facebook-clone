import axios from "axios";

const jsRandomUsers = document.getElementById("jsRandomUsers");
let nowViewListId;

const addRandomFriendHtml = randUser => {
  const addHtml = `
              <div class="feed-main__aside-users--block" id="jsRandomFriendBlock${
                randUser.idx
              }">
                  <a href="/feeds/${randUser.idx}">
                      <img src="${randUser.profile}" alt="user profile" />
                  </a>
                  <div class="feed-main__aside-users--block-link">
                      <a href="/feeds/${randUser.idx}">${randUser.name}</a>
                      <div class="feed-main__aside-users--block-link-btn">
                          <button id="jsRandomFriendAdd${randUser.idx}">
                              <i class="fas fa-user-plus"> Add</i>
                          </button>
                          <button id="jsRandomFriendRemove${randUser.idx}">
                              <i class="fas fa-minus-circle"> Remove</i>
                          </button>
                      </div>
                  </div>
              </div>`;
  jsRandomUsers.insertAdjacentHTML("beforeend", addHtml);
};

const catchId = () => {
  // 초기화
  nowViewListId = [];

  for (let i = 1; i < jsRandomUsers.children.length; i++) {
    nowViewListId.push(
      jsRandomUsers.children[i].id.split("jsRandomFriendBlock")[1]
    );
  }
};

const handleRandomblock = async event => {
  await catchId();

  if (event.target.textContent === " Add") {
    const whatDo = "addRandomFriend";
    const targetIdx = event.target.parentElement.id.split(
      "jsRandomFriendAdd"
    )[1];
    const response = await axios({
      url: "/api/addFriend",
      method: "POST",
      data: {
        targetIdx,
        whatDo,
        nowViewListId
      }
    });
    document.getElementById(`jsRandomFriendBlock${targetIdx}`).remove();
    if (response.status === 200 && response.data.rows !== null) {
      addRandomFriendHtml(response.data.rows);
    }
  } else if (event.target.textContent === " Remove") {
    const targetIdx = event.target.parentElement.id.split(
      "jsRandomFriendRemove"
    )[1];
    const response = await axios({
      url: "/api/randomFriendRemove",
      method: "POST",
      data: {
        nowViewListId
      }
    });
    document.getElementById(`jsRandomFriendBlock${targetIdx}`).remove();
    if (response.status === 200 && response.data.rows !== null) {
      addRandomFriendHtml(response.data.rows);
    }
  }
};

const init = () => {
  jsRandomUsers.addEventListener("click", handleRandomblock);
};

if (jsRandomUsers) {
  init();
}
