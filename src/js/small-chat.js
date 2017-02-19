$(document).ready(function () {
    $('.chat-input').on('focus', function () {
        $('.small-chat--input').addClass('small-chat--input__focus');
    }).on('blur', function () {
        $('.small-chat--input').removeClass('small-chat--input__focus');
    });
});