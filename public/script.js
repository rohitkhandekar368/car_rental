// Function to dynamically add table names to the sidebar
function populateTableList() {
  const tableList = document.getElementById("tableList");
  const tables = [
    "Cars",
    "VehicleCategory",
    "Reservations",
    "Locations",
    "Customers",
    "Payments",
  ]; // Add more tables as needed

  tables.forEach((table) => {
    const listItem = document.createElement("li");
    listItem.textContent = table;
    listItem.onclick = () => showTable(table);
    tableList.appendChild(listItem);
  });
}

// Function to show attributes of the selected table
function showTable(tableName) {
  const attributesWindow = document.getElementById("attributesWindow");
  const dataForm = document.getElementById("dataForm");
  attributesWindow.innerHTML = `<p>Showing attributes for ${tableName}</p>`;

  // Clear textfields in the form
  dataForm.reset();

  // Fetch and display the attributes of the selected table from the server
  fetch(`/getAttributes?table=${tableName}`)
    .then((response) => response.json())
    .then((data) => {
      // Iterate through the attributes and create textfields in the form
      data.attributes.forEach((attribute) => {
        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.id = attribute;
        inputField.placeholder = attribute;
        dataForm.appendChild(inputField);
      });
    })
    .catch((error) => console.error("Error fetching attributes:", error));
}

// Function to insert a record into the selected table
function insertRecord() {
  const dataForm = document.getElementById("dataForm");
  const tableName = document
    .querySelector("#attributesWindow p")
    .textContent.split(" ")[3];

  // Collect data from textfields
  const formData = {};
  dataForm.querySelectorAll("input").forEach((input) => {
    formData[input.id] = input.value;
  });

  // Send a POST request to the server to insert the record
  fetch(`/insertRecord?table=${tableName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => alert(data.message))
    .catch((error) => console.error("Error inserting record:", error));
}

// Function to display records from the selected table
function displayRecords() {
  const tableName = document
    .querySelector("#attributesWindow p")
    .textContent.split(" ")[3];

  // Fetch and display records from the server
  fetch(`/getRecords?table=${tableName}`)
    .then((response) => response.json())
    .then((data) => {
      // Display the fetched records
      const recordsWindow = document.getElementById("attributesWindow");
      recordsWindow.innerHTML = `<p>Records for ${tableName}</p>`;
      data.records.forEach((record) => {
        const recordString = Object.entries(record)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
        recordsWindow.innerHTML += `<p>${recordString}</p>`;
      });
    })
    .catch((error) => console.error("Error fetching records:", error));
}

// Function to update a specific record in the selected table
function updateRecord() {
  const dataForm = document.getElementById("dataForm");
  const tableName = document
    .querySelector("#attributesWindow p")
    .textContent.split(" ")[3];

  // Collect data from textfields
  const formData = {};
  dataForm.querySelectorAll("input").forEach((input) => {
    formData[input.id] = input.value;
  });

  // Send a POST request to the server to update the record
  fetch(`/updateRecord?table=${tableName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => alert(data.message))
    .catch((error) => console.error("Error updating record:", error));
}

// Function to delete a specific record from the selected table
function deleteRecord() {
  const dataForm = document.getElementById("dataForm");
  const tableName = document
    .querySelector("#attributesWindow p")
    .textContent.split(" ")[3];

  // Collect data from textfields
  const formData = {};
  dataForm.querySelectorAll("input").forEach((input) => {
    formData[input.id] = input.value;
  });

  // Send a POST request to the server to delete the record
  fetch(`/deleteRecord?table=${tableName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => alert(data.message))
    .catch((error) => console.error("Error deleting record:", error));
}

// Call the function to populate the initial table list
populateTableList();
