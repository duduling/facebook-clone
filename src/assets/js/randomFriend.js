import axios from "axios";

const jsRandomUsers = document.getElementById("jsRandomUsers");

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

const handleRandomblock = async event => {
  let whatDo;
  if (event.target.textContent === " Add") {
    whatDo = "addRandomFriend";
    const targetIdx = event.target.parentElement.id.split(
      "jsRandomFriendAdd"
    )[1];
    const response = await axios({
      url: "/api/addFriend",
      method: "POST",
      data: {
        targetIdx,
        whatDo
      }
    });
    document.getElementById(`jsRandomFriendBlock${targetIdx}`).remove();
    if (response.status === 200) {
      addRandomFriendHtml(response.data.rows);
    }
  } else if (event.target.textContent === " Remove") {
    console.log(event.target.parentElement.id.split("jsRandomFriendRemove")[1]);
  }
};

const init = () => {
  jsRandomUsers.addEventListener("click", handleRandomblock);
};

if (jsRandomUsers) {
  init();
}
