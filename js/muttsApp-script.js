let userId = parseInt("3");
let baseUrl = "http://demo.codingnomads.co:8082/muttsapp";

//--------------------   CREATE CHAT BUBBLE   --------------------//

function createChatBubble(msgObj) {
  console.log(msgObj);
  let ChatBubble = document.createElement("div");

  if (msgObj.sender_id === userId) {
    ChatBubble.classList.add("chat-bubble", "out");
  } else {
    ChatBubble.classList.add("chat-bubble", "in");
  }
  let paragraph = document.createElement("p");
  paragraph.innerText = msgObj.message;

  ChatBubble.appendChild(paragraph);

  let wrapper = document.getElementById("chat-bubble-wrapper");
  wrapper.prepend(ChatBubble); //add messages to the beginning
}

//--------------------   CREATE CHAT BUBBLE(S)   --------------------//

function createChatBubbles(dataObj) {
  let chatsArr = dataObj.data;
  chatsArr.forEach((chatObj) => createChatBubble(chatObj));
}

//--------------------   GET USER CHATS    --------------------//

function getUserChats() {
  document.getElementById("message-preview-wrapper").innerHTML = ""; //clears previous message before fetching for new one(s)

  fetch(`${baseUrl}/users/${userId}/chats/`)
    .then((Response) => Response.json())
    .then((dataObj) => createPreviewBoxes(dataObj));

  // .then(function(dataObj){
  //   createPreviewBoxes(dataObj);
  // })
}

getUserChats();

//--------------------   CREATE MESSAGE PREVIEW BOX   --------------------//

function createMessagePreviewBox(chatObj) {
  console.log(chatObj);
  let MessagePreviewBox = document.createElement("div");
  MessagePreviewBox.classList.add("message-preview-box");
  MessagePreviewBox.setAttribute("data-chat_id", chatObj.chat_id);
  MessagePreviewBox.setAttribute("data-sender_id", chatObj.sender_id);
  MessagePreviewBox.addEventListener("click", previewBoxClick);

  let imgWrap = document.createElement("div");
  imgWrap.setAttribute("data-chat_id", chatObj.chat_id);
  imgWrap.setAttribute("data-sender_id", chatObj.sender_id);
  imgWrap.classList.add("img-wrap");
  let image = document.createElement("img");
  image.setAttribute("data-chat_id", chatObj.chat_id);
  image.setAttribute("data-sender_id", chatObj.sender_id);
  image.setAttribute("src", chatObj.photo_url);
  // image.style.backgroundImage = `url(${chatObj.photo_url})`
  image.setAttribute("alt", "default icon");

  imgWrap.appendChild(image);

  let textWrap = document.createElement("div");
  textWrap.setAttribute("data-chat_id", chatObj.chat_id);
  textWrap.setAttribute("data-sender_id", chatObj.sender_id);
  textWrap.classList.add("message-text-wrap");
  let nameParagraph = document.createElement("p");
  nameParagraph.setAttribute("data-chat_id", chatObj.chat_id);
  nameParagraph.setAttribute("data-sender_id", chatObj.sender_id);
  nameParagraph.innerText = chatObj.chat_name;
  let messageParagraph = document.createElement("p");
  messageParagraph.setAttribute("data-chat_id", chatObj.chat_id);
  messageParagraph.setAttribute("data-sender_id", chatObj.sender_id);
  messageParagraph.innerText = chatObj.last_message;

  textWrap.appendChild(nameParagraph);
  textWrap.appendChild(messageParagraph);

  let dateWrap = document.createElement("div");
  dateWrap.setAttribute("data-chat_id", chatObj.chat_id);
  dateWrap.setAttribute("data-sender_id", chatObj.sender_id);
  dateWrap.classList.add("date-wrap");
  let dateP = document.createElement("p");
  dateP.setAttribute("data-chat_id", chatObj.chat_id);
  dateP.setAttribute("data-sender_id", chatObj.sender_id);
  dateP.innerHTML = new Date(chatObj.date_sent).toLocaleDateString(); //always instantiate a new date

  dateWrap.appendChild(dateP);

  MessagePreviewBox.appendChild(imgWrap);
  MessagePreviewBox.appendChild(textWrap);
  MessagePreviewBox.appendChild(dateWrap);

  let MessagePreviewWrapper = document.getElementById(
    "message-preview-wrapper"
  );
  MessagePreviewWrapper.appendChild(MessagePreviewBox);
}

