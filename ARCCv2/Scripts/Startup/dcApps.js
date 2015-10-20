$(document).ready(function() {


    /* ------------------------------------------------------
    //Tooltip (for Twitter Bootstrap - Not using. Using Angualar UI and AngularStrap instead
    ------------------------------------------------------ */

    //$("*[rel='tooltip']").tooltip();

    /* ------------------------------------------------------
    Pin / Unpin Application Header
    ------------------------------------------------------ */

    //var pinHeader = $('#pinHeader');
    //var contentContainer = $('header+div');
    //var adjustContentMargin = function(height) {
        //console.log(contentContainer.css('marginTop'));
        //if (height > 44) {
        //    contentContainer.css('margin-top', '44px');
        //} else {
        //    contentContainer.css('margin-top', '0');
        //}
        //console.log(contentContainer.css('marginTop'));
   // }; //Adjust Content Container Top Margin on Page Load

    //pinHeader.click(function() {
    //    var currentClass = $(this).attr('class');

    //    navbarHeight = $(".navbar-dcapp").height();
    //    var dcappHeader = navbarHeight + 90;

    //    if (currentClass === 'pinned-small-icon') {
    //        $(this).removeClass("pinned-small-icon");
    //        $(this).addClass("unpinned-small-icon");
    //        $('body').css('margin-top', 0);
    //        $('.dcapp-header').css('position', 'static');
    //    } else if (currentClass === 'unpinned-small-icon') {
    //        $(this).removeClass("unpinned-small-icon");
    //        $(this).addClass("pinned-small-icon");
    //        $('body').css('margin-top', dcappHeader);
    //        $('.dcapp-header').css('position', 'fixed');
    //    }
    //    adjustContentMargin(navbarHeight);

    //});

    //$(window).on("resize", function(event, ui) {

    //    var currentClass = pinHeader.attr('class');
    //    navbarHeight = $(".navbar-dcapp").height();

    //    if (currentClass === 'pinned-small-icon') {
    //        var dcappHeader = navbarHeight + 90;
    //        $('body').css('margin-top', dcappHeader);
    //    } else if (currentClass === 'unpinned-small-icon') {
    //        $('body').css('margin-top', 0);
    //    }
    //    adjustContentMargin(navbarHeight);

    //});

    //var navbarHeight = $(".navbar-dcapp").height();
    //adjustContentMargin(navbarHeight);

}); //End Document Ready

//$(window).bind("load", function () {
//    var navbarHeight = $(".navbar-dcapp").height();
//    //console.log(contentContainer.height());
//    adjustContentMargin(navbarHeight);
//});