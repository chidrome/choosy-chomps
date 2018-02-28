$( document ).ready(function(){
	//for the mobile hamburger menu
	$(".button-collapse").sideNav();
	//for the carousel timer 
	$('.carousel.carousel-slider').carousel({fullWidth: true});
	setInterval(function() {
		$('.carousel.carousel-slider').carousel('next');
	}, 4750);
	
	//submits the data for the edit 
	$('.edit-profile').submit(function(e) {
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
			console.log(data);
			window.location.href = '/profile';
		});
	});

	$('.all-recipes').infiniteScroll({
	  path: '.pagination__next',
	  append: '.recipe',
	  status: '.scroller-status',
	  hideNav: '.pagination',
	});

	$('#delete-recipe').on('click', function(e) {
	e.preventDefault();
	var specificRecipe = $(this);
	var destination = specificRecipe.attr('action');
	$.ajax({
			method: 'DELETE', 
			url: destination
		}).done(function(data) {
			console.log(data);
			window.location = '/profile';
		});
	});

});