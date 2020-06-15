$(document).ready(function () {

    function checkLoggedIn() {
        $.ajax({
            url: "/api/test/user",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            },
            success: function (result) {
                console.log("Logged in!");
                hideAllMainPanels();
                loadDash();
                showDashboard();
            },
            error: function (xhr, resp, text) {
                console.log("Not logged in.");
                showLogin();
                console.log(xhr, resp, text);
            }
        })
    };
    checkLoggedIn();

    function storeJWT(data) {
        //var token = result.accessToken;
        console.log(data["accessToken"]);
        Cookies.set('accessToken', data["accessToken"], {expires: 1, path: '/', sameSite: 'lax'});
        Cookies.set('username', data["username"], {expires: 1, path: '/', sameSite: 'lax'});

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
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();
        // send ajax
        var loginRequest = {username: $("#username").val(), password: $("#password").val()};
        //console.log("loginRequest = " + loginRequest);
        //console.log("SFY " + JSON.stringify(loginRequest));
        $.ajax({
            url: '/api/auth/signin', // url where to submit the request
            type: "POST", // type of action POST || GET
            dataType: 'json', // data type
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(loginRequest), // post data || get data
            success: function (result) {
                //$("#loginDiv").hide();
                // you can see the result from the console
                // tab of the developer tools
                location.reload(true);
                storeJWT(result);
                console.log(result);
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    });

    $("#registerForm").on("submit", function (e) {
        e.preventDefault();
        // send ajax
        var signupRequest = {
            username: $("#signup_username").val(),
            email: $("#signup_email").val(),
            roles: [$("#signup_roles").val()],
            password: $("#signup_password").val()
        };

        console.log("signupRequest = " + signupRequest);
        console.log("SFY " + JSON.stringify(signupRequest));
        $.ajax({
            url: '/api/auth/signup', // url where to submit the request
            type: "POST", // type of action POST || GET
            dataType: 'json', // data type
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(signupRequest), // post data || get data
            success: function (result) {
                //$("#loginDiv").hide();
                // you can see the result from the console
                // tab of the developer tools
                console.log(result);
            },
            error: function (xhr, resp, text) {
                $(".errorField").html("");
                if (JSON.parse(xhr.responseText).errors != null) {
                    let field = JSON.parse(xhr.responseText).errors[0].field;
                    let errorMessage = JSON.parse(xhr.responseText).errors[0].defaultMessage;
                    if (field === "password") {
                        $("#error_password").html(errorMessage);
                    }
                    console.log(field + " has error: " + errorMessage);
                } else if (JSON.parse(xhr.responseText).message != null) {
                    let errorMessage = JSON.parse(xhr.responseText).message;
                    errorMessage = errorMessage.replace("Error: ", "");
                    let field = "";
                    if (errorMessage.includes("Email") || errorMessage.includes("email")) {
                        field = "email";
                    } else if (errorMessage.includes("Username") || errorMessage.includes("username")) {
                        field = "username";
                    }
                    if (field === "username") {
                        $("#error_username").html(errorMessage);
                    } else if (field === "email") {
                        $("#error_email").html(errorMessage);
                    }
                    console.log(field + " has error: " + errorMessage);
                }


            }
        })
    });

    $("#loginLink").on("click", function (e) {
        e.preventDefault();
        hideAllMainPanels();
        showLogin();
    });

    $("#registerLink").on("click", function (e) {
        e.preventDefault();
        hideAllMainPanels();
        $("#registerDiv").show();
    });

    $("#dashNav").on("click", function (e) {
        e.preventDefault();
        removeActiveNavs();
        $("#dashNav").addClass("active");
        $.ajax({
            url: "/dashboard",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            },
            success: function (result) {
                $("#dashboardDiv").html(result);
                hideAllMainPanels();
                showDashboard();
                var name = localStorage.getItem('username');
                $("#userdisplay").text(name);
                console.log(result);
            },
            error: function (xhr, resp, text) {
                if (xhr.status == 401) {
                    console.log(xhr.status);
                    showModal("Error Code: " + xhr.status, "Your login token has expired. Please log in.");
                }
                console.log(xhr, resp, text);
            }
        })
    });

    $("#dictionaryNav").on("click", function (e) {
        e.preventDefault();
        removeActiveNavs();
        $("#dictionaryNav").addClass("active");
        $.ajax({
            url: "/dictionary",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            },
            success: function (result) {
                $("#dashboardDiv").html(result);
                hideAllMainPanels();
                showDashboard();
                console.log(result);
            },
            error: function (xhr, resp, text) {
                if (xhr.status == 401) {
                    console.log(xhr.status);
                    showModal("Error Code: " + xhr.status, "Your login token has expired. Please log in.");
                }
                console.log(xhr, resp, text);
            }
        })
    });

    $("#contactNav").on("click", function (e) {
        e.preventDefault();
        removeActiveNavs();
        $("#contactNav").addClass("active");
        $.ajax({
            url: "/contact",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            },
            success: function (result) {
                $("#dashboardDiv").html(result);
                hideAllMainPanels();
                showDashboard();
                console.log(result);
            },
            error: function (xhr, resp, text) {
                if (xhr.status == 401) {
                    console.log(xhr.status);
                    showModal("Error Code: " + xhr.status, "Your login token has expired. Please log in.");
                }
                console.log(xhr, resp, text);
            }
        })
    });

    $("#profileNav").on("click", function (e) {
        e.preventDefault();
        removeActiveNavs();
        $("#profileNav").addClass("active");
        $.ajax({
            url: "/profile",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            },
            success: function (result) {
                $("#dashboardDiv").html(result);
                hideAllMainPanels();
                showDashboard();
                console.log(result);
            },
            error: function (xhr, resp, text) {
                if (xhr.status == 401) {
                    console.log(xhr.status);
                    showModal("Error Code: " + xhr.status, "Your login token has expired. Please log in.");
                }
                console.log(xhr, resp, text);
            }
        })
    });

    $("#logoutNav").on("click", function (e) {
        e.preventDefault();

        localStorage.clear();
        Cookies.remove('accessToken');
        Cookies.remove('userName');

        location.reload(true);
    });

    function loadDash() {
        $.ajax({
            url: "/dashboard",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            },
            success: function (result) {
                $("#dashboardDiv").html(result);
                hideAllMainPanels();
                showDashboard();
                var name = localStorage.getItem('username');
                $("#userdisplay").text(name);
                console.log(result);
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    };

    function hideAllMainPanels() {
        $(".mainPanels").hide();
    };

    function showDashboard() {
        $("#dashboardDiv").fadeIn();
        var name = localStorage.getItem('username');
        $(".userdisplay").text(name);
    };

    function showLogin() {
        $("#loginDiv").show();
    };

    function showDictionary() {
        $("#dictionaryDiv").show();
    };

    function showContact() {
        $("#contactDiv").show();
    };

    function showProfile() {
        $("#profileDiv").show();
        let name = localStorage.getItem('username');
        console.log(name);
        $("#profileUsername").text(name);
    };

    function removeActiveNavs() {
        $(".nav-link").removeClass("active");
        $(".nav-item").removeClass("active");
    };

    function showModal(modalHeader, modalDisplay) {
        $("#modalHeader").html(modalHeader);
        $("#error").html(modalDisplay);
        $("#closeButton").on("click", function (e) {
            e.preventDefault();
            location.reload(true);
        });
        $('#errorModal').modal("show");
    };

});