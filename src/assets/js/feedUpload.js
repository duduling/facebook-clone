const jsUploadTextarea = document.getElementById("jsUploadTextarea");

const textareaResponsiveRows = () => {
  console.log("fdsa");
  if (matchMedia("screen and (max-width: 480px)").matches) {
    jsUploadTextarea.setAttribute("rows", "5");
  } else if (matchMedia("screen and (max-width: 600px)").matches) {
    jsUploadTextarea.setAttribute("rows", "6");
  } else {
    jsUploadTextarea.setAttribute("rows", "7");
  }
};

const init = () => {
  window.addEventListener("resize", textareaResponsiveRows);
};

if (jsUploadTextarea) {
  init();
}
