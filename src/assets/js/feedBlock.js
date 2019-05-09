const jsFeedBolckBtn = document.getElementById("jsFeedBolckBtn");
const jsFeedBlockSubMenu = document.getElementById("jsFeedBlockSubMenu");
const jsFeedBlockEdit = document.getElementById("jsFeedBlockEdit");
const jsFeedBlockDelete = document.getElementById("jsFeedBlockDelete");

const handleFeedEdit = () => {
  console.log("Edit");
};

const handleFeedDelte = () => {
  console.log("Delete");
};

const feedSubMenuToggle = () => {
  if (jsFeedBlockSubMenu.style.display === "none") {
    jsFeedBlockSubMenu.style.display = "block";
  } else {
    jsFeedBlockSubMenu.style.display = "none";
  }
};

const init = () => {
  jsFeedBolckBtn.addEventListener("click", feedSubMenuToggle);
  jsFeedBlockEdit.addEventListener("click", handleFeedEdit);
  jsFeedBlockDelete.addEventListener("click", handleFeedDelte);
};

if (jsFeedBolckBtn) {
  init();
}
