document.addEventListener("DOMContentLoaded", function () {
  let currentTable = null;

  function showAttributes(tableName) {
    document.getElementById("attributesWindow").innerHTML = "";

    fetch(`/getAttributes?table=${tableName}`)
      .then((response) => response.json())
      .then((data) => {
        const attributes = data.attributes;

        const attributesWindow = document.getElementById("attributesWindow");
        attributes.forEach((attribute) => {
          const inputField = document.createElement("input");
          inputField.type = "text";
          inputField.id = attribute;
          inputField.placeholder = attribute;
          attributesWindow.appendChild(inputField);
        });

        currentTable = tableName;
      })
      .catch((error) => {
        console.error("Error fetching attributes:", error);
      });
  }

  function updateButtonsVisibility() {
    const displayButton = document.getElementById("displayButton");
    const updateButton = document.getElementById("updateButton");
    const deleteButton = document.getElementById("deleteButton");

    if (currentTable) {
      displayButton.style.display = "inline-block";
      updateButton.style.display = "none";
      deleteButton.style.display = "none";
    } else {
      displayButton.style.display = "none";
      updateButton.style.display = "none";
      deleteButton.style.display = "none";
    }
  }

  function insertRecord() {
    const data = {};
    document.querySelectorAll("#attributesWindow input").forEach((input) => {
      data[input.id] = input.value;
    });

    fetch(`/insertRecord?table=${currentTable}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
      })
      .catch((error) => {
        console.error("Error inserting record:", error);
      });
  }

  function displayRecords() {
    fetch(`/getRecords?table=${currentTable}`)
      .then((response) => response.json())
      .then((data) => {
        const records = data.records;
        alert(JSON.stringify(records));
      })
      .catch((error) => {
        console.error("Error fetching records:", error);
      });
  }

  function updateRecord() {
    // Create an object to store the record data
    const data = {};

    // Iterate through the form fields and populate the data object
    document.querySelectorAll("#attributesWindow input").forEach((input) => {
      data[input.id] = input.value;
    });

    // Make an AJAX request to update the record
    fetch(`/updateRecord?table=${currentTable}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.message); // Show success message
      })
      .catch((error) => {
        console.error("Error updating record:", error);
        alert("Error updating record. Please check the console for details.");
      });
  }

  function deleteRecord() {
    const data = {};
    document.querySelectorAll("#attributesWindow input").forEach((input) => {
      data[input.id] = input.value;
    });

    fetch(`/deleteRecord?table=${currentTable}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        alert(result.message);
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  }

  document.querySelectorAll(".sidebar li").forEach((tableItem) => {
    tableItem.addEventListener("click", () => {
      showAttributes(tableItem.innerText.trim());
      updateButtonsVisibility();
    });
  });

  document.getElementById("displayButton").addEventListener("click", () => {
    displayRecords();
    document.getElementById("updateButton").style.display = "inline-block";
    document.getElementById("deleteButton").style.display = "inline-block";
  });

  document.getElementById("insertButton").addEventListener("click", () => {
    insertRecord();
  });

  document.getElementById("updateButton").addEventListener("click", () => {
    updateRecord();
  });

  document.getElementById("deleteButton").addEventListener("click", () => {
    deleteRecord();
  });
});
