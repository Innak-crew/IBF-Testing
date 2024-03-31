import {
    AuthUID,
    getData,
    updateData
} from "./auth.js";

import {
    downloadIdCard
} from "./GenerateID.js"

let avatar = document.getElementById('avatar');
let name = document.getElementById('name');
let displayName = document.getElementById('displayName');
let email = document.getElementById("email");
let collegeName = document.getElementById("collegeName");
let collegeShotName = document.getElementById("collegeShotName");
let Mobile = document.getElementById("Mobile");
let dob = document.getElementById("dob");
let gender = document.getElementById("gender");
let bloodGroup = document.getElementById("bloodgroup");
let address = document.getElementById("address");
let saveBtn = document.getElementById("saveBtn");
let editBtn = document.getElementById("editBtn");
let downloadBtn = document.getElementById("downloadIDCode");
let deleteBtn = document.getElementById("deleteBtn");
let content = document.getElementById("content");
let perLoader = document.getElementById("pre-loader");
let originalData;
const card = document.querySelector('.card');
const cardHeaderIcon = document.querySelector('.card-header-icon');

cardHeaderIcon.addEventListener('click', function (e) {
    e.preventDefault();
    card.classList.toggle('is-expanded');

    if (card.classList.contains('is-expanded')) {
        this.querySelector('i').classList.remove('fa-angle-down');
        this.querySelector('i').classList.add('fa-angle-up');
    } else {
        this.querySelector('i').classList.remove('fa-angle-up');
        this.querySelector('i').classList.add('fa-angle-down');
    }
});

function setDisabledAttributes(e, t) {
    document.querySelectorAll(".input").forEach(function (element) {
        if (t) {
            element.setAttribute("disabled", t.toString());
        } else {
            if (element.getAttribute("type") !== "email") {
                element.removeAttribute("disabled");
            }
        }
    });
}

// Save function for the 'click' event on the save button
saveBtn.addEventListener("click", async (e) => {
    perLoader.style.display = "block";
    perLoader.style.background = "rgba(0, 0, 0, 0.247)";
    let isChanges = false;
    try {
        if (!originalData) {
            originalData = await getData("Users/" + AuthUID);
        }
        const keys = ['name', 'collegeName', 'collegeShotName', 'Mobile', 'address', 'gender', 'dob', 'bloodgroup'];

        // Update the fields only if the new value differs from the original value
        keys.forEach(key => {
            if (typeof originalData[key] !== 'undefined' && document.getElementById(key) && document.getElementById(key).value) {
                const newValue = document.getElementById(key).value;
                if (newValue !== originalData[key]) {
                    originalData[key] = newValue;
                    isChanges = true
                }
            }
        });

        if (isChanges) {
            const update = await updateData("Users/" + AuthUID, originalData);

            if (update) {
                displayName.innerHTML = originalData["name"];
                perLoader.style.display = "none";
                editBtn.style.display = "block";
                saveBtn.style.display = "none";
                new Notify({
                    status: "success",
                    title: "Successfully Updated!",
                    text: "Your profile has been successfully updated.",
                    autoclose: !0,
                    autotimeout: 3e3,
                    effect: "slide",
                    speed: 300,
                    position: "right bottom"
                })

                setDisabledAttributes(content, true);
            }
        } else {
            perLoader.style.display = "none";
            editBtn.style.display = "block";
            saveBtn.style.display = "none";
            setDisabledAttributes(content, true);
        }


    } catch (error) {
        console.error("Error while fetching or updating data: ", error);
    }
});

editBtn.addEventListener('click', function (e) {
    editBtn.style.display = "none";
    saveBtn.style.display = "block";
    setDisabledAttributes(content, false);
});


downloadBtn.addEventListener("click", async e => {
    e.preventDefault();
    if (originalData.status === 'active' || originalData.status === 'approved') {
        await downloadIdCard(originalData);
    } else {
        new Notify({
            status: "warning",
            title: "Cannot download ID Card",
            text: "Your profile status is not active or approved",
            autoclose: !0,
            autotimeout: 3e3,
            effect: "slide",
            speed: 300,
            position: "right bottom"
        })
    }
})

// deleteBtn.addEventListener("click", async e => {
//     e.preventDefault();

// });

setInterval(() => {
    if (name.getAttribute("disabled") && name.getAttribute("disabled") !== "true") {
        name.setAttribute("disabled", t.toString());
    }
}, 100);

const displayData = async () => {
    originalData = await getData("Users/" + AuthUID);
    if (originalData) {
        name.value = originalData.name;
        displayName.innerHTML = originalData.name;
        email.value = originalData.email;
        collegeName.value = originalData.collegeName;
        collegeShotName.value = originalData.collegeShotName;
        avatar.src = originalData.profileURL;
        role.innerHTML = originalData.role === "MemberShips" ? "Member" : "Campus Ambassador";
        if (originalData.status === 'active' || originalData.status === 'approved' ||originalData.status === 'inactive') {
            IDCode.innerHTML = originalData.IDCode;
        }
        Mobile.value = originalData.Mobile;
        address.value = originalData.address;
        gender.value = originalData.gender;
        dob.value = originalData.dob;
        bloodGroup.value = originalData.bloodgroup;
        perLoader.style.display = "none";

        const statusBadge = document.querySelector('.tags.has-addons.is-centered .tag:last-child');

        if (originalData.status === 'active' || originalData.status === 'approved') {
            statusBadge.classList.add('is-success');
        } else if (originalData.status === 'inactive' || originalData.status === 'rejected') {
            statusBadge.classList.add('is-danger');
        } else if (originalData.status === 'waiting') {
            statusBadge.classList.add('is-warning');
        } else if (originalData.status === 'pending') {
            statusBadge.classList.add('is-info');
        }
        statusBadge.textContent = originalData.status.charAt(0).toUpperCase() + originalData.status.slice(1);
    }
}

window.addEventListener('DOMContentLoaded', function () {
    let checkInterval = setInterval(() => {
        if (AuthUID != "") {
            displayData();
            clearInterval(checkInterval);
        }
    }, 1000);
});

console.clear();
console.log("%c   ⚠️  STOP! ⚠️   ", "color: #ff4136; font-size: 24px; font-weight: bold; padding: 10px 20px; border: 2px solid white; border-radius: 10px; animation: blinker 1s linear infinite;");
console.log("%cinnak: This is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature or hack someone's account, it is a SCAM and could compromise your data or security.", "font-size: 16px; font-weight: bold; color: #f00;");
console.log("%c👨‍💻 Developed by innak", "color: #f9a034; font-size: 18px; font-weight: bold;");
console.log("%c🔗 This page was developed by innak. For more information, visit: https://innak.com", "font-size: 14px; font-weight: bold; color: blue;");