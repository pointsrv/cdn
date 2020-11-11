let mouse = {locker : 0};
let item = {};
$("div.box-4").on("mouseenter", function(){
    $(this).on("mousemove", function(event){
        mouse.x =   event.pageX;
        mouse.y =   event.pageY;
        if($("div.box-4 div.userBox div.mouseTracking").length > 0 && mouse.locker == 0)
        {

            $("div.box-4 div.userBox div.mouseTracking").each(function(){
                item = {
                    item : $(this),
                    height : $(this).innerHeight(),
                    width : $(this).innerWidth(),
                    top : $(this).offset().top,
                    left : $(this).offset().left,
                    backgroudSize : 1600
                };
                item.backgroundPart = item.backgroudSize / 8;
                item.yCenter = $(this).offset().top + (item.height/2);
                item.xCenter = $(this).offset().left + (item.width/2);
                item.right = item.left + item.width;
                item.bottom = item.top + item.height;
                if(item.top > mouse.y && item.yCenter > mouse.y && item.xCenter < mouse.x && item.right < mouse.x) // CLOCK-1
                    imageChanger(-(4*item.backgroundPart));
                else if(item.top < mouse.y && item.bottom > mouse.y && item.right < mouse.x && item.left < mouse.x) // CLOCK-3
                    imageChanger(-(5*item.backgroundPart));
                else if(item.top < mouse.y && item.yCenter < mouse.y && item.right < mouse.x && item.xCenter < mouse.x) // CLOCK-5
                    imageChanger(-(6*item.backgroundPart));
                else if(item.top < mouse.y && item.bottom < mouse.y && item.left < mouse.x && item.right > mouse.x) // CLOCK-6
                    imageChanger(-(7*item.backgroundPart));
                else if(item.top < mouse.y && item.yCenter < mouse.y && item.left > mouse.x && item.right > mouse.x) // CLOCK-8
                    imageChanger(0);
                else if(item.top < mouse.y && item.bottom > mouse.y && item.left > mouse.x && item.right > mouse.x) // CLOCK-9
                    imageChanger(-(item.backgroundPart));
                else if(item.top > mouse.y && item.yCenter > mouse.y && item.xCenter > mouse.x && item.left > mouse.x) // CLOCK-11
                    imageChanger(-(2*item.backgroundPart));
                else if(item.top > mouse.y && item.bottom > mouse.y && item.left < mouse.x && item.right > mouse.x) // CLOCK-12
                    imageChanger(-(3*item.backgroundPart));
                else if(item.top < mouse.y && item.bottom > mouse.y && item.left < mouse.x && item.right > mouse.x) // HOVER
                    imageChanger(-(8*item.backgroundPart));

                function imageChanger(px){
                    item.item.find('img').css({"transform": "translateX("+px+"px)"});
                }
            });
        }
    });
});

$("div.box-4").on("mouseleave", function(){
    $("div.box-4 div.userBox div.mouseTracking").find('img').css({"transform": "translateX(-"+(8*item.backgroundPart)+"px)"});
});

$("div.box-4 div.userBox div.mouseTracking").on("mouseenter", function(){
    mouse.locker = 1;
    $("div.box-4 div.userBox div.mouseTracking").not($(this)).find('img').css({"filter":"brightness(60%)","transform":"translateX(-"+(9*item.backgroundPart)+"px)"});
    $(this).find('img').css({"transform":"translateX(-"+(8*item.backgroundPart)+"px)"});
});

$("div.box-4 div.userBox div.mouseTracking").on("mouseleave", function(){
    mouse.locker = 0;
    $("div.box-4 div.userBox div.mouseTracking").find('img').css({"filter":"brightness(100%)"});
});