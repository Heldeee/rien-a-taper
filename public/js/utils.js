document.addEventListener('DOMContentLoaded', function () {
    function signalPresence(stationId) {
        // Create a new XMLHttpRequest object
        const xhr = new XMLHttpRequest();

        // Configure the request
        xhr.open('POST', '/increment-control-level');
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Set up the callback function for when the request completes
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Parse the response JSON
                const response = JSON.parse(xhr.responseText);

                // Update the control level on the page if the element exists
                const controlLevelSpan = document.getElementById('controlLevel_' + stationId);
                if (controlLevelSpan) {
                    controlLevelSpan.textContent = response.newControlLevel;
                    console.log('Control level incremented successfully for station:', stationId);
                } else {
                    console.error('Control level element not found:', 'controlLevel_' + stationId);
                }
            } else {
                console.error('Error:', xhr.statusText);
            }
        };

        // Set up the callback function for any errors
        xhr.onerror = function () {
            console.error('Request failed');
        };

        // Prepare the data to send in the request body
        const data = JSON.stringify({ stationId });

        // Send the request
        xhr.send(data);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.line-logo').forEach(function (img) {
        img.addEventListener('click', function () {
            const line = img.getAttribute('data-line');
            const [type, id] = line.split('_');
            const url = `/${type}/${id}`;
            window.location.href = url;
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const homeButton = document.getElementById('home-button');
    homeButton.addEventListener('click', function () {
        // Rediriger l'utilisateur vers la page d'accueil
        window.location.href = '/';
    });
});


function search() {
    var input, filter, objects, object, h2, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    objects = document.getElementsByClassName('object');

    for (i = 0; i < objects.length; i++) {
        object = objects[i];
        h2 = object.getElementsByTagName('h2')[0];
        txtValue = h2.textContent || h2.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            object.style.display = '';
        } else {
            object.style.display = 'none';
        }
    }
}



function resetSearch() {
    document.getElementById('searchInput').value = '';
    search();
}

function signalPresence(stationId) {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    // Configure the request
    xhr.open('POST', '/increment-control-level');
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Set up the callback function for when the request completes
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Parse the response JSON
            const response = JSON.parse(xhr.responseText);

            // Update the control level on the page
            const controlLevelSpan = document.getElementById('controlLevel_' + stationId);
            controlLevelSpan.textContent = response.control_level;

            console.log('Control level incremented successfully for station:', stationId);
        } else {
            console.error('Error:', xhr.statusText);
        }
    };

    // Set up the callback function for any errors
    xhr.onerror = function () {
        console.error('Request failed');
    };

    // Prepare the data to send in the request body
    const data = JSON.stringify({ stationId });

    // Send the request
    xhr.send(data);
}

function formatReadableDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month} ${hours}:${minutes}`;
}



