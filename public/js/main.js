document.addEventListener('DOMContentLoaded', () => {
const socket = io(); // Connect to the server
socket.on("connect", () => {
  // console.log("Connected to server with", socket.id);
  // You can emit and listen for custom events here
  socket.on("newPost", (message) => {
    // console.log("message rec ", message);
    const userExist=0;
    const postContainer = document.querySelector(".post-container");
    postContainer.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="post-data">
    <div class="creator">
      <div class="creator-info">
        ${message.createdBy !== 'Unknown' && message.createdBy !== '' ? `
          <img class="creator-img" src="${message.creatorImg}" alt="">
          ${message.displayName ? `
            ${userExist && user.googleId === message.createdBy ? `
              <p class="creator-displayName">You</p>
            ` : `
              <p class="creator-displayName">${message.displayName}</p>
            `}
          ` : ''}
        ` : ''}
      </div>
    </div>
    <div class="title-container">
      <h3 class="title">${message.title}</h3>
    </div>
    <div class="icons">
      ${userExist && message.createdBy === user.googleId ? `
        <form id="update-post" action="/post/update/${message._id}" method="get">
          <button class="form-btn">
            <i class="edit-icon fa-icons fa-solid fa-pen-to-square"></i>
          </button>
        </form>
        <button class="form-btn dlt-bnt">
          <i class="delete-icon fa-icons fa-sharp fa-solid fa-trash"></i>
        </button>
        <div class="formDelete hide">
          <div class="form-content">
            <form id="form-delete" action="/post/delete/${message._id}" method="post">
              <div class="form-text">
                You really want to delete the post !!
              </div>
            </form>
            <div class="form-btns">
              <button type="submit" class="form-dlt-yes btn">YES</button>
              <button class="btn form-dlt-no">NO</button>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
    <p class="descr">${message.description}</p>
    <p class="created-at">${moment(message.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
  </div>

        `
    );
  });
});

socket.on("disconnect", () => {
  // console.log("Disconnected from server");
});
})
