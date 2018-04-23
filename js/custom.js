$(function() {
  var now = moment().format("YYYY-MM-DD");

  // only show splash once
  if (Cookies.get('splash')) {
    $("#header").hide();
  } else {
    Cookies.set('splash', 'true', { expires: 30 });
  }

  $("#click_submit_local").on("click", function(event) {
    $("#submit_local").slideToggle("slow");
  });

  // Since there's no list-group/tab integration in Bootstrap
  $(".list-group-item").on("click", function(e) {
    var previous = $(this)
      .closest(".list-group")
      .children(".active");
    previous.removeClass("active"); // previous list-item
    $(e.target).addClass("active"); // activated list-item
  });

  /**
   * Lock menu to top
   */
  $("#menu").scrollToFixed();
  $(".res-nav_click").click(function() {
    $(".main-nav").slideToggle();
    return false;
  });

  /**
   * Animation
   */
  wow = new WOW({
    animateClass: "animated",
    offset: 100
  });
  wow.init();

  $(".main-nav li a, .servicelink").bind("click", function(event) {
    var $anchor = $(this);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top - 102
        },
        1500,
        "easeInOutExpo"
      );
    /*
        if you don't want to use the easing effects:
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000);
        */
    if ($(window).width() < 768) {
      $(".main-nav").hide();
    }
    event.preventDefault();
  });

  var $container = $(".section-local"),
    $body = $("body"),
    colW = 375,
    columns = null;

  // external js: isotope.pkgd.js

  // init Isotope
  var $grid = $(".grid").isotope({
    itemSelector: ".element-item",
    layoutMode: "fitRows",
    getSortData: {
      name: ".name",
      symbol: ".symbol",
      number: ".number parseInt",
      category: "[data-category]",
      weight: function(itemElem) {
        var weight = $(itemElem)
          .find(".weight")
          .text();
        return parseFloat(weight.replace(/[\(\)]/g, ""));
      }
    }
  });

  // filter functions
  var filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function() {
      var number = $(this)
        .find(".number")
        .text();
      return parseInt(number, 10) > 50;
    },
    // show if name ends with -ium
    ium: function() {
      var name = $(this)
        .find(".name")
        .text();
      return name.match(/ium$/);
    }
  };

  // bind filter button click
  $("#filters").on("click", "button", function() {
    var filterValue = $(this).attr("data-filter");
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });
  });

  // bind sort button click
  $("#sorts").on("click", "button", function() {
    var sortByValue = $(this).attr("data-sort-by");
    $grid.isotope({ sortBy: sortByValue });
  });

  // change is-checked class on buttons
  $(".button-group").each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "button", function() {
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
  });

  // -- make series into button
  $(".local-content").on("click", function() {
    //window.location = $(this).find("a").attr("href");
    var url = $(this)
      .find("a")
      .attr("href");
    window.open(url, "hrc");
    return false;
  });

  // -- news feed
  var newsURL = "/news.json?start_date=" + now;
  console.log(newsURL);
  var group_news = $("#group-news");
  console.log(group_news);
  $.getJSON(newsURL, function(data) {
    console.log(data);
    var output = "";
    var news_count = 0;
    for (var i in data.results) {
      console.log("i=" + i);
      if (moment(data.results[i].date).diff(now, "days") >= 0) {
        news_count++;
        // output += "<div class='news news-content'>";
        // output += "<div class='news-body text-left'>";
        // output += "<h4 class='news-heading text-left'>" + data.results[i].title + "</h4>";
        // output += "<a href='" + data.results[i].url + "' target='hrc'>";
        // output += "<div class='news-item'>";
        // output += "<i class='far fa-clock' aria-hidden='true'></i> " + moment(data.results[i].date).format("dddd, MMMM DD, YYYY") + " &#8226; " + data.results[i].time + "</div>";
        // output += "<div class='news-item'>";
        // output += "<i class='fas fa-map-marker-alt' aria-hidden='true'></i> " + data.results[i].location + "</div>";
        // output += "</a>";
        // output += "</div>";
        // output += "</div>";
        output += "<div class='local-content element-item 10k'>";
        output += "<h4>" + data.results[i].title + "</h4>";
        output += "<p class='thedate'>";
        output +=
          "<i class='far fa-clock' aria-hidden='true'></i> " +
          moment(data.results[i].date).format("dddd, MMMM DD, YYYY") +
          " &#8226; " +
          data.results[i].time;
        output += "</p>";
        output += "<p class='thelocation'>";
        output +=
          "<i class='far fa-map' aria-hidden='true'></i>" +
          data.results[i].location;
        output += "</p>";
        output += "</div>";
      }
    }
    console.log(output);
    group_news.html(output);
  });
});
