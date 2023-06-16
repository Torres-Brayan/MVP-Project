// this function will allow the user to add a player to their list
function createNewFav(name1, number1, position1, team1) {
  const link = "https://brayan-torres-mvp.onrender.com/favorite/players";
  fetch(link, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: "POST",
    body: JSON.stringify({
      name: name1,
      number: number1,
      position: position1,
      team: team1,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
    console.log(data)
    location.reload()})
    .catch((err) => {
      alert(err.code);
    });
}

// this function will allow users to delete a player from their list
function deletePlayer(id) {
  const link = `https://brayan-torres-mvp.onrender.com/favorite/players/${id}`;
  fetch(link, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        location.reload()})
    .catch((err) => {
      alert(err.code);
    });
}

// this function will allows the user to edit a player from their list.
function editFavPlayer(id, name1, number1, position1, team1) {
  const link = `https://brayan-torres-mvp.onrender.com/favorite/players/${id}`;
  fetch(link, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
    method: "PUT",
    body: JSON.stringify({
      name: name1,
      number: number1,
      position: position1,
      team: team1,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        location.reload()})
    .catch((err) => {
      alert(err.code);
    });
}

// this function will pull up the favortite soccer list.
function getData() {
  const link = "https://brayan-torres-mvp.onrender.com/favorite/players";
  fetch(link, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  })
    .then((res) => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then((response) => {
      // here you do what you want with response

      for (var i = 0; i < response.length; i++) {
        let player = response[i];
        let playerCont = document.createElement("div");
        playerCont.setAttribute("class", "player-cont");
        let mainPage = document.getElementById("mainDiv");
        mainPage.appendChild(playerCont);
        let playerName = document.createElement("p");
        playerName.setAttribute("class", "player-name");
        playerName.textContent = player.name;
        playerCont.appendChild(playerName);
        let playerNum = document.createElement("p");
        playerNum.textContent = player.number;
        playerCont.appendChild(playerNum);
        let playerPos = document.createElement("p");
        playerPos.textContent = player.position;
        playerCont.appendChild(playerPos);
        let playerTeam = document.createElement("p");
        playerTeam.textContent = player.team;
        playerCont.appendChild(playerTeam);
        let icons = document.createElement("div");
        icons.setAttribute("class", "icons");
        playerCont.appendChild(icons);
        let deleteIcon = document.createElement("img");
        deleteIcon.setAttribute("class", "deleteicon");
        deleteIcon.src =
          "https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg";
        icons.appendChild(deleteIcon);

        let editIcon = document.createElement("img");
        editIcon.setAttribute("class", "editicon");
        editIcon.src =
          "https://cdn.icon-icons.com/icons2/2483/PNG/512/edit_circle_icon_149940.png";
        icons.appendChild(editIcon);

        console.log(player);
      }
    })
    .catch((err) => {
      alert("sorry, there are no results for your search");
    });
}
getData();

// add even listener to submit button
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newPname = document.getElementById("playerName").value;
  const newPnum = document.getElementById("playerNum").value;
  const newPpos = document.getElementById("playerPos").value;
  const newPteam = document.getElementById("playerTeam").value;
  createNewFav(newPname, newPnum, newPpos, newPteam);
});

// add event listener to deleteIcon
document.addEventListener("click", function (event) {
  const targetElement = event.target;
  const deletIconElement = targetElement.closest(".deleteicon");
  const editIconElement = targetElement.closest(".editicon");
  if (deletIconElement) {
    let playerElem = event.target.parentElement.parentElement;
    const playerName = playerElem.querySelector(".player-name").textContent;
    deletePlayer(playerName);
  }
  if (editIconElement) {
    let playerElem = event.target.parentElement.parentElement;
    const playerName = playerElem.querySelector(".player-name").textContent;
    openForm(playerName);
  }
});

function openForm(playerName) {
  document.getElementById("myForm").style.display = "block";
  const myButton = document.getElementById("submitUpdate");
  myButton.addEventListener("click", function (event) {
    const newPname = document.getElementById("upPlayerName").value;
    const newPnum = document.getElementById("upPlayerNum").value;
    const newPpos = document.getElementById("upPlayerPos").value;
    const newPteam = document.getElementById("upPlayerTeam").value;
    editFavPlayer(playerName, newPname, newPnum, newPpos, newPteam);
  });
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openForm2() {
    document.getElementById("myForm2").style.display = "block";
  }

function closeForm2() {
    document.getElementById("myForm2").style.display = "none";
  }
