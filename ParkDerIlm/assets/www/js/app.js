$(document).ready(function(){
	document.addEventListener("deviceready", function(){
		PDI.App.init();
	}, false);
});

PDI = {};

PDI.App = function(){
	
	var photoButtonSelector = "#takePicture";
	var photoPreviewSelector = "#newPhotoPreview";
	var usePictureButtonSelector = "#usePictureButton a";
	var photoGalleryContainerSelector = '#PDIPhotoGalleryContainer';
	
	var photoSuccessMessage = "Photo has been added to the Gallery";
	
	var sampleImagePaths = [
        'images/bigtree1.jpg',
        'images/ruine1-small.jpg',
        'images/trees1-small.jpg'
    ];
	
	var localStorageKeyName = "PDI_LS_ImagePaths";
	
	
	var InitializeClickHandlers = function(){
		$(photoButtonSelector).on( 'click',OnTakePicture );
		$(usePictureButtonSelector).on( 'click', OnUsePicture );
	};
	
	var HideUsePictureButton = function() {
		$(usePictureButtonSelector).parent().hide();
	}
	
	var ShowUsePictureButton = function() {
		$(usePictureButtonSelector).parent().show();
	}
	
	var OnTakePicture = function(){
		
		var PGCameraOptions = { 
			quality : 25, 
			destinationType : Camera.DestinationType.FILE_URI, 
			sourceType : Camera.PictureSourceType.CAMERA, 
			encodingType: Camera.EncodingType.JPEG,
			targetWidth: 500,
			targetHeight: 500,
			saveToPhotoAlbum: true 
		}
		
		navigator.camera.getPicture(onPhotoSuccess, onPhotoFail, PGCameraOptions); 

	}
	
	var OnUsePicture = function() {
		
		var localStorage = GetLocalStorage();
		var $photo = $(photoPreviewSelector);
		
		var photoPaths = GetSavedPhotoPaths();
		
		var photosCount = 0;
		
		if( photoPaths.length > 0 ) {
			photosCount = photoPaths.length;
		}
		
		var currentPhotoUri = $photo.attr('src');
		photoPaths[photosCount] = currentPhotoUri;
		
		SetSavedPhotoPaths(photoPaths);
		
		$photo.hide();
		$(usePictureButtonSelector).parent().hide();
		
		InitializePhotoGallery();
		
		alert( photoSuccessMessage );
		
		$.mobile.changePage("#mainpage");
		
	}
	
	var GetLocalStorage = function() {
		var localStorage = window.localStorage;
		var value = localStorage.getItem(localStorageKeyName);
		
		if( value === null ) {
			localStorage.setItem( localStorageKeyName, ' ' );
		}
		
		return localStorage;
	}
	
	var GetSavedPhotoPaths = function() {
		var localStorage = GetLocalStorage();
		
		var photoPaths = localStorage.getItem(localStorageKeyName);
		
		if( photoPaths == ' ' ) {
			photoPaths = [];
		}
		else {
			photoPaths = JSON.parse( photoPaths );
		}
		
		return photoPaths;
	}
	
	var SetSavedPhotoPaths = function( photoPaths ) {
		var photoPathsString = JSON.stringify( photoPaths );
		localStorage.setItem( localStorageKeyName, photoPathsString );
	}
	
	var onPhotoSuccess = function(imageURI) {
		console.log( "URI = "+imageURI );
		
	    var $photo = $(photoPreviewSelector);
	    $photo.attr('src',imageURI)
	    	  .show();
	    
	    $(usePictureButtonSelector).parent().show();
	    
	}

	var onPhotoFail = function(message) {
	    alert('Failed because: ' + message);
	};
	

	var InitializePhotoGallery = function() {
		var $photoGalleryContainer = $(photoGalleryContainerSelector);
		
		$photoGalleryContainer.empty();
		
		var savedPhotoPaths = GetSavedPhotoPaths();
		var imagePaths = sampleImagePaths.concat( savedPhotoPaths );
		
		for( var path in imagePaths ) {
			
			var $img = $( '<img>' );
			$img.attr( 'src', imagePaths[path] );
			
			$photoGalleryContainer.prepend($img);
		}
		
	};
	
	
	var init = function() {
		
		InitializeClickHandlers();
		InitializePhotoGallery();
		
	};
	
	return {
		init:init
	};
	
	
}();