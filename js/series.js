/**
 * get a url parameter
 *
 * @param {String} name URL argument name
 * @return {String} URL argument value
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


$(function() {
  // -- Get the current date
  let now = moment().format("YYYY-MM-DD");
  let year = moment().format("YYYY");

  /**
   *  -- series races feed
   */
  var seriesURL = "https://www.hendersonvilleraceseries.com/api/" + year + "_race_series.json?start_date=" + now;
  
  /**
   *  -- race alerts --
   */
  var race_series = $("#race-series");
  var race_results = $("#race-results");

  $.getJSON(seriesURL, function(data) {
    var output = "";
    var output2 = "";
    for (var i in data.results) {
      output += "<li class='series-item' data-wow-delay='0.6s'>";
      output += "<div class='series-content'>";
      output += "<h5>" + data.results[i].title + "</h5>";
      output += "<p>";
      output += "<a href='" + data.results[i].url + "' target='hrs'>";
      output += "<picture>";
      output += "  <source type='image/webp' srcset='" + data.results[i].logo + ".webp' width='150'>";
      output += "  <img src='" + data.results[i].logo + "' width='150' alt='" + data.results[i].title + "' />";
      output += "</picture>";
      output += "</a>";
      output += "</p>";
      if (data.results[i].date.length == 4) {
        output += "<h6>" + data.results[i].date + " &#8226; " + data.results[i].time + "</h6>";
      } else {
        output += "<h6>" + moment(data.results[i].date).format("MMMM DD, YYYY") + " &#8226; " + data.results[i].time + "</h6>";
      }
      output += "</div>";
      output += "</li>";

      /** 
       * -- display results
       */
      if (data.results[i].results) {
        output2 += "<li class='results-item' data-wow-delay='0.6s'>";
        output2 += "<div class='results-content'>";
        output2 += "<h6><a href='" + data.results[i].results + "' target='hrs'>Results</a></h6>";
        output2 += "</div>";
        output2 += "</li>";
      } else {
        output2 += "<li class='results-item' data-wow-delay='0.6s'>";
        output2 += "<div class='results-content-none'>";
        output2 += "<h6>&nbsp;</h6>";
        output2 += "</div>";
        output2 += "</li>";
      }
    }
    race_series.html(output);
    race_results.html(output2);
  });

  /**
   *  -- race alerts --
   */
  var race_alert = $("#race-alert");

  $.getJSON(seriesURL, function(data) {

    var output = "";
    var alert_level = "";
    for (var i in data.results) {
      var days_to_race = moment(data.results[i].date).diff(now, "days");

      if (days_to_race >= -2 && days_to_race <= 14) {
        if (data.results[i].date.length > 4) {
          if (days_to_race <= 14 && days_to_race >= 8) {
            alert_level="alert-warning";
            alert_image="https://www.hendersonvilleraceseries.com/img/AthlinkRegister";
            alert_message="Registration Alert";
            alert_message2=days_to_race + " days till race";
            alert_link=data.results[i].register;
          } else if (days_to_race <= 7 && days_to_race >= 1) {
            alert_level="alert-danger";
            alert_image="https://www.hendersonvilleraceseries.com/img/AthlinkRegister";
            alert_message="Registration Alert";
            alert_message2=days_to_race + " days till race";
            alert_link=data.results[i].register;
          } else if (days_to_race <= 0) {
            alert_level="alert-success";
            alert_image="https://www.hendersonvilleraceseries.com/img/AthlinkResults";
            alert_message="Did you Run?";
            alert_message2="";
            alert_link=data.results[i].results;
          }
          output += "<div class='alert-content " + alert_level + " text-center " + data.results[i].tags + "'>";
          // output += "<div class='alert alert-warning' role='alert'>";
          output += "<div class='col-md-4 alert-left'>";
          output += "<h5>" + alert_message + "</h5>";
          output += "<div>" + alert_message2 + "</div>";
          output += "</div>";
          output += "<div class='col-md-4'>";
          output += "<h4><a href='" + data.results[i].url + "' target='hrs'>" + data.results[i].title + "</a></h4>";
          output += "<div class=''>";
          output += "<i class='far fa-clock' aria-hidden='true'></i> " + moment(data.results[i].date).format("dddd MMMM DD, YYYY");
          output += " &#8226; " + data.results[i].time;
          output += "</div>";
          output += "<div class=''>";
          output += "<i class='fas fa-map-marker-alt' aria-hidden='true'></i> " + data.results[i].location;
          output += "</div>";
          output += "</div>";
          output += "<div class='col-md-4 text-center'>";
          output += "<a href='" + alert_link + "' target='hrs'>";
          output += "<picture>";
					output += "  <source type='image/webp' srcset='" + alert_image + ".webp' height='35'>";
					output += "  <img src='" + alert_image + ".png' height='35' alt='athlink'>";
				  output += "</picture>";
          output += "</a>";
          output += "</div>";
          output += "</div>";
        }
      }
    }
    race_alert.html(output);
  });
});
