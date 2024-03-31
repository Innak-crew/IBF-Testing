import {
    AuthUID,
    AuthEmail,
    AuthName,
    getData,
    updateData
} from "../auth.js";

import {
    GenerateIDCode
} from "../GenerateID.js"

const searchInputElement = document.querySelector("#search-input input");
const CAListElement = document.querySelector("#memberList");
let viewModal = document.getElementById("view-modal");
let deactivatedModal = document.getElementById("deactivated-modal");
let deactivatedModalContent = document.getElementById("deactivated-modal-content");
let deactivatedModalActionBtn = document.getElementById("deactivated-action-btn");
let CA;
let details = ["profileURL", "name", "email", "collegeName", "collegeShotName", "Mobile", "address", "dob", "gender", "bloodgroup", "IDProofURL", "resumeURL"];
let displayDetails = {};
let campusAmbassadorCountsDetails;
let IDCode;

const displayTable = async () => {
    
    CA = await getData("Users");
    let CACount = 0;
    if(CA){
        CACount = Object.keys(CA).length;
    }
    details.forEach((el) => {
        displayDetails[el] = document.getElementById(el);
    });
    CAListElement.innerHTML = ""
    if (CACount === 0) {
        const tr = document.createElement("tr");
        tr.className = "list-group-item";
        tr.innerHTML = `No of CA is Zero`;
        CAListElement.appendChild(tr);
    }

    const entries = Object.entries(CA);
    entries.forEach(([id, data], index) => {
        if (data.role !== "Campus Ambassador") {
            return;
        }
        let className;

        if (data.status === 'approved') {
            className = 'is-success';
        } else if (data.status === 'waiting') {
            className = 'is-warning';
        } else if (data.status === 'pending') {
            className = 'is-info';
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
        <td data-label="Status" >
            <div class="tags">
                <select class="tag ${className} is-light" id="status">
                    <option value="approved" ${data.status === "approved" ? "selected" : ""}>Approved</option>
                    <option value="waiting" ${data.status === "waiting" ? "selected" : ""} disabled>Waiting</option>
                    <option value="pending" ${data.status === "pending" ? "selected" : data.status === "waiting" ? "" : "disabled"}>Pending</option>
                    <option value="rejected" ${data.status === "rejected" ? "selected" : ""}>Rejected</option>
                    <option value="inactive" ${data.status === "inactive" ? "selected" : ""}>Inactive</option>
                </select>
            </div>
        </td>
        <td class="is-actions-cell">
            <div class="buttons is-right">
                <button class="button is-small is-primary jb-modal view-btn"
                    data-target="view-modal" type="button">
                    <span class="icon"><i class="mdi mdi-eye"></i></span>
                </button>
            </div>
        </td>`;

        CAListElement.appendChild(tr);

        const viewBtn = tr.querySelector('.view-btn');
        viewBtn.addEventListener('click', () => {
            details.forEach((el) => {
                if (el === "profileURL") {
                    displayDetails[el].src = CA[id][el].replace("s96-c", "s200-c");
                } else if (el === "IDProofURL" || el === "resumeURL") {
                    displayDetails[el].href = CA[id][el];
                } else {
                    displayDetails[el].innerHTML = CA[id][el];
                }
            });
            viewModal.classList.add("is-active");
        });



        const statusSelection = tr.querySelector("#status");
        statusSelection.addEventListener("change", e => {
            const originalStatus = CA[id]["status"];
            const changedStatus = e.target.value;

            deactivatedModalActionBtn.setAttribute("data-id", id);
            if (originalStatus === changedStatus) {
                return;
            }
            deactivatedModalContent.innerHTML = `Are you sure you want to change the <b>${originalStatus}</b> status to <b>${changedStatus}</b>  status  for this Campus Ambassador?`;
            deactivatedModalActionBtn.innerHTML = changedStatus[0].toUpperCase() + changedStatus.slice(1, changedStatus.length);
            deactivatedModalActionBtn.classList.remove("is-success", "is-danger", "is-info", "is-warning");

            if (changedStatus === 'approved') {
                deactivatedModalActionBtn.classList.add('is-success');
            } else if (changedStatus === 'waiting') {
                deactivatedModalActionBtn.classList.add('is-warning');
            } else if (changedStatus === 'pending') {
                deactivatedModalActionBtn.classList.add('is-info');
            } else {
                deactivatedModalActionBtn.classList.add("is-danger");
            }

            deactivatedModal.classList.add("is-active");
        });
    });
}

window.addEventListener('DOMContentLoaded', async function () {

    await displayTable();

    deactivatedModalActionBtn.addEventListener("click", async e => {
        e.preventDefault();
        let action = e.target.innerHTML.toLowerCase();
        let id = deactivatedModalActionBtn.getAttribute("data-id");
        let updateValue = CA[id];
        updateValue["status"] =
            (action === "approved") ?
            "approved" : (action === "pending") ?
            "pending" : (action === "rejected") ?
            "rejected" : "inactive";

        const type = (action === "approved") ?
            "ca_approved" : (action === "pending") ?
            "ca_pending" : (action === "rejected") ?
            "ca_rejection" : "";

        if (action === "approved") {
            campusAmbassadorCountsDetails = await getData("Counters/CampusAmbassador");
            IDCode = GenerateIDCode("Campus Ambassador", campusAmbassadorCountsDetails.count + 1);
            updateValue["IDCode"] = IDCode;
        }

        const update = await updateData(`Users/${id}`, updateValue);

        if (update) {
            new Notify({
                status: "success",
                title: "Status Update successfully",
                text: "",
                autoclose: true,
                autotimeout: 3000,
                effect: "slide",
                speed: 300,
                position: "right bottom"
            });

            if (action === "approved") {
                await updateData("Counters/CampusAmbassador", {
                    count: campusAmbassadorCountsDetails.count + 1
                })
            }
            await displayTable();
            if (type !== "") {
              await  eNotify(updateValue["name"], updateValue["email"],type);
            }
        } else {
            new Notify({
                status: "danger",
                title: "Status Update is not successfully",
                text: "",
                autoclose: true,
                autotimeout: 3000,
                effect: "slide",
                speed: 300,
                position: "right bottom"
            });
        }
        deactivatedModal.classList.remove("is-active");
        // window.location.reload();
    });

    document.getElementById("statusFilter").addEventListener("change", (e) => {
        const status = e.target.value.toLowerCase();
        const listItems = document.querySelectorAll(".list-group-item");
        listItems.forEach(listItem => {
            const listItemStatus = listItem.querySelector("#status").value.toLowerCase();
            if (status === "all" || listItemStatus.includes(status)) {
                listItem.style.display = "table-row";
            } else {
                listItem.style.display = "none";
            }
        });
    });


    searchInputElement.addEventListener("input", () => {
        const searchTerm = searchInputElement.value.toLowerCase();
        const listItems = CAListElement.getElementsByClassName(
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
});

console.clear();
console.log("%c   ⚠️  STOP! ⚠️   ", "color: #ff4136; font-size: 24px; font-weight: bold; padding: 10px 20px; border: 2px solid white; border-radius: 10px; animation: blinker 1s linear infinite;");
console.log("%cinnak: This is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature or hack someone's account, it is a SCAM and could compromise your data or security.", "font-size: 16px; font-weight: bold; color: #f00;");
console.log("%c👨‍💻 Developed by innak", "color: #f9a034; font-size: 18px; font-weight: bold;");
console.log("%c🔗 This page was developed by innak. For more information, visit: https://innak.com", "font-size: 14px; font-weight: bold; color: blue;");