$(document).ready(function(){
    $.ajax({
                            url: "/api/pepper/" + localStorage.getItem('currentPepper'),
                            type: "GET",
                            beforeSend: function (xhr){
                                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
                            },
                            success : function(result) {
                                $("#pepperImage").html('<img src="'+result.imageURL+'" style="width: 400px"/>')
                                $("#pepperName").html('<b>'+result.name+'</b');
                                $("#pepperSpecies").html("Capsicum " + result.species);
                                $("#pepperScoville").html(result.minSHU + "-" + result.maxSHU);
                                $("#pepperOrigin").html(result.origin);
                                $("#pepperDescription").html(result.description);
                                $("#detailDiv").show();
                            },
                            error : function(xhr, resp, text) {
                                if (xhr.status == 401) {
                                    console.log(xhr.status);
                                    showModal("Error Code: " + xhr.status, "Your login token has expired. Please log in.");
                                }
                                console.log(xhr, resp, text);
                            }
                        })

});