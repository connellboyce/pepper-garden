$(document).ready(function(){
    var username = Cookies.get('username');
    $("#userdisplay").text(username);

    console.log("got here");
    $.ajax({
        url: "http://localhost:9999/api/blog/",
        type: "GET",
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
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
        for (var i = 0; i < array.length; i++) {
            var obj = array[i];

            var table = document.getElementById("dashboardTable");
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);

            row.insertCell(0).innerHTML = '<br><div class="card"><div class="card-header">'+obj.title+'</div><div class="card-body">'+obj.body+'</div></div>';
        }
    }
});