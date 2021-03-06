checkLoggedIn();
const content = document.getElementById("container");
fetchHTML("home.html")
    .then(value => {
        content.innerHTML = value;
    });

active = "home";
document.getElementById(active).classList.remove("menu-item");
document.getElementById(active).classList.add("menu-item-active");

const tabs = ["create", "ongoing", "past", "add_employee", "manage_employees", "update_org", "update_profile", "home"];
for (let link of tabs) {
    document.getElementById(link)
        .addEventListener('click', () => {
            adjustColor(active, link);
            active = link;
                fetchHTML(link+".html")
                .then(value => {
                    content.innerHTML = value;
                    switch(link) {
                        case "ongoing":
                            loadOnGoingEvents();
                            break;
                        case "past":
                            loadPastEvents();
                            break;
                        case "manage_employees":
                            listEmployees();
                            break;
                        case "create":
                            document.getElementById("banner-image").addEventListener("change", readFile);
                            mapboxgl.accessToken = 'pk.eyJ1Ijoic3QzdjNubXciLCJhIjoiY2s3bHh5OG42MGM1aDNrcDZyNXlkZXB2NCJ9.QjrMAZJvETZJAQHC8-0tsw';

                            if (navigator.geolocation) {
                                navigator.geolocation.getCurrentPosition(position => {
                                    loadMap(position.coords.longitude, position.coords.latitude);
                                });
                            } else {
                                loadMap(0, 0);
                            }
                            break;
                        case "update_org":
                            fillOrgUpdateForm();
                            break;
                        case "update_profile":
                            fillProfileUpdateForm();
                            break;
                    }
                });
        });
}

document.getElementById('log-out')
    .addEventListener('click', () => {
        logOut();
    });