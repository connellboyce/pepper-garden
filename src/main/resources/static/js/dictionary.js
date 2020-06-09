$(document).ready(function(){
    $.ajax({
        url: "http://localhost:9999/api/pepper/",
        type: "GET",
        beforeSend: function (xhr){
            xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
        },
        success : function(result) {
            console.log(result);
            for(var i = 0; i < result.length; i++) {
                var obj = result[i];
                addRow(obj.name, obj.species, obj.minSHU, obj.maxSHU, obj.origin, obj.imageURL);
            }
        },
        error : function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    })
});

function addRow(name, species, shuMin, shuMax, origin, image) {
    var table = document.getElementById("myTableData");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);
    row.insertCell(0).innerHTML= '<img src="'+image+'" width=150/>'
    row.insertCell(1).innerHTML= name;
    row.insertCell(2).innerHTML= "Capsicum " + species;
    row.insertCell(3).innerHTML= shuMin;
    row.insertCell(4).innerHTML= shuMax;
    row.insertCell(5).innerHTML= origin;
};