//--------------------   CREATE CONTACT PREVIEW BOX   --------------------//

function createContactPreviewBox() {
  let contactPreviewBox = document.createElement("div");
  contactPreviewBox.classList.add("contact-preview-box");

  let imgWrap = document.createElement("div");
  imgWrap.classList.add("img-wrap");
  let image = document.createElement("img");
  image.setAttribute("src", "./images/icons8-pikachu-pokemon-50.png");
  image.setAttribute("alt", "default icon");

  imgWrap.appendChild(image);

  let textWrap = document.createElement("div");
  textWrap.classList.add("contact-text-wrap");
  let nameParagraph = document.createElement("p");
  nameParagraph.innerText = "contact - user's - name";
  let messageParagraph = document.createElement("p");
  messageParagraph.innerText = "contact - last message";

  textWrap.appendChild(nameParagraph);
  textWrap.appendChild(messageParagraph);

  contactPreviewBox.appendChild(imgWrap);
  contactPreviewBox.appendChild(textWrap);

  let contactPreviewWrapper = document.getElementById(
    "contact-preview-wrapper"
  );
  contactPreviewWrapper.appendChild(contactPreviewBox);
}

createContactPreviewBox();

//--------------------   CREATE PREVIEW BOXE(S)  --------------------//

function createPreviewBoxes(dataObj) {
  let chatsArr = dataObj.data;
  chatsArr.forEach((chatObj) => createMessagePreviewBox(chatObj));
}

//--------------------   PREVIEW BOX CLICK  --------------------//

function previewBoxClick(event) {
  document.getElementById("chat-bubble-wrapper").innerHTML = " ";
  console.log(event.target);
  let chatID = event.target.dataset.chat_id;
  let senderID = event.target.dataset.sender_id;

  // Boolean to allow emoji button to be clicked
  document.querySelector('#emoji-menu').dataset.chat_selected = true;

  document.getElementById("send-message").dataset.chat_id = chatID; //getting message form data attribute and setting to chatID

  fetch(`${baseUrl}/users/${userId}/chats/${senderID}`)
    .then((ressponse) => ressponse.json())
    .then((dataObj) => createChatBubbles(dataObj));
}

//---------------------GET MODAL ELEMENT------------------------

//---get modal element
let modal = document.getElementById("popup-modal-window");

//---get open modal button
let modalButton = document.getElementById("modal-button");

//---get close button
let closeButton = document.getElementsByClassName("close-button")[0];

//---listen for OPEN click
modalButton.addEventListener("click", openModal);

//---listen for CLOSE click
closeButton.addEventListener("click", closeModal);

//---Listen for OUTSIDE click
window.addEventListener("click", outsideClick);

//---Function to open modal
function openModal() {
  modal.style.display = "block";
  document.getElementById("header-main").style.opacity = 0.2;
  document.querySelector(".main-content").style.opacity = 0.2;
}

//---Function to close modal
function closeModal() {
  modal.style.display = "none";
  document.getElementById("header-main").style.opacity = 1;
  document.querySelector(".main-content").style.opacity = 1;
}

//Function to close modal if outside click
function outsideClick(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.getElementById("header-main").style.opacity = 1;
    document.querySelector(".main-content").style.opacity = 1;
  }
}

// ------------------ON CLICK DROP DOWN MENU (SIDE BAR)------------------

let dropDownButton = document.getElementById("dropdown-button");

// ------click to open menu
dropDownButton.addEventListener("click", openDropdown);

