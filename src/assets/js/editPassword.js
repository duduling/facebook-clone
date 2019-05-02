import axios from "axios";

const changePwOld = document.getElementById("changePwOld");
const newPassword = document.getElementById("newPassword");
const newPasswordRe = document.getElementById("newPasswordRe");
const changePasswordBtn = document.getElementById("changePasswordBtn");

let changePwOldWord;
let changePwOldBoolean = false;
let newPasswordBoolean = false;
let newPasswordReBoolean = false;

// 조건 맞으면 Disabled False
const handleChangePasswordBtn = () => {
  console.log(changePwOldBoolean);
  console.log(newPasswordBoolean);
  console.log(newPasswordReBoolean);
  if (changePwOldBoolean && newPasswordBoolean && newPasswordReBoolean) {
    changePasswordBtn.disabled = false;
  } else {
    changePasswordBtn.disabled = true;
  }
};

// 비밀번호 맞는지 확인 Axios
const handleOldPwCheck = async () => {
  const checkChangePw = changePwOld.value;
  const response = await axios({
    url: `/api/checkChangePw`,
    method: "POST",
    data: {
      checkChangePw
    }
  });
  if (response.data) {
    changePwOld.style.borderColor = "#c9cacd";
    changePwOldBoolean = true;
    changePwOldWord = checkChangePw;
  } else {
    changePwOld.style.borderColor = "#ff0000";
    changePwOldBoolean = false;
  }
  handleChangePasswordBtn();
};

// New Password Check
const handleNewPwCheck = () => {
  if (newPassword.value === "") {
    newPassword.style.borderColor = "#c9cacd";
    newPasswordBoolean = false;
  } else if (newPassword.value === changePwOldWord) {
    newPassword.style.borderColor = "#ff0000";
    newPasswordBoolean = false;
  } else if (newPassword.value.length >= 6) {
    newPassword.style.borderColor = "#c9cacd";
    newPasswordBoolean = true;
  } else if (newPassword.value !== newPasswordRe.value) {
    newPassword.style.borderColor = "#ff0000";
    newPasswordBoolean = false;
  }
  handleChangePasswordBtn();
};

// New Password 2개 동일한지 확인
const handleNewRePwCheck = () => {
  if (newPasswordRe.value === "") {
    newPasswordRe.style.borderColor = "#c9cacd";
    newPasswordReBoolean = false;
  } else if (newPassword.value === changePwOldWord) {
    newPasswordRe.style.borderColor = "#ff0000";
    newPasswordReBoolean = false;
  } else if (newPassword.value === newPasswordRe.value) {
    newPasswordRe.style.borderColor = "#c9cacd";
    newPasswordReBoolean = true;
  } else {
    newPasswordRe.style.borderColor = "#ff0000";
    newPasswordReBoolean = false;
  }
  handleChangePasswordBtn();
};

const init = () => {
  changePwOld.addEventListener("keyup", handleOldPwCheck);
  newPassword.addEventListener("keyup", handleNewPwCheck);
  newPasswordRe.addEventListener("keyup", handleNewRePwCheck);
};

if (changePwOld && newPassword && newPasswordRe) {
  changePasswordBtn.disabled = true;
  init();
}
