document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
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
        $("#allGraphics").append('<a class="collection-item" href="' +ele.info.src+'">'+ ele.info.name +' (in ' + val.language +')</a>');
    })

    $("#card1Container").removeClass("offset-m3");

    $("#language_selection").css("opacity", "0.3");
    $("#infographic_selection").removeClass("scale-out");
}

function resetSelection() {
    $("#language_selection").css("opacity", "1.0");
}
