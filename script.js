/* Getting Elements by it's id */
let button = document.getElementById("check");
let tbody = document.getElementById("tbody");

/* Adding event listener for the Button to perform  */
button.addEventListener("click", () => {
  tbody.innerHTML = " "; // Empiting the table before start

  /* Getting the value from input field from the html */
  let areaName = document.getElementById("areaName").value;
  let districtName = document.getElementById("districtName").value;

  /* Setting condition to prevent if the either input field is empty */
  if (areaName == "" || districtName == "") {
    alert("Enter Area Name and District");
  } else {
    /* Fetching the information from the given api according to the given area name */
    const api = fetch(`https://api.postalpincode.in/postoffice/${areaName}`);

    api
      .then((rdata) => rdata.json())
      .then((data) => {
        const post = data[0];

        let flag = false;

        for (i = 0; i < post.PostOffice.length; i++) {
          /* Display the area name according to the given District Name */
          if (
            districtName.toUpperCase() ==
            post.PostOffice[i].District.toUpperCase()
          ) {
            flag = true;
            const row = tbody.insertRow();
            const nameCell = row.insertCell(0);
            const postalCodeCell = row.insertCell(1);
            const districtCell = row.insertCell(2);
            const deliveryCell = row.insertCell(3);

            nameCell.textContent = post.PostOffice[i].Name;
            postalCodeCell.textContent = post.PostOffice[i].Pincode;
            districtCell.textContent = post.PostOffice[i].District;
            deliveryCell.textContent = post.PostOffice[i].DeliveryStatus;
          }
        }
        /* If Either Name is Misspelled */
        if (flag == false) {
          alert("Check Area Name or District");
        }
      })
      .catch((error) => alert("Area Name Not Found", error));
  }
});
