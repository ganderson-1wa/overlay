$(function() {
    'use strict';

    function logError(data) {
        console.log("error", data);
    }

    var currentTimeRange = $('#current-time-range');
    var currentTimeInput = $('#current-time-input');
    var currentTimeButton = $('#current-time-button');


    // Create the player
    var player = new Vimeo.Player($('iframe'));
    window.demoPlayer = player;

    // Get the duration to set the range properly
    player.getDuration().then(function(duration) {
        currentTimeRange.prop('max', duration);
        currentTimeInput.prop('max', duration).prop('disabled', false);
        currentTimeButton.prop('disabled', false);
    }).catch(logError);

    player.on('seeked', function(data) {
        currentTimeRange.val(data.seconds);
    });

    currentTimeRange.on('change', function() {
        player.setCurrentTime($(this).val());
    });

    // Listen for timeupdate to update the time range input
    player.on('timeupdate', function(data) {
        currentTimeRange.val(data.seconds);
    });

    // Also update the time range input on seeked
    player.on('seeked', function(data) {
        currentTimeRange.val(data.seconds);
    });

    currentTimeButton.on('click', function() {
        player.setCurrentTime(currentTimeInput.val()).catch(function() {
            currentTimeInput.addClass('invalid');
        });
    });

    // Method buttons
    $('.js-methods').on('click', '.js-method', function() {
        var button = $(this);
        var method = button.attr('data-method');

        if (player[method]) {
            player[method]();
        }
    });

});

$('#zoom-00').bind('click', function () {
    var zoomLevel1 = $('.content-vimeo-zoom-01');
    var zoomLevel2 = $('.content-vimeo-zoom-02');
    var control1 = $('.controls-zoom-01');
    var control2 = $('.controls-zoom-02');
    
    if (zoomLevel1)
    zoomLevel1.removeClass('content-vimeo-zoom-01').addClass('content-vimeo');
    control1.removeClass('controls-zoom-01').addClass('controls');
    if (zoomLevel2)
    zoomLevel2.removeClass('content-vimeo-zoom-02').addClass('content-vimeo');
    control2.removeClass('controls-zoom-02').addClass('controls');
    
});

$('#zoom-01').bind('click', function () {
    var zoomLevel0 = $('.content-vimeo');
    var zoomLevel2 = $('.content-vimeo-zoom-02');
    var control0 = $('.controls');
    var control2 = $('.controls-zoom-02');
    
    if (zoomLevel0)
    zoomLevel0.removeClass('content-vimeo').addClass('content-vimeo-zoom-01');
    control0.removeClass('controls').addClass('controls-zoom-01');
    if (zoomLevel2)
    zoomLevel2.removeClass('content-vimeo-zoom-02').addClass('content-vimeo-zoom-01');
    control2.removeClass('controls-zoom-02').addClass('controls-zoom-01');
});

$('#zoom-02').bind('click', function () {
    var zoomLevel0 = $('.content-vimeo');
    var zoomLevel1 = $('.content-vimeo-zoom-01');
    var control0 = $('.controls');
    var control1 = $('.controls-zoom-01');
    
    if (zoomLevel0)
    zoomLevel0.removeClass('content-vimeo').addClass('content-vimeo-zoom-02');
    control0.removeClass('controls').addClass('controls-zoom-02');
    if (zoomLevel1)
    zoomLevel1.removeClass('content-vimeo-zoom-01').addClass('content-vimeo-zoom-02');
    control1.removeClass('controls-zoom-01').addClass('controls-zoom-02');

});

