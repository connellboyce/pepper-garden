$(document).ready(function () {
    var userID;
    var zipCode = $("#zipCode-input");
    var hardinessZone = $("#hardinessZone-input");
    var returnableDescription = $("#description-input");
    var unfilteredDescription = $("#unfiltered-description-input");
    var updateButton = $("#updateProfileButton");

    populateFields();

    /**
     * Populates the fields of the profile with the existing user profile information
     * Will not add anything to the fields if no user profile fields are filled
     */
    function populateFields() {
        //API call to get user by username
        $.ajax({
            url: "/api/auth/get/" + localStorage.getItem('username'),
            type: "GET",
            beforeSend: function (xhr) {
                $("#zipCode-input").blur();
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            },
            success: function (result) {
                userID = result;
                $("#id-input").val(userID);
                returnableDescription.val($.trim(unfilteredDescription.val()));

                //On success, use the acquired id to retrieve more information to fill the fields
                $.ajax({
                    url: "/api/profiles/" + userID,
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
                    },
                    success: function (result) {
                        zipCode.val(result.zipCode);
                        hardinessZone.val(result.hardinessZone);
                        unfilteredDescription.val(result.description);
                        $("#profilePicture").html('<img src="data:image/png;base64,' + result.image.data + '"height="200px" width="200px" alt="Profile Picture">');
                        $("#profileZipCode").html(result.zipCode);
                        $("#profileZone").html(result.hardinessZone);
                        $("#profileDescription").html(result.description);
                    },
                    error: function (xhr, resp, text) {
                        console.log(xhr, resp, text);
                    }
                })
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    }

    /**
     * Functions to enable the update button on any changes
     */
    $("#image-input").on("change", function (e) {
        e.preventDefault();
        updateButton.prop('disabled', false);
    })
    zipCode.on("change", function () {
        updateButton.prop('disabled', false);
    })
    hardinessZone.on("change", function () {
        updateButton.prop('disabled', false);
    })
    unfilteredDescription.on("change", function () {
        updateButton.prop('disabled', false);
    })

    /**
     * Close the edit menu and open the view
     */
    $("#closeEdit").on("click", function (e) {
        $("#editProfile").hide();
        $("#viewProfile").show();
    })

    /**
     * Close the view and open the edit menu
     */
    $("#openEdit").on("click", function (e) {
        $("#editProfile").show();
        $("#viewProfile").hide();
    })

    /**
     * On click of the update button, send the information to the database
     */
    updateButton.on("click", function (e) {
        returnableDescription.val(unfilteredDescription.val());
        $.ajax({
            url: "/api/profiles/profile/add",
            type: "POST",
            data: new FormData($("#profileForm")[0]),
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            },
            success: function (result) {
                console.log("Success");
                $("#updateProfileButton").prop('disabled', true);

                //Closes the edit menu and opens the view again
                $("#editProfile").hide();
                $("#viewProfile").show();
                populateFields();
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    })

    /**
     * When the user navigates away from the zip code field after populating it this will run
     *
     * This calls the local API which consumes an external API to find hardiness zone based on
     * provided zip code
     */
    zipCode.on("blur", function (e) {
        e.preventDefault();
        let currentZipCode = $("#zipCode-input").val();
        if (currentZipCode != "") {
            $.ajax({
                url: "/api/hardinesszone/zipcode/" + currentZipCode,
                type: "GET",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
                },
                success: function (result) {
                    $("#hardinessZone-input").val(result.zone);
                },
                error: function (xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            })
        }
    })
});
