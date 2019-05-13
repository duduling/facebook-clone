const jsUploadTextarea = document.getElementById("jsUploadTextarea");
const jsFeedUpload = document.getElementById("jsFeedUpload");
const JsUploadpreviewBox = document.getElementById("JsUploadpreviewBox");
const jsUploadPreview = document.getElementById("jsUploadPreview");
const jsImgDeleteBtn = document.getElementById("jsImgDeleteBtn");

// CSS with JS

// Img 처리하는 동안 Progress 띄우기 and Image section display: none -> block
const fileOnCss = () => {
  document.getElementsByClassName(
    "feed-main__upload-wrapper"
  )[0].style.gridTemplateRows = "1fr 10fr";
  document.getElementsByClassName(
    "feed-main__upload-form"
  )[0].style.gridTemplateRows = "2fr 2fr 1fr";
  JsUploadpreviewBox.style.display = "block";
  jsUploadTextarea.setAttribute("rows", "3");
  jsUploadPreview.setAttribute("src", "/img/progress.gif");
};

// Image section display: block -> none
const fileOffCss = () => {
  document.getElementsByClassName(
    "feed-main__upload-wrapper"
  )[0].style.gridTemplateRows = "1fr 7fr";
  document.getElementsByClassName(
    "feed-main__upload-form"
  )[0].style.gridTemplateRows = "4fr 1fr";
  JsUploadpreviewBox.style.display = "none";
  jsUploadTextarea.setAttribute("rows", "6");
  jsUploadPreview.setAttribute("src", "");
  jsFeedUpload.value = "";
};

// Function
const inputFileChange = inputFile => {
  if (inputFile.target.files && inputFile.target.files[0]) {
    const file = inputFile.target.files[0];
    const reader = new FileReader();

    fileOnCss();

    reader.onload = e => {
      jsUploadPreview.setAttribute("src", e.target.result);
    };
    reader.readAsDataURL(file);
  } else {
    fileOffCss();
  }
};

// const textareaResponsiveRows = () => {
//   console.log(jsUploadPreview.getAttribute("src"));
//   if (jsUploadPreview.getAttribute("src") === "") {
//     console.log("0");
//     if (matchMedia("screen and (max-width: 480px)").matches) {
//       console.log("1");

//       jsUploadTextarea.setAttribute("rows", "5");
//     } else if (matchMedia("screen and (max-width: 600px)").matches) {
//       console.log("2");

//       jsUploadTextarea.setAttribute("rows", "6");
//     } else {
//       console.log("3");

//       jsUploadTextarea.setAttribute("rows", "7");
//     }
//   }
// };

const uploadImgDelete = () => {
  jsUploadPreview.setAttribute("src", "");
  fileOffCss();
};

const init = () => {
  // window.addEventListener("resize", textareaResponsiveRows);
  jsFeedUpload.addEventListener("change", inputFileChange);
  jsImgDeleteBtn.addEventListener("click", uploadImgDelete);
};

if (jsUploadTextarea) {
  init();
}
