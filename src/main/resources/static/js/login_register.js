$(document).ready(function(){
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
                        console.log(result);
                    },
                    error: function(xhr, resp, text) {
                        console.log(xhr, resp, text);
                    }
                })
            });

            $("#registrationLink").on("click", function(e) {
                e.preventDefault();
                $("#registerDiv").hide();
                $("#loginDiv").show();
            });

            $("#loginLink").on("click", function(e) {
                e.preventDefault();
                $("#loginDiv").hide();
                $("#registerDiv").show();
             });
        });