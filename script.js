function saveEntry() {
    var entryInput = document.getElementById('entryInput');
    var entryText = entryInput.value.trim();

    if (entryText !== '') {
        var entry = {
            text: entryText,
            timestamp: getTimestamp()
        };

        var entries = JSON.parse(localStorage.getItem('entries')) || [];

        entries.push(entry);

        localStorage.setItem('entries', JSON.stringify(entries));

        displayEntries();

        entryInput.value = '';
    } else {
        alert('Please write something before saving.');
    }
}

function getTimestamp() {
    var date = new Date();
    return date.toLocaleString();
}


function displayEntries() {
    var entriesContainer = document.getElementById('entries');
    entriesContainer.innerHTML = '';

    var entries = JSON.parse(localStorage.getItem('entries')) || [];

    entries.forEach(function(entry, index) {
        var entryDiv = document.createElement('div');
        entryDiv.className = 'entry';

        var entryContent = '<p>' + entry.text + '</p>';
        entryContent += '<small>' + entry.timestamp + '</small>';
        entryContent += '<button onclick="editEntry(' + index + ')">Edit</button>';
        entryContent += '<button onclick="deleteEntry(' + index + ')">Delete</button>';

        entryDiv.innerHTML = entryContent;
        entriesContainer.appendChild(entryDiv);
    });
}


function editEntry(index) {
    var entries = JSON.parse(localStorage.getItem('entries')) || [];
    var entry = entries[index];

    var newText = prompt('Edit your entry:', entry.text);

    if (newText !== null) {
        entry.text = newText;
        entry.timestamp = getTimestamp();

        entries[index] = entry;
        localStorage.setItem('entries', JSON.stringify(entries));

        displayEntries();
    }
}


function deleteEntry(index) {
    var entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    displayEntries();
}

displayEntries();
