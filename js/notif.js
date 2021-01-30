function requestPermission() {
    Notification.requestPermission().then(function (result) {
        if (result === "denied") {
            console.log("Fitur notifikasi tidak diijinkan.");
            return;
        } else if (result === "default") {
            console.error("Pengguna menutup kotak dialog permintaan ijin.");
            return;
        }
        console.log("Fitur notifikasi diijinkan.");
        regPush()
    });
}
function cekNotif(){
    if ("Notification" in window) {
        console.log("meminta ijin")
        requestPermission();
        } else {
        console.error("Browser tidak mendukung notifikasi.");
        }
}