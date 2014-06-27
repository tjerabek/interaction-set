(function($) {
	$.fn.inEffect = function() {
		var $this = $(this);
		var effects = {
			init: function() {
				var self = this;
				var type = $this.attr('data-in-effect');
				var effectdelay = $this.attr('data-in-effect-delay');
				var removedelay = $this.attr('data-in-effect-remove-after');

				if (typeof effectdelay === 'undefined') {
					effectdelay = 0;
				}
				if (typeof removedelay === 'undefined') {
					removedelay = -1;
				}

				if (type === "chain-effect") {
					setTimeout(function() {
						self.chainEffect();
					}, effectdelay);
				}
				if (type === "change-text") {
					setTimeout(function() {
						self.changeTextEffect();
					}, effectdelay);
				}
				if (type === "visibility") {
					setTimeout(function() {
						self.visibilityEffect();
					}, effectdelay);
				}
				if (type === "click") {
					setTimeout(function() {
						self.clickEffect();
					}, effectdelay);

					setTimeout(function() {
						self.removeClickEffect();
					}, removedelay);
				}
			},
			chainEffect: function() {
				var speed = 100;
				var delay = 0;

				$.each($this.find('[data-in-effect]'), function(key, item) {
					var $delayedItem = $(item);

					setTimeout(function() {
						$delayedItem.inEffect();
					}, delay);
					delay += speed;
				});
			},
			changeTextEffect: function() {
				var state = $this.attr('data-in-active-state');
				if (state == "one") {
					$this.attr('data-in-active-state', 'two');
				} else {
					$this.attr('data-in-active-state', 'one');
				}
			},
			visibilityEffect: function() {
				var state = $this.attr('data-in-visibility');
				if (state == "visible") {
					$this.attr('data-in-visibility', 'hidden');
				} else {
					$this.attr('data-in-visibility', 'visible');
				}
			},
			clickEffect: function() {
				$this.attr('data-in-active-state', 'clicked');
			},
			removeClickEffect: function() {
				$this.find('.in-effect').remove();
				$this.removeAttr('data-in-active-state');
				$this.inEffectBuild();
			}
		}

		effects.init();

		return this;
	};
}(jQuery));

(function($) {
	$.fn.inEffectBuild = function() {
		var $this = this;
		var effects = {
			init: function() {
				var self = this;
				var type = $this.attr('data-in-effect');

				if (type === "chain-effect") {
					self.chainEffect();
				}
				if (type === "change-text") {
					self.changeTextEffect();
				}
				if (type === "visibility") {
					self.visibilityEffect();
				}
				if (type === "click") {
					self.clickEffect();
				}
			},
			chainEffect: function() {},
			changeTextEffect: function() {
				var secondState = $this.data('in-value-two');
				$this.wrapInner('<span class="in-state" data-in-state="one"></span>');
				$this.append('<span class="in-state" data-in-state="two">' + secondState + '</span>');
				$this.wrapInner('<div class="in-state-wrap"></div>')

				var maxWidth = Math.max.apply(null, $this.find('.in-state').map(function() {
					return $(this).outerWidth(true);
				}).get());
				var maxHeight = Math.max.apply(null, $this.find('.in-state').map(function() {
					return $(this).outerHeight(true);
				}).get());

				var c = $this.find('.in-state').length;
				$this.width(maxWidth * 1.5 + 'px').height(maxHeight + 'px');
				$this.find('.in-state').width(maxWidth + 'px').height(maxHeight + 'px');
				$this.find('.in-state-wrap').width((c * maxWidth) + 'px').height(maxHeight + 'px');
			},
			visibilityEffect: function() {},
			clickEffect: function() {
				var h = $this.height();
				var $effect = $('<span class="in-effect"></span>');
				$effect.height(h + 'px').width(h + 'px').css('margin-left', '-' + (h / 2) + 'px').css('margin-top', '-' + (h / 2) + 'px');
				$this.append($effect);
			}
		}

		effects.init();

		return this;
	};
}(jQuery));

$(document).ready(function() {
	$.each($('[data-in-effect="change-text"]'), function(key, item) {
		$(item).inEffectBuild();
	});

	$.each($('[data-in-effect="click"]'), function(key, item) {
		$(item).inEffectBuild();
	});

	$(document).on('click', '#change-state', function() {
		$("#header-title").inEffect();
		$("#header-controls").inEffect();
		$("#header-controls-second").inEffect();
		$(this).inEffect();
	});

	$(document).on('click', '.main-menu a', function() {
		$(this).inEffect();
	});
});