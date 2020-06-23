$(document).ready(function () {

    console.log("Loading dashboard script");

    $.ajax({
        url: "/api/pepper/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        },
        success: function (result) {
            loadTable(result);
            $("#dictionaryDiv").fadeIn();
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    })

    function loadTable(result) {
        for (var i = 0; i < result.length; i++) {
            var obj = result[i];
            addRow(obj.name, obj.species, obj.minSHU, obj.maxSHU, obj.origin, obj.imageURL, obj.description, obj.id);
        }

    };


    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTableData tr:not(#header)").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    $('[data-toggle="tooltip"]').tooltip();
    var actions = $("table td:last-child").html();
    // Append table with add row form on add new button click
    $(".add-new").click(function () {
        $(this).attr("disabled", "disabled");
        var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td><input type="text" class="form-control" name="name" id="name"></td>' +
            '<td><input type="text" class="form-control" name="department" id="department"></td>' +
            '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
            '<td>' + actions + '</td>' +
            '</tr>';
        $("table").append(row);
        $("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
    // Add row on add button click
    $(document).on("click", ".add", function () {
        var empty = false;
        var input = $(this).parents("tr").find('input[type="text"]');
        input.each(function () {
            if (!$(this).val()) {
                $(this).addClass("error");
                empty = true;
            } else {
                $(this).removeClass("error");
            }
        });
        $(this).parents("tr").find(".error").first().focus();
        if (!empty) {
            input.each(function () {
                $(this).parent("td").html($(this).val());
            });
            $(this).parents("tr").find(".add, .edit").toggle();
            $(".add-new").removeAttr("disabled");
        }
    });
    // Edit row on edit button click
    $(document).on("click", ".edit", function () {
        $(this).parents("tr").find("td:not(:last-child)").each(function () {
            $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        });
        $(this).parents("tr").find(".add, .edit").toggle();
        $(".add-new").attr("disabled", "disabled");
    });
    // Delete row on delete button click
    $(document).on("click", ".delete", function () {
        $(this).parents("tr").remove();
        $(".add-new").removeAttr("disabled");
    });


    function addRow(name, species, shuMin, shuMax, origin, image, description, id) {
        var table = document.getElementById("myTableData");
        var rowCount = table.rows.length;
        var row = table.insertRow(rowCount);

        if (shuMin != null) {
            shuMin = numberWithCommas(shuMin);
        }
        if (shuMax != null) {
            shuMax = numberWithCommas(shuMax);
        }

        if (shuMin == "") {
            shuMin = "unknown";
        } else if (shuMax == "") {
            shuMax = "unknown";
        }

        var shuRange = shuMin + " - " + shuMax;

        if (shuMax == "unknown" && shuMin == "unknown") {
            shuRange = "unknown";
        }

        row.insertCell(0).innerHTML = '<span class="image"><img src="' + image + '" width=150/></span>'
        row.insertCell(1).innerHTML = name;
        row.insertCell(2).innerHTML = "Capsicum " + species;
        row.insertCell(3).innerHTML = shuRange;
        row.insertCell(4).innerHTML = origin;
        row.insertCell(5).innerHTML = '<button pepperID="' + id + '" class="btn btn-info view" onclick="openPepperView(\'' + id + '\')">View</button>';
    };


    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

});

function openPepperView(id) {
    $.ajax({
        url: "/pepperdetails",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        },
        success: function (result) {
            $("#dashboardDiv").html(result);
            localStorage.setItem('currentPepper', id);
        },
        error: function (xhr, resp, text) {
            if (xhr.status == 401) {
                console.log(xhr.status);
                showModal("Error Code: " + xhr.status, "Your login token has expired. Please log in.");
            }
            console.log(xhr, resp, text);
        }
    })
}

function showModal(modalHeader, modalDisplay) {
    $("#modalHeader").html(modalHeader);
    $("#error").html(modalDisplay);
    $("#closeButton").on("click", function (e) {
        e.preventDefault();
        location.reload(true);
    });
    $('#errorModal').modal("show");
}