$(document).ready(function(){
    var username = Cookies.get('username');
    $("#userdisplay").text(username);
});