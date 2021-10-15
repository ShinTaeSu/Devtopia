
// 스크롤 애니메이션
AOS.init();

// 주소 입력 pop-up 팝업 이상 없음
function fn_openAddressPopup() {
    var url = "addersspopup.html";
    var name = "AddressPopup";
    var option = "width=650, height=500, top=100, left=200, location=no"
    window.open(url, name, option);
}

function callback_openAddressPopup(aParam) {
    document.getElementById("basic-address").value = aParam["roadAddr"];
}

// 주소 입력 불러오기 이상 없음
// 주소명으로 검색
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
//  결과 테이블 생성
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
//  Enter 키 이벤트
function enterSearch() {
    var evt_code = (window.netscape) ? ev.which : event.keyCode;
    if (evt_code == 13) {
        event.keyCode = 0;
        fn_search(); //jsonp사용시 enter검색 
    }
}
//  주소 선택
function chooseAddress(roadAddr, jibunAddr, zipNo) {
    var aParam = [];
    aParam["roadAddr"] = roadAddr;
    aParam["jibunAddr"] = roadAddr;
    aParam["zipNo"] = roadAddr;

    opener.callback_openAddressPopup(aParam);
    window.close();
}

//로그인 팝업
function fn_openLoginPopup() {
    var url = "loginpopup.html";
    var name = "loginPopup";
    var option = "width=650, height=500, top=100, left=200, location=no"
    window.open(url, name, option);
}