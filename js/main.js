/* main.js */

$(function () { /////////// jQB //////////////

    // 스와이퍼 적용하기 ///
    var swiper = new Swiper('.swiper1', {
        slidesPerView: 5,
        spaceBetween: 20,
        loop: true,
        breakpoints: {
            // when window width is >= 320px
            480: {
                slidesPerView: 2,
                spaceBetween: 2,
                loop:false
            },
            // when window width is >= 320px
            768: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 50,
            },
            1280: {
                spaceBetween: 30,
            },
        }
    }); ///////// swiper //////////

    var swiper = new Swiper('.swiper2', {
        slidesPerView: 8,
        spaceBetween: 20,
        loop: false,
        breakpoints: {
            // when window width is >= 320px
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 25,
            },
            1400: {
                slidesPerView: 7,
                spaceBetween: 30,
            },
            
        }
    }); ///////// swiper //////////





    /*gnb 메뉴 슬라이드 이동 세팅*/
    $(".gnb a").click(function (e) {
        e.preventDefault();

        var pid = $(this).attr("href");
        console.log("아이디:" + pid);

        var pgpos = $(pid).offset().top - 80;
        console.log("top값:" + pgpos);


        $("html,body").stop().animate({
            scrollTop: pgpos + "px"
        }, 600, "easeInOutQuart");

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
    });



    /************************************** 배너 슬라이드 ******************************************************/
    console.log("로딩완료");

    // 배너이미지 이동 대상: 배너박스(.slide)
    var tg = $("#ban .slide");


    /* ///////////////////////////////////////////
    함수명: goSlide
    기능: 슬라이드 방향별 이동
    */ ///////////////////////////////////////////

    // 광클금지 변수
    var sprot = 0; //0-허용, 1-금지
    // 슬라이드 순번 변수
    var sno = 0;
    // 슬라이드 개수 변수
    var scnt = tg.find("li").length;
    console.log("슬라이드개수:" + scnt);
    /////////////////////////////////

    var goSlide = function (dir) {

        //console.log("광클금지상태:" + sprot);

        /// 광클 금지 설정 ///////////////////
        if (sprot === 1) return false;
        sprot = 1; // 잠금
        setTimeout(function () {
            sprot = 0; //0.8초 후 해제!(CSS 트랜지션 시간과 맞추기)
        }, 800); ///// 타임아웃 ///////////
        ////////////////////////////////////


        //dir-방향(0-왼쪽, 1-오른쪽)
        //console.log("이동방향:" + dir);

        // 오른쪽 전달값이 1이므로 true
        if (dir) {
            $("#ban .slide").animate({
                left: "-100%"
            }, 600, function () {
                $(this).append($(">li", this).first())
                    .css({
                        left: "0"
                    });
            });
            //슬라이드 순번증가
            sno++;
            if (sno === scnt) sno = 0; //한계수(처음으로)

        } // if ///////////////////

        // 왼쪽 전달값이 0이므로 false (else로 처리!)
        else {
            $("#ban .slide").prepend($("#ban .slide>li").last()).css({
                left: "-100%"
            });
            $("#ban .slide").delay(100).animate({
                left: "0"
            }, 600);

            // 슬라이드 개수 감소
            sno--;
            if (sno === -1) sno = scnt - 1; // 한계수(마지막 번호로)

        } // else //////////////////

        // 슬라이드 표시자 움직이기
        $(".ban_line_bold").animate({
            left: (sno * 20) + "%"
        }, 400);
        // 슬라이드 번호변경
        $(".now_num").text("0" + (sno + 1));

    }; //////////////// goSlide함수 /////////////////////
    ////////////////////////////////////////////////////


    /* ///////////////////////////////////////////
        함수명: autoCall
        기능: 자동호출 기능
    */ ///////////////////////////////////////////
    var autoI; //인터발용 변수
    var autoCall = function () {
        // console.log("자동넘김!");

        // 4초간격으로 슬라이드함수 호출
        autoI = setInterval(function () {
            goSlide(1);
        }, 4000); /////// 인터발함수 /////////        

    }; //////////////// autoCall 함수 /////////////////////
    //////////////////////////////////////////////////////

    /* ///////////////////////////////////////////
        함수명: clearAuto
        기능: 자동넘김 지우기
    */ ///////////////////////////////////////////
    var autoT; //타임아웃용 변수
    var clearAuto = function () {
        //console.log("자동지워!");

        // 인터발 지우기
        clearInterval(autoI);
        // 타임아웃지우기(실행쓰나미 방지)
        clearTimeout(autoT);

        //재실행 호출 세팅(3초 후 한번실행 세팅)
        autoT = setTimeout(autoCall, 3000);

    }; //////////////// clearAuto 함수 /////////////////////
    /////////////////////////////////////////////////////



    //// 자동넘김함수 호출!
    autoCall();



    /// 오른쪽버튼 클릭시 갤러리박스 맨앞 이미지 맨뒤로 이동!
    $(".rbtn").click(function () {
        //console.log("오른쪽!");

        // 자동지우기 함수 호출
        clearAuto();

        //슬라이드 이동함수 호출!
        goSlide(1); // 오른쪽 전달값은 1

    }); /////// click ///////////


    /// 왼쪽버튼 클릭시 갤러리박스 맨뒤 이미지 맨앞로 이동!
    $(".lbtn").click(function () {
        //console.log("왼쪽!");

        // 자동지우기 함수 호출
        clearAuto();

        //슬라이드 이동함수 호출!
        goSlide(0); // 왼쪽 전달값은 0

    }); /////// click ///////////

}); /////////// jQB ////////////////////////
////////////////////////////////////////////




