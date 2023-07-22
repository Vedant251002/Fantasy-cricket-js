import { players } from "./players.js";
const team1 = {
  players: [],
  runs: 0,
  fantasy: 0,
  capName: "",
  viceCapName: "",
  totalCredit: 0,
};
const team2 = {
  players: [],
  runs: 0,
  fantasy: 0,
  capName: "",
  viceCapName: "",
  totalCredit: 0,
};
let teamsDone = false;
let tossArray = [];
document.getElementById("addteamsbtn").addEventListener(
  "click",

  () => {
    if (teamsDone) {
      return alert("teams are already created");
    }
    let firstTeam = document.getElementById("firstTeamName").value;
    let secondTeam = document.getElementById("secondTeamName").value;
    if (
      firstTeam == "" ||
      secondTeam == "" ||
      firstTeam == secondTeam ||
      !isNaN(firstTeam) ||
      !isNaN(secondTeam)
    ) {
      return alert("Enter valid team names");
    }
    tossArray = [firstTeam, secondTeam];
    let randomWinner = Math.floor(Math.random() * 2);
    document.getElementById("winnerTeamName").value = tossArray[randomWinner];
    team1.name = tossArray[randomWinner];
    if (tossArray[randomWinner] == secondTeam) {
      team2.name = firstTeam;
    } else {
      team2.name = secondTeam;
    }
    teamsDone = true;
    setTimeout(() => {
      document.getElementById("teamChoose").style.display = "none";
      document.getElementById("selectPlayers").style.display = "block";
    }, 3000);
    document.getElementById("team1Namedisplay").innerHTML =
      "Winner team <br> <br> Team 1 : " +
      team1.name +
      "<br> Total Credit : " +
      team1.totalCredit;
  }
);
let batsmanCount = 0;
let bowlerCount = 0;
let wicketkeeperCount = 0;
display();
function display() {
  let data = players.map((player) => {
    if (!player.isSelected) {
      let opt = "<option>";
      let closeOpt = "</option>";
      return `${opt}${player.name}-${player.playingRole}-${player.credit}${closeOpt}`;
    }
  });
  document.getElementById("displayTeam1").innerHTML = data;
}

function team1Players(teamObj) {
  let selectTeam1 = document.getElementById("displayTeam1").value;
  selectTeam1 = selectTeam1.split("-");
  let playerObj = players.filter((player) => player.name == selectTeam1[0]);
  if (playerObj[0].playingRole == "Batsman") {
    if (batsmanCount < 5) {
      playerObj[0].isSelected = true;
      teamObj.players.push(...playerObj);
      teamObj.totalCredit += playerObj[0].credit;
      batsmanCount++;
    } else {
      return alert("batsman exceeded");
    }
  }
  if (playerObj[0].playingRole == "Bowler") {
    if (bowlerCount < 5) {
      playerObj[0].isSelected = true;
      teamObj.players.push(...playerObj);
      teamObj.totalCredit += playerObj[0].credit;
      bowlerCount++;
    } else {
      return alert("bowler exceeded");
    }
  }
  if (playerObj[0].playingRole == "Wicketkeeper") {
    if (wicketkeeperCount < 1) {
      playerObj[0].isSelected = true;
      teamObj.players.push(...playerObj);
      teamObj.totalCredit += playerObj[0].credit;
      wicketkeeperCount++;
    } else {
      return alert("wicketkeeper exceeded");
    }
  }

  displayCredit(teamObj);
  display();
  document.getElementById("addedPlayers").innerHTML = addedPlayersList(teamObj);
}
function displayCredit(teamObj) {
  if (teamObj == team1) {
    document.getElementById("team1Namedisplay").innerHTML =
      "Winner team <br> <br> Team 1 : " +
      team1.name +
      "<br> Total Credit : " +
      team1.totalCredit;
  } else {
    document.getElementById("team1Namedisplay").innerHTML =
      "Team 2 : " + team2.name + "<br> Total Credit : " + team2.totalCredit;
  }
}

document.getElementById("addTeam1Players").addEventListener("click", () => {
  if (!isTeam1Ready) {
    team1Players(team1);
  }
});

function addedPlayersList(teamObj) {
  return teamObj.players.map((player) => {
    if (player.isSelected) {
      let opt = "<option>";
      let closeopt = "</option>";
      return `${opt}${player.name}-${player.playingRole}-${player.credit}${closeopt}`;
    } else {
      let index = teamObj.players.indexOf(player);
      teamObj.players.splice(index, 1);
    }
  });
}

