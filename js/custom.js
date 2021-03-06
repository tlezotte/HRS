/**
 * get a url parameter
 *
 * @param {String} name URL argument name
 * @returns {String} URL argument value
 * @public
 */
$.urlParam = function(name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results==null) {
    return null;
  } else {
    return decodeURI(results[1]) || 0;
  }
};


/**
 *  only show splash once
 */
if (Cookies.get('splash')) {
  $('#header').hide();
} else {
  Cookies.set('splash', 'true', { expires: 30 });
}

/**
 *  toggle new site form
 */
// $("#click_submit_local").on("click", function(e) {
//   $("#submit_local").slideToggle("slow");
// });

// Since there's no list-group/tab integration in Bootstrap
$('.list-group-item').on('click', function(e) {
  let previous = $(this)
    .closest('.list-group')
    .children('.active');
  previous.removeClass('active'); // previous list-item
  $(e.target).addClass('active'); // activated list-item
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
 * Start WOW Animation
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

// var $container = $(".section-local"),
//   $body = $("body"),
//   colW = 375,
//   columns = null;

/**
 *   -- Save Races Request data --
 */
// Initialize Firebase
// var config = {
//   apiKey: "AIzaSyBHekFQER7m6ZE2ur0r27HHA-VgUBcmKDY",
//   authDomain: "hrs1-6cfa5.firebaseapp.com",
//   databaseURL: "https://hrs1-6cfa5.firebaseio.com",
//   projectId: "hrs1-6cfa5",
//   storageBucket: "hrs1-6cfa5.appspot.com",
//   messagingSenderId: "348880931560"
// };
// firebase.initializeApp(config);

// set collection
// var requestRef = firebase.database().ref('requests');

// Listen for form submission
// $("#requestForm").on("submit", function(e) {
//   e.preventDefault();

//   // get data
//   var name = $("#name").val();
//   var email = $("#email").val();
//   var title = $("#title").val();
//   var date = $("#date").val();
//   var time = $("#time").val();
//   var url = $("#url").val();

//   // save request
//   saveRequest(now,name,email,title,date,time,url);

//   // send to slack
//   sendToSlack(name,email,title,date,time,url);

//   // clean form data
//   this.reset();
//   // hide form after submit
//   //$("#submit_local").slideToggle();
//   $('.lity-opened').hide();

//   // show alert and fade in 3 seconds
//   $("#sentrequest").show();
//   setTimeout(function() {
//     $("#sentrequest").fadeOut();
//   },3000);
// });

// Save Request
// function saveRequest(now,name,email,title,date,time,url) {
//   var newRequest = requestRef.push();

//   newRequest.set({
//     requested: now,
//     name: name,
//     email: email,
//     title: title,
//     date: date,
//     time: time,
//     url: url
//   });
// }

// slack post
// function sendToSlack(name,email,title,date,time,url) {
//   $.ajax({
//       data: 'payload=' + JSON.stringify({
//         "text": "name=" + name + "\nemail=" + email + "\ntitle=" + title + "\ndate=" + date + "\ntime=" + time + "\nurl=" + url,
//         "attachments": [
//           {          
//             "title": "Request stored in Firebase",
//             "title_link": "https://console.firebase.google.com/u/0/project/hrs1-6cfa5/database/hrs1-6cfa5/data",
//           }]
//       }),
//       dataType: 'json',
//       processData: false,
//       type: 'POST',
//       url: 'https://hooks.slack.com/services/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'
//   });
// }




/**
 * JavaScript after page is loaded
 */
$(window).bind("load", function() {
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
  // $("#sorts").on("click", "button", function() {
  //   var sortByValue = $(this).attr("data-sort-by");
  //   $grid.isotope({ sortBy: sortByValue });
  // });

  // change is-checked class on buttons
  $(".button-group").each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on("click", "button", function() {
      $buttonGroup.find(".is-checked").removeClass("is-checked");
      $(this).addClass("is-checked");
    });
  });

  
  /**
   * make series into button
   */
  $(".local-content, .series-content").on("click", function() {
    //window.location = $(this).find("a").attr("href");
    var url = $(this)
      .find("a")
      .attr("href");
    window.open(url, "hrc");
    return false;
  });
});