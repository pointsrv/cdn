

var ajaxDefault = (form = false, url, arg = false, method = "POST") => {
    if(!form && !arg)
        return false;

    var data;
    if(form)
        data = form.serializeArray();
    else if(arg)
        data = arg;
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method || 'GET', url, true);

        xhr.onload = () => {
            if(xhr.status >= 200 && xhr.status < 300)
                resolve(xhr);
            else
                reject(xhr);
        };
        xhr.onerror = () => {
            reject(xhr);
        };
        xhr.send(data);
    });
};
//  MODAL
$('#altModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('Paket Seçimi: ' + recipient)
  modal.find('.modal-body input secim').val(recipient)
})

//  RANDOM COLOR

function randomColor(){
    var rand = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f' ];
    return '#' + rand[Math.ceil(Math.random() * 15)] + rand[Math.ceil(Math.random() * 15)] + rand[Math.ceil(Math.random() * 15)] + rand[Math.ceil(Math.random() * 15)] + rand[Math.ceil(Math.random() * 15)] + rand[Math.ceil(Math.random() * 15)];
}

function redirectURI(link) {
    window.location = link;
}


let scroll = {value : $(window).scrollTop()};

$(document).on("scroll", function() {
    scroll.value = $(window).scrollTop();
});

$(document).on("mousemove", function(event){
    mouse.x =   event.pageX;
    mouse.y =   event.pageY;
    mouse.xClient = event.clientX;
    mouse.yClient = event.clientY;
});

function scrollAnimate(item) {
    $("html, body").animate({scrollTop: $(item).offset().top}, 1000);
    if($(window).innerWidth() < 768)
        mobileMenu.hide();
}

function scrollAnimateTop() {
    $("html, body").animate({scrollTop: 0}, 1000);
}

/*  CURSOR  FUNCTIONS   */
let cursor =   {
    pointerDiv : $("div.mousePointer"),
    mouseCircle :   $("div.mousePointer div.mouseCircle"),
    mouseCircleMini : $("div.mousePointer div.mouseCircleMini"),
    mouseCircleMiniLocker : 0,
    mouseClickAnimate : $("div.mousePointer div.mouseClickAnimate"),
    mouseSpecialAnimate : $("div.mousePointer div.mouseSpecialAnimate"),
    specialAnimateDiv : $("div.specialHoverShow"),
    specialAnimateSetTime : false
};
cursor.cursorInit = () => {
    $("div.mousePointer").show();
};
cursor.cursorDeActive = () => {
    $("div.mousePointer").hide();
};
cursor.mouseCircleAnimate = () => {
    cursor.mouseCircle.css({left : mouse.xClient-7, top: mouse.yClient-7});
    cursor.mouseClickAnimate.css({left : mouse.xClient-3, top: mouse.yClient-3});
    cursor.mouseSpecialAnimate.css({left : mouse.xClient, top: mouse.yClient});
    cursor.mouseCircleMiniAnimate();
};
cursor.mouseCircleMiniAnimate = () => {
    let x   =   {
        x : mouse.xClient,
        y : mouse.yClient
    };
    cursor.mouseCircleMini.css({left : mouse.xClient-5, top: mouse.yClient-5});
    cursor.mouseCircleMiniLocker = 1;
    let interval = setTimeout(function() {
        if(x.x === mouse.xClient && x.y === mouse.yClient && cursor.mouseCircleMiniLocker === 1)
        {
            cursor.mouseCircleMiniLocker = 0;
            clearTimeout(interval);
            cursor.mouseCircleMiniAnimateStopMouse();
        }
    }, 2000);
};
cursor.mouseCircleMiniAnimateStopMouse = () => {
    if(cursor.mouseCircleMiniLocker === 0)
    {
        cursor.mouseCircleMini.css({left : mouse.xClient-20, top: mouse.yClient-25, backgroundColor : randomColor()}, setTimeout(function() {
            cursor.mouseCircleMini.css({left : mouse.xClient-20, top: mouse.yClient+15, backgroundColor : randomColor()}, setTimeout(function() {
                cursor.mouseCircleMini.css({left : mouse.xClient+15, top: mouse.yClient+15, backgroundColor : randomColor()}, setTimeout(function() {
                    cursor.mouseCircleMini.css({left : mouse.xClient+15, top: mouse.yClient-25, backgroundColor : randomColor()}, setTimeout(function() {
                        cursor.mouseCircleMiniAnimateStopMouse()
                    }, 500));
                }, 500));
            }, 500));
        }, 500));
    }
};
cursor.mouseClickAnimation = () => {
    cursor.mouseClickAnimate.addClass("active").css({backgroundColor : "rgba(0, 0, 0, .3)"});
    setTimeout(function() {
        cursor.mouseClickAnimate.removeClass("active");
    }, 500);
};
cursor.mouseHoverAnimation = () => {
    cursor.mouseClickAnimate.addClass("hover");
};
cursor.mouseHoverAnimationFalse = () => {
    cursor.mouseClickAnimate.removeClass("hover");
};
cursor.specialAnimateShow = () => {
    cursor.specialAnimateDiv.show(0);
    cursor.specialAnimateDiv.find("div.lockerTop, div.lockerDown").animate({height: "50%"}, 1000, function() {
        cursor.specialAnimateDiv.find("div.inner").show().addClass("animate");
    });
};
cursor.specialAnimateHide = () => {
    let items = ["div.lockerTop", "div.lockerDown", "div.inner"];
    cursor.specialAnimateDiv.hide(0);
    for(item in items){
        cursor.specialAnimateDiv.find(items[item]).removeAttr("style");
    }
};


