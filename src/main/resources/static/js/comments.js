$(document).ready(function () {
  $.ajax({
      url: "/api/blog/" + localStorage.getItem('currentPost'),
      type: "GET",
      beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
      },
      success: function (result) {
          //Fill in the fields with the information
          console.log(localStorage.getItem('currentPost'));
          console.log(result);
          $(".blog-title").html(result.title);
          $(".blog-author").html(result.author);
          $(".blog-date").html(result.date);
          $(".blog-content").html(result.content);
          loadComments(result.comments);
      },
      error: function (xhr, resp, text) {
          console.log(xhr, resp, text);
      }
  })

  function loadComments(comments) {
      for (var i = comments.length - 1; i >= 0; i--) {
          var obj = comments[i];

          var table = document.getElementById("commentTable");
          var rowCount = table.rows.length;
          var row = table.insertRow(rowCount);

          row.insertCell(0).innerHTML = obj;
      }
  }

  $("#commentButton").on("click", function(e) {
      var commentText = $("#commentContent").val();
      var commentRequest = {'commentBody' : '<br><div class="card" style="width: 100%"><div class="card-body">u/' + localStorage.getItem('username') + '<br><hr>' + commentText + '</div></div>'};

      console.log(localStorage.getItem('currentPost'));

      $.ajax({
          url: '/api/blog/comment/' + localStorage.getItem('currentPost'),
          type: "POST",
          dataType: 'json',
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(commentRequest),
          beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', localStorage.getItem('AuthorizationHeader'));
          },
          success: function (result) {
              console.log("Successfully posted!");
              var table = document.getElementById("commentTable");
              var rowCount = table.rows.length;
              var row = table.insertRow(0);

              row.insertCell(0).innerHTML = '<br><div class="card" style="width: 100%"><div class="card-body">u/' + localStorage.getItem('username') + '<br><hr>' + commentText + '</div></div>';
          },
          error: function (xhr, resp, text) {
              console.log(xhr, resp, text);
          }
      })
  })
})
