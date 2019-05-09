import axios from "axios";

const jsFeedBolckBtn = document.getElementById("jsFeedBolckBtn");
const jsFeedBlockSubMenu = document.getElementById("jsFeedBlockSubMenu");
const jsFeedBlockEdit = document.getElementById("jsFeedBlockEdit");
const jsFeedBlockDelete = document.getElementById("jsFeedBlockDelete");

const postForm = document.createElement("form");

const handleFeedEdit = event => {
  const targetIdx = event.path.filter(e => {
    return e.id === "jsFeedBlockEdit";
  })[0].value;

  console.log(`Edit ${targetIdx}`);
};

const handleFeedDelte = targetIdx => {
  postForm.setAttribute("charset", "UTF-8");
  postForm.setAttribute("method", "Post");
  postForm.setAttribute("action", `/feeds/${targetIdx}/delete`);

  document.body.appendChild(postForm);
  postForm.submit();
};

const checkEvent = async (event, checkId) => {
  const result = await event.path.filter(e => {
    return e.id === `${checkId}`;
  })[0];

  if (result) {
    handleFeedDelte(result.value);
  }
};

const subMenuClickEvent = event => {
  checkEvent(event, "jsFeedBlockDelete");
};

const feedSubMenuToggle = () => {
  if (jsFeedBlockSubMenu.style.display === "none") {
    jsFeedBlockSubMenu.style.display = "grid";
  } else {
    jsFeedBlockSubMenu.style.display = "none";
  }
};

const init = () => {
  jsFeedBolckBtn.addEventListener("click", feedSubMenuToggle);
  jsFeedBlockEdit.addEventListener("click", handleFeedEdit);
  window.addEventListener("click", subMenuClickEvent);
};

if (jsFeedBolckBtn) {
  init();
}
