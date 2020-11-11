var count   =   1;
function BNotification(status = "success", details = false, duration = 4000){
    switch (status){
        case    'success'   :
        default             :
            var color   =   "#6dc066";
            break;
        case    'alert'     :
            var color   =   "#ff4040";
            break;
        case    'danger'    :
            var color   =   "#ffa500";
            break;
    }


    if(!details)
        details =   "Bir sorun oluştu.";

    clearAllBNotification();
    createBNotification(color, details, duration);
}

function clearBNotification(element, duration){
    setTimeout(function(){
        element.animate({"top" : "-"+(notification.innerHeight() + 20)+"px"});
    }, duration);
    setTimeout(function(){
        element.remove();
    }, duration+1000);
    count++;
}

function clearAllBNotification(){
    $("body").find("div.BNotification").hide(50);
    setTimeout(function(){
        $("body").find("div.BNotification").remove();
    },55);
}

function createBNotification(color, details, duration){
    setTimeout(function(){
        $("body").append("<div class='BNotification' id='notification_"+count+"' style='background-color:"+color+"'>"+details+"</div>");

        notification    =   $("body").find("div.BNotification[id='notification_"+count+"']");
        notification.animate({'top' : "55px"});
        clearBNotification(notification, duration);
    }, 60);
}
