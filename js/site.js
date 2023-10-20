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
    dropDownMenu.innerHTML = '';

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

    displayEvents(currentEvents)
    displayStats(currentEvents);
    document.getElementById('stats-loc').textContent = 'All';
}

function getEvents() {
    // TODO: get events from local storage
    // If noone has visited your website, we need to fill your local storage with some data so the next time you visit, there will already be something there
    let eventsJson = localStorage.getItem('tjb-events');

    let storedEvents = events;

    if(eventsJson == null) {
        saveEvents(events);
    } else {
        storedEvents = JSON.parse(eventsJson);
    }

    return storedEvents;
}

function saveEvents(events) {
    // get events from local storage

    let eventsJson = JSON.stringify(events); // taking an array of objects and turning it into a string

    localStorage.setItem('tjb-events', eventsJson); // using my own initials to be different from any other variable-id. **Not Secure Storage**
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
        eventAttendance.innerText = event.attendance.toLocaleString();
        eventRow.appendChild(eventAttendance);

        let eventDate = document.createElement('td');
        let date = new Date(event.date);  // format the date to World date
        eventDate.innerText = date.toLocaleDateString(undefined, {dateStyle: 'full'}); // use new World date
        eventRow.appendChild(eventDate);

        //      - append the row to the <tbody>
        eventsTable.appendChild(eventRow);
    }
}

// given an array of events, total the sum of events and return the value <<<--- COMMON INTERVIEW QUESTION *******
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
    // let total = sumAttendance(events); // not being used because of current function calculateStats()
    let stats = calculateStats(events);
    document.getElementById('total-attendance').textContent =
        stats.sum.toLocaleString();

    // calculate average attendance
    // let average = avgAttendance(events); // not being used because of current function calculateStats()
    document.getElementById('avg-attendance').textContent =
        Math.round(stats.average).toLocaleString();

    // calculate max attendance
    // let max = maxAttendance(events); // not being used because of current function calculateStats()
    document.getElementById('max-attendance').textContent = stats.max.toLocaleString();

    // calculate min attendance
    // let min = minAttendance(events); // not being used because of current function calculateStats()
    document.getElementById('min-attendance').textContent = stats.min.toLocaleString();
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
    let totalAttendees = new Set(attendees);
    let max = Math.max(...totalAttendees);

    return max;
}

function calculateStats(events) {

    let sum = 0;
    let min = events[0].attendance; // minimum can't be zero, you wouldn't have zero attendees
    let max = 0;

    for (let i = 0; i < events.length; i++) {
        let event = events[i];

        sum += event.attendance

        if (event.attendance < min) {
            min = event.attendance;
        }
        
        if (event.attendance > max) {
            max = event.attendance;
        }
    }

    let average = sum / events.length;

    let stats = {
        sum: sum,
        average: average,
        min: min,
        max: max
    }

    return stats;
}

function filterByCity(dropDownElement) {
    let cityName = dropDownElement.textContent;

    document.getElementById('stats-loc').innerHTML = cityName;

    // figure out what city we want

    // get all the events
    let allEvents = getEvents();

    // filter those events to just one city
    let filteredEvents = [];

    for (let i = 0; i < allEvents.length; i++) {
        let event = allEvents[i];

        if (event.city == cityName || cityName == 'All') {
            filteredEvents.push(event);
        }
    }

    // filteredEvents = allEvents.filter(event => event.city == cityName || cityName == 'All'); // advanced array method expression to say the same thing from line 257
    // let filteredEvents = cityName == 'All' ? allEvents : allEvents.filter(e => e.city == cityName) // advanced ternary expression to say the same thing from line 257

    // call displayStats with the events for that city
    displayStats(filteredEvents);
    // call displayEvents with the events for that city
    displayEvents(filteredEvents);
}

function saveNewEvent() {
    let newEventForm = document.getElementById('newEventForm');
    let formData = new FormData(newEventForm); // gets all the data from the form
    let newEvent = Object.fromEntries(formData.entries()); // goes thru the form and creates an object where the name of the property is the name of the values

    // fixes the format of the data
    newEvent.attendance = parseInt(newEvent.attendance);
    newEvent.date = new Date(newEvent.date).toLocaleDateString();

    // get all current events
    let allEvents = getEvents();
    // add new event
    allEvents.push(newEvent);
    // save all events
    saveEvents(allEvents);

    newEventForm.reset(); // resets the form to empty

    // hide the Bootstrap Modal on form submit.
    let modalElement = document.getElementById('addEventModal');
    let bsModal = bootstrap.Modal.getInstance(modalElement);
    bsModal.hide();

    // display all the events after form is submitted
    buildDropDown();
}