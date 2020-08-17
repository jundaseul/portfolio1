/* main.js */

$(function(){ /////////// jQB //////////////
    
    /*gnb 메뉴 슬라이드 이동 세팅*/
    $(".gnb a").click(function(e){
        e.preventDefault();
        
        var pid = $(this).attr("href");
        console.log("아이디:"+pid);
        
        var pgpos = $(pid).offset().top-80;
                console.log("top값:"+pgpos);
        
        
        $("html,body").stop().animate({
                    scrollTop : pgpos + "px"
                },600,"easeInOutQuart");
        
        $(this).parent() 
                .addClass("on") 
                .siblings() 
                .removeClass("on"); 
        
        
    }); ////////// click ////////////
    
    
    /*마우스 커서 변경*/
    new kursor({
            type: 1,
            removeDefaultCursor: true,
            color: "#222"
        })
    
    
    
}); /////////// jQB ////////////////////////
////////////////////////////////////////////