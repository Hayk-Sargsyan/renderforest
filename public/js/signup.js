$(function() {
   $('#signup').on('click', () => {
       let credentials = {
           email:  $('#email').val(),
           password: $('#password').val(),
           confirmPass: $('#confirmPass').val()
       };

       return $.post('http://localhost:3000/authorization/signup', credentials, (data) => {
           window.location.href = data.redirect;
       });
   })
});