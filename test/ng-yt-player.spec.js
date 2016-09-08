describe('ng-yt-player', function() {

	var $httpBackend,
		compile,
   		scope,
		YouTubePlayerConfig,
		testConfig = {playerVars : {autoplay: 0},width: '100%',	videoId: 'bfPdFzkPqmU'},
		YouTubeLoader,
		playerElem;

	beforeEach(module('demoApp'));

	beforeEach(inject(function(_$httpBackend_,_YouTubeLoader_,_YouTubePlayerConfig_){
		$httpBackend 		= _$httpBackend_;
		YouTubeLoader = _YouTubeLoader_;
		YouTubePlayerConfig = _YouTubePlayerConfig_;
	}));

	describe('YouTubeLoader',function(){
		it('should return a promise we can use to inform the you tube players the YouTubePlayer library is loaded and available.',
			function(){
				expect(typeof(YouTubeLoader.whenLoaded)).toEqual('function');
				expect(typeof(YouTubeLoader.whenLoaded().then().$$state)).toEqual('object');
		})
	});

	describe('playerConfig',function(){
		it('should provide an object to configure the You Tube Player',function(){
			var configObject = new YouTubePlayerConfig(testConfig);
			expect(configObject).toBeDefined();
		});

		it('should return the config params passed to the constructor',function(){
			var configObject = new YouTubePlayerConfig(testConfig);
			expect(configObject.playerVars).toEqual(testConfig.playerVars);
		});
	});

	describe('YouTubePlayer',function(){
		beforeEach(inject(function(_$compile_,_$rootScope_){
			compile = _$compile_;
    		scope = _$rootScope_.$new();
			scope.ytPlayerConfig = new YouTubePlayerConfig(testConfig);
			scope.ytVideoId = "bfPdFzkPqmU";

			playerElem = getCompiledPlayer();

			function getCompiledPlayer() {
				var compiledElement = compile(angular.element('<you-tube-player yt-video-id="ytVideoId" yt-player-config="ytPlayerConfig"></you-tube-player>'))(scope);
				scope.$digest();
				return compiledElement;
			}
		}));

	 	it('should have a videoId',function(){
			expect(scope.ytVideoId).toEqual("bfPdFzkPqmU");
		});

		it('should have a set of Configuration',function(){
			expect(scope.ytPlayerConfig.playerVars).toEqual(testConfig.playerVars);
		});
	});
});