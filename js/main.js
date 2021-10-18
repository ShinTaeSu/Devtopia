
// 스크롤 애니메이션 //
AOS.init();
// 스크롤 애니메이션 //

// 주소 입력 pop-up //
function fn_openAddressPopup() {
    var url = "adderss-popup.html";
    var name = "AddressPopup";
    var option = "width=650, height=500, top=100, left=200, location=no"
    window.open(url, name, option);
}
// 주소 입력 pop-up //

// 검색주소 불러오기 //
function callback_openAddressPopup(aParam) {
    document.getElementById("basic-address").value = aParam["roadAddr"];
}
// 검색주소 불러오기 //

/// 주소 검색 API ///

// 주소명으로 검색 //
function fn_search() {

    $.ajax({
        url: "http://www.juso.go.kr/addrlink/addrLinkApiJsonp.do",
        type: "post",
        data: $("#searchForm").serialize(),
        dataType: "jsonp",
        crossDomain: true,
        success: function (jsonStr) {
            var errCode = jsonStr.results.common.errorCode;
            var errDesc = jsonStr.results.common.errorMessage;
            if (errCode != "0") {
                alert(errCode + "=" + errDesc);
            } else {
                if (jsonStr != null) {
                    fn_makeListJson(jsonStr);
                }
            }
        },
        error: function (xhr, status, error) {
            alert("에러발생");
        }
    });

}
// 주소명으로 검색 //  

// 결과 테이블 생성 //
function fn_makeListJson(jsonStr) {
    var htmlStr = "";
    $(jsonStr.results.juso).each(
        function () {
            htmlStr += "<tr onclick=\"javascript:chooseAddress('"
                + this.roadAddr + "', '" + this.jibunAddr
                + "', '" + this.zipNo + "');\">";
            htmlStr += "<td>";
            htmlStr += "<dl>" + this.roadAddr + "</dl>";
            htmlStr += "<dl>" + this.jibunAddr + "</dl>";
            htmlStr += "</td>";
            htmlStr += "<td>" + this.zipNo + "</td>";
            htmlStr += "</tr>";
        });
    $("#addressTableTbody").html(htmlStr);

}
// 결과 테이블 생성 //

// Enter 키 이벤트 //
function enterSearch() {
    var evt_code = (window.netscape) ? ev.which : event.keyCode;
    if (evt_code == 13) {
        event.keyCode = 0;
        fn_search(); //jsonp사용시 enter검색 
    }
}
// Enter 키 이벤트 //

// 주소 선택 //
function chooseAddress(roadAddr, jibunAddr, zipNo) {
    var aParam = [];
    aParam["roadAddr"] = roadAddr;
    aParam["jibunAddr"] = roadAddr;
    aParam["zipNo"] = roadAddr;

    opener.callback_openAddressPopup(aParam);
    window.close();
}
// 주소 선택 //
/// 주소 검색 API ///


/// 로그인 팝업 ///
function fn_openLoginPopup() {
    var url = "login-popup.html";
    var name = "loginPopup";
    var option = "width=650, height=500, top=100, left=200, location=no"
    window.open(url, name, option);
}
/// 로그인 팝업 ///

/// 회원정보 팝업 ///
function fn_openuserinfoPopup() {
    var url = "user-info-popup.html";
    var name = "userinfoPopup";
    var option = "width=795, height=1000 top=100 left=200 location=no"
    window.open(url, name, option);
}
/// 회원정보 팝업 ///


/// 로그인 모달 /// 
const openButton = document.getElementById("open");
const modal = document.querySelector(".login-modal");
const clsoeButton = modal.querySelector("button");
const openModal = () => {
    modal.classList.remove("hidden");
}
const closeModal = () => {
    modal.classList.add("hidden");
}
clsoeButton.addEventListener("click", closeModal);
openButton.addEventListener("click", openModal);
/// 로그인 모달 ///


//플로팅 배너//
var floatPosition = parseInt($(".sideBanner").css('top'))

// scroll 인식
$(window).scroll(function () {

    // 현재 스크롤 위치
    var currentTop = $(window).scrollTop();
    var bannerTop = currentTop + floatPosition + "px";

    //이동 애니메이션
    $(".sideBanner").stop().animate({
        "top": bannerTop
    }, 500);

}).scroll();

