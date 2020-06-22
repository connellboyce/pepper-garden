$(document).ready(function(){
    var username = Cookies.get('username');
    $("#userdisplay").text(username);

    console.log("got here");
    $.ajax({
        url: "/api/blog/",
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        },
        success: function(result) {
            loadPosts(result);
            console.log(result);
        },
        error: function(xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    })

    function loadPosts(array) {
        for (var i = array.length-1; i >= 0; i--) {
            var obj = array[i];

            var table = document.getElementById("dashboardTable");
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);

            row.insertCell(0).innerHTML = '<br><div class="card"><div class="card-header"><h4>'+obj.title+'</h4><p>User: '+obj.poster+' - '+obj.date+'</p></div><div class="card-body">'+obj.body+'</div></div>';
        }
    }

    $("#openBlogForm").on("click", function (e) {
        e.preventDefault();
        $.ajax({
            url: "/blogform",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
                xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            },
            success: function (result) {
                $("#dashboardDiv").html(result);
                hideAllMainPanels();
                showDashboard();
                console.log(result);
            },
            error: function (xhr, resp, text) {
                if (xhr.status == 401) {
                    console.log(xhr.status);
                    showModal("Error Code: " + xhr.status, "Your login token has expired. Please log in.");
                }
                console.log(xhr, resp, text);
            }
        })
    });

    function showModal(modalHeader, modalDisplay) {
        $("#modalHeader").html(modalHeader);
        $("#error").html(modalDisplay);
        $("#closeButton").on("click", function (e) {
            e.preventDefault();
            location.reload(true);
        });
        $('#errorModal').modal("show");
    };

    function hideAllMainPanels() {
        $(".mainPanels").hide();
    };

    function showDashboard() {
        $("#dashboardDiv").fadeIn();
        var name = localStorage.getItem('username');
        $(".userdisplay").text(name);
    };
});