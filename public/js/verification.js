$(function() {
    const answer = $('#answer');
    const answerBtn = $('#answerBtn');
    const message = $('#message');

    $.get('http://localhost:3000/verification/question', (data) => {
        $('#container').text(data);

        answerBtn.on('click', () => {
            message.text('');

            const val = answer.val();

            if (val) {
                return $.post('http://localhost:3000/verification', { answer: val }, (data) => {
                    message.text(data);
                });
            }

            message.text('add answare');
        })
    });
});