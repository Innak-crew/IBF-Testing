import {
    AuthUID,
    AuthEmail,
    AuthName,
    getData,
    updateData
} from "../auth.js";

let usersDetails;
const displayVariables = ["total-members", "active-members", "inactive-members", "total-ca", "waiting-ca", "pending-ca", "approved-ca", "rejected-ca", "inactive-ca"];
const displayVariableElement = {};
const displayVariableData = {};
displayVariables.forEach((variable) => {
    displayVariableElement[variable] = document.getElementById(variable);
    displayVariableData[variable] = 0;
});

window.addEventListener('DOMContentLoaded', async function () {
    usersDetails = await getData("Users");
    let usersDetailsCount = 0;
    if (usersDetails) {
        usersDetailsCount = Object.keys(usersDetails).length;
    }else{

    }

    if (usersDetailsCount === 0) {
        displayVariables.forEach((variable) => {
            displayVariableElement[variable].innerHTML = 0;
        });
    } else {
        const entries = Object.entries(usersDetails);
        entries.forEach(([id, data], index) => {

            if (data.role === "Campus Ambassador") {
                displayVariableData["total-ca"] += 1
                if (data.status === 'approved') {
                    displayVariableData["approved-ca"] += 1
                } else if (data.status === 'waiting') {
                    displayVariableData["waiting-ca"] += 1
                } else if (data.status === 'pending') {
                    displayVariableData["pending-ca"] += 1
                } else if (data.status === 'rejected') {
                    displayVariableData["rejected-ca"] += 1
                } else if (data.status === 'inactive') {
                    displayVariableData["inactive-ca"] += 1
                }
            } else if (data.role === "MemberShips") {
                displayVariableData["total-members"] += 1
                if (data.status === 'active') {
                    displayVariableData["active-members"] += 1
                } else if (data.status === 'inactive') {
                    displayVariableData["inactive-members"] += 1
                }
            }

            displayVariables.forEach((variable) => {
                displayVariableElement[variable].innerHTML = displayVariableData[variable];
            });
        });
    }
});

console.clear();
console.log("%c   ⚠️  STOP! ⚠️   ", "color: #ff4136; font-size: 24px; font-weight: bold; padding: 10px 20px; border: 2px solid white; border-radius: 10px; animation: blinker 1s linear infinite;");
console.log("%cinnak: This is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature or hack someone's account, it is a SCAM and could compromise your data or security.", "font-size: 16px; font-weight: bold; color: #f00;");
console.log("%c👨‍💻 Developed by innak", "color: #f9a034; font-size: 18px; font-weight: bold;");
console.log("%c🔗 This page was developed by innak. For more information, visit: https://innak.com", "font-size: 14px; font-weight: bold; color: blue;");