//--------function to open menu
function openDropdown(event) {
  document.getElementById("dropdown-content").classList.toggle("show");
}

// //---Listen for OUTSIDE click
// window.addEventListener("click", outsideClickButton);

// function outsideClickButton(e){
//   if(event.target == document.querySelector("body")){
//     dropDownButton.style.display = "none";
//   }
// }

// ------------------ON CLICK DROP DOWN MENU (HEADER MAIN)------------------

let dropDownButton2 = document.getElementById("dropdown-button-main");

// ------click to open menu
dropDownButton2.addEventListener("click", openDropdown2);

//--------function to open menu
function openDropdown2(event) {
  document.getElementById("dropdown-content-main").classList.toggle("show");
}

// window.addEventListener("click", function (event) {
//   if (!event.target.matches(".dropdown-button")) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// });

// --------------------EMOJI BUTTON--------------------------------

// let emojiButton = document.getElementById("emoji-button");
// console.log($("#new-message"));

// $(document).ready(function (e) {
//   $("#new-message").emojiPicker({
//     height: "300px",
//     width: "450px",
//     button: false,
//   });

//   $("#emoji-button").click(function (event) {
//     event.preventDefault();
//     $("#new-message").emojiPicker("toggle");
//   });
// });

//--------------------   ADD EVENT(SUBMIT) LISTENER    --------------------//

let newMessageForm = document.getElementById("send-message");

newMessageForm.addEventListener("submit", function (event) {
  event.preventDefault(); //
  console.log(event);

  let msg = document.getElementById("new-message").value;

  let msgObj = {
    message: msg,
    sender_id: userId,
    chat_id: event.target.dataset.chat_id, //parsing into the event object target > dataset > chat_id

    // chat_id: document.getElementById('send-message').dataset.chat_id
  };

  createChatBubble(msgObj);
  sendMessageToAPI(msgObj);

  document.getElementById("new-message").value = " ";
});

//--------------------   SEND MESSAGE TO API   --------------------//

function sendMessageToAPI(msgObj) {
  let postParams = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(msgObj),
  };
  fetch(`${baseUrl}/users/${userId}/chat`, postParams)
    .then((res) => res.json())
    .then((res) => getUserChats());
}

//--------------------   NEW USER    --------------------//

function newUser() {
  let postData = {
    first_name: "",
    last_name: "",
    username: "",
    photo_url: "",
  };
  let postParams = {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(postData),
  };
  fetch(`${baseUrl}/users/`, postParams)
    .then((res) => res.json())
    .then((res) => console.log(res));
}

// function makeNewChatForm(e) {
//   newChatModalBody.innerHTML = "Loading Chat Form";
//   fetch(`${baseUrl}/users/`)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//       let usersArray = data.data;
//       let frm = document.createElement('form');
//       frm.id = `new-chat-frm`;
//       let formString = ``;
//       formString += `<input id="new-chat-user" type="text" list="users-list" class="form-control">`;
//       formString += `<datalist id="users-list">`
//       usersArray.forEach(userObj => {
//         formString += `<option data-value="${userObj.id}" value="${userObj.first_name} ${userObj.last_name}"></option> `
//       })
//       formString += `</datalist>`
//       formString += `<input type="submit" class="btn btn-success">`
//       frm.innerHTML = formString;
//       frm.addEventListener('submit', newChatSubmit)
//       newChatModalBody.innerHTML = "";
//       newChatModalBody.appendChild(frm);
//     })
// }
// function newChatSubmit(e) {
//   e.preventDefault()
//   let options = document.getElementById('users-list').options;
//   console.log(document.getElementById('users-list').options)
//   console.log(e.target.elements)
//   let val = e.target.elements["new-chat-user"].value
//   console.log(val)
//   let newChatUserId;
//   Array.from(options).forEach(option => {
//     if (option.value === val) {
//       newChatUserId = option.getAttribute('data-value');
//     }
//   })
//   console.log(newChatUserId)
//   // Write submit fetch here
// }
