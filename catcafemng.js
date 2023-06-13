let id = 0;
                                                                //getElementById method &
document.getElementById('add').addEventListener('click', () => { //addEventListener method 
    let createdDate = new Date(); //current date                 //to add click event to the document
    let table = document.getElementById('list');
    let row = table.insertRow(1); //(0) has already set
    row.setAttribute('id', `item-${id}`);
    row.insertCell(0).innerHTML = document.getElementById('new-productname').value; // 1st value
    row.insertCell(1).innerHTML = `${createdDate.getFullYear()}-${createdDate.getMonth() + 1}-${createdDate.getDate()}`; // second value
    row.insertCell(2).innerHTML = document.getElementById('new-opened-date').value;
    row.insertCell(3).innerHTML = document.getElementById('new-expiration-date').value;
    let actions = row.insertCell(4);
    actions.appendChild(createDeleteButton(id++));
    document.getElementById('new-productname').value = '';
});
function createDeleteButton(id) {
    let btn = document.createElement('button'); // create "delete" button (17-21)
    btn.className = 'btn btn-primary';
    btn.id = id;
    btn.innerHTML = 'Yes, delete';
    btn.onclick = () => {
        console.log(`Deleting row with id: item-${id}`); // binds method to the button onclick property
        let elementToDelete = document.getElementById(`item-${id}`);
        elementToDelete.parentNode.removeChild(elementToDelete);
    };
    return btn;
}

class Member {                     //declare the class member and team and keyword with constructor
    constructor(name, position) {
      this.name = name;
      this.position = position;  
    }
}

class Team {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.members = [];
    }
    addMember(member) {
        this.members.push(member);
    }

    deleteMember(member) {
        let index = this.members.indexOf(member);
        this.members.splice(index, 1);  //splice method = remove array element
    }
}

let teams = [];
let teamId = 0;

onClick('new-team', () => {         // when User clicked mouse, it create team with DOM
    teams.push(new Team(teamId++, getValue('new-team-name')));
    document.getElementById('new-team-name').value = '';
    drawDOM();          // function, iterate over the teams array to build table
})

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    console.log(document.getElementById(id).value);
    return document.getElementById(id).value; // without repeat this code, we can use getValue(id)
}

function drawDOM() {                          //iterate over a teams array and build tables each one of them
    let teamDiv = document.getElementById('teams'); 
    clearElement(teamDiv);                          
    for (team of teams) {                           // iterate over the teams array
        let table = createTeamTable(team);          // create table for each team
        let title = document.createElement('h2');   //Heading h2 size
        title.innerHTML = team.name;
        title.appendChild(createDeleteTeamButton(team));    // create delete button for each team
        teamDiv.appendChild(title);
        teamDiv.appendChild(table);
        for (member of team.members) {              // add all the members to that team
            createMemberRow(team, table, member);
        }
    }
}

function createMemberRow(team, table, member) {     //create member row in the table
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.position;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(team, member));
}

function createDeleteRowButton(team, member) {  // remove row with users button click
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = team.members.indexOf(member);
        team.members.splice(index, 1);          // splice method to removing 1 element
        drawDOM();                              // when we changed the data, rerender the DOM
    };
    return btn;
}

function createDeleteTeamButton(team) {       //remove team from teams array
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = teams.indexOf(team);
        teams.splice(index, 1);
        drawDOM();                            
    };
    return btn;
}

function createNewMemberButton(team) {        //"create" button to create team member and position
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        team.members.push(new Member(getValue(`name-input-${team.id}`), getValue(`position-input-${team.id}`)));
        drawDOM();
    };
    return btn;
}


function createTeamTable(team) {            //create team table by users entering form
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-light table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let positionColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';          //elements name for user to fill out
    positionColumn.innerHTML = 'Position';
    row.appendChild(nameColumn);            //colomn is considered as a child element
    row.appendChild(positionColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let positionTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');        //name input with setAttribute method
    nameInput.setAttribute('id', `name-input-${team.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let positionInput = document.createElement('input');    //position input with setAttribute method
    positionInput.setAttribute('id', `position-input-${team.id}`);
    positionInput.setAttribute('type', 'text');
    positionInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(team);
    nameTh.appendChild(nameInput);
    positionTh.appendChild(positionInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(positionTh);
    formRow.appendChild(createTh);
    return table;
}

function clearElement(element) {    // remove every first child while there're still first child
    while(element.firstChild) {     
        element.removeChild(element.firstChild); //remove first child until the elements completely cleared out
    }
}
