$(function() {
    const imgUpload = $('#img').uploadFile({
        url:'/profile/me/img',
        fileName:'avatar',
        acceptFiles:'image/*',
        showPreview:true,
        previewHeight: '100px',
        previewWidth: '100px',
        autoSubmit: false,
        dataType: 'json',
    });

   $('#upload').on('click', () => {
       const name = $('#name').val();

       imgUpload.startUpload();

       $.ajax({
           url: 'http://localhost:3000/profile/me',
           type: 'PUT',
           data: { name },
           success: function(result) {
           }
       });
   });

   $('#logout').on('click', () => {
       $.post('http://localhost:3000/authorization/signout', (data) => {
           window.location.href = data.redirect;
       })
   })
});