$(document).on("mouseenter", function() {
    cursor.cursorInit();
}).on("mousemove", function() {
    cursor.mouseCircleAnimate();
}).on("mouseleave", function() {
    cursor.cursorDeActive();
});

$("iframe").on("mouseenter", function() {
    cursor.cursorDeActive();
}).on("mouseleave", function() {
    cursor.cursorInit();
});

$(document).on("click", function() {
    cursor.mouseClickAnimation();
});

$(".pointerHoverItem").on("mouseover", function() {
    cursor.mouseHoverAnimation();
}).on("mouseleave", function() {
    cursor.mouseHoverAnimationFalse();
});

$(".specialAnimateHoverItem").on("mouseenter", function() {
    cursor.specialAnimateHide();
    cursor.specialAnimateSetTime = setTimeout(function() {
        $(".specialAnimateHoverItem").css({position : "relative", "z-index" : 9999});
        cursor.specialAnimateShow();
    }, 2000);
}).on("mouseleave", function() {
    $(".specialAnimateHoverItem").removeAttr("style");
    cursor.specialAnimateHide();
    clearTimeout(cursor.specialAnimateSetTime);
});

/*  WINDOW BLUR */
let windowTitleChanger = {
    default : $("title").html()
};
windowTitleChanger.titleChanger = (data) => {
    $("title").html(data);
};
$(window).on("blur", function() {
    windowTitleChanger.titleChanger("Bizi unuttunuz! | Point Medya Tasarım");
}).on("focus", function() {
    windowTitleChanger.titleChanger(windowTitleChanger.default);
});

/*  LOADER  */

let loader = {
    item : $("div.loader"),
    p : $("div.loader p"),
    div : $("div.loader div.hideText"),
    i : 0,
    x : 0
};
loader.divLeng = loader.div.length;

loader.animate = () => {
    var text = $("div.loader div.hideText").eq(loader.i).text(),
        textLen =   text.length;
    var h3Text  =   loader.p.text();
    h3Text += text[loader.x];
    loader.p.html(h3Text);
    if(loader.x < textLen - 1)
    {
        loader.x++;
        setTimeout(function() {
            loader.animate();
        }, 75);
    }
    else if(loader.x == textLen - 1)
    {
        setTimeout(function() {
            loader.x = 0;
            if(loader.i < loader.divLeng - 1)
                loader.i++;
            else
                loader.i = 0;
            loader.p.empty();
            loader.animate();
        }, 3000);
    }
};

$(window).on("load", function() {
    loader.loaderHide();
});

loader.loaderHide = () => {
    setTimeout(function() {
        loader.item.slideUp(500, function() {
            loader.item.remove();
        });
    }, 200);
};

loader.animate();

/*  WORK SHOWCASE   */