function removeFromTeam(teamObj) {
  let playerName = document.getElementById("addedPlayers").value;
  playerName = playerName.split("-");
  let playerObj = teamObj.players.filter(
    (player) => player.name == playerName[0]
  );
  playerObj[0].isSelected = false;
  teamObj.totalCredit -= playerObj[0].credit;
  if (playerObj[0].playingRole == "Batsman") {
    batsmanCount--;
  }
  if (playerObj[0].playingRole == "Bowler") {
    bowlerCount--;
  }
  if (playerObj[0].playingRole == "Wicketkeeper") {
    wicketkeeperCount--;
  }
  displayCredit(teamObj);
  document.getElementById("addedPlayers").innerHTML = addedPlayersList(teamObj);
  display();
}
document.getElementById("removeBtn").addEventListener("click", () => {
  if (!isTeam1Ready) {
    removeFromTeam(team1);
  } else {
    removeFromTeam(team2);
  }
});
let teamCounts = 0;
let isTeam1Ready = false;

function submitTeam(teamObj) {
  if (teamObj.totalCredit > 100) {
    return alert(`Credit score is above 100 : ${teamObj.totalCredit}`);
  } else if (batsmanCount + bowlerCount + wicketkeeperCount != 11) {
    return alert(`Please select 11 players : ${teamObj.players.length}`);
  } else {
    isTeam1Ready = true;
    teamCounts += 1;
    alert("Sucessfully created");
    team2Display();
  }
  if (teamCounts == 2) {
    alert("both team are ready");
    chooseCap();
  }
}

document.getElementById("submitTeamBtn").addEventListener("click", () => {
  if (!isTeam1Ready) {
    submitTeam(team1);
  } else {
    submitTeam(team2);
  }
});
function team2Display() {
  displayCredit(team2);
  document.getElementById("addedPlayers").value = "";
  batsmanCount = 0;
  bowlerCount = 0;
  wicketkeeperCount = 0;
  display();
}
document.getElementById("addTeam1Players").addEventListener("click", () => {
  if (isTeam1Ready) {
    team1Players(team2);
    document.getElementById("addedPlayers").innerHTML = addedPlayersList(team2);
  }
});

function chooseCap() {
  document.getElementById("selectPlayers").style.display = "none";

  document.getElementById("chooseCap").style.display = "block";
}
function displayPlayersForCap(teamObj) {
  document.getElementById("team1ChooseCap").innerHTML = teamObj.players.map(
    (player) => {
      if (!player.isCap && !player.isViceCap) {
        let opt = "<option>";
        let closeopt = "</option>";
        return `${opt}${player.name}-${player.playingRole}-${player.credit}${closeopt}`;
      }
    }
  );
  document.getElementById("capName").innerHTML =
    "Captain is : " + teamObj.capName;

  document.getElementById("viceCapName").innerHTML =
    "Vice Captain is : " + teamObj.viceCapName;
}
let whichTeam = "";
function chooseCaptain() {
  let playerName = document.getElementById("team1ChooseCap").value;
  if (playerName == "") {
    return alert("Please first choose any team");
  }
  let playerArr = whichTeam.players.filter((player) => player.isCap == true);
  if (playerArr.length != 0) {
    playerArr[0].isCap = false;
  }
  playerName = playerName.split("-");
  let playerObj = whichTeam.players.filter(
    (player) => player.name == playerName[0]
  );
  playerObj[0].isCap = true;
  whichTeam.capName = playerName[0];
  displayPlayersForCap(whichTeam);
}
function chooseViceCaptain() {
  let playerName = document.getElementById("team1ChooseCap").value;
  if (playerName == "") {
    return alert("Please first choose any team");
  }
  let playerArr = whichTeam.players.filter(
    (player) => player.isViceCap == true
  );
  if (playerArr.length != 0) {
    playerArr[0].isViceCap = false;
  }
  playerName = playerName.split("-");
  let playerObj = whichTeam.players.filter(
    (player) => player.name == playerName[0]
  );
  playerObj[0].isViceCap = true;
  whichTeam.viceCapName = playerName[0];
  displayPlayersForCap(whichTeam);
}
document
  .getElementById("viceCapBtn")
  .addEventListener("click", chooseViceCaptain);
