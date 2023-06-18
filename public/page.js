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
        getData(); 
    })
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
        getData(); 
    })
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
        getData(); 
    })
    .catch((err) => {
      alert(err.code);
    });
}

//  this function will pull up a single favirite soccer player
function getSinglePlayer(id) {
  const link = `https://brayan-torres-mvp.onrender.com/favorite/players/${id}`;
  fetch(link, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  })
    .then((response) => response.json())
    .then((data) => {

      const mainPage = document.getElementById("mainDiv");
      const existingContainers = mainPage.getElementsByClassName("player-cont");

      while (existingContainers.length > 0) {
        mainPage.removeChild(existingContainers[0]);
      }
      
        let player = data;
        let playerCont = document.createElement("div");
        playerCont.setAttribute("class", "player-cont");
        mainPage.appendChild(playerCont);
        let playerName = document.createElement("p");
        playerName.setAttribute("class", "player-name");
        playerName.textContent = player.name;
        playerCont.appendChild(playerName);
        let playerNum = document.createElement("p");
        playerNum.textContent = `Number: ${player.number}`;
        playerCont.appendChild(playerNum);
        let playerPos = document.createElement("p");
        playerPos.textContent = `Position: ${player.position}`;
        playerCont.appendChild(playerPos);
        let playerTeam = document.createElement("p");
        playerTeam.textContent = `Team: ${player.team}`;
        playerCont.appendChild(playerTeam);
        let deleteIcon = document.createElement("img");

        deleteIcon.setAttribute("class", "deleteicon");
        deleteIcon.src =
          "https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg";
        playerCont.appendChild(deleteIcon);

        let editIcon = document.createElement("img");
        editIcon.setAttribute("class", "editicon");
        editIcon.src =
          "https://cdn.icon-icons.com/icons2/2483/PNG/512/edit_circle_icon_149940.png";
        playerCont.appendChild(editIcon);
      
    })
    .catch((err) => {
      alert(err.code);
    });
};

// this function will pull up the favortite soccer list.
function getData() {
  const link = "https://brayan-torres-mvp.onrender.com/favorite/players";
  fetch(link, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  })
    .then((res) => res.json()) // parse response as JSON (can be res.text() for plain response)
    .then((response) => {

        const mainPage = document.getElementById("mainDiv");
        const existingContainers = mainPage.getElementsByClassName("player-cont");

        while (existingContainers.length > 0) {
            mainPage.removeChild(existingContainers[0]);
          }

      for (var i = 0; i < response.length; i++) {
        let player = response[i];
        let playerCont = document.createElement("div");
        playerCont.setAttribute("class", "player-cont");
        mainPage.appendChild(playerCont);
        let playerName = document.createElement("p");
        playerName.setAttribute("class", "player-name");
        playerName.textContent = player.name;
        playerCont.appendChild(playerName);
        let playerNum = document.createElement("p");
        playerNum.textContent = `Number: ${player.number}`;
        playerCont.appendChild(playerNum);
        let playerPos = document.createElement("p");
        playerPos.textContent = `Position: ${player.position}`;
        playerCont.appendChild(playerPos);
        let playerTeam = document.createElement("p");
        playerTeam.textContent = `Team: ${player.team}`;
        playerCont.appendChild(playerTeam);
        let editBtn = document.createElement('button');
        editBtn.setAttribute('class', 'edit-button');
        editBtn.textContent = 'edit';
        playerCont.appendChild(editBtn)
      }
    })
    .catch((err) => {
      alert("sorry, there are no results for your search");
    });
}
getData();

// add even listener to submit button that will run our create new fav function
const submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newPname = document.getElementById("playerName").value;
  const newPnum = document.getElementById("playerNum").value;
  const newPpos = document.getElementById("playerPos").value;
  const newPteam = document.getElementById("playerTeam").value;
  createNewFav(newPname, newPnum, newPpos, newPteam);
});

// add event listener to deleteIcon and editicon
document.addEventListener("click", function (event) {
  event.preventDefault();
  const targetElement = event.target;
  const deletIconElement = targetElement.closest(".deleteicon");
  const editIconElement = targetElement.closest(".editicon");
  const editButton = targetElement.closest(".edit-button");
  const homeButton = targetElement.closest(".home-button");
  if (deletIconElement) {
    let playerElem = event.target.parentElement;
    const playerName = playerElem.querySelector(".player-name").textContent;
    deletePlayer(playerName);
  }
  if (editIconElement) {
    let playerElem = event.target.parentElement;
    const playerName = playerElem.querySelector(".player-name").textContent;
    openForm(playerName);
  }
  if (editButton) {
    let playerElem = event.target.parentElement;
    const playerName = playerElem.querySelector(".player-name").textContent;
    getSinglePlayer(playerName);
  }
  if (homeButton) {
    getData()
  }
});

// this will open or add player form, add an event listener to the submit button that will run our addfavplayer function.
function openForm(playerName) {
  document.getElementById("myForm").style.display = "block";
  const myButton = document.getElementById("submitUpdate");
  myButton.addEventListener("click", function (event) {
    event.preventDefault();
    const newPname = document.getElementById("upPlayerName").value;
    const newPnum = document.getElementById("upPlayerNum").value;
    const newPpos = document.getElementById("upPlayerPos").value;
    const newPteam = document.getElementById("upPlayerTeam").value;
    editFavPlayer(playerName, newPname, newPnum, newPpos, newPteam);
  });
}

// this function will close update  player form 
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

// this function will open our add player form
function openForm2() {
  document.getElementById("myForm2").style.display = "block";
}

// this function will close add player form 
function closeForm2() {
  document.getElementById("myForm2").style.display = "none";
}


