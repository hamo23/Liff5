window.onload = function() {
    const useNodeJS = false; // if you are using Node.js server
    const defaultLiffId = "2005169635-qZGKOGL4"; // replace with your LIFF ID

    let myLiffId = "";

    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                console.log(error);
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};

function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        console.log('LIFF ID not found');
    } else {
        initializeLiff(myLiffId);
    }
}

function initializeLiff(myLiffId) {
    liff.init({
        liffId: myLiffId
    })
    .then(() => {
        // Start to use LIFF's API
        document.getElementById('liff-login').addEventListener('click', () => {
            if (!liff.isLoggedIn()) {
                liff.login();
            } else {
                alert('You are already logged in.');
            }
        });
    })
    .catch((err) => {
        console.log('LIFF Initialization failed ', err);
    });
}
