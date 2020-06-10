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

    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTableData tr:not(#header)").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
});

function addRow(name, species, shuMin, shuMax, origin, image) {
    var table = document.getElementById("myTableData");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    shuMin = numberWithCommas(shuMin);
    shuMax = numberWithCommas(shuMax);

    if(shuMin == "") {
        shuMin = "unknown";
    }else if(shuMax == "") {
        shuMax = "unknown";
    }

    var shuRange = shuMin + " - " + shuMax;

    if(shuMax=="unknown" && shuMin=="unknown"){
        shuRange = "unknown";
    }

    row.insertCell(0).innerHTML= '<img src="'+image+'" width=150/>'
    row.insertCell(1).innerHTML= name;
    row.insertCell(2).innerHTML= "Capsicum " + species;
    row.insertCell(3).innerHTML= shuRange;
    row.insertCell(4).innerHTML= origin;
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
