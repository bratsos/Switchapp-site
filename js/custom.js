$(function() {
    WebFont.load({
        google: {
            families: ['Roboto:100,300,400,700,900&amp;subset=greek']
        }
    })

    //Cache

    $downloadBtn = $('.download-btn')
    $logo = $('.logo')
    $heroContent = $('.hero-content-align')
    $body = $('body')
    $sliderIntro = $('.slider-intro')
    $bugReport = $('.bug-btn')
    $featureRequest = $('.feature-btn')
    $closeModal = $('.close-btn')
    $submitBug = $('.bug-report-wrapper .submit-bug')
    $submitFeature = $('.feature-request-wrapper .submit-feature')
    $bugTitle = $('#bug-title')
    $bugBody = $('#bug-body')
    $featureBody = $('#feature-body')
    $featureTitle = $('#feature-title')
    $notificationMessage = $('.notification-message')
    $contactBtn = $('.contact-btn')
    $contactSection = $('.contact-section')
    $olderVersionsBtn = $('.older-versions-btn')

    //Init

    getLatestReleaseUrl()
    sliderIntro()
    initModals()
    scrollToContact()

    function scrollToContact() {
        var contactFromTop = $contactSection.offset().top
        $contactBtn.click(function() {
            $body.animate({scrollTop: contactFromTop}, 500)
        })
    }

    function initModals() {
        modalBugReport()
        modalFeatureRequest()
        modalOlderVersions()
    }

    function modalOlderVersions() {
        $olderVersionsBtn.click(function() {
            $body.addClass('open older-versions')
        })
    }

    function modalBugReport() {
        $bugReport.click(function() {
            $body.addClass('open bug-report')
        })

        $submitBug.click(function(e) {
            e.preventDefault()
            if ($bugBody.val().length > 0 && $bugTitle.val().length > 0) {
                $.post(
                    window.location.protocol + '//' + window.location.hostname + ':8080/issue',
                     {
                        title: $bugTitle.val(),
                        body: $bugBody.val(),
                        type: 'bug'               
                    }
                )
                $bugTitle.val('')
                $bugBody.val('')
                notificationMessage(2500, 'Thanks for your bug report', 'success')
            } else {
                notificationMessage(2500, 'You missed some fields huh?', 'danger')
            }
        })
        
    }

    function modalFeatureRequest() {
        $featureRequest.click(function() {
            $body.addClass('open feature-request')
        })

        $submitFeature.click(function(e) {
            e.preventDefault()
            if ($featureBody.val().length > 0 && $featureTitle.val().length > 0) {
                $.post(
                    window.location.protocol + '//' + window.location.hostname + ':8080/issue',
                     {
                        title: $featureTitle.val(),
                        body: $featureBody.val(),
                        type: 'enhancement'               
                    }
                )
                $featureTitle.val('')
                $featureBody.val('')
                notificationMessage(2500, 'Thanks for your bug report', 'success')
            } else {
                notificationMessage(2500, 'You missed some fields huh?', 'danger')
            }
        })
    }


    $closeModal.click(function() {
        $body.removeClass('open feature-request bug-report')
    })

    

    $(window).scroll(function() {
        if ($(window).scrollTop() > $(window).height() / 3 ) {
            $body.addClass('sticky')
        } else {
            $body.removeClass('sticky')
        }
    })

    function notificationMessage(time, message, type) {
        $notificationMessage.find('.text-placeholder p').remove()
        $notificationMessage.addClass('open' + ' ' + type)
        $notificationMessage.find('.text-placeholder').html('<p>' + message + '</p>')
        setTimeout(function() {
            $notificationMessage.removeClass('open' + ' ' + type)
        }, time)
    }

    function getLatestReleaseUrl() {
        let changelogArray = [];
        $.ajax({
            url: 'https://api.github.com/repos/dgiannaris/switch/releases'
        }).done(function(data) {
            console.log(data)
            data.map(function(version) {
              let arr = [];
              arr[0] = version.name
              arr[1] = version.body
              arr[2] = version.assets[1].browser_download_url
              changelogArray.push(arr)
            })
            $downloadBtn.attr('href', data[0].assets[1].browser_download_url)
            changelogArray.map(function(version) {
                let bodyContent = version[1].split(/[\r\n]+/g).map(function(p) {
                    return '<p>' + p + '</p>'
                })
                console.log(bodyContent)
              $('.versions-wrapper').append('<div class="version"><h2>' + version[0] + '</h2><p>' + bodyContent.join('') + '</p><p>Get it <a href="' + version[2] + '" target="_blank">here</a></p></div>')
            })
        })
    }

    function sliderIntro() {
        $sliderIntro.slick({
            infinite: true,
          speed: 1500,
          pauseOnDotsHover: true,
          fade: true,
          pauseOnHover: false,
          cssEase: 'linear',
          autoplay: true,
          draggable: true,
          infinite: true,
          arrows: false,
          dots: false,
        });
    }

})