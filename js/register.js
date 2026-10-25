// Registration form: save to localStorage as JSON and show the saved list.
var STORAGE_KEY = "nariNoorRegistrations";

var form = document.getElementById("regForm");
var message = document.getElementById("message");
var tableWrap = document.getElementById("tableWrap");
var tbody = document.getElementById("regBody");
var emptyNote = document.getElementById("emptyNote");
var clearBtn = document.getElementById("clearBtn");

// Read the saved array from localStorage (empty array if nothing saved yet)
function loadRegistrations() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    return [];
  }
}

// Rebuild the table from localStorage
function showRegistrations() {
  var list = loadRegistrations();
  tbody.replaceChildren();

  list.forEach(function (item) {
    var row = tbody.insertRow();
    [item.name, item.email, item.phone, item.event, item.source].forEach(function (value) {
      row.insertCell().textContent = value; // textContent keeps user input safe
    });
  });

  tableWrap.hidden = list.length === 0;
  emptyNote.hidden = list.length > 0;
  clearBtn.disabled = list.length === 0;
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page reload

  var data = new FormData(form);
  var registration = {
    name: data.get("fullname").trim(),
    email: data.get("email").trim(),
    phone: data.get("phone").trim(),
    event: data.get("event"),
    source: data.get("source"),
    savedAt: new Date().toISOString()
  };

  var list = loadRegistrations();
  list.push(registration);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));

  message.textContent = "Thank you, " + registration.name + "! You are registered for " + registration.event + ".";
  message.hidden = false;
  form.reset();
  showRegistrations();
});

clearBtn.addEventListener("click", function () {
  if (confirm("Remove all saved registrations from this device?")) {
    localStorage.removeItem(STORAGE_KEY);
    message.hidden = true;
    showRegistrations();
  }
});

showRegistrations();
