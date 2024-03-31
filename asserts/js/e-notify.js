let apiKey = "helloworld";
let apiUrl = "https://script.google.com/macros/s/AKfycbxr5PmVYqn62jWOOUSsMU43uK2f5l-R5gC0VsbMtaqcCbM4eDqamJGohwwG7UmmG8CdDA/exec";

const eNotify = (name, email, type) => {
    const url = `${apiUrl}?name=${name}&email=${email}&email_type=${type}&api_key=${apiKey}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            handleResponse(data);
        })
        .catch(error => {
            console.error('Error:', error);
            new Notify({
                status: "error",
                title: "Error",
                text: "There was an error sending the mail.",
                autoclose: true,
                autotimeout: 3000,
                effect: "slide",
                speed: 300,
                position: "right bottom"
            });
        });
}

function handleResponse(data) {
    if (data.status == true) {
        new Notify({
            status: "success",
            title: "Mail Sent",
            text: "The mail has been successfully sent.",
            autoclose: true,
            autotimeout: 3000,
            effect: "slide",
            speed: 300,
            position: "right bottom"
        });
    } else {
        new Notify({
            status: "error",
            title: "Error",
            text: "There was an error sending the mail.",
            autoclose: true,
            autotimeout: 3000,
            effect: "slide",
            speed: 300,
            position: "right bottom"
        });
    }
}