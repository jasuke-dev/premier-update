document.addEventListener("DOMContentLoaded", ()=>{
    let urlParams = new URLSearchParams(window.location.search);
    let isFromSaved = urlParams.get("saved");
    let btnSave = document.getElementById("save");
    if (isFromSaved) {
        btnSave.style.display = 'none';
        GetSavedClubById();
    } else {
       var item = getClubById()
    }
    btnSave.onclick = ()=>{
        console.log("Tombol FAB di klik.");
        btnSave.style.display = 'none';
        item.then(club=> {
            saveForLater(club);
        });
    };
});