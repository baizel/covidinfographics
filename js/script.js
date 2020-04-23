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
        $("#allGraphics").append('<li  class="collection-item"><a href="' +ele.info.src+'">'+ ele.info.name +' (in ' + val.language +')</a></li>');
    })

    $("#language_selection").css("opacity", "0.5");
    $("#infographic_selection").css("visibility", "visible");
}

function resetSelection() {
    $("#language_selection").css("opacity", "1.0");
    $("#infographic_selection").css("visibility", "hidden");
}
