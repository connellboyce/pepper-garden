$(document).ready(function(){

    function storeJWT(data) {
        //var token = result.accessToken;
        console.log(data["accessToken"]);
        Cookies.set('accessToken', data["accessToken"], { expires: 1, path: '/', sameSite: 'lax'});
        Cookies.set('username', data["username"], { expires: 1, path: '/', sameSite: 'lax'});

        var token = data["accessToken"];
        var tokenType = data["tokenType"];
        var userEmail = data["email"];
        let username = data["username"];

        localStorage.setItem('token', token);
        localStorage.setItem('AuthorizationHeader', tokenType + " " + token);
        localStorage.setItem('username', username);
        localStorage.setItem('userEmail', userEmail);
    };

    // click on button submit
    $("#loginForm").on("submit", function(e){
        e.preventDefault();
        // send ajax
        var loginRequest={username: $("#username").val(), password: $("#password").val()};
        //console.log("loginRequest = " + loginRequest);
        //console.log("SFY " + JSON.stringify(loginRequest));
        $.ajax({
            url: '/api/auth/signin', // url where to submit the request
            type : "POST", // type of action POST || GET
            dataType : 'json', // data type
            contentType:"application/json; charset=utf-8",
            data : JSON.stringify(loginRequest), // post data || get data
            success : function(result) {
                //$("#loginDiv").hide();
                // you can see the result from the console
                // tab of the developer tools
                storeJWT(result);
                console.log(result);
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    });

    $("#registerForm").on("submit", function(e){
        e.preventDefault();
        // send ajax
        var signupRequest={username: $("#signup_username").val(), email: $("#signup_email").val(), roles: [$("#signup_roles").val()], password: $("#signup_password").val()};
        console.log("signupRequest = " + signupRequest);
        console.log("SFY " + JSON.stringify(signupRequest));
        $.ajax({
            url: '/api/auth/signup', // url where to submit the request
            type : "POST", // type of action POST || GET
            dataType : 'json', // data type
            contentType:"application/json; charset=utf-8",
            data : JSON.stringify(signupRequest), // post data || get data
            success : function(result) {
                //$("#loginDiv").hide();
                // you can see the result from the console
                // tab of the developer tools
                console.log(result);
            },
            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    });

    $("#loginLink").on("click", function(e) {
        e.preventDefault();
        hideAllMainPanels();
        $("#loginDiv").show();
    });

    $("#registerLink").on("click", function(e) {
        e.preventDefault();
        hideAllMainPanels();
        $("#registerDiv").show();
    });

    $("#dashNav").on("click", function(e) {
        e.preventDefault();
        $.ajax({
            url: "/dashboard",
            type: "GET",
            beforeSend: function (xhr){
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            },
            success : function(result) {
                $("#dashboardDiv").html(result);
                hideAllMainPanels();
                $("#dashboardDiv").show();
                var name = localStorage.getItem('username');
                $("#userdisplay").text(name);
                console.log(result);
            },
            error : function(xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    });

    function hideAllMainPanels() {
        $(".mainPanels").hide();
    };
});