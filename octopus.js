
// Release note cache system
var notes = {};
function getNotes(url) {

  if(!notes[url]) {
    $.get(url, function( data ) {
      var content = $($.parseHTML(data));
      notes[url] = content.find(".release-header").html() + content.find(".markdown-body").html();
    });
    return "Loading notes...";
  }

  return notes[url];
}

function getProject(project) {
  switch(project) {
    case "Checkout.hub" :
      return "checkout-hub";
    break;
    case "Gateway API" :
    case "gateway-api" :
    case "gateway-recurring-console" :
    case "Gateway Recurring Console" :
      return "checkout-merchant-api";
    break;
    default:
      return project;
    break;
  }
}

//Init method
function init() {

  //wait for Octo to populate the tab
  if($("table td[id*='Env']").length > 0) {
    var temp = $("table td[id*='Env']");

    // each packages
    temp.each(function(i) {
      var el = temp[i];

      var project;
      //get project name
      if(window.location.hash.indexOf("projects") >= 0) {
        project = getProject(window.location.hash.split("/")[window.location.hash.split("/").length - 1]);
      }
      else {
        project = getProject($(el).parent().find("th .media-body").text());
      }


      // exclude "deploy" button and populated versions
      if($(el).find(".version").length == 1 && $(el).find(".release").length == 0) {

        //extract version, create URL
        var v = $(el).find(".version").text().replace(/\s/g, "");
        var url = "https://github.com/CKOTech/"+project+"/releases/tag/"+v

        //Add informations
        var notes = getNotes(url);

        $(el).on("mouseover", function(e) {
          var _url = url+"";
          $('#cko-tooltip').html(getNotes(_url));
          $('#cko-tooltip').show();
          $('#cko-tooltip').css("top", $(this).offset().top + $(this).height() + 20);
          $('#cko-tooltip').css("left", $(this).offset().left - $('#cko-tooltip').width() / 2 + $(this).width() / 2);
        })

        $(el).on("mouseout", function(e) {
          $('#cko-tooltip').hide();
        })

        //create link
        $(el).append("<a class='release' href='"+url+"'>Release Notes</a>")
      }
    })

  }

  //We want to retry if the tab isn't populated, or start again if Octo refreshed the grid
  setTimeout(init, 100);
}
init();

// Window modal
$("body").append("<div id='cko-tooltip'"+
    " style='box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22); padding:30px;position:absolute;"+
    " top:100px; left:0px; overflow : hidden; z-index:999999; min-width:300px; min-height:50px;max-width:600px; max-height:800px;border:1px silver solid; background:white; display:none;'"+
    "></div>")
