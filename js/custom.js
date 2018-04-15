(function ($) {

	new WOW().init();

	jQuery(window).load(function() { 
		jQuery("#preloader").delay(50).fadeOut("slow");
		jQuery("#load").delay(50).fadeOut("slow");
	});


	//jQuery to collapse the navbar on scroll
	$(window).scroll(function() {
		if ($(".navbar").offset().top > 50) {
			$(".navbar-fixed-top").addClass("top-nav-collapse");
		} else {
			$(".navbar-fixed-top").removeClass("top-nav-collapse");
		}
	});

	//jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$('.navbar-nav li a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
		$('.page-scroll a').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});

    // -- modal --
    function iframeModal() {
        var title = $(this).attr('data-title');
        var url = $(this).attr('data-url');

        return eModal
            .iframe(url, title);
	}
	
	// -- make series into button
	$(".series-content, .series-header-content, .races-more-content, .news-content").on("click",function() {
		//window.location = $(this).find("a").attr("href"); 
		var url = $(this).find("a").attr("href");
		window.open(url, 'hrc');
		return false;
	});


	var now = moment().format("YYYY-MM-DD");
	
	var proxy = 'https://cors-anywhere.herokuapp.com/';


	// -- local races from active.com
	var activeURL = '//api.amp.active.com/v2/search/?near=37075&radius=25&query=running&current_page=1&per_page=10&sort=date_asc&category=races&start_date=' + now + '..&exclude_children=true&api_key=gd2sf8g9a6def5ysksj8nxr9';

	var finalURL = proxy + activeURL;

	var local_calendar = $('#local-calendar');

	//local_calendar.html('<i class="fas fa-spinner fa-pulse"></i>');

	// With the get JSON (frequently used) method
	$.getJSON(finalURL, function (data) {
		var output = "";
		for (var i in data.results) {
			output += "<a href='" + data.results[i].homePageUrlAdr + "' target='hrc'>";
			output += "<div class='media media-container'>";
			output += "<div class='media-left media-middle'>";
			output += "<img class='media-object' src='" + data.results[i].logoUrlAdr.replace(/^http:/i, '') + "' alt=''>";
			output += "</div>";
			output += "<div class='media-body text-left'>";
			output += "<h4 class='media-heading text-left'>" + data.results[i].assetName + "</h4>";
			output += "<div><i class='far fa-clock' aria-hidden='true'></i> " + moment(data.results[i].activityStartDate).format("dddd, MMMM DD, YYYY") + "</div>";
			output += "<div><i class='fas fa-map-marker-alt' aria-hidden='true'></i> " + data.results[i].place.placeName + " &#8226; " + data.results[i].place.addressLine1Txt + " " + data.results[i].place.cityName + ", " + data.results[i].place.stateProvinceCode + " " + data.results[i].place.postalCode + "</div>";
			output += "<div>";
			for (var a in data.results[i].assetAttributes) {
				output += "<span class='label label-primary'>" + data.results[i].assetAttributes[a].attribute.attributeValue + "</span> ";
			}
			output += "</div>";
			output += "</div>";
			output += "</div>";
			output += "</a>";
		}
		local_calendar.html(output);
	});

	// -- news feed
	var newsURL = '/news.json?start_date=' + now;

	var group_news = $('#group-news');

	$.getJSON(newsURL, function (data) {
		var output = "";
		var news_count = 0;
		for (var i in data.results) {
			if (moment(data.results[i].date).diff(now, 'days') >= 0 ) {
				news_count++;
				output += "<div class='news news-content'>";
				output += "<div class='news-body text-left'>";
				output += "<h4 class='news-heading text-left'>" + data.results[i].title + "</h4>";
				output += "<a href='" + data.results[i].url + "' target='hrc'>";
				output += "<div class='news-item'>";
				output += "<i class='far fa-clock' aria-hidden='true'></i> " + moment(data.results[i].date).format("dddd, MMMM DD, YYYY") + " &#8226; " + data.results[i].time + "</div>";
				output += "<div class='news-item'>";
				output += "<i class='fas fa-map-marker-alt' aria-hidden='true'></i> " + data.results[i].location + "</div>";
				output += "</a>";
				output += "</div>";
				output += "</div>";
				if (news_count === 3) { break; }
			} else {
				output = "no new news";
			}
		}
		group_news.html(output);
	});

})(jQuery);
