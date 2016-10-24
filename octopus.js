
function init() {
  //get project name
  var project = window.location.hash.split("/")[window.location.hash.split("/").length - 1];

  //wait for Octo to populate the tab
  if($("progression-matrix td[id*='Env']").length > 0) {
    var temp = $("progression-matrix td[id*='Env'] a");

    // each packages
    temp.each(function(i) {
      var el = temp[i];

      // exclude "deploy" button and populated versions
      if($(el).find(".version").length == 1 && $(el).find(".release").length == 0) {

        //extract version, create URL
        var v = $(el).find(".version").text().replace(/\s/g, "");
        var url = "https://github.com/CKOTech/"+project+"/releases/tag/"+v

        //create link
        $(el).append("<a class='release' href='"+url+"'>Release Notes</a>")
      }
    })

  }

  //We want to retry if the tab isn't populated, or start again if Octo refreshed the grid
  setTimeout(init, 500);
}
init();
