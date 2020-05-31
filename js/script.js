var allData;

document.addEventListener('DOMContentLoaded', function () {
    var selectElem = document.querySelectorAll('select');
    var sideNavElem = document.querySelectorAll('.sidenav');
    var colpaseElem = document.querySelectorAll('.collapsible');
    populateLocalResource();
    M.Collapsible.init(colpaseElem);
    M.Sidenav.init(sideNavElem);
    M.FormSelect.init(selectElem);
});

$.getJSON("data.json", function (json) {
    populateLanguage(json);
});


function populateLanguage(arr) {
    let opts = []
    allData = arr;
    arr.Languages.forEach(function (elm, index) {
        let entry = $("<option>").attr("value", index).text(elm.language);
        opts.push(entry);
    })
    $('#lanSel').append(opts);
    let elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    if (Cookies.get("selected") !== undefined) {
        $('#lanSel').val(parseInt(Cookies.get("selected")));
        M.FormSelect.init(elems);
        showLanguageInfos();
    }
}

function showLanguageInfos() {
    let indx = $("#lanSel").val();
    let val = allData.Languages[indx];
    Cookies.set("selected", indx);
    $("#allGraphics").text("");
    val.graphics.forEach(function (ele, indx) {
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
    document.getElementById("card2Container").style.position = "";
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

function populateLocalResource() {
    $.getJSON('../data.json', function (arr) {
        arr.local_resources.forEach(function (elm, index) {
            let coll = '<li>\n' +
                '                    <div class="collapsible-header">' + elm.language + '</div>\n' +
                '                    <div class="collapsible-body">\n';
            elm.graphics.forEach(function (anotherElm, i) {
                let con = '  <ul class="collection">\n' +
                    '                            <a href="../' + anotherElm.info.src + '"\n' +
                    '                               class="collection-item">' + anotherElm.info.name + '</a>\n' +
                    '                        </ul>'
                coll = coll + con;
            });

            coll.concat('</div>\n' +
                '</li>')

            $("#infos").append(coll);
        })
    });

}