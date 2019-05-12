import axios from "axios";

const feedSection = document.getElementById("feedSection");

// HTML
const addCommentHTML = `

`;

const handleEventAddComment = async event => {
  const response = await axios({
    url: "/api/addComment",
    method: "POST",
    data: {
      feedIdx: event.target[2].value,
      description: event.target[0].value
    }
  }).catch(error => {
    console.log(error);
  });

  if (response.status === 200) {
    console.log(event.target[2].value);
    console.log(event.target[0].value);
  }

  document.getElementById(`commentInputIdx${event.target[2].value}`).value = "";
};

const init = () => {
  window.addEventListener("submit", handleEventAddComment);
};

if (feedSection) {
  init();
}
