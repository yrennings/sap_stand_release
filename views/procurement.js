function back() {
    window.location.href = "./index.html";
}

function onStudy() {
    window.location.href = "./studiengaenge.html";
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

function searchPosition() {
    let input = document.getElementById('searchbar').value;
    input = input.toLowerCase();

    let x = document.getElementsByClassName('position');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        } else {
            x[i].style.display="list-item";                
        }
    }
}

function showToast() {
    var toastContainer = document.getElementById("toastContainer");
    var toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = "Vielen Dank! Deine Bestellung war erfolgreich. Du erhälst das gewünschte Produkt in Kürze.";
    toastContainer.appendChild(toast);

    setTimeout(function () {
        toast.classList.add("show");
        setTimeout(function () {
        toast.classList.remove("show");
        toastContainer.removeChild(toast);
        }, 3000);
    }, 100);

    closeDetails()
}
