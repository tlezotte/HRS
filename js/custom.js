$(function() {
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

//   $container.isotope({
//     // disable window resizing
//     resizable: true,
//     masonry: {
//       columnWidth: colW
//     }
//   });

//   $(window)
//     .smartresize(function() {
//       // check if columns has changed
//       var currentColumns = Math.floor(($body.width() - 30) / colW);
//       if (currentColumns !== columns) {
//         // set new column count
//         columns = currentColumns;
//         // apply width to container manually, then trigger relayout
//         $container.width(columns * colW).isotope("reLayout");
//       }
//     })
//     .smartresize(); // trigger resize to set container width

//   $(".portfolioFilter a").click(function() {
//     $(".portfolioFilter .current").removeClass("current");
//     $(this).addClass("current");

//     var selector = $(this).attr("data-filter");
//     $container.isotope({
//       filter: selector
//     });
//     return false;
//   });


  
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
});
