function sendPostRequest(url, data) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            console.log(xhttp.responseText);
        }
    };
    xhttp.send(data);
    return xhttp.responseText;
}

export function getUserType() {
    var user_id = localStorage.getItem('user_id');
    const api = "http://localhost:5000/userType";
    var data = JSON.stringify(
        {
            user_id: user_id
        }
    );
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", api, true);
    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var response = xhttp.responseText;
            console.log(xhttp.responseText);
            response = JSON.parse(response);
            var accounttype = response['account_type'];
            console.log(accounttype);
            return accounttype;
        }
    };
    xhttp.send(data);
}