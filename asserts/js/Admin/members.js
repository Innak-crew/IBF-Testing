import {
    AuthUID,
    AuthEmail,
    AuthName,
    getData,
    updateData
} from "../auth.js";

const searchInputElement = document.querySelector("#search-input input");
const membersListElement = document.querySelector("#memberList");
let viewModal = document.getElementById("view-modal");
let deactivatedModal = document.getElementById("deactivated-modal");
let deactivatedModalContent = document.getElementById("deactivated-modal-content");
let deactivatedModalActionBtn = document.getElementById("deactivated-action-btn");
let members;
let details = ["profileURL", "name", "email", "collegeName", "collegeShotName", "Mobile", "address", "dob", "gender", "bloodgroup", "IDProofURL"];
let displayDetails = {};


const displayTable = async () =>{
    details.forEach((el) => {
        displayDetails[el] = document.getElementById(el);
    });
    members = await getData("Users");
    let membersCount = 0;
    if (members){
        membersCount = Object.keys(members).length;
    }
    

    membersListElement.innerHTML = ""
    if (membersCount === 0) {
        const tr = document.createElement("tr");
        tr.className = "list-group-item";
        tr.innerHTML = `No of Members is Zero`;
        membersListElement.appendChild(tr);
    }

    const entries = Object.entries(members);
    entries.forEach(([id, data], index) => {
        if (data.role !== "MemberShips") {
            return;
        }
        let className;
        if (data.status === 'active') {
            className = 'is-success';
        } else {
            className = "is-danger"
        }
        const tr = document.createElement("tr");
        tr.className = "list-group-item";
        tr.innerHTML = `
        <td class="is-image-cell">
            <div class="image">
                <img src="${data.profileURL.replace("s96-c","s24-c")}"
                    class="is-rounded">
            </div>
        </td>
        <td data-label="Name">${data.name}</td>
        <td data-label="College Name">${data.collegeShotName}</td>
        <td data-label="Status">
            <div class="tags">
                <span class="tag ${className}" id="status">${data.status}</span>
            </div>
        </td>
        <td class="is-actions-cell">
            <div class="buttons is-right">
                <button class="button is-small is-primary jb-modal view-btn"
                    data-target="view-modal" type="button">
                    <span class="icon"><i class="mdi mdi-eye"></i></span>
                </button>
                <button class="button is-small is-danger jb-modal deactivated-btn"
                    data-target="deactivated-modal" type="button">
                    <span class="icon"><i class="mdi mdi-pencil"></i></span>
                </button>
            </div>
        </td>`;

        membersListElement.appendChild(tr);

        // Add an event listener to the View button
        const viewBtn = tr.querySelector('.view-btn');
        viewBtn.addEventListener('click', () => {
            details.forEach((el) => {
                if (el === "profileURL") {
                    displayDetails[el].src = members[id][el].replace("s96-c", "s200-c");
                } else if (el === "IDProofURL") {
                    displayDetails[el].href = members[id][el];
                } else {
                    displayDetails[el].innerHTML = members[id][el];
                }
            });
            viewModal.classList.add("is-active");
        });

        // Add an event listener to the deactivated button
        const deactivatedBtn = tr.querySelector('.deactivated-btn');
        deactivatedBtn.addEventListener('click', () => {
            const status = members[id]["status"];
            deactivatedModalActionBtn.setAttribute("data-id", id);
            if (status === "active") {
                deactivatedModalContent.innerHTML = "Are you sure you want to deactivate this member?";
                deactivatedModalActionBtn.innerHTML = "Deactivate";
                deactivatedModalActionBtn.classList.add("is-danger");
                deactivatedModalActionBtn.classList.remove("is-success");
            } else {
                deactivatedModalContent.innerHTML = "Are you sure you want to activate this member?";
                deactivatedModalActionBtn.innerHTML = "Activate";
                deactivatedModalActionBtn.classList.remove("is-danger");
                deactivatedModalActionBtn.classList.add("is-success");
            }
            deactivatedModal.classList.add("is-active");
        });
    });
}

window.addEventListener('DOMContentLoaded', async function () {

   await displayTable();

    deactivatedModalActionBtn.addEventListener("click", async e => {
        e.preventDefault();
        let action = e.target.innerHTML;
        let id = deactivatedModalActionBtn.getAttribute("data-id");
        let updateValue = members[id];
        updateValue["status"] = (action === "Activate") ? "active" : "inactive";

        const update = await updateData(`Users/${id}`, updateValue);

        if (update) {
            new Notify({
                status: "success",
                title: (action === "Activate") ? "Activated successfully" : "Deactivated successfully",
                text: "",
                autoclose: true,
                autotimeout: 3000,
                effect: "slide",
                speed: 300,
                position: "right bottom"
            });
            await displayTable();
        } else {
            new Notify({
                status: "error",
                title: (action === "Activate") ? "Activated is not successfully" : "Deactivated is not successfully",
                text: "",
                autoclose: true,
                autotimeout: 3000,
                effect: "slide",
                speed: 300,
                position: "right bottom"
            });
        }
        deactivatedModal.classList.remove("is-active");
    });

    document.getElementById("statusFilter").addEventListener("change", (e) => {
        const status = e.target.value.toLowerCase();
        const listItems = document.querySelectorAll(".list-group-item");
        listItems.forEach(listItem => {
            const listItemStatus = listItem.querySelector("#status").innerText.trim().toLowerCase();
            if (status === "all" || listItemStatus == status) {
                listItem.style.display = "table-row";
            } else {
                listItem.style.display = "none";
            }
        });
    });

    searchInputElement.addEventListener("input", () => {
        const searchTerm = searchInputElement.value.toLowerCase();
        const listItems = membersListElement.getElementsByClassName(
            "list-group-item"
        );
        for (let i = 0; i < listItems.length; i++) {
            const listItem = listItems[i];
            const detailsText = listItem.innerText.toLowerCase();
    
            if (detailsText.includes(searchTerm)) {
                listItem.style.display = "table-row";
            } else {
                listItem.style.display = "none";
            }
        }
    });

    console.clear();
    console.log("%c   ⚠️  STOP! ⚠️   ", "color: #ff4136; font-size: 24px; font-weight: bold; padding: 10px 20px; border: 2px solid white; border-radius: 10px; animation: blinker 1s linear infinite;");
    console.log("%cinnak: This is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature or hack someone's account, it is a SCAM and could compromise your data or security.", "font-size: 16px; font-weight: bold; color: #f00;");
    console.log("%c👨‍💻 Developed by innak", "color: #f9a034; font-size: 18px; font-weight: bold;");
    console.log("%c🔗 This page was developed by innak. For more information, visit: https://innak.com", "font-size: 14px; font-weight: bold; color: blue;");
});