$("div.box-3 div.miniBanner div.miniBannerBox").on("mouseenter", function() {
    var hovItem    =    $(this),
        itemOffset =    hovItem.offset(),
        hoverItem = {
        yCenter : itemOffset.top + (hovItem.innerHeight() / 2),
        xCenter : itemOffset.left + (hovItem.innerWidth() / 2),
        top : itemOffset.top,
        bottom : itemOffset.top + hovItem.innerHeight(),
        left : itemOffset.left,
        right : itemOffset.left + hovItem.innerWidth(),
        pattern : hovItem.find("div.pattern"),
        patternH3 : hovItem.find("div.pattern h3")
    };
    if(mouse.x >= hoverItem.left && mouse.x <= hoverItem.right && mouse.y <= hoverItem.yCenter)
    {
        hoverItem.css = {left : 0, top : "-100%"};
        hoverItem.animate = {top : "0"};
        hoverItem.textCss   =   {marginTop : "-30px"};
    }
    else if(mouse.y >= hoverItem.top && mouse.y <= hoverItem.bottom && mouse.x >= hoverItem.xCenter)
    {
        hoverItem.css = {left : "100%", top: 0};
        hoverItem.animate = {left : 0};
        hoverItem.textCss   =   {marginLeft : "30px"};
    }
    else if(mouse.x >= hoverItem.left && mouse.x <= hoverItem.right && mouse.y >= hoverItem.yCenter)
    {
        hoverItem.css   =   {left : 0, top : "100%"};
        hoverItem.animate   =   {top : 0};
        hoverItem.textCss   =   {marginTop : "30px"};
    }
    else if(mouse.y >= hoverItem.top && mouse.y <= hoverItem.bottom && mouse.x <= hoverItem.xCenter)
    {
        hoverItem.css   =   {left : "-100%", top : 0};
        hoverItem.animate   =   {left : 0};
        hoverItem.textCss   =   {marginLeft : "-30px"};
    }
    hoverItem.pattern.show().css(hoverItem.css).stop().animate(hoverItem.animate, 300);
    hoverItem.patternH3.removeAttr("style").css(hoverItem.textCss).delay(200).animate({margin : 0}, 300);
}).on("mouseleave", function(e) {
    var item = $(this),
        itemOffset = item.offset();
    if(e.pageY <= itemOffset.top && e.pageX >= itemOffset.left && e.pageX <= (itemOffset.left + item.innerWidth()))    //  TOP
        animate =   {top : "-100%"};
    else if(e.pageY >= (itemOffset.top + item.innerHeight()) && e.pageX >= itemOffset.left && e.pageX <= (itemOffset.left + item.innerWidth()))   //  BOTTOM
        animate =   {top : "100%"};
    else if(e.pageY >= itemOffset.top && e.pageY <= (itemOffset.top + item.innerHeight()) && e.pageX >= (itemOffset.left + item.innerWidth()))  //  RIGHT
        animate =   {left : "100%"};
    else if(e.pageY >= itemOffset.top && e.pageY <= (itemOffset.top + item.innerHeight()) && e.pageX <= itemOffset.left)   //  LEFT
        animate =   {left : "-100%"};
    item.find("div.pattern").css({top : 0, left : 0}).stop().animate(animate, 300);
    item.find("div.pattern h3").removeAttr("style");
});

/*  LOGO LIST ANIMATE   */

let logoList    =   {
    item    :   $("div.box-9 div.logoList div.box div.inner")
};

logoList.animate = () => {
    logoList.item.each(function() {
        if((scroll.value - (($(window).innerHeight() / 100) * 20)) >= $(this).offset().top)
            $(this).css({transform : "scale(1)"});
    });
};

$(document).on("scroll", function() {
    logoList.animate();
});

//  VIDEO LIST PAGE

let videoList = {
    items : $("div.box-9 div.videoJobsInner div.videoBox")
};

$(window).on("load resize", function() {
    videoList.init();
});

videoList.init = () => {
    var width = ($(window).innerWidth() / 100) * 20;
    var index = 1;
    videoList.items.height(width);
    videoList.items.each(function() {
        if(index == 3)
        {
            $(this).width(width);
            index = 1;
        }
        else
        {
            $(this).width((($(window).innerWidth() / 100) * 40));
            index++;
        }
    });
};

//  VIDEO POPUP PAGE

let videoPopup = {
    show : (code) => {
        $("div.videoPopup").show();
        $("div.videoPopup iframe").attr("src", "https://player.vimeo.com/video/"+code+'?autoplay=1');
    },
    hide : () => {
        $("div.videoPopup").hide();
        $("div.videoPopup iframe").attr("src", "");
    }
};

