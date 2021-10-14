(function () {
    'use strict';

    var defaultStartPage = "home",
        isAnimating = false,
        endCurrentPage = true,
        endNextPage = false,
        windowArea = $(window),
        animEndEventNames = {
            'WebkitAnimation': 'webkitAnimationEnd',
            'OAnimation': 'oAnimationEnd',
            'msAnimation': 'MSAnimationEnd',
            'animation': 'animationend'
        },

        // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],

        // support css animations
        support = Modernizr.cssanimations;

    function Animate($pageTrigger) {

        var animation = $pageTrigger.attr('data-animation'),
            inClass,
            selectedAnimNumber;

        if (animation) {
            // Check if the delimiter '-' is present then create an animation array list.
            if (animation.indexOf('-') >= 0) {
                var randomAnimList = animation.split('-');
                selectedAnimNumber = parseInt(randomAnimList[(Math.floor(Math.random() * randomAnimList.length))]);
            } else {
                selectedAnimNumber = parseInt(animation);
            }

            // Checking if the animation number is out of bound, max allowed value is 1 to 67.
            if (selectedAnimNumber > 67) {
                alert("Transition.js : Invalid 'data-animation' attribute configuration. Animation number should not be greater than 67");
                return false;
            }
            inClass = getAnimationClass(selectedAnimNumber);
        }

        // This will get the pt-trigger elements parent wrapper div
        var $pageWrapper = $(".subpages"),
            tempPageIndex = $pageWrapper.data('current'),
            gotoPage = $pageTrigger.attr('href').replace(/^#!\//g, ""),
            $currentPage = $('section[data-id="' + tempPageIndex + '"]'),
            $nextPage,
            currentPageId = gotoPage;

        // Check if the current page is same as the next page then do not do the animation
        // else reset the 'isAnimating' flag
        if (tempPageIndex !== currentPageId) {

            $pageWrapper.data('current', currentPageId);

            // Next page to be animated.

            $nextPage = $('section[data-id=' + currentPageId + ']');
            $nextPage.addClass('pt-page-current');

            windowArea.scrollTop(0);

            $nextPage.fadeIn();
            if (animation) {
                isAnimating = true;

                $nextPage
                    .addClass(inClass)
                    .on(animEndEventName, function () {
                        $nextPage.off(animEndEventName);
                        endNextPage = true;
                        if (endCurrentPage) {
                            onEndAnimation($pageWrapper, $nextPage, $currentPage);
                            endNextPage = false;
                            isAnimating = false;
                        }
                    });
            }
        } else {
            isAnimating = false;
        }


        // Check if the animation is supported by browser and reset the pages.
        if (!support) {
            onEndAnimation($currentPage, $nextPage);
        }

    }

    function onEndAnimation($pageWrapper, $nextPage, $currentPage) {
        resetPage($nextPage, $currentPage);
    }

    function resetPage($nextPage, $currentPage) {
        $currentPage.attr('class', $currentPage.data('originalClassList'));
        $nextPage.attr('class', $nextPage.data('originalClassList') + ' pt-page-current');
    }

    function initOriginalClassList() {
        $('.pt-page').each(function () {
            var $page = $(this);
            $page.data('originalClassList', $page.attr('class'));
        });
    }

    function init(options) {

        // Get all the .pt-page sections.
        initOriginalClassList();

        // Get all the .pt-wrapper div which is the parent for all pt-div
        $(".subpages").each(function () {
            if (getActiveSection() === "") {
                $('section[data-id=' + pageStart + ']').addClass('pt-page-current');
            }
        });

        // Adding click event to main menu link
        $('.pt-trigger').on("click", function (e) {
            // e.preventDefault();
            if (isAnimating) {
                return false;
            }

            var _this = this;
            setTimeout(function () {
                var pageTrigger = $(_this);
                initOriginalClassList();
                activeMenuItem(pageTrigger);
                Animate(pageTrigger);
            }, 0);
        });

        var menu = options.menu;

        window.onhashchange = function (event) {
            handlePageChange(menu, false);
        };

        handlePageChange(menu, true);
    }

    function handlePageChange(menu, appendAjaxLoader) {
        if (isAnimating) {
            return false;
        }

        var pageStart = getActiveSection();

        if (!pageStart) {
            return false;
        }

        var splitted = pageStart.split("/");
        pageStart = splitted[0] + "/" + splitted[1];
        var menuLink = $(menu + ' a[href*="' + pageStart + '"]');
        if (splitted.length > 2) {
            $(".page-content").fadeIn();
        }

        activeMenuItem(menuLink);

        Animate(menuLink);
        if (appendAjaxLoader) {
            $('body').append('<div id="page-ajax-loaded" class="page-ajax-loaded animated rotateInDownRight"></div>');
        }
        ajaxLoader();
    }

    function getActiveSection() {
        if (location.hash === "") {
            return defaultStartPage;
        }

        return location.hash;
    }

    function activeMenuItem(item) {
        if (!item) {
            return false;
        }

        var navLink = $(item);
        navLink = navLink['0'];
        navLink = $(navLink.parentNode);
        if (navLink) {
            $('ul.site-main-menu li').removeClass('active');
            navLink.addClass('active');
        }
    }

    function ajaxLoader() {
        // Check for hash value in URL
        var ajaxLoadedContent = $('#page-ajax-loaded');

        function showContent() {
            ajaxLoadedContent.removeClass('rotateOutDownRight closed');
            ajaxLoadedContent.show();
            $('body').addClass('ajax-page-visible');
        }

        function hideContent() {
            $('#page-ajax-loaded').addClass('rotateOutDownRight closed');
            $('body').removeClass('ajax-page-visible');
            setTimeout(function () {
                $('#page-ajax-loaded.closed').html('');
                ajaxLoadedContent.hide();
            }, 500);
        }

        var hash = getActiveSection(),
            href = $('.ajax-page-load').each(function () {
                href = $(this).attr('href');
                if (hash === hash.split('/')[0] + '/' + href.substr(0, href.length - 5)) {
                    var toLoad = $(this).attr('href');
                    showContent();
                    ajaxLoadedContent.load(toLoad);
                    return false;
                }
            });

        $(document)
            .on("click", ".site-main-menu, #ajax-page-close-button", function (e) { // Hide Ajax Loaded Page on Navigation cleck and Close button
                e.preventDefault();
                hideContent();
                // location.hash = location.hash.split('/')[0];
            })
            .on("click", ".ajax-page-load", function () { // Show Ajax Loaded Page
                /* var hash = location.hash.split('/')[0] + '/' + $(this).attr('href').substr(0, $(this).attr('href').length - 5);
                 location.hash = hash;*/
                showContent();

                return false;
            });
    }

    function getAnimationClass(selectedAnimNumber, inClass) {
        switch (selectedAnimNumber) {
            case 1:
                inClass = 'pt-page-moveFromRight';
                break;
            case 2:
                inClass = 'pt-page-moveFromLeft';
                break;
            case 3:
                inClass = 'pt-page-moveFromBottom';
                break;
            case 4:
                inClass = 'pt-page-moveFromTop';
                break;
            case 5:
                inClass = 'pt-page-moveFromRight pt-page-ontop';
                break;
            case 6:
                inClass = 'pt-page-moveFromLeft pt-page-ontop';
                break;
            case 7:
                inClass = 'pt-page-moveFromBottom pt-page-ontop';
                break;
            case 8:
                inClass = 'pt-page-moveFromTop pt-page-ontop';
                break;
            case 9:
                inClass = 'pt-page-moveFromRightFade';
                break;
            case 10:
                inClass = 'pt-page-moveFromLeftFade';
                break;
            case 11:
                inClass = 'pt-page-moveFromBottomFade';
                break;
            case 12:
                inClass = 'pt-page-moveFromTopFade';
                break;
            case 13:
                inClass = 'pt-page-moveFromRight';
                break;
            case 14:
                inClass = 'pt-page-moveFromLeft';
                break;
            case 15:
                inClass = 'pt-page-moveFromBottom';
                break;
            case 16:
                inClass = 'pt-page-moveFromTop';
                break;
            case 17:
                inClass = 'pt-page-moveFromRight pt-page-ontop';
                break;
            case 18:
                inClass = 'pt-page-moveFromLeft pt-page-ontop';
                break;
            case 19:
                inClass = 'pt-page-moveFromBottom pt-page-ontop';
                break;
            case 20:
                inClass = 'pt-page-moveFromTop pt-page-ontop';
                break;
            case 21:
                inClass = 'pt-page-scaleUpDown pt-page-delay300';
                break;
            case 22:
                inClass = 'pt-page-scaleUp pt-page-delay300';
                break;
            case 23:
                inClass = 'pt-page-scaleUp';
                break;
            case 24:
                inClass = 'pt-page-scaleUp';
                break;
            case 25:
                inClass = 'pt-page-scaleUp';
                break;
            case 26:
                inClass = 'pt-page-scaleUp';
                break;
            case 27:
                inClass = 'pt-page-scaleUpCenter pt-page-delay400';
                break;
            case 28:
                inClass = 'pt-page-moveFromRight pt-page-delay200 pt-page-ontop';
                break;
            case 29:
                inClass = 'pt-page-moveFromLeft pt-page-delay200 pt-page-ontop';
                break;
            case 30:
                inClass = 'pt-page-moveFromTop pt-page-delay200 pt-page-ontop';
                break;
            case 31:
                inClass = 'pt-page-moveFromBottom pt-page-delay200 pt-page-ontop';
                break;
            case 32:
                inClass = 'pt-page-flipInLeft pt-page-delay500';
                break;
            case 33:
                inClass = 'pt-page-flipInRight pt-page-delay500';
                break;
            case 34:
                inClass = 'pt-page-flipInBottom pt-page-delay500';
                break;
            case 35:
                inClass = 'pt-page-flipInTop pt-page-delay500';
                break;
            case 36:
                inClass = 'pt-page-scaleUp';
                break;
            case 37:
                inClass = 'pt-page-rotateInNewspaper pt-page-delay500';
                break;
            case 38:
                inClass = 'pt-page-moveFromRight';
                break;
            case 39:
                inClass = 'pt-page-moveFromLeft';
                break;
            case 40:
                inClass = 'pt-page-moveFromBottom';
                break;
            case 41:
                inClass = 'pt-page-moveFromTop';
                break;
            case 42:
                inClass = 'pt-page-rotatePullRight pt-page-delay180';
                break;
            case 43:
                inClass = 'pt-page-rotatePullLeft pt-page-delay180';
                break;
            case 44:
                inClass = 'pt-page-rotatePullBottom pt-page-delay180';
                break;
            case 45:
                inClass = 'pt-page-rotatePullTop pt-page-delay180';
                break;
            case 46:
                inClass = 'pt-page-moveFromRightFade';
                break;
            case 47:
                inClass = 'pt-page-moveFromLeftFade';
                break;
            case 48:
                inClass = 'pt-page-moveFromBottomFade';
                break;
            case 49:
                inClass = 'pt-page-moveFromTopFade';
                break;
            case 50:
                inClass = 'pt-page-rotateUnfoldLeft';
                break;
            case 51:
                inClass = 'pt-page-rotateUnfoldRight';
                break;
            case 52:
                inClass = 'pt-page-rotateUnfoldTop';
                break;
            case 53:
                inClass = 'pt-page-rotateUnfoldBottom';
                break;
            case 54:
                inClass = 'pt-page-rotateRoomLeftIn';
                break;
            case 55:
                inClass = 'pt-page-rotateRoomRightIn';
                break;
            case 56:
                inClass = 'pt-page-rotateRoomTopIn';
                break;
            case 57:
                inClass = 'pt-page-rotateRoomBottomIn';
                break;
            case 58:
                inClass = 'pt-page-rotateCubeLeftIn';
                break;
            case 59:
                inClass = 'pt-page-rotateCubeRightIn';
                break;
            case 60:
                inClass = 'pt-page-rotateCubeTopIn';
                break;
            case 61:
                inClass = 'pt-page-rotateCubeBottomIn';
                break;
            case 62:
                inClass = 'pt-page-rotateCarouselLeftIn';
                break;
            case 63:
                inClass = 'pt-page-rotateCarouselRightIn';
                break;
            case 64:
                inClass = 'pt-page-rotateCarouselTopIn';
                break;
            case 65:
                inClass = 'pt-page-rotateCarouselBottomIn';
                break;
            case 66:
                inClass = 'pt-page-rotateSidesIn pt-page-delay200';
                break;
            case 67:
                inClass = 'pt-page-rotateSlideIn';
                break;
        }
        return inClass;
    }

    angular.module('ranty.directive')
        .directive('pageSwitcher', [function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    angular.element(element).ready(function () {
                        init({
                            menu: 'ul.site-main-menu',
                        });
                    });
                }
            };
        }]);
})();
