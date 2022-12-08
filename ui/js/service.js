function getDetails() {
    let url = 'http://localhost:9000/person/details';
    const name = document.getElementById('myName').value;
    if (!name) {
        alert("Name cannot be empty");
        return;
    }

    url = url + '?name=' + name;
    getRequest(url, name)
        .then(result => {
            console.log(result)

            let friends = result.friends;

            let text = "<table>"
            text += "<tr><th>" + "Friend's Name" + "</th>";
            text += "<th>" + "State" + "</th></tr>";
            for (let x in friends) {
                text += "<tr><td>" + friends[x].name + "</td>";
                text += "<td>" + friends[x].state + "</td></tr>";
            }
            text += "</table>"
            document.getElementById("demo").innerHTML = text;
        })

}

function save() {
    const url = 'http://localhost:9000/person';
    const name = document.getElementById('name').value;
    const state = document.getElementById('state').value;

    if (!name) {
        alert("Name cannot be empty");
        return;
    }
    else if (!state) {
        alert("State cannot be empty");
        return;
    }
    else {
        var person = {
            "person": {
                "name": name,
                "state": state
            }
        };
        postRequest(url, person);
    }
}

function saveRelation() {
    const url = 'http://localhost:9000/person/relation';
    const fullname = document.getElementById('fullname').value;
    const year = parseInt(document.getElementById('year').value);
    const friendsname = document.getElementById('friendsname').value;

    if (!fullname) {
        alert("Full Name cannot be empty");
        return;
    }
    else if (!year) {
        alert("Year cannot be empty");
        return;
    }
    else if (typeof year !== 'number') {
        alert("Year should be number");
        return;
    }
    else if (!friendsname) {
        alert("Friends name cannot be empty");
        return;
    }
    else {
        var person = {
            "person": {
                "name": fullname,
                "friendName": friendsname,
                "year": year
            }
        };
        postRequest(url, person);
    }
}

function getRequest(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(err => console.log(err))
}

function postRequest(url, obj) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
    })
        .then(response => response.json())
        .then(response => {
            if (response.id)
                alert("Data Saved!")
            console.log(JSON.stringify(response.id))
        })
        .catch(err => console.log(err))
}