$(window).on("keydown", function(e) {
    if(e.keyCode == 27)
        videoPopup.hide();
});

/*  OTHER PROJECTS SLID */

let otherProjectsSlid = {
    item : $("div.box-9 div.otherProjects div.container div.itemsBox"),
    index : 0,
    intervalTime : 2000,
    animateTime : 500,
    locker : 0
};
otherProjectsSlid.init = () => {
    otherProjectsSlid.leng = otherProjectsSlid.item.find("ul li").length;
    otherProjectsSlid.resize();
};
otherProjectsSlid.resize = () => {
    otherProjectsSlid.height = otherProjectsSlid.item.find("div.jobBox").innerHeight();
    if(window.innerWidth > 991)
    {
        otherProjectsSlid.width = (otherProjectsSlid.item.innerWidth() / 100) * 25;
        otherProjectsSlid.totalWidth = otherProjectsSlid.width * otherProjectsSlid.leng;
        otherProjectsSlid.totalListCount = 4;
    }
    else if(window.innerWidth >= 768 && window.innerWidth <= 991)
    {
        otherProjectsSlid.width = (otherProjectsSlid.item.innerWidth() / 100) * 33.3333;
        otherProjectsSlid.totalWidth = otherProjectsSlid.width * otherProjectsSlid.leng;
        otherProjectsSlid.totalListCount = 3;
    }
    else
    {
        otherProjectsSlid.width = (otherProjectsSlid.item.innerWidth() / 100) * 50;
        otherProjectsSlid.totalWidth = otherProjectsSlid.width * otherProjectsSlid.leng;
        otherProjectsSlid.totalListCount = 2;
    }
    otherProjectsSlid.item.find("ul li").width(otherProjectsSlid.width);
    otherProjectsSlid.item.find("ul").width(otherProjectsSlid.totalWidth);
    otherProjectsSlid.item.find("ul").height(otherProjectsSlid.height);
    otherProjectsSlid.item.find("ul").css({marginLeft : -(otherProjectsSlid.index * otherProjectsSlid.width)+"px"});
};

otherProjectsSlid.animation = () => {
    if(otherProjectsSlid.index < otherProjectsSlid.leng - otherProjectsSlid.totalListCount)
        otherProjectsSlid.index++;
    else
        otherProjectsSlid.index = 0;

    otherProjectsSlid.item.find("ul").animate({marginLeft : -(otherProjectsSlid.index * otherProjectsSlid.width)+"px"}, otherProjectsSlid.animateTime);
    otherProjectsSlid.setTime = setTimeout(function() {
        otherProjectsSlid.animation();
    }, otherProjectsSlid.intervalTime);
};

otherProjectsSlid.item.on("mouseenter", function() {
    clearTimeout(otherProjectsSlid.setTime);
}).on("mouseleave", function() {
    otherProjectsSlid.setTime = setTimeout(otherProjectsSlid.animation, otherProjectsSlid.intervalTime);
});

$(window).on("load", function() {
    otherProjectsSlid.init();
});

otherProjectsSlid.setTime = setTimeout(function() {
    otherProjectsSlid.animation()
}, otherProjectsSlid.intervalTime);
$(window).on("resize", function() {
    otherProjectsSlid.resize();
});

/*  TOP FIXED MENU  */

let topHeader = {
    item : $("div.topHeader, div.topHeader2")
};
if(topHeader.item.length > 0)
    topHeader.position = topHeader.item.offset().top + topHeader.item.innerHeight();


$(window).on("scroll", function() {
    if(scroll.value > topHeader.position)
    {
        if(!topHeader.item.hasClass('toFixed'))
        {
            topHeader.item.addClass("toFixed");
            topHeader.item.find("i.icon").css({transform: "rotateY(360deg)"});
        }
    }
    else
    {
        topHeader.item.removeClass("toFixed");
        topHeader.item.find('i.icon').removeAttr("style");
    }
});

let topHeader2 = {
    item : $("div.topHeader2")
};
if(topHeader2.item.length > 0)
    topHeader2.position = $("div.box-2").offset().top + $("div.box-2").innerHeight();

