angular
	.module('demoApp',['ng-yt-player',])
	.controller('home',['$scope','YouTubePlayerConfig',function($scope,YouTubePlayerConfig){
		$scope.title = "Angular You Tube Player";

		$scope.playerConfig = new YouTubePlayerConfig(
			{
				playerVars : {autoplay: 0},
				width: '100%',
				videoId: 'bfPdFzkPqmU'
			}
		);

		}]
	);