var headerVideo = (function ($, document) {

    var settings = {
        container: $('.header-container'),
        header: $('.header-container--media'),
        videoTrigger: $("#video-trigger"),
        autoPlayVideo: false
    };

    var init = function(options){
        settings = $.extend(settings, options);
        getVideoDetails();
        setFluidContainer();
        bindClickAction();

        if(videoDetails.teaser) {
            appendTeaserVideo();
        }

        if(settings.autoPlayVideo) {
            appendFrame();
        }
    };

    var getVideoDetails = function() {
        videoDetails = {
            id: settings.header.attr('data-video-src'),
            teaser: settings.header.attr('data-teaser-source'),
            provider: settings.header.attr('data-provider').toLowerCase(),
            videoHeight: settings.header.attr('data-video-height'),
            videoWidth: settings.header.attr('data-video-width')
        };
        return videoDetails;
    };

    var setFluidContainer = function () {

        settings.container.data('aspectRatio', videoDetails.videoHeight / videoDetails.videoWidth);

        $(window).resize(function(){
            var winWidth = $(window).width(),
                winHeight = $(window).height();

            settings.container
                .width(winWidth)
                .height(winWidth * settings.container.data('aspectRatio'));

            if(winHeight < settings.container.height()) {
                settings.container
                    .width(winWidth)
                    .height(winHeight);
            }

        }).trigger('resize');

    };

    var bindClickAction = function() {
        settings.videoTrigger.on("click", function(e) {
            e.preventDefault();
            appendFrame();
        });
    };

    var appendTeaserVideo = function() {
        if(Modernizr.video && !isMobile()) {
            var source = videoDetails.teaser,
                html = '<video autoplay="true" loop="loop" muted id="teaser-video" class="teaser-video"><source src="'+source+'.mp4" type="video/mp4"><source src="'+source+'.ogv" type="video/ogg"></video>';
            settings.container.append(html);
        }
    };

    var createFrame = function() {
        var html = '';
        if(videoDetails.provider === 'youtube') {
            html = '<iframe src="//www.youtube.com/embed/'+videoDetails.id+'?rel=0&amp;hd=1&autohide=1&showinfo=0&autoplay=1&enablejsapi=1&origin=*" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        }
        else if(videoDetails.provider === 'vimeo') {
            html = '<iframe src="//player.vimeo.com/video/'+videoDetails.id+'?title=0&amp;byline=0&amp;portrait=0&amp;color=3d96d2&autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
        }
        else if(videoDetails.provider === 'html5') {
            html = '<video autoplay="true" loop="loop" id="video"><source src="'+videoDetails.id+'.mp4" type="video/mp4"><source src="'+videoDetails.id+'.ogv" type="video/ogg"></video>';
        }
        return html;
    };

    var appendFrame = function() {
        settings.header.hide();
        settings.container.append(createFrame());
        removePlayButton();
        $('#teaser-video').hide();
    };

    var removePlayButton = function () {
        if(settings.videoTrigger) {
            settings.videoTrigger.fadeOut('slow');
        }
    };

    var isMobile = function () {
        if($(window).width() < 900 && Modernizr.touch) {
            return true;
        }
        else {
            return false;
        }

    };

    return {
        init: init
    };

})(jQuery, document);