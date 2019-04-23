import axios from "axios";

const homePageBirthForm = document.getElementById("homePage__join-form--birth");
const jsbirthYear = document.getElementById("jsbirthYear");
const jsbirthMonth = document.getElementById("jsbirthMonth");
const jsbirthDay = document.getElementById("jsbirthDay");

const jsEmail = document.getElementById("jsEmail");

let checkWord;

let booleanId = false;
let booleanPw = false;

const selectOptions = async () => {
  const toYear = new Date().getFullYear();
  const end = toYear - 100;

  for (let i = toYear; i >= end; i--) {
    const optionYear = document.createElement("option");
    optionYear.value = i;
    optionYear.innerText = i;
    jsbirthYear.append(optionYear);
  }

  for (let i = 1; i <= 12; i++) {
    const optionMonth = document.createElement("option");
    optionMonth.value = i;
    optionMonth.innerText = i;
    jsbirthMonth.append(optionMonth);
  }

  for (let i = 1; i <= 31; i++) {
    const optionDay = document.createElement("option");
    optionDay.value = i;
    optionDay.innerText = i;
    jsbirthDay.append(optionDay);
  }
};

const handleInput = async () => {
  checkWord = jsEmail.value;

  const response = await axios({
    url: `/api/checkId`,
    method: "POST",
    data: {
      checkWord
    }
  });

  // 중복시 테투리 빨간색으로
  if (!response.data) {
    jsEmail.style.borderColor = "#ff0000";
  } else {
    jsEmail.style.borderColor = "#c9cacd";
  }
};

const init = () => {
  selectOptions();
  jsEmail.addEventListener("input", handleInput);
};

if (homePageBirthForm) {
  init();
}