$(function () { /////////// jQB //////////////

    /*팝업창*/
    $(".pick_pop_1_wrap").hide();

    $(".picBox li:eq(0) .pick a").click(function (e) {
        e.preventDefault();
        $(".pick_pop_1_wrap").fadeIn(400);
    }); ////////// click //////////

    $(".popup_close").click(function (e) {
        e.preventDefault();
        $(".pick_pop_1_wrap").fadeOut(400);
    }); /////////// click ////////////////




    /********************** 팝업창 이미지 ***********************/

    // 배너이미지 이동 대상: .popup_img_slide
    var tg = $(".popup_img_slide");


    /* ///////////////////////////////////////////
    함수명: goSlide
    기능: 슬라이드 방향별 이동
    */ ///////////////////////////////////////////

    // 광클금지 변수
    var sprot = 0; //0-허용, 1-금지
    // 슬라이드 순번 변수
    var sno = 0;
    // 슬라이드 개수 변수
    var scnt = tg.find("li").length;
    console.log("슬라이드개수:" + scnt);
    /////////////////////////////////

    var goSlide = function (dir) {

        //console.log("광클금지상태:" + sprot);

        /// 광클 금지 설정 ///////////////////
        if (sprot === 1) return false;
        sprot = 1; // 잠금
        setTimeout(function () {
            sprot = 0; //0.8초 후 해제!(CSS 트랜지션 시간과 맞추기)
        }, 800); ///// 타임아웃 ///////////
        ////////////////////////////////////


        //dir-방향(0-왼쪽, 1-오른쪽)
        //console.log("이동방향:" + dir);

        // 오른쪽 전달값이 1이므로 true
        if (dir) {
            $(".popup_img_slide").animate({
                left: "-100%"
            }, 600, function () {
                $(this).append($(">li", this).first())
                    .css({
                        left: "0"
                    });
            });
            //슬라이드 순번증가
            sno++;
            if (sno === scnt) sno = 0; //한계수(처음으로)

        } // if ///////////////////

        // 왼쪽 전달값이 0이므로 false (else로 처리!)
        else {
            $(".popup_img_slide").prepend($(".popup_img_slide>li").last()).css({
                left: "-100%"
            });
            $(".popup_img_slide").delay(100).animate({
                left: "0"
            }, 600);

            // 슬라이드 개수 감소
            sno--;
            if (sno === -1) sno = scnt - 1; // 한계수(마지막 번호로)

        } // else //////////////////


    }; //////////////// goSlide함수 /////////////////////
    ////////////////////////////////////////////////////


    /* ///////////////////////////////////////////
        함수명: autoCall
        기능: 자동호출 기능
    */ ///////////////////////////////////////////
    var autoI; //인터발용 변수
    var autoCall = function () {
        // console.log("자동넘김!");

        // 4초간격으로 슬라이드함수 호출
        autoI = setInterval(function () {
            goSlide(1);
        }, 4000); /////// 인터발함수 /////////        

    }; //////////////// autoCall 함수 /////////////////////
    //////////////////////////////////////////////////////

    /* ///////////////////////////////////////////
        함수명: clearAuto
        기능: 자동넘김 지우기
    */ ///////////////////////////////////////////
    var autoT; //타임아웃용 변수
    var clearAuto = function () {
        //console.log("자동지워!");

        // 인터발 지우기
        clearInterval(autoI);
        // 타임아웃지우기(실행쓰나미 방지)
        clearTimeout(autoT);

        //재실행 호출 세팅(3초 후 한번실행 세팅)
        autoT = setTimeout(autoCall, 3000);

    }; //////////////// clearAuto 함수 /////////////////////
    /////////////////////////////////////////////////////



    //// 자동넘김함수 호출!
    autoCall();



    /// 오른쪽버튼 클릭시 갤러리박스 맨앞 이미지 맨뒤로 이동!
    $(".next_btn").click(function () {
        //console.log("오른쪽!");

        // 자동지우기 함수 호출
        clearAuto();

        //슬라이드 이동함수 호출!
        goSlide(1); // 오른쪽 전달값은 1

    }); /////// click ///////////


    /// 왼쪽버튼 클릭시 갤러리박스 맨뒤 이미지 맨앞로 이동!
    $(".pre_btn").click(function () {
        //console.log("왼쪽!");

        // 자동지우기 함수 호출
        clearAuto();

        //슬라이드 이동함수 호출!
        goSlide(0); // 왼쪽 전달값은 0

    }); /////// click ///////////





}); /////////// jQB ////////////////////////
////////////////////////////////////////////
