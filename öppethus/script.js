const programs = {

    foto: {
        name: "Foto & film",
        color: "#00FFFF",
        description:
            "Här arbetar du med foto, film, storytelling och visuellt innehåll."
    },

    grafisk: {
        name: "Grafisk design",
        color: "#FF0079",
        description:
            "Skapa grafiskt material, illustrationer, branding och digital design."
    },

    musik: {
        name: "Musikproduktion",
        color: "#00E676",
        description:
            "Arbeta med musik, ljudproduktion, inspelning och kreativt skapande."
    },

    spelgrafik: {
        name: "Spelgrafik",
        color: "#FF8800",
        description:
            "Skapa grafik, miljöer, karaktärer och visuella världar för spel."
    },

    spelutveckling: {
        name: "Spelutveckling",
        color: "#FFEB3B",
        description:
            "Lär dig skapa spel med programmering, design och spelmekanik."
    },

    "ai-webb": {
        name: "AI & webbutveckling",
        color: "#FFEB3B",
        description:
            "Bygg webbplatser och digitala lösningar och utforska AI."
    }
};


/* ========================================
   QR SCANNER
======================================== */

let scanner = null;

function startScan() {

    document.getElementById("scanner-container").style.display = "block";

    scanner = new Html5Qrcode("reader");

    scanner.start(
        {
            facingMode: "environment"
        },

        {
            fps: 10,
            qrbox: {
                width: 250,
                height: 250
            }
        },

        function(decodedText) {

            stopScan();

            /*
                Om QR-koden innehåller en URL
                öppnas den.
            */

            if (
                decodedText.startsWith("http://") ||
                decodedText.startsWith("https://")
            ) {

                window.location.href = decodedText;

            } else {

                openProgramFromQR(decodedText);

            }

        },

        function(error) {

            // Skannern fortsätter leta efter QR-koden

        }
    )
    .catch(function(error) {

        alert(
            "Kunde inte öppna kameran. Kontrollera kamerabehörigheter."
        );

        console.error(error);

    });
}


/* ========================================
   STOP SCANNER
======================================== */

function stopScan() {

    if (!scanner) {
        return;
    }

    scanner.stop()
        .then(function() {

            scanner.clear();

            document.getElementById(
                "scanner-container"
            ).style.display = "none";

            scanner = null;

        })
        .catch(function(error) {

            console.error(error);

        });
}


/* ========================================
   OPEN PROGRAM FROM QR
======================================== */

function openProgramFromQR(program) {

    program = program.toLowerCase().trim();

    if (!programs[program]) {

        alert(
            "QR-koden kunde inte kopplas till ett program."
        );

        return;
    }

    const selected = programs[program];

    title.textContent = selected.name;

    description.textContent =
        selected.description;

    modal.classList.add("active");

    modal.querySelector(".modal-content").style.borderTop =
        "4px solid " + selected.color;
}


/* ========================================
   CHECK URL
======================================== */

function checkURL() {

    const params =
        new URLSearchParams(window.location.search);

    const program =
        params.get("program");

    if (!program) {
        return;
    }

    openProgramFromQR(program);
}


/* Kör när sidan laddas */

window.addEventListener("DOMContentLoaded", function() {

    checkURL();

});