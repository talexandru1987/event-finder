// select the table div
const table = document.getElementsByClassName("friendsTable")[0];
console.log(table);

function createCard(friendInfo) {
  const card = document.createElement("div");
  card.className = "card";

  const userProfileImage = document.createElement("div");
  userProfileImage.innerText = number;

  const bottomNumber = document.createElement("div");
  bottomNumber.className = "right";
  bottomNumber.innerText = number;
  card.append(topNumber);
  card.append(bottomNumber);

  return card;
}
table.appendChild(createCard(5));

//create the card div

// append card div to table div

//side bar
/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}
