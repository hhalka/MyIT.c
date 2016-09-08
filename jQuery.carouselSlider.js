(function($) {
    $.fn.carrouselSlider = function(options){
        var defaults = {
            "font-family": "'Playfair Display', serif",
            changeTime: 500
        };
        
        var settings = $.extend({}, defaults, options || {});
        
        var slideImage = $(".profilePhoto").find("img");
        var slideTitle = $(".slideSummary").find("h1");
        var slideSummary = $(".slideSummary").find("p");
        var leftArrow = $(".carrouselArrowLeft");
        var rightArrow = $(".carrouselArrowRight");
        var elementsList = $(".carrouselList");

        var slides = settings.slides;
        var pixelsOffset = 222;
        var elementsCount = elementsList.find("li").length;
        
        var desc = $("p");
        desc.css({
            color: settings.textColor,
            fontFamily: settings.font
        });
        
        function revalidate() {
            var index = $.fn.carrouselSlider.currentSlide;
            slideImage.attr({"src": slides[index].image});
            slideTitle.text(slides[index].title);
            slideSummary.text(slides[index].summary);
        };
        
        function reposition() {
            revalidate();
            elementsList.css({"marginLeft": "-" + pixelsOffset * $.fn.carrouselSlider.currentSlide + "px"});
        };

        reposition();
        
        leftArrow.click(function(){
            if($.fn.carrouselSlider.currentSlide === 0) {
                $.fn.carrouselSlider.currentSlide = elementsCount - 1;
                elementsList.css({"marginLeft": "-" + pixelsOffset * elementsCount - 1});
                elementsList.animate({"marginLeft": "+=" + pixelsOffset}, settings.changeTime);
            } else {
                elementsList.animate({"marginLeft": "+=" + pixelsOffset}, settings.changeTime);
                $.fn.carrouselSlider.currentSlide--;
            }
            revalidate();
        });

        rightArrow.click(function(){
            if($.fn.carrouselSlider.currentSlide === elementsCount - 1) {
                $.fn.carrouselSlider.currentSlide = 0;
                elementsList.css({"marginLeft": pixelsOffset});
                elementsList.animate({"marginLeft": 0}, settings.changeTime);
            } else {
                elementsList.animate({"marginLeft": "-=" + pixelsOffset}, settings.changeTime);
                $.fn.carrouselSlider.currentSlide++;
            }
            revalidate();
        });
        
        $.fn.carrouselSlider.onCurrentSlideChanged = reposition;
    };
    $.fn.carrouselSlider.currentSlide = 0;
    $.fn.carrouselSlider.setCurrentSlide = function(value) {
        $.fn.carrouselSlider.currentSlide = value;
        $.fn.carrouselSlider.onCurrentSlideChanged();
    };
})(jQuery);