$(document).ready(function () {
    //API call to get a pepper by id
    $.ajax({
        url: "/api/pepper/" + localStorage.getItem('currentPepper'),
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
        },
        success: function (result) {
            //Fill in the fields with the information for the requested pepper
            $("#pepperImage").html('<img src="' + result.imageURL + '" style="width: 400px"/>')
            $("#pepperName").html('<b>' + result.name + '</b');
            $("#pepperSpecies").html("Capsicum " + result.species);
            $("#pepperScoville").html(result.minSHU.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "-" + result.maxSHU.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
            $("#pepperOrigin").html(result.origin);
            $("#pepperDescription").html(result.description);
            $("#detailDiv").fadeIn();
        },
        error: function (xhr, resp, text) {
            if (xhr.status == 401) {
                showModal("Error Code: " + xhr.status, "Your login token has expired. Please log in.");
            }
            console.log(xhr, resp, text);
        }
    })

});