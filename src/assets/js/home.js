import axios from "axios";

const homePageBirthForm = document.getElementById("joinFormBirth");
const jsbirthYear = document.getElementById("jsbirthYear");
const jsbirthMonth = document.getElementById("jsbirthMonth");
const jsbirthDay = document.getElementById("jsbirthDay");

const jsEmail = document.getElementById("jsEmail");
const jsPassword = document.getElementById("jsPassword");
const jsRePassword = document.getElementById("jsPassword1");
const jsSubmit = document.getElementById("homePage__join-form--btn");

// Axios 체크 문자열
let checkWord;

// 비밀번호 정규식
const passwordRegular = /^[a-zA-Z0-9]{6,16}$/;

// 생년월일 Crete Loop
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

// Email 중복 체크
const handleEmailCheck = async () => {
  checkWord = jsEmail.value;

  const response = await axios({
    url: `/api/checkId`,
    method: "POST",
    data: {
      checkWord
    }
  }).catch(error => {
    console.log(error);
  });

  // 중복시 테투리 빨간색으로
  if (!response.data) {
    jsEmail.style.borderColor = "#ff0000";
    jsSubmit.disabled = true;
  } else {
    jsEmail.style.borderColor = "#c9cacd";
    jsSubmit.disabled = false;
  }
};

// 비밀번호 정규식 체크
const handlePasswordCheck = () => {
  if (jsPassword.value.length < 1) {
    jsPassword.style.borderColor = "#c9cacd";
    jsSubmit.disabled = false;
  } else if (passwordRegular.test(jsPassword.value)) {
    jsPassword.style.borderColor = "#c9cacd";
    jsSubmit.disabled = false;
  } else {
    // jsPassword.focus();
    jsPassword.style.borderColor = "#ff0000";
    jsSubmit.disabled = true;
  }
};

// 비밀번호 확인
const handleRePasswordCheck = () => {
  if (jsRePassword.value.length < 1) {
    jsRePassword.style.borderColor = "#c9cacd";
    jsSubmit.disabled = false;
  } else if (jsPassword.value === jsRePassword.value) {
    jsRePassword.style.borderColor = "#c9cacd";
    jsSubmit.disabled = false;
  } else {
    jsRePassword.style.borderColor = "#ff0000";
    jsSubmit.disabled = true;
  }
};

const init = () => {
  selectOptions();
  jsEmail.addEventListener("keyup", handleEmailCheck);
  jsPassword.addEventListener("keyup", handlePasswordCheck);
  jsRePassword.addEventListener("keyup", handleRePasswordCheck);
};

if (homePageBirthForm) {
  init();
}
