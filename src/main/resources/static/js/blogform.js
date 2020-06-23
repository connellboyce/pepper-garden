/**
 * Posts a blog entry
 */
function postBlog() {
    var titleString = $("#formtitle");
    var slug = "testSlug";

    //Create a blog request object
    var blogRequest = {
        'slug': slug,
        'title': titleString,
        'body': $("#formbody").val(),
        'poster': localStorage.getItem('username')
    };

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