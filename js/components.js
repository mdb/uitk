if (typeof TK === 'undefined' || !PS) {
    var TK = {};
}

TK.components = (function ($) {
    var _self;

    _self = {

        tabs: function(tabRoot) {
            var $root = (typeof tabRoot !== 'undefined') ? $(tabRoot) : $('[data-role="tabs-module"]');
            var $tabs = $root.find('[data-role="tabs"]');
            var $panels = $root.find('[data-role="panel"]');
            var $currentTab;
            var $currentPanel;

            function swapPanel(tab) {
                var panel = tab.attr('href');
                $currentPanel.removeClass('current');
                $currentPanel = $('[data-panel-id="' + panel + '"]');
                $currentPanel.addClass('current');
            }

            function showFirst() {
                $currentPanel = $panels.first();
                $currentTab = $tabs.find('li:first-child a');
                $currentTab.addClass('current');
                $currentPanel.addClass('current');
            }

            showFirst();

            $('a', $tabs).live('click', function(evt) {
                var tab = $(this);
                evt.preventDefault();
                $tabs.find('a').removeClass('current');
                tab.addClass('current');
                swapPanel(tab);
            });
        },

        overlay: {
            init: function (overlayElem) {
                _self.overlay.overlayEl = overlayElem || $('div.overlay');
                _self.overlay.mask = $('div#overlay-mask');
                this.open(_self.overlay.overlayEl, _self.overlay.mask);
            },

            open: function (overlayEl, mask) {
                mask.fadeIn('1000');
                this.positionOverlay(overlayEl);
                overlayEl.fadeIn('fast');
                this.setUpCloseClickHandlers(mask, overlayEl);
                this.setUpCloseClickHandlers(overlayEl.find('.close'), overlayEl);
            },

            positionOverlay: function (overlayEl) {
                var winH = $(window).height(),
                    winW = $(window).width();

                overlayEl.css('top',  winH/2 - overlayEl.height()/2);
                overlayEl.css('left', winW/2 - overlayEl.width()/2);
            },

            setUpCloseClickHandlers: function (clickElem, overlayEl) {
                clickElem.click(function () {
                  _self.overlay.close(overlayEl, _self.overlay.mask);
                });
            },

            close: function (overlayEl, mask) {
                mask.hide();
                overlayEl.hide();
            }
        }
    };

    return _self;

})(jQuery);
