# ng-youtube-player

This repo is for distribution on `npm` and `bower`.

## Install

You can install this package either with `npm` or with `bower`.

### npm

```shell
npm install ng-yt-player
```

### bower

```shell
bower install ng-yt-player
```
The library is then available at `bower_components/ng-yt-player/dist/ng-yt-player.js`.

## Getting Started

Add reference to ng-yt-player 
```html
<script src="/bower_components/ng-yt-player/dist/ng-yt-player.js"></script>
```

Where you declare your app module, add ng-yt-player:
```javascript
angular.module('myApp',[
	'ng-yt-player',
]);
```
In your javascript file within the controller where you plan to use ng-yt-player, declare:
```javascript
angular.controller('home',function($scope,YouTubePlayerConfig){
  //YouTube player configuration
	$scope.playerConfig = new YouTubePlayerConfig(
		{playerVars : {autoplay: 0}, width: '100%',}
  );
});  
```
In your html file within the controller where you plan to use ng-yt-player, add:
```html
 <you-tube-player yt-video-id="bfPdFzkPqmU" yt-player-config="playerConfig"></you-tube-player>
```
yt-video-id being the played videoId. You can replace this by any valid expression returning a valid YouTube videoId.
Note: Updating yt-video-id will instantly load the video on an existing player. 

## Customization

You can use all availables parameters for the HTML5 YouTube Players described  [here](https://developers.google.com/youtube/player_parameters?playerVersion=HTML5)

Simply specify your custom configuration in the playerConfig object within your controller, like this:
```javascript
 $scope.playerConfig = new YouTubePlayerConfig(
		{ playerVars : {autoplay: 0}, 
		  width: '100%',
		  height: '350px',
			events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
  );
```

More information on Player configuration and available events can be found [here](https://developers.google.com/youtube/iframe_api_reference)


