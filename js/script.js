document.addEventListener('DOMContentLoaded', function () {
    var selectElem = document.querySelectorAll('select');
    var sideNavElem = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sideNavElem);
    M.FormSelect.init(selectElem);
});

$.getJSON("data.json", function (json) {
    populate(json)
});
var data;

function populate(arr) {
    let opts = []
    data = arr;
    arr.forEach(function (elm, index) {
        let entry = $("<option>").attr("value", index).text(elm.language);
        opts.push(entry);
    })
    $('#lanSel').append(opts);
    let elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
}

function showInfos() {
    let indx = $("#lanSel").val();
    let val = data[indx];

    $("#allGraphics").text("");
    val.graphics.forEach(function (ele, indx) {
        console.log(ele);
        let htmlstr = '<li class="collection-item">\n' +
            '                        <div><a class="graphic-link" href="' + ele.info.src + '">' + ele.info.name + ' (in ' + val.language + ')</a>' +
            '                            <a href="' + ele.info.src + '" class="secondary-content graphic-download" download>\n' +
            '                                <i class="material-icons ">file_download</i>\n' +
            '                            </a>\n' +
            '                        </div>\n' +
            '                    </li>'
        $("#allGraphics").append(htmlstr);
        //TODO: Decide which one should bne shared
        setShareLinks("https://" + window.location.hostname + "/" + ele.info.src, "COVID-19 information in " + val.language)
    })

    $("#language_selection").css("opacity", "0.7");
    $("#infographic_selection").removeClass("scale-out");
}

function resetSelection() {
    $("#language_selection").css("opacity", "1.0");
}

function setShareLinks(url, txt) {
    let facebook = "https://facebook.com/sharer/sharer.php?u=" + url;
    let whatsApp = "whatsapp://send?text=" + txt + "%20" + url;
    let twitter = "https://twitter.com/intent/tweet/?text=" + txt + "&url=" + url;
    let mail = "mailto:?subject=" + txt + "&body=" + url;

    document.getElementById("facebookSocial").href = encodeURI(facebook);
    document.getElementById("twitterSocial").href = encodeURI(twitter);
    document.getElementById("mailSocial").href = encodeURI(mail);
    document.getElementById("whatsappSocial").href = encodeURI(whatsApp);
} 
