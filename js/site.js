const events = [
    {
        event: 'ComicCon',
        city: 'New York',
        state: 'New York',
        attendance: 240000,
        date: '06/01/2017',
    },
    {
        event: 'ComicCon',
        city: 'New York',
        state: 'New York',
        attendance: 250000,
        date: '06/01/2018',
    },
    {
        event: 'ComicCon',
        city: 'New York',
        state: 'New York',
        attendance: 257000,
        date: '06/01/2019',
    },
    {
        event: 'ComicCon',
        city: 'San Diego',
        state: 'California',
        attendance: 130000,
        date: '06/01/2017',
    },
    {
        event: 'ComicCon',
        city: 'San Diego',
        state: 'California',
        attendance: 140000,
        date: '06/01/2018',
    },
    {
        event: 'ComicCon',
        city: 'San Diego',
        state: 'California',
        attendance: 150000,
        date: '06/01/2019',
    },
    {
        event: 'HeroesCon',
        city: 'Charlotte',
        state: 'North Carolina',
        attendance: 40000,
        date: '06/01/2017',
    },
    {
        event: 'HeroesCon',
        city: 'Charlotte',
        state: 'North Carolina',
        attendance: 45000,
        date: '06/01/2018',
    },
    {
        event: 'HeroesCon',
        city: 'Charlotte',
        state: 'North Carolina',
        attendance: 50000,
        date: '06/01/2019',
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

    // displayEvents(currentEvents)
    displayStats(currentEvents);
    avgAttendance(currentEvents);

    // to be continued........
}

function getEvents() {
    //TODO: get events from local storage

    return events;
}

function displayEvents(events) {
    // get the table to put the events in
    const eventsTable = document.getElementById('events-table');

    // clear the table
    eventsTable.innerHTML = '';

    // loop through events
    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        // - fill the table with rows:
        //      - make a <tr></tr>
        let eventRow = document.createElement('tr');

        //      - make a <td> for each property
        //      - put the data into each <td>
        let eventName = document.createElement('td');
        eventName.innerText = event.event;
        eventRow.appendChild(eventName);

        let eventCity = document.createElement('td');
        eventCity.innerText = event.city;
        eventRow.appendChild(eventCity);

        let eventState = document.createElement('td');
        eventState.innerText = event.state;
        eventRow.appendChild(eventState);

        let eventAttendance = document.createElement('td');
        eventAttendance.innerText = event.attendance;
        eventRow.appendChild(eventAttendance);

        let eventDate = document.createElement('td');
        eventDate.innerText = event.date;
        eventRow.appendChild(eventDate);

        //      - append the row to the <tbody>
        eventsTable.appendChild(eventRow);
    }
}

// given an array of events, total the sum of events and return the value
function sumAttendance(events) {
    let sum = 0;

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;
    }

    return sum;
}

function displayStats(events) {
    // calculate total attendance
    let total = sumAttendance(events);
    document.getElementById('total-attendance').innerHTML =
        total.toLocaleString();

    // calculate average attendance
    let average = avgAttendance(events);
    document.getElementById('avg-attendance').innerText =
        Math.round(average).toLocaleString();

    // calculate max attendance
    let max = maxAttendance(events);
    document.getElementById('max-attendance').innerText = max.toLocaleString();

    // calculate min attendance
    let min = minAttendance(events);
    document.getElementById('min-attendance').innerText = min.toLocaleString();
}

function avgAttendance(events) {
    // calculate average attendance and return it
    let sum = 0;

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance;
    }

    let average = sum / events.length;

    return average;
}

function minAttendance(events) {
    // calculate min attendance and return it
    let attendees = events.map(event => event.attendance); // gets all attendance values because that is what Jacob said in class, .map gets all items and changes it to an array (paraphrasing of course!).
    let min = Math.min(...attendees); // Find the minimum attendance number
    // Math.min() method returns the smallest of the numbers given as input parameters

    return min;
}

function maxAttendance(events) {
    // calculate max attendance and return it
    let attendees = events.map(event => event.attendance);
    let max = Math.max(...attendees);
    return max;
}
