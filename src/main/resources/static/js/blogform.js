$(document).ready(function () {

});

function postBlog() {
    var titleString = $("#formtitle");
    var slug = "testSlug";

    var blogRequest = {
        'slug': slug,
        'title': $("#formtitle").val(),
        'body': $("#formbody").val(),
        'poster': localStorage.getItem('username')
    };
    $.ajax({
        url: '/api/blog/add',
        type: "POST",
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(blogRequest),
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
        },
        success: function (result) {
            console.log("Successfully posted!");
        },
        error: function (xhr, resp, text) {
            console.log(xhr, resp, text);
        }
    })
}