$(window).on("scroll", function() {
    if(scroll.value > topHeader2.position)
    {
        if(!topHeader2.item.hasClass('toFixed'))
        {
            topHeader2.item.addClass("toFixed").show();
            topHeader2.item.find("i.icon").css({transform: "rotateY(360deg)"});
        }
    }
    else
    {
        topHeader2.item.removeClass("toFixed").hide();
        topHeader2.item.find('i.icon').removeAttr("style");
    }
});

/*  FORMS    */

$("label.checkLabel").on("click", function() {
    if($(this).find('input[type="checkbox"]').prop('checked'))
        $(this).find("i.icon").addClass('active');
    else
        $(this).find("i.icon").removeClass('active');
});

$("div.selectIconBar, div.selectInputDiv").on("click", function() {
    $("div.selectList").slideToggle();
});

$("div.selectList ul li").on("click", function() {
    $("input[name='jobs']").val($(this).attr("data-value"));
    $("div.selectInputDiv span").text($(this).text());

    $(this).parent().parent().slideToggle();
});

let forms = document.querySelectorAll("form");

forms.forEach(item => {
    var form = item;

    form.querySelectorAll('input[type="file"]').forEach(item => {
        var input = item;
        if(input.hasAttribute('data-connect'))
        {
            input.addEventListener('change', (e) => {
                form.querySelector(input.getAttribute('data-connect')).innerHTML = input.files[0].name;
            });
        }
    });

    item.addEventListener("submit", e => {
        e.preventDefault();
        var controls = {
            success : 1,
            message : false
        };

        var submitBttn = form.querySelector('input[type="submit"]'),
            bttn    =   form.querySelector('div.bttn'),
            bttnText = bttn.innerHTML;
        submitBttn.setAttribute('disabled', 'disabled');

        form.querySelectorAll('.formInput').forEach(item => {
            if(item.hasAttribute('data-req'))
            {
                if(item.type === 'text' || item.type === 'hidden' || item.type === 'file')
                {
                    if(item.value.length === 0)
                    {
                        controls = {
                            success : 0,
                            message : "Eksik veya hatalı alanlar mevcut!"
                        };

                        if(item.hasAttribute('data-connect'))
                        {
                            document.querySelector(item.getAttribute('data-connect')).style.backgroundColor = 'rgba(255,0,0, .6)';
                            setTimeout(() => {
                                document.querySelector(item.getAttribute('data-connect')).removeAttribute('style');
                            }, 2000);
                        }
                        else
                        {
                            item.style.backgroundColor = 'rgba(255,0,0, .6)';
                            setTimeout(() => {
                                item.removeAttribute('style');
                            }, 2000);
                        }

                        form.querySelector('div.bttn').style.transform = "translateX(-15px)";
                        setTimeout(() => {
                            form.querySelector('div.bttn').style.transform = "translateX(15px)";
                            setTimeout(() => {
                                form.querySelector('div.bttn').style.transform = "translateX(0)";
                            }, 75);
                        }, 75);
                    }
                }
                else if(item.type === 'checkbox')
                {
                    if(!item.checked)
                    {
                        controls = {
                            success : 0,
                            message : "Eksik veya hatalı alanlar mevcut!"
                        };
                        if(item.hasAttribute('data-connect'))
                        {
                            document.querySelector(item.getAttribute('data-connect')).style.backgroundColor = 'rgba(255,0,0, .6)';
                            setTimeout(() => {
                                document.querySelector(item.getAttribute('data-connect')).removeAttribute('style');
                            }, 2000);
                        }
                        else
                        {
                            item.style.backgroundColor = 'rgba(255,0,0, .6)';
                            setTimeout(() => {
                                item.removeAttribute('style');
                            }, 2000);
                        }

                        form.querySelector('div.bttn').style.transform = "translateX(-15px)";
                        setTimeout(() => {
                            form.querySelector('div.bttn').style.transform = "translateX(15px)";
                            setTimeout(() => {
                                form.querySelector('div.bttn').style.transform = "translateX(0)";
                            }, 75);
                        }, 75);
                    }
                }
            }
        });
        if(controls.success)
        {
            bttn.innerHTML = 'LÜTFEN BEKLEYİNİZ <i class="icon icon-clock"></i>';
            ajaxDefault(false, form.getAttribute('action'), new FormData(form))
            .then(response => {
                var data = JSON.parse(response.response);
                if(response.status === 200 && data.successPost)
                {
                    bttn.innerHTML    =   data.successPostDetails+' <i class="icon icon-ok" style="vertical-align: center"></i>';
                    bttn.style.backgroundColor = 'rgba(0, 255, 0, .6)';
                    BNotification("success", data.successPostDetails);
                }
                else
                {
                    bttn.innerHTML    =   data.successPostDetails+' <i class="icon icon-cancel" style="vertical-align: center"></i>';
                    bttn.style.backgroundColor = 'rgba(255, 0, 0, .6)';
                    BNotification("alert", data.successPostDetails);
                    setTimeout(() => {
                        bttn.innerHTML = bttnText;
                        bttn.removeAttribute('style');
                        submitBttn.removeAttribute('disabled');
                    }, 2000);
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
        else
        {
            itemDeleteTimer(form.querySelectorAll('div.alertForm'));
            BNotification("danger", controls.message);
            submitBttn.removeAttribute('disabled');
            itemDeleteTimer(form.querySelectorAll('div.alertForm'), 2000);
        }
    });
});

function itemDeleteTimer(item, timeOut = 0) {
    setTimeout(() => {
        item.forEach(item => {
            item.remove();
        });
    }, timeOut);
}

/*  MOBILE MENU */

let mobileMenu = {
    item : $("div.box-2 div.menu"),
    show : function() {
        mobileMenu.item.css({display : "table", transitionDuration : ".5s"});
        setTimeout(function() {
            mobileMenu.item.css({transform:"translateY(0)", borderRadius: 0});
            mobileMenu.item.find("ul").css({transform: "translateY(0)"});
        }, 100);
    },
    hide : function() {
        mobileMenu.item.css({transform:"translateY(-100%)", height:0});
        setTimeout(function() {
            mobileMenu.item.removeAttr("style");
            mobileMenu.item.find("ul").removeAttr("style");
        }, 500);
    }
};

$("div.box-2 div.menuBttn").on("click", function() {
    mobileMenu.show();
});

/*  GOTOP   */

$(window).on("scroll", function() {
    if(scroll.value > ($(document).innerHeight() / 100) * 10)
        $("div.goTop").css({transform:"translateX(0) rotate(-90deg)",});
    else
        $("div.goTop").removeAttr("style");
});

/*  IMAGE LOADER */

window.addEventListener('load', () => {
    document.querySelectorAll('img.bLoader').forEach(img => {
        var scrollTop = window.pageYOffset;
        var rect = img.getBoundingClientRect();
        if(rect.top < (window.innerHeight + scrollTop) && !img.classList.contains('active')) {
            img.src = img.getAttribute('data-url');
            img.classList.add('active');
        }
    });
    document.addEventListener('scroll', () => {
        document.querySelectorAll('img.bLoader').forEach(img => {
            var scrollTop = window.pageYOffset;
            var rect = img.getBoundingClientRect();
            if(rect.top < (window.innerHeight + scrollTop) && !img.classList.contains('active')) {
                img.src = img.getAttribute('data-url');
                img.classList.add('active');
            }
        });
    });
});

/*  REFERENCE LIST ANIM */

const refListAnim = () => {
    var randNum = Math.floor(Math.random()*$('div.box-5 div.inner div.reference').length);
    var randNum2= Math.floor(Math.random()*$('div.box-5 div.inner div.reference').length);

    var img1 = $('div.box-5 div.inner div.reference:nth-child('+randNum+') img');
    var img2 = $('div.box-5 div.inner div.reference:nth-child('+randNum2+') img');

    img1.css({'transform':'scale(1.3) rotateY(90deg)'});
    img2.css({'transform':'scale(1.3) rotateY(90deg)'});

    setTimeout(function() {
        var img1Url = img1.attr('data-url'),
            img2Url = img2.attr('data-url'),
            img1Alt  =   img1.attr('alt'),
            img2Alt = img2.attr('alt');
        img1.attr({
            'src': img2Url,
            'title' : img2Alt,
            'alt': img2Alt,
            'data-url': img2Url
        }).css({'transform':'scale(1) rotateX(0)'});
        img2.attr({
            'src': img1Url,
            'title' : img1Alt,
            'alt': img1Alt,
            'data-url': img1Url
        }).css({'transform':'scale(1) rotateX(0)'});
    }, 600);
};

window.addEventListener('load', () => {
    setInterval(refListAnim, 2000);
});