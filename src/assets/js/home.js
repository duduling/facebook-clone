const homePageBirthForm = document.getElementById("homePage__join-form--birth");
const jsbirthYear = document.getElementById("jsbirthYear");
const jsbirthMonth = document.getElementById("jsbirthMonth");
const jsbirthDay = document.getElementById("jsbirthDay");

const jsEmail = document.getElementById("jsEmail");

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

const handleInput = () => {
  console.log(jsEmail.value);
};

const init = () => {
  selectOptions();
  jsEmail.addEventListener("input", handleInput);
};

if (homePageBirthForm) {
  init();
}
