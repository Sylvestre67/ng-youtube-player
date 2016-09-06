// your library here
(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['angular'], factory);
  } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    // CommonJS support (for us webpack/browserify/ComponentJS folks)
    module.exports = factory(require('angular'));
  } else {
    // in the case of no module loading system
    // then don't worry about creating a global
    // variable like you would in normal UMD.
    // It's not really helpful... Just call your factory
    return factory(root.angular);
  }
}(this, function (angular) {
	'use strict';

	var moduleName = 'ng-ytplayer';
	var mod = angular.module(moduleName, []);

	mod.value('ng-ytplayerOptions',
		{
			enabled: true
		}
	);

	mod.service('YouTubeLoader', function($q,$window){
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		// Promise to be resolved once the script is ready to be used.
		var delay = $q.defer();

		$window.onYouTubeIframeAPIReady = function() {
			// Once script is loaded, resolve the promise.
			delay.resolve();
		};

		return {
			whenLoaded: function () {
				// Return the promise, this way we can inform all you-tube-player directives the script is ready to be used.
				return delay.promise;
			}
		}
	});

	mod.service('YouTubePlayerConfig', function(){

		var YouTubePlayerConfig = function(config){
			this.playerVars = config.playerVars || '';
			this.height = config.height || '',
			this.width = config.width || '100%',
			this.videoId = config.videoId || '_LgTMgjNMI4',
			this.events = config.events || ''
    	};

		return YouTubePlayerConfig;
	});

	mod.directive('youTubePlayer', ['YouTubeLoader','YouTubePlayerConfig', function(YouTubeLoader,YouTubePlayerConfig) {
		return {
			restrict: 'E',
			scope: {
				ytVideoId: '@',
				ytPlayerConfig:'='
			},
			link: function(scope,element,attrs){

				var player;

				YouTubeLoader.whenLoaded().then(function() {

					var playerConfig;

					(scope.ytPlayerConfig)
						? playerConfig = scope.ytPlayerConfig
						: playerConfig =  new YouTubePlayerConfig();

					console.log(playerConfig);

					player = new YT.Player(element[0], playerConfig);
				});

				scope.$watch('ytVideoId', function(newValue, oldValue) {
					return (newValue == oldValue) ? false : player.loadVideoById({'videoId': newValue});
				});
			}
		};
	}]);
	return moduleName;
}));