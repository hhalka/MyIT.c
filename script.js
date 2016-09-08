
$(function(){
    
    var slides = [
        {
            image: "img/0.jpg",
            title: "Aragorn",
            summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga tenetur, eveniet. Ipsa ex pariatur id provident soluta, minus commodi explicabo porro nulla saepe illum non dolores libero iure, consequuntur tempore."
        },
        {
            image: "img/1.jpg",
            title: "Bilbo Baggins",
            summary: "bla-bla-bla."
        },
        {
            image: "img/2.jpg",
            title: "Celebrimbor",
            summary: "lalala."
        },
        {
            image: "img/3.jpg",
            title: "Denethor I",
            summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga tenetur, eveniet. Ipsa ex pariatur id provident soluta, minus commodi explicabo porro nulla saepe illum non dolores libero iure, consequuntur tempore."
        },
        {
            image: "img/4.jpg",
            title: "Éowyn",
            summary: "bla-bla-bla."
        },
        {
            image: "img/5.jpg",
            title: "Faramir",
            summary:"lalala."
        },
        {
            image: "img/6.jpg",
            title: "Samwise Gamgee",
            summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga tenetur, eveniet. Ipsa ex pariatur id provident soluta, minus commodi explicabo porro nulla saepe illum non dolores libero iure, consequuntur tempore."
        },
        {
            image: "img/7.jpg",
            title: "Hador",
            summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga tenetur, eveniet. Ipsa ex pariatur id provident soluta, minus commodi explicabo porro nulla saepe illum non dolores libero iure, consequuntur tempore."
        },
        {
            image: "img/8.png",
            title: "Legolas",
            summary:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga tenetur, eveniet. Ipsa ex pariatur id provident soluta, minus commodi explicabo porro nulla saepe illum non dolores libero iure, consequuntur tempore."
        },
        {
            image: "img/9.png",
            title: "Arwen",
            summary : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga tenetur, eveniet. Ipsa ex pariatur id provident soluta, minus commodi explicabo porro nulla saepe illum non dolores libero iure, consequuntur tempore."
        }
    ];
    
    var users = $(".users");
    var userList = $(".userList");
    var profile = $(".profile");
    var usersImages = $(".userImage");
    var gratitude = $(".gratitude");
    var responseForm = $("#responseForm");
    var textarea = responseForm.find("textarea");
    
    $(".profile").carrouselSlider({slides: slides}); 
    
    for(var i = 0; i < slides.length; i++){
        var imageContainer = $("<div>");
        var image = $("<img>");
        var title = $("<p>");
        var inputs = responseForm.find("input[type=text]");
        
        imageContainer.addClass("col-md-2");
        image.addClass("userImage");
        image.attr({"src": slides[i].image});
        title.text(slides[i].title);
        imageContainer.append(image);
        imageContainer.append(title);
        users.append(imageContainer);
        
        imageContainer.on("click", function(e) {
            profile.removeClass("hide");
            users.addClass("hide");
            var index = $(e.target).parent("div").index();
            $(".changeState").attr({"data-scroll": "profile"}).text("Profile");
            $.fn.carrouselSlider.setCurrentSlide(index); 
        });
    }
    
    $("#backToView").on("click", function() {
        profile.addClass("hide");
        users.removeClass("hide");
        $(".changeState").attr({"data-scroll": "users"}).text("Users");
    });
    
    $("#sendResponse").on("click", function() {
        if(checkInputs()){
            gratitude.css({"height": "83%"});
            responseForm.addClass("hide");
            responseForm.find("input[type=text]").val("");
            responseForm.find("textarea").val("");
        }else{
            alert("please, fill in all text fields");
        }
    });
    
    $("#sendMore").on("click", function() {
        gratitude.css({"height": "0%"});
        responseForm.removeClass("hide");
        $("#sendResponse").css({"color": "white"});
        inputs.css({"background-color": "white"});
        textarea.css({"background-color": "white"});
    });
    
    responseForm.on("keypress", function() {
        if(checkInputs()===true){
            $("#sendResponse").css({"color": "green"});
            inputs.css({"background-color": "#ccffdd"});
            textarea.css({"background-color": "#ccffdd"});
        }
    });
                    
    function checkInputs() {
        var  filled = true;
        for (var i= 0; i < inputs.length; i++){
            if($(inputs[i]).val() === ""){
                filled = false;
            }
        };
         return filled && textarea.val() !== "";
    };
    
    $("nav a").on("click", function() {
        var scrollAnchor = $(this).attr("data-scroll"),
            scrollPoint = $("section[data-anchor='" + scrollAnchor + "']").offset().top - 28;

        $("body,html").animate({
            scrollTop: scrollPoint
        }, 500);

        return false;
    });
    
    $(window).scroll(function() {
        var windscroll = $(window).scrollTop();
        if (windscroll >= 100) {
            $(".wrapper section").each(function(i) {
                if ($(this).position().top <= windscroll - 20) {
                    $("nav li.active").removeClass("active");
                    $("nav a").eq(i).parent("li").addClass("active");
                }
            });
        } else {
            $("nav li.active").removeClass("active");
            $("nav li:first").addClass("active");
        }

    }).scroll();
});