$(document).ready(function() {
    $('.send-rsvp').on('click', function() {
        if ($(this).hasClass('fa-envelope-open')) {
            $(this).removeClass('fa-envelope-open');
            $(this).addClass('fa-envelope');
        } else if ($(this).hasClass('fa-envelope')) {
            $(this).removeClass('fa-envelope');
            $(this).addClass('fa-envelope-open');
        }
    })
});