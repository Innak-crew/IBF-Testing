import { createData, getData } from "../auth.js";

let emailForm = document.querySelector("#add-admin-form");
let email = document.querySelector("#email");
let model = document.querySelector("#email-confirmation-modal");
let modelContent = document.querySelector("#email-confirmation-modal-content");
let sureBtn = document.querySelector("#sure-action-btn");

window.addEventListener("DOMContentLoaded", async () => {
    emailForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const key = email.value.substring(0, email.value.indexOf("@")).replace(/[.#$\[\]]/g, "");
        const data = await getData("head");
        if (data[key] && data[key] === "admin") {
            // Admin already exists, show error
            new Notify({
                status: "error",
                title: "Admin already exists",
                text: "",
                autoclose: true,
                autotimeout: 3000,
                effect: "slide",
                speed: 300,
                position: "right bottom"
            }).show();
        } else {
            // Show email confirmation modal
            modelContent.textContent = `Are you sure to add this email ${email.value} as an admin?`;
            model.classList.add("is-active");
            data[key] = "admin";
            // Sure button click event listener
            sureBtn.addEventListener("click", async () => {
                model.classList.remove("is-active"); // Hide modal
                const result = await createData("head", data);
                if (result) {
                    new Notify({
                        status: "success",
                        title: "Admin Added successfully",
                        text: "",
                        autoclose: true,
                        autotimeout: 3000,
                        effect: "slide",
                        speed: 300,
                        position: "right bottom"
                    }).show();
                } else {
                    new Notify({
                        status: "error",
                        title: "Failed to add admin",
                        text: "",
                        autoclose: true,
                        autotimeout: 3000,
                        effect: "slide",
                        speed: 300,
                        position: "right bottom"
                    }).show();
                }
            });
        }
    });
});
console.clear();
console.log("%c   ⚠️  STOP! ⚠️   ", "color: #ff4136; font-size: 24px; font-weight: bold; padding: 10px 20px; border: 2px solid white; border-radius: 10px; animation: blinker 1s linear infinite;");
console.log("%cinnak: This is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature or hack someone's account, it is a SCAM and could compromise your data or security.", "font-size: 16px; font-weight: bold; color: #f00;");
console.log("%c👨‍💻 Developed by innak", "color: #f9a034; font-size: 18px; font-weight: bold;");
console.log("%c🔗 This page was developed by innak. For more information, visit: https://innak.com", "font-size: 14px; font-weight: bold; color: blue;");