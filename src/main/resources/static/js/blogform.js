/**
 * Posts a blog entry
 */
function postBlog() {
    var titleString = $("#title").val();
    var slug = "testSlug";

    //Create a blog request object
    var blogRequest = {
        'title': titleString,
        'content': $("#content").val(),
        'author': localStorage.getItem('username')
    };
    console.log(blogRequest);

    //API call to post this blog entry to the blog database
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