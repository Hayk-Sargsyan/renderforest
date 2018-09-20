$(function() {
    $('#loginBtn').on('click', () => {
        let credentials = {
            email:  $('#email').val(),
            password: $('#password').val()
        };

        $.post('http://localhost:3000/authorization/signin', credentials, (data) => {
            window.location.href = data.redirect;
        });
    })
});