document.getElementById("capBtn").addEventListener("click", chooseCaptain);
document.getElementById("team1Btn").addEventListener("click", () => {
  displayPlayersForCap(team1);
  whichTeam = team1;
});
document.getElementById("team2Btn").addEventListener("click", () => {
  displayPlayersForCap(team2);
  whichTeam = team2;
});
document.getElementById("submitCap").addEventListener("click", function () {
  if (
    team1.capName == "" ||
    team1.viceCapName == "" ||
    team2.capName == "" ||
    team2.viceCapName == ""
  ) {
    return alert("Please choose Captain and Vice captains");
  }
  displayMatch();
});
let batsmanCounter = 0;
let bowlerCounter = 0;
let bowlersOfTeam2;
let battingTeam = team1;
let bowlingTeam = team2;
function displayMatch() {
  document.getElementById("chooseCap").style.display = "none";
  document.getElementById("match").style.display = "block";
  document.getElementById("battingTeamName").innerHTML =
    "Batting Team " + battingTeam.name;
  document.getElementById("bowlingTeamName").innerHTML =
    "Bowling Team " + bowlingTeam.name;
  sortPlayers();
  team1.players.map((p) => {
    p.runs = 0;
    p.balls = 0;
    p.fantasy = 0;
    p.wickets = 0;
  });
  team2.players.map((p) => {
    p.runs = 0;
    p.balls = 0;
    p.fantasy = 0;
    p.wickets = 0;
  });
  displayBatsman(batsmanCounter, battingTeam);
  displayBowler(bowlerCounter);
}
function sortPlayers() {
  let batsmanFilter = battingTeam.players.filter(
    (p) => p.playingRole == "Batsman"
  );
  let bowlerFilter = battingTeam.players.filter(
    (p) => p.playingRole == "Bowler"
  );
  let wkeeperFilter = battingTeam.players.filter(
    (p) => p.playingRole == "Wicketkeeper"
  );
  battingTeam.players = batsmanFilter.concat(bowlerFilter, wkeeperFilter);
  bowlersOfTeam2 = bowlingTeam.players.filter((p) => p.playingRole == "Bowler");
}
let hitCount = 1;
let shotTypesArr = [1, 2, 3, 4, 6, "dot", "w"];
let batsmanObj;
let bowlerObj;
let teamChange = false;
function changeTeam() {
  if (teamChange) {
    bowlingTeam = team1;
    battingTeam = team2;
    document.getElementById("battingTeamName").innerHTML =
      "Batting Team " + battingTeam.name;
    document.getElementById("bowlingTeamName").innerHTML =
      "Bowling Team " + bowlingTeam.name;
    sortPlayers();
    batsmanCounter = 0;
    bowlerCounter = 0;
    hitCount = 1;
    document.getElementById("resultOfPlayedBall").innerHTML = "Result : " + 0;
    displayBatsman(batsmanCounter, battingTeam);
    displayBowler(bowlerCounter);
  }
  return;
}
function displayBatsman(index, teamArr) {
  document.getElementById("batsmanName").innerHTML =
    teamArr.players[index].name;
  batsmanObj = teamArr.players[index];
  document.getElementById("runsOfPlayer").innerHTML =
    "Runs of Player : " +
    batsmanObj.runs +
    "<br> Fantasy Points : " +
    batsmanObj.fantasy;
  document.getElementById("totalTeamRuns").innerHTML =
    "Total Batting team runs : " + battingTeam.runs;
  document.getElementById("battingTeamFantasy").innerHTML =
    "Total fantasy points of team : " + battingTeam.fantasy;
  document.getElementById("bowlingTeamFantasy").innerHTML =
    "Total fantasy points of team : " + bowlingTeam.fantasy;
}
function displayBowler(index) {
  if (index < 5) {
    document.getElementById("bowlerName").innerHTML =
      bowlersOfTeam2[index].name;
    bowlerObj = bowlersOfTeam2[index];
  }
}
let innings = 0;
function hitBtnClick() {
  if (bowlerCounter == 5) {
    teamChange = true;
    innings++;
    if (innings == 2) {
      alert("Match completed");
      displayScoreBoard();
    }
    changeTeam();
    return alert("5 overs completed");
  }
  if (hitCount == 6) {
    hitCount = 0;
    bowlerCounter++;
    displayBowler(bowlerCounter);
  }
  batsmanObj.balls += 1;
  hitCount++;
  randomShots();
  displayBatsman(batsmanCounter, battingTeam);
}

function randomShots() {
  let date = new Date();
  let now =
    date.getDate() +
    "-" +
    date.getMonth() +
    "-" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes();
  let index = Math.floor(Math.random() * 7);
  document.getElementById("resultOfPlayedBall").innerHTML =
    "Result : " + shotTypesArr[index] + " " + now;
  checkShots(shotTypesArr[index]);
}

function checkCapFantasy(fpoints) {
  if (batsmanObj.isCap) {
    if (batsmanObj.runs == 0 && fa) batsmanObj.fantasy += 2 * fpoints;
    battingTeam.fantasy += 2 * fpoints;
  } else if (batsmanObj.isViceCap) {
    batsmanObj.fantasy += 1.5 * fpoints;
    battingTeam.fantasy += 2 * fpoints;
  } else {
    batsmanObj.fantasy += fpoints;
    battingTeam.fantasy += fpoints;
  }
}
function checkShots(valueType) {
  switch (valueType) {
    case 1:
      batsmanObj.runs += 1;
      checkCapFantasy(1);
      battingTeam.runs += 1;
      break;
    case 2:
      batsmanObj.runs += 2;
      checkCapFantasy(2);
      battingTeam.runs += 2;
      break;
    case 3:
      batsmanObj.runs += 3;
      checkCapFantasy(3);
      battingTeam.runs += 3;
      break;
    case 4:
      batsmanObj.runs += 4;
      checkCapFantasy(5);
      battingTeam.runs += 4;
      break;
    case 6:
      batsmanObj.runs += 6;
      checkCapFantasy(8);
      battingTeam.runs += 6;
      break;
    case "dot":
      checkBowlerFatasy(1);
      break;
    case "w":
      bowlerObj.wickets += 1;
      checkBowlerFatasy(10);
      checkDuck();
      batsmanCounter++;
      displayBatsman(batsmanCounter, battingTeam);
      break;
  }
}

function checkDuck() {
  if (batsmanObj.isCap && batsmanObj.runs == 0) {
    batsmanObj.fantasy -= 4;
    battingTeam.fantasy -= 4;
  } else if (batsmanObj.isViceCap && batsmanObj.runs == 0) {
    batsmanObj.fantasy -= 3;
    battingTeam.fantasy -= 3;
  } else {
    batsmanObj.fantasy -= 2;
    battingTeam.fantasy -= 2;
  }
}
function checkBowlerFatasy(result) {
  if (bowlerObj.isCap) {
    bowlerObj.fantasy += 2 * result;
    bowlingTeam.fantasy += 2 * result;
  } else if (bowlerObj.isViceCap) {
    bowlerObj.fantasy += 1.5 * result;
    bowlingTeam.fantasy += 1.5 * result;
  } else {
    bowlerObj.fantasy += result;
    bowlingTeam.fantasy += result;
  }
}
document.getElementById("hitBtn").addEventListener("click", () => {
  hitBtnClick();
});
let winnerTeam;
let looserTeam;
function displayScoreBoard() {
  document.getElementById("match").style.display = "none";
  document.getElementById("scoreBoard").style.display = "block";
  checkWinnerTeam();
  document.getElementById("winnerTeamDisplay").innerHTML =
    "Winner Team Is : " + winnerTeam.name + " : " + winnerTeam.fantasy;
  document.getElementById("looserTeamDisplay").innerHTML =
    "Looser Team Is : " + looserTeam.name + " : " + looserTeam.fantasy;
  document.getElementById("winnerTeamData").innerHTML +=
    displayTable(winnerTeam);
  document.getElementById("looserTeamData").innerHTML +=
    displayTable(looserTeam);
}
function checkWinnerTeam() {
  if (team1.fantasy > team2.fantasy) {
    winnerTeam = team1;
    looserTeam = team2;
  } else {
    winnerTeam = team2;
    looserTeam = team1;
  }
}
function displayTable(teamObj) {
  return teamObj.players
    .map((p) => {
      return `<tr>
    <td>${p.name}</td>
    <td>${p.runs}</td>
    <td>${p.balls}</td>
    <td>${p.wickets}</td>
    <td>${p.fantasy}</td>
    </tr>`;
    })
    .join("<br>");
}
