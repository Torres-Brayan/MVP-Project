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
      .then((data) => console.log(data))
      .catch((err) => {
        alert(err.code);
      });
  }
  
  // this function will allow users to delete a player from their list
  function deletePlayer(id) {
      const link = `https://brayan-torres-mvp.onrender.com/favorite/players/${id}`;
      fetch(link, { 
    method: 'DELETE' 
  }); 
  };
  
  // this function will allows the user to edit a player from their list.
  
  
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
          let mainPage = document.querySelector("div");
          mainPage.appendChild(playerCont);
          let playerName = document.createElement("p");
          playerName.setAttribute('class', 'player-name')
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
          let icons = document.createElement('div');
          icons.setAttribute('class', 'icons');
          playerCont.appendChild(icons);
          let deleteIcon = document.createElement('img');
          deleteIcon.setAttribute('class', 'deleteicon');
          deleteIcon.src = 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Red_X.svg';
          icons.appendChild(deleteIcon);
  
          let editIcon = document.createElement('img');
          editIcon.setAttribute('class', 'editicon');
          editIcon.src = 'https://cdn.icon-icons.com/icons2/2483/PNG/512/edit_circle_icon_149940.png';
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
  document.addEventListener('click', function(event) {
      const targetElement = event.target;
      const deletIconElement = targetElement.closest('.deleteicon');
      const editIconElement = targetElement.closest('.editicon');
      if (deletIconElement) {
          let playerElem = event.target.parentElement.parentElement
          console.log(playerElem)
      }
      if (editIconElement) {
          console.log('edit clicked')
      }
  });
  // const deleteBtn = document.getElementsByClassName("img");
  // console.log(deleteBtn)
  // deleteBtn.addEventListener('click', () => {
  //     console.log('working');
  // });