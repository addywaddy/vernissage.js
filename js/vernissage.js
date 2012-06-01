(function($) {
  $.fn.vernissage = function(options) {
    var opts = $.extend({}, $.fn.vernissage.defaults, options);
    this.each(function() {
      var self = this;

      $(this).find("li:last-child img").load(function() {
        var imageWidth = this.width;
        var imageHeight = this.height;
        var imageCount = $(self).find("li").size();

        var classes = $(self).attr("class");
        $(self).attr("class", '');
        $(self).wrap("<div class='vernissage'>");
        $(self).parent("div").css({height: imageHeight + "px", position: 'relative', width: imageWidth + 'px', overflow: 'hidden'});
        $(self).css({cursor: 'pointer', padding: '0px', margin: '0px', width: (imageWidth * imageCount)  + "px", position: 'absolute'});
        var dup = $(self).clone();
        $(self).after(dup);
        var wrapper = $(self).parent("div").wrap("<div class='" + classes + "'>");
        wrapper.after("<p class='title'>");
        var title = wrapper.next("p");

        $(self).find("li").css({float: "left", "list-style": "none"});
        $(self).find("img").css({float: "left"});


        dup.find("li").css({float: "right", "list-style": "none"});
        dup.find("img").css({float: "right"});
        dup.css({opacity: opts.opacity, left: - (imageWidth * (imageCount -1)) + "px"});

        var count = 1;

        title.html($(self).find("li:nth-child(" + count + ") img").attr("alt"));

        $(self).parent("div").click(function() {
          if (parseInt($(dup).css("left"), 10) !== 0) {
            count +=1;
            $(self).animate({left: '-=' + imageWidth}, opts.speed, function() {
              title.html($(self).find("li:nth-child(" + count + ") img").attr("alt"));
            });
            $(dup).animate({left: '+=' + imageWidth}, opts.speed, function() {
              title.html($(self).find("li:nth-child(" + count + ") img").attr("alt"));
            });
          } else {
            count =1;
            $(self).animate({left: '+=' + (imageWidth * (imageCount -1))}, opts.speed, function() {
              title.html($(self).find("li:nth-child(" + count + ") img").attr("alt"));
            });
            $(dup).animate({left: '-=' + (imageWidth * (imageCount -1))}, opts.speed, function() {
              title.html($(self).find("li:nth-child(" + count + ") img").attr("alt"));
            });
          }
        });
      });

    });
  };

  $.fn.vernissage.defaults = {
    dir: 'left',
    speed: 1000,
    opacity: 0.2
  };
})(jQuery);
