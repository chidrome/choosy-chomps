$( document ).ready(function(){
	//for the mobile hamburger menu
	$(".button-collapse").sideNav();
	//for the carousel timer 
	$('.carousel.carousel-slider').carousel({fullWidth: true});
	setInterval(function() {
		$('.carousel.carousel-slider').carousel('next');
	}, 4000);
	//submits the data for the edit 
	$('.edit-tag').submit(function(e) {
		console.log('submit');
		e.preventDefault();
		$.ajax({
			url: $(this).attr('action'),
			method: "PUT",
			data: {
				name: $('#name').val(),
				bio: $('#bio').val()
			}
		}).done(function(data) {
			window.location.href = '/profile';
		});
	});


})