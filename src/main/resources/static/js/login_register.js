$(document).ready(function () {

    /**
     * Function to verify that the user has the minimum clearance
     *
     * If they do not, it will open the login menu
     * If they do, it will redirect to the dashboard
     */
    function checkLoggedIn() {
        $.ajax({
            url: "/api/test/user",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            },
            success: function (result) {
                hideAllMainPanels();
                loadDash();
                showDashboard();
            },
            error: function (xhr, resp, text) {
                showLogin();
                console.log(xhr, resp, text);
            }
        })
    }

    checkLoggedIn();

    /**
     * Stores data extracted from the JWT
     *
     * @param data JWT to be parsed
     */
    function storeJWT(data) {
        //var token = result.accessToken;
        console.log(data["accessToken"]);

        //Save these fields as cookies
        Cookies.set('accessToken', data["accessToken"], {expires: 1, path: '/', sameSite: 'lax'});
        Cookies.set('username', data["username"], {expires: 1, path: '/', sameSite: 'lax'});

        var token = data["accessToken"];
        var tokenType = data["tokenType"];
        var userEmail = data["email"];
        let username = data["username"];

        //Save these fields as local storage
        localStorage.setItem('token', token);
        localStorage.setItem('AuthorizationHeader', tokenType + " " + token);
        localStorage.setItem('username', username);
        localStorage.setItem('userEmail', userEmail);
    }

    /**
     * On click of the login button:
     *
     * Sends an API request to validate credentials
     * If successful, the app will store the JWT information
     * If unsuccessful, the app will open a modal window
     */
    $("#loginForm").on("submit", function (e) {
        e.preventDefault();
        var loginRequest = {username: $("#username").val(), password: $("#password").val()};
        $.ajax({
            url: '/api/auth/signin', // url where to submit the request
            type: "POST", // type of action POST || GET
            dataType: 'json', // data type
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(loginRequest), // post data || get data
            success: function (result) {
                location.reload(true);
                storeJWT(result);
                console.log(result);
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
                showModal("Login Failed", "Please try again...")
            }
        })
    });

    /**
     * On click of the register button:
     *
     * Sends an API request to add these credentials
     * If successful: user is added and redirected to login
     * If unsuccessful: error messages will display next to failed fields
     */
    $("#registerForm").on("submit", function (e) {
        e.preventDefault();
        // send ajax
        var signupRequest = {
            username: $("#signup_username").val(),
            email: $("#signup_email").val(),
            roles: [$("#signup_roles").val()],
            password: $("#signup_password").val()
        };

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
                console.log("Registered!");
                showModal("Registered!", "Log in to continue.")
                hideAllMainPanels();
                showLogin();
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
                    console.log(xhr, resp, text);
                    console.log(field + " has error: " + errorMessage);
                }


            }
        })
    });

    /**
     * Redirects to display Login form
     */
    $("#loginLink").on("click", function (e) {
        e.preventDefault();
        hideAllMainPanels();
        showLogin();
    });

    /**
     * Redirects to display Register form
     */
    $("#registerLink").on("click", function (e) {
        e.preventDefault();
        hideAllMainPanels();
        $("#registerDiv").show();
    });

    /**
     * Redirects to the dashboard when its nav bar link is clicked
     *
     * Also ensures that it is the only "lit up" option on the menu after success
     */
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

    /**
     * Redirects to the pepper dictionary when its nav bar link is clicked
     *
     * Also ensures that it is the only "lit up" option on the menu after success
     */
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

    /**
     * Redirects to the contact page when its nav bar link is clicked
     *
     * Also ensures that it is the only "lit up" option on the menu after success
     */
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

    /**
     * Redirects to the profile page when its nav bar link is clicked
     *
     * Also ensures that it is the only "lit up" option on the menu after success
     */
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

    /**
     * Logs the user out, invalidates the previous JWT, and returns the user to the login page
     */
    $("#logoutNav").on("click", function (e) {
        e.preventDefault();

        localStorage.clear();
        Cookies.remove('accessToken');
        Cookies.remove('userName');

        location.reload(true);
    });

    /**
     * Loads the dashboard upon successful login
     */
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
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    }

    /**
     * Hides all main panels
     *
     * These panels are any HTML that is not the nav bar
     */
    function hideAllMainPanels() {
        $(".mainPanels").hide();
    };

    /**
     * Shows the dashboard div, which has its HTML overwritten and changed to display the necessary components
     *
     * This div shows contact, profile, dictionary etc when asked to.
     */
    function showDashboard() {
        $("#dashboardDiv").fadeIn();
        var name = localStorage.getItem('username');
        $(".userdisplay").text(name);
    };

    /**
     * Opens the login/register forms
     */
    function showLogin() {
        $("#loginDiv").show();
    }

    /**
     * Un-highlights all nav bar items
     */
    function removeActiveNavs() {
        $(".nav-link").removeClass("active");
        $(".nav-item").removeClass("active");
    };

    /**
     * Opens a modal window to display a message
     *
     * @param modalHeader Modal window title
     * @param modalDisplay Modal window message
     */
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

