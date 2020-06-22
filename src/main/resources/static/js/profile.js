$(document).ready(function() {
    var userID;
    var zipCode = $("#zipCode-input");
    var hardinessZone = $("#hardinessZone-input");
    var returnableDescription = $("#description-input");
    var unfilteredDescription = $("#unfiltered-description-input");
    var updateButton = $("#updateProfileButton");

    populateFields();
    function populateFields() {
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
                $.ajax({
                    url: "/api/profiles/" + userID,
                    type: "GET",
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
                    },
                    success: function (result) {
                        console.log(result)
                        zipCode.val(result.zipCode);
                        hardinessZone.val(result.hardinessZone);
                        unfilteredDescription.val(result.description);
                        $("#profilePicture").html('<img src="' + result.image.data + '" alt="Profile Picture">');
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

    $("#image-input").on("change", function(e) {
        e.preventDefault();
        updateButton.prop('disabled', false);
    })

    zipCode.on("change", function() {
        updateButton.prop('disabled', false);
    })

    hardinessZone.on("change", function() {
        updateButton.prop('disabled', false);
    })

    unfilteredDescription.on("change", function() {
        updateButton.prop('disabled', false);
    })

    $("#closeEdit").on("click", function(e) {
        $("#editProfile").hide();
        $("#viewProfile").show();
    })

    $("#openEdit").on("click", function(e) {
        $("#editProfile").show();
        $("#viewProfile").hide();
    })

    updateButton.on("click", function(e) {
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
                $("#editProfile").hide();
                $("#viewProfile").show();
                populateFields();
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        });
    })

    zipCode.on("blur", function(e) {
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
