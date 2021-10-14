(function () {
    'use strict';

    angular.module('ranty.directive')
        .directive('titleOwlCarousel', [function () {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    angular.element(element).ready(function () {
                        setTimeout(function (el) {
                            $(el).owlCarousel({
                                loop: true,
                                dots: false,
                                nav: false,
                                margin: 0,
                                items: 1,
                                autoplay: true,
                                autoplayHoverPause: false,
                                autoplayTimeout: 3800,
                                animateOut: 'zoomOut',
                                animateIn: 'zoomIn'
                            });
                        }, 0, element);
                    });
                }
            };
        }]);
})();
