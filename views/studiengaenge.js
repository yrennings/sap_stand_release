function back() {
    window.location.href = "./index.html";
}

function onProcurement() {
    window.location.href = "./procurement.html";
}

function expandItem(index) {
    var details = document.getElementById("rightPanel");
    details.style.display = "flex";

    if (document.getElementById("detail-content-" + index).classList.contains("expand")) {
        closeDetails();
    } else {
        var detailContents = document.getElementsByClassName("detail-content");

        for (var i = 0; i < detailContents.length; i++) {
            detailContents[i].classList.remove("expand");
        }

        var detailContent = document.getElementById("detail-content-" + index);
        detailContent.classList.add("expand");
    }
}

function closeDetails() {
    var details = document.getElementById("rightPanel");
    details.style.display = "none";

    var detailContents = document.getElementsByClassName("detail-content");

    for (var i = 0; i < detailContents.length; i++) {
        detailContents[i].classList.remove("expand");
    }
}
