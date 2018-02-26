$( document ).ready(function(){
	$(".button-collapse").sideNav();
	$('.carousel.carousel-slider').carousel({fullWidth: true});
	setInterval(function() {
		$('.carousel.carousel-slider').carousel('next');
	}, 4000);
})