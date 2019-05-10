// const jsFeedBolckBtn = document.getElementById("jsFeedBolckBtn");
// const jsFeedBlockSubMenu = document.getElementById("jsFeedBlockSubMenu");
const feedSection = document.getElementById("feedSection");
const jsFeedBlockEdit = document.getElementById("jsFeedBlockEdit");

const postForm = document.createElement("form");

let tempSubMenuDocument;

const handleFeedEdit = event => {
  const targetIdx = event.path.filter(e => {
    return e.id === "jsFeedBlockEdit";
  })[0].value;

  console.log(`Edit ${targetIdx}`);
};

const handleFeedDelte = event => {
  const deleteFeedIdx = event.path.filter(e => {
    return e.id === "jsFeedBlockDelete";
  })[0].value;
  console.log(deleteFeedIdx);
  //   postForm.setAttribute("charset", "UTF-8");
  //   postForm.setAttribute("method", "Post");
  //   postForm.setAttribute("action", `/feeds/${deleteFeedIdx}/delete`);

  //   document.body.appendChild(postForm);
  //   postForm.submit();
};

// const checkEvent = async event => {
//   const result = await event.path.filter(e => {
//     if (e.id === "jsFeedBlockSubMenu") {
//       return e.id === "jsFeedBlockSubMenu";
//     }

//     if (e.id === "jsFeedBlockDelete") {
//       return e.id === "jsFeedBlockDelete";
//     }

//     if (e.id === "jsFeedBlockEdit") {
//       return e.id === "jsFeedBlockEdit";
//     }
//   });

//   console.log(result);

//   //   if (result) {
//   //     handleFeedDelte(result.value);
//   //   }
// };

// SubMenu Toggle Function
const offTheSubMenu = () => {
  tempSubMenuDocument.style.display = "none";
  tempSubMenuDocument = null;
};

const feedSubMenuToggle = event => {
  const subMenuBtnIdx = event.path[1].attributes.value.value;
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
  if (event.path[1].id === "jsFeedBolckBtnIdx") {
    feedSubMenuToggle(event);
  } else if (tempSubMenuDocument) {
    offTheSubMenu();
  }

  if (
    event.path[0].id === "jsFeedBlockDelete" ||
    event.path[1].id === "jsFeedBlockDelete" ||
    event.path[2].id === "jsFeedBlockDelete"
  ) {
    handleFeedDelte(event);
  }

  //   console.log(event);
  //   checkEvent(event, "jsFeedBlockDelete");
};

const init = () => {
  //   jsFeedBolckBtn.addEventListener("click", feedSubMenuToggle);
  jsFeedBlockEdit.addEventListener("click", handleFeedEdit);
  window.addEventListener("click", subMenuClickEvent);
};

if (feedSection) {
  init();
}
