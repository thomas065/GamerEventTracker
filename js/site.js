const events = [
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];


//  entry point of application, needs to run when page loads
function buildDropDown() {
    // step 1, get all events that we know about
    // no need to pass anything in because getEvents() is already doing that
    let currentEvents = getEvents();

    // get a list of unique city names from the events list
    let eventCities = currentEvents.map(event => event.city); // .map is a lambda expression (array method) mapping through the events
    let uniqueCities = new Set(eventCities); // looks for duplicate cities and store each unique value with the same name in a new set
    let dropDownChoices = ['All', ...uniqueCities]; //using a spread operator, grab the collection of data from the set and putting it in an array

    const dropDownTemplate = document.getElementById('dropdown-item-template'); // moving this here because we want to use this globally multiple times
    const dropDownMenu = document.getElementById('city-dropdown');

    // for each of those city names:
    for (let i = 0; i < dropDownChoices.length; i++) {
        //  - need to make a dropdown item HTML element (make a template tag)
        let cityName = dropDownChoices[i];

        // make a dropdown item HTML element
        let dropDownItem = dropDownTemplate.content.cloneNode(true);
        // what is said here is, let dropDownItem = <li><a class="dropdown-item" href="#"></a></li>
        dropDownItem.querySelector('a').innerText = cityName; // no differenece between innerText and textContent

        //  - add that element to the drop down menu
        dropDownMenu.appendChild(dropDownItem);
    }
}

function getEvents() {
    //TODO: get events from local storage


    return events;
}