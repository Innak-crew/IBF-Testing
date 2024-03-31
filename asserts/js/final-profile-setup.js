import {
    uploadImageToFirebase,
    uploadIDProofToFirebase,
    uploadResumeToFirebase,
    AuthUID,
    AuthEmail,
    AuthName,
    AuthProfileLink,
    getData,
    createData,
    updateData
} from "./auth.js";
import {
    GenerateIDCode
} from "./GenerateID.js"

window.addEventListener('DOMContentLoaded', function () {
    var avatar = document.getElementById('avatar');
    var name = document.getElementById('name');
    var image = document.getElementById('image');
    var input = document.getElementById('avatarInput');
    var role = document.getElementById("ibfrole");
    var email = document.getElementById("email");
    var idLoader = document.getElementById("id-loader");
    var perLoader = document.getElementById("pre-loader");
    var submitLoader = document.getElementById("submit-loader");
    var collegeIdProof = document.getElementById("collegeidproof");
    var uploadResumeField = document.getElementById("uploadResumeField");
    var myForm = document.getElementById("registrationForm");
    var $modal = $('#modal');
    var cropper;
    var IDProofUrl, ResumeUrl, fileName = ""

    let checkInterval = setInterval(() => {
        if (AuthEmail != "") {
            avatar.src = AuthProfileLink;
            email.value = AuthEmail;
            name.value = AuthName;
            perLoader.style.display = 'none';
            clearInterval(checkInterval);
        }
    }, 1000);

    input.addEventListener('change', function (e) {
        fileName = "";
        var files = e.target.files;
        fileName = files[0].name;
        var done = function (url) {
            input.value = '';
            image.src = url;
            $modal.modal('show');
        };
        var reader;
        var file;
        var url;

        if (files && files.length > 0) {
            file = files[0];

            if (URL) {
                done(URL.createObjectURL(file));
            } else if (FileReader) {
                reader = new FileReader();
                reader.onload = function (e) {
                    done(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    });

    $modal.on('shown.bs.modal', function () {
        cropper = new Cropper(image, {
            aspectRatio: 1,
            viewMode: 3,
        });
    }).on('hidden.bs.modal', function () {
        cropper.destroy();
        cropper = null;
    });

    function setRequiredAttributes(e, t) {
        e && e.querySelectorAll("input, select").forEach(function (e) {
            t ? e.setAttribute("required", t.toString()) : e.removeAttribute("required")
        })
    }

    document.getElementById('crop').addEventListener('click', function () {
        var initialAvatarURL;
        var canvas;
        $modal.modal('hide');
        if (cropper) {
            canvas = cropper.getCroppedCanvas({
                width: 400,
                height: 400,
            });
            initialAvatarURL = avatar.src;
            avatar.src = "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmdnbGY1YmF2MTl3N2lwZTJlamhpNHhuNWMwb3k2bDF5OGtqeDNxeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjI6SIIHBdRxXI40/giphy.gif";
            canvas.toBlob(async function (blob) {
                try {
                    const url = await uploadImageToFirebase(blob, fileName)
                    avatar.src = url;
                } catch {
                    avatar.src = initialAvatarURL;
                }
            });
        }
    });

    role.addEventListener("change", async e => {

        if (e.target.value === "Campus Ambassador") {
            uploadResumeField.style.display = "block",
                setRequiredAttributes(uploadResumeField, 1);
            var resumeLoader = document.getElementById("resume-loader");
            resume.addEventListener("change", async (e) => {
                if (role.value === "") {
                    e.target.value = "";
                    return new Notify({
                        status: "warning",
                        title: "Please select your role first.",
                        text: "",
                        autoclose: !0,
                        autotimeout: 3e3,
                        effect: "slide",
                        speed: 300,
                        position: "right bottom"
                    })
                }
                const files = e.target.files;
                var done = function (url) {
                    resumeLoader.style.display = "none";
                    window.location.href = "/profile.html"
                };
                if (files && files.length > 0) {
                    const file = files[0];
                    resumeLoader.style.display = "inline-block";
                    try {
                        const Url = await uploadResumeToFirebase(file, role.value + "/" + file.name);
                        ResumeUrl = Url;
                        done();
                    } catch (error) {
                        console.error('Error uploading Resume:', error);
                        resumeLoader.style.display = "none";
                        new Notify({
                            status: "error",
                            title: "Error on Uploading Resume File!",
                            text: "",
                            autoclose: !0,
                            autotimeout: 3e3,
                            effect: "slide",
                            speed: 300,
                            position: "right bottom"
                        })
                    }
                }
            });
        } else {
            uploadResumeField.style.display = "none";
            setRequiredAttributes(uploadResumeField, 0);
        }
    })

    collegeIdProof.addEventListener("change", async (e) => {
        if (role.value === "") {
            e.target.value = "";
            return new Notify({
                status: "warning",
                title: "Please select your role first.",
                text: "",
                autoclose: !0,
                autotimeout: 3e3,
                effect: "slide",
                speed: 300,
                position: "right bottom"
            })
        }
        const files = e.target.files;
        var done = function (url) {
            idLoader.style.display = "none";
        };
        if (files && files.length > 0) {
            const file = files[0];
            idLoader.style.display = "inline-block";
            try {
                const Url = await uploadIDProofToFirebase(file, role.value + "/" + file.name);
                IDProofUrl = Url;
                done();
            } catch (error) {
                console.error('Error uploading Resume:', error);
                idLoader.style.display = "none";
                new Notify({
                    status: "error",
                    title: "Error on Uploading ID Proof!",
                    text: "",
                    autoclose: !0,
                    autotimeout: 3e3,
                    effect: "slide",
                    speed: 300,
                    position: "right bottom"
                })
            }
        }
    });

    myForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (IDProofUrl === "") return new Notify({
            status: "warning",
            title: "Please Provide the ID Proof Image.",
            text: "",
            autoclose: !1,
            effect: "fade",
            position: "right bottom"
        })
        if (role.value == "Campus Ambassador") {
            if (ResumeUrl === "") return new Notify({
                status: "warning",
                title: "Please Provide the ID Proof Image.",
                text: "",
                autoclose: !1,
                effect: "fade",
                position: "right bottom"
            })
        }
        try {
            let membersCountsDetails = 0;
            submitLoader.style.display = "inline-block";
            let IDCode = "";
            if (role.value == "MemberShips") {
                membersCountsDetails = await getData("Counters/Members");
                IDCode = GenerateIDCode("MemberShips", membersCountsDetails.count + 1);
            }
            const formData = new FormData(myForm);
            const Data = {
                name: formData.get('fullname'),
                profileURL: avatar.src,
                email: email.value,
                role: formData.get('ibfrole'),
                collegeName: formData.get('collegename'),
                collegeShotName: formData.get("collegeshortname"),
                Mobile: formData.get("mobile"),
                dob: formData.get("dob"),
                gender: formData.get("gender"),
                address: formData.get("address"),
                bloodgroup: formData.get("bloodgroup"),
                resumeURL: ResumeUrl || "",
                IDProofURL: IDProofUrl,
                IDCode: IDCode,
                IDCardUrl: "",
                status: role.value == "MemberShips" ? "active" : "waiting"
            }

            const result = await createData(`Users/${AuthUID}`, Data);
            if (role.value == "MemberShips") {
                await createData(`MembersDetails/${AuthUID}`, Data);
            }
            if (result) {
                var type;
                if (role.value == "MemberShips") {
                    await updateData("Counters/Members", {
                        count: membersCountsDetails.count + 1
                    })
                    type = "member_registration";
                } else {
                    type = "ca_registration";
                }

                eNotify(Data.name, Data.email, type);

                new Notify({
                    status: "success",
                    title: "Profile Setup Completed",
                    text: "",
                    autoclose: !0,
                    autotimeout: 3e3,
                    effect: "slide",
                    speed: 300,
                    position: "right bottom"
                })
                submitLoader.style.display = "none";
                window.location.href = "/profile";
            } else {
                new Notify({
                    status: "error",
                    title: "Error On Profile Setup",
                    text: "",
                    autoclose: !0,
                    autotimeout: 3e3,
                    effect: "slide",
                    speed: 300,
                    position: "right bottom"
                })
                submitLoader.style.display = "none";
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

console.clear();
console.log("%c   ⚠️  STOP! ⚠️   ", "color: #ff4136; font-size: 24px; font-weight: bold; padding: 10px 20px; border: 2px solid white; border-radius: 10px; animation: blinker 1s linear infinite;");
console.log("%cinnak: This is a browser feature intended for developers. If someone told you to copy and paste something here to enable a feature or hack someone's account, it is a SCAM and could compromise your data or security.", "font-size: 16px; font-weight: bold; color: #f00;");
console.log("%c👨‍💻 Developed by innak", "color: #f9a034; font-size: 18px; font-weight: bold;");
console.log("%c🔗 This page was developed by innak. For more information, visit: https://innak.com", "font-size: 14px; font-weight: bold; color: blue;");