$(document).ready(function() {
    $("#image-input").on("change", function(e) {
        e.preventDefault();
        $("#updateProfileButton").prop('disabled', false);
    })

    $("#zipCode-input").on("change", function() {
        $("#updateProfileButton").prop('disabled', false);
    })

    $("#hardinessZone-input").on("change", function() {
        $("#updateProfileButton").prop('disabled', false);
    })

    $("#description-input-input").on("change", function() {
        $("#updateProfileButton").prop('disabled', false);
    })


    $("#updateProfileButton").on("click", function(e) {
        var userID = null;
        $.ajax({
            url: "/api/auth/get/"+localStorage.getItem('username'),
            type: "GET",
            beforeSend: function (xhr) {
                $("#zipCode-input").blur();
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            },
            success: function (result) {
                userID = result;
                $("#id-input").val(userID);
                $("#description-input").val($.trim($("#unfiltered-description-input").val()))
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
                    },
                    error: function (xhr, resp, text) {
                        console.log(xhr, resp, text);
                    }
                });
            },
            error: function (xhr, resp, text) {
                console.log(xhr, resp, text);
            }
        })
    })

    $("#zipCode-input").on("blur", function(e) {
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
