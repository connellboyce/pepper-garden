$(document).ready(function () {

    //API call to get all peppers from the database
    $.ajax({
        url: "/api/pepper/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
        },
        success: function (result) {
            loadTable(result);
            $("#dictionaryDiv").fadeIn();
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    })

    /**
     * Load table of peppers to the pepper dictionary
     *
     * @param result the pepper list from the API call above
     */
    function loadTable(result) {
        //Iterate through each pepper
        for (var i = 0; i < result.length; i++) {
            //Add each pepper to the table as a row
            var obj = result[i];
            addRow(obj.name, obj.species, obj.minSHU, obj.maxSHU, obj.origin, obj.imageURL, obj.description, obj.id);
        }

    }

    /**
     * Search bar functionality
     * On new key input, function runs to hide all table items that do not match the search
     */
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTableData tr:not(#header)").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });

    /**
     * Adds a new row to the dictionary table
     *
     * @param name Pepper name
     * @param species Capsicum variety
     * @param shuMin minimum Scoville units
     * @param shuMax maximum Scoville units
     * @param origin country/continent of origin
     * @param image picture of the pepper
     * @param description short anecdote about the pepper
     * @param id pepper's database reference id which is not actually displayed
     */
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


    /**
     * Format large numbers to have commas for easier reading
     *
     * @param x number to be reformatted
     * @returns {string} number with commas in correct places
     */
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
});


/**
 * Opens a page with more details about a selected pepper
 *
 * @param id pepper's database reference id
 */
function openPepperView(id) {
    //Call to get the HTML for the pepperdetails page
    $.ajax({
        url: "/pepperdetails",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
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
}