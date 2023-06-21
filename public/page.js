// this function will allow the user to add a player to their list
async function createNewFav(name1, number1, position1, team1) {
  try {
    const link = "https://brayan-torres-mvp.onrender.com/favorite/players";
    const result = await fetch(link, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "POST",
      body: JSON.stringify({
        name: name1,
        number: number1,
        position: position1,
        team: team1,
      }),
    });
    const data = await result.json();
    getData();
  } catch (err) {
    console.log(err);
  }
}

// this function will allow users to delete a player from their list
async function deletePlayer(id) {
  try {
    const link = `https://brayan-torres-mvp.onrender.com/favorite/players/${id}`;
    const result = await fetch(link, {
      method: "DELETE",
    });
    const data = await result.json();
    getData();
  } catch (err) {
    console.log(err);
  }
}

// this function will allows the user to edit a player from their list.
async function editFavPlayer(id, name1, number1, position1, team1) {
  try {
    const link = `https://brayan-torres-mvp.onrender.com/favorite/players/${id}`;
    const result = await fetch(link, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
      method: "PUT",
      body: JSON.stringify({
        name: name1,
        number: number1,
        position: position1,
        team: team1,
      }),
    });
    const data = await result.json();
    getData();
  } catch (err) {
    console.log(err);
  }
}

//  this function will pull up a single favirite soccer player
async function getSinglePlayer(id) {
  try {
    const link = `https://brayan-torres-mvp.onrender.com/favorite/players/${id}`;
    const result = await fetch(link, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
    const data = await result.json();
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
    let deleteIcon = document.createElement("li");

    const form = document.getElementById("myForm");
    const playerNameInput = document.getElementById("upPlayerName");
    const playerNumInput = document.getElementById("upPlayerNum");
    const playerPosInput = document.getElementById("upPlayerPos");
    const playerTeamInput = document.getElementById("upPlayerTeam");

    playerNameInput.value = player.name;
    playerNumInput.value = player.number;
    playerPosInput.value = player.position;
    playerTeamInput.value = player.team;

    deleteIcon.setAttribute("class", "deleteicon");
    deleteIcon.textContent = 'Delete';
    playerCont.appendChild(deleteIcon);

    let editIcon = document.createElement("li");
    editIcon.setAttribute("class", "editicon");
    editIcon.textContent = 'Edit';
    playerCont.appendChild(editIcon);
  } catch (err) {
    console.log(err);
  }
}

// this function will pull up the favortite soccer list.
async function getData() {
  try {
    const link = "https://brayan-torres-mvp.onrender.com/favorite/players";
    const result = await fetch(link, {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
    const data = await result.json();
    const mainPage = document.getElementById("mainDiv");
    const existingContainers = mainPage.getElementsByClassName("player-cont");

    while (existingContainers.length > 0) {
      mainPage.removeChild(existingContainers[0]);
    }

    for (var i = 0; i < data.length; i++) {
      let player = data[i];
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
      let editBtn = document.createElement("li");
      editBtn.setAttribute("class", "edit-button");
      editBtn.textContent = "Modify";
      playerCont.appendChild(editBtn);
    }
  } catch (err) {
    console.log(err);
    alert("sorry, there are no results for your search");
  }
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
  closeForm2();
});

const myButton = document.getElementById("submitUpdate");
    myButton.addEventListener("click", function (event) {
    const playerName = document.getElementById("hiddenPlayerName").value;
    const newPname = document.getElementById("hiddenPlayerName").value;
    const newPnum = document.getElementById("upPlayerNum").value;
    const newPpos = document.getElementById("upPlayerPos").value;
    const newPteam = document.getElementById("upPlayerTeam").value;
    editFavPlayer(playerName, newPname, newPnum, newPpos, newPteam);
    closeForm();
  });

// add event listener to deleteIcon and editicon
document.addEventListener("click", function (event) {
  event.preventDefault();
  const targetElement = event.target;
  const deletIconElement = targetElement.closest(".deleteicon");
  const editIconElement = targetElement.closest(".editicon");
  const editButton = targetElement.closest(".edit-button");
  const homeButton = targetElement.closest(".home-button");
  const top20Btn = targetElement.closest(".top-20");
  if (deletIconElement) {
    let playerElem = event.target.parentElement;
    const playerName = playerElem.querySelector(".player-name").textContent;
    deletePlayer(playerName);
  }
  if (editIconElement) {
    let playerElem = event.target.parentElement;
    const playerName = playerElem.querySelector(".player-name").textContent;
    openForm();
    document.getElementById("hiddenPlayerName").value = playerName;
  }
  if (editButton) {
    let playerElem = event.target.parentElement;
    const playerName = playerElem.querySelector(".player-name").textContent;
    getSinglePlayer(playerName);
  }
  if (homeButton) {
    getData();
    document.getElementById("top20Div").style.display = "none";
    document.getElementById('mainDiv').style.display = "flex";
  }
  if (top20Btn) {
    topTwenty()
    document.getElementById("top20Div").style.display = "flex";
    document.getElementById('mainDiv').style.display = "none";
  }
});

// this will open or add player form, add an event listener to the submit button that will run our addfavplayer function.
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

// this function will close update  player form
function closeForm() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("updateForm").reset();
}

// this function will open our add player form
function openForm2() {
  document.getElementById("myForm2").style.display = "block";
}

// this function will close add player form
function closeForm2() {
  document.getElementById("myForm2").style.display = "none";
  document.getElementById("updateForm2").reset();
}

async function topTwenty() {
  try {
    const url = 'https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=39&season=2022';
    const options = await {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '497192c640mshf59c205dbdf7e60p14e4dbjsnfa30c7d4106f',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    };
    const response = await fetch(url, options);
    const result = await response.json();
    const toptwenty = document.getElementById("top20Div");
    const toptwentyresults = result.response;
    toptwenty.innerHTML = '';
    for (var i = 0; i < toptwentyresults.length; i++) {
      const htmlBlock = `
        <div id = "top20playercont"
        <p>${toptwentyresults[i].player.name}</p>
        <p>Goals: ${toptwentyresults[i].statistics[0].goals.total}</p>
        <p>Team: ${toptwentyresults[i].statistics[0].team.name}</p>
        </div>
      `;
      toptwenty.innerHTML += htmlBlock;
    }
  } catch (error) {
    console.error(error);
  }
}

