const User = require('../app/models/users.js');
const Bar = require('../app/models/bars.js');

$(document).ready(function() {
    $('.send-rsvp').on('click', function() {
        const barDiv = $(this).parent().parent().find('.bar-url');
        $(barDiv).css("color", "red");
        if ($(this).hasClass('fa-envelope-open')) {
            $(this).removeClass('fa-envelope-open');
            $(this).addClass('fa-envelope');
            //Bar.findOneAndUpdate({})
        } else if ($(this).hasClass('fa-envelope')) {
            $(this).removeClass('fa-envelope');
            $(this).addClass('fa-envelope-open');
        }
    })
});