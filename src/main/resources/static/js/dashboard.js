$(document).ready(function () {
    var username = Cookies.get('username');
    $("#userdisplay").text(username);

    //API call to retrieve all blog posts in the database
    $.ajax({
        url: "/api/blog/",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
        },
        success: function (result) {
            loadPosts(result);
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    })

    /**
     * On the success of the ajax call, this function will add new blog posts for each in the database
     */
    function loadPosts(array) {
        for (var i = array.length - 1; i >= 0; i--) {
            var obj = array[i];

            var table = document.getElementById("dashboardTable");
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);

            row.insertCell(0).innerHTML = '<br><div class="card"><div class="card-header"><span class="blog-title">' + obj.title + '</span><span class="blog-author">u/' + obj.author + '</span><span class="blog-attributes"><span class="blog-date">' + obj.date + '</span></span></div><div class="card-body">' + obj.content + '<hr><a href="#" class="likeLink"><i class="fa fa-heart" aria-hidden="true"></i> Like (0)</a>&nbsp;&nbsp;&nbsp;<a href="#" onclick="openComments(\'' + obj.id + '\')" class="commentLink"><i class="fa fa-comments" aria-hidden="true"></i> Comments</a></div></div>';
        }
    }

    /**
     * When the new post button is clicked, it will open the form to post a new blog entry
     */
    $("#openBlogForm").on("click", function (e) {
        e.preventDefault();

        //API call to get the HTML for the blog form page
        $.ajax({
            url: "/blogform",
            type: "GET",
            beforeSend: function (xhr) {
                xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
            },
            success: function (result) {
                $("#dashboardDiv").html(result);
                hideAllMainPanels();
                showDashboard();
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

    /**
     * Hides the main panels
     * These panels are any HTML aside from the nav bar
     */
    function hideAllMainPanels() {
        $(".mainPanels").hide();
    }

    /**
     * This opens the "dashboard" div to view again
     *
     * This div is populated by different HTML as necessary and is the only HTML we want to display when
     * this is called
     */
    function showDashboard() {
        $("#dashboardDiv").fadeIn();
        var name = localStorage.getItem('username');
        $(".userdisplay").text(name);
    }

});

function openComments(id) {
    $.ajax({
        url: "/comments",
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
        },
        success: function (result) {
            $("#dashboardDiv").html(result);
            localStorage.setItem('currentPost', id);
            hideAllMainPanels();
            showDashboard();
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    })
}

/**
 * Hides the main panels
 * These panels are any HTML aside from the nav bar
 */
function hideAllMainPanels() {
    $(".mainPanels").hide();
}

/**
 * This opens the "dashboard" div to view again
 *
 * This div is populated by different HTML as necessary and is the only HTML we want to display when
 * this is called
 */
function showDashboard() {
    $("#dashboardDiv").fadeIn();
    var name = localStorage.getItem('username');
    $(".userdisplay").text(name);
}