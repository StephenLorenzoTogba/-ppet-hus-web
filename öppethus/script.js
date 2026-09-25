const menu = document.getElementById("menu");
const modal = document.getElementById("programModal");

const title = document.getElementById("programTitle");
const description = document.getElementById("programDescription");

let scanner = null;


/* MENU */

function toggleMenu() {
    menu.classList.toggle("active");
}


/* SCROLL */

function scrollToPrograms() {
    document.getElementById("program").scrollIntoView({
        behavior: "smooth"
    });
}


/* PROGRAM */

function openProgram(program) {

    title.textContent = program;

    const descriptions = {

        "Foto och film":
            "Här arbetar du med foto, film, storytelling och visuellt innehåll.",

        "Grafisk design":
            "Skapa grafiskt material, illustrationer, branding och digital design.",

        "Musikproduktion":
            "Arbeta med musik, ljudproduktion, inspelning och kreativt skapande.",

        "Spelgrafik":
            "Skapa grafik, miljöer, karaktärer och visuella världar för spel.",

        "Spelutveckling":
            "Lär dig skapa spel med programmering, design och spelmekanik.",

        "AI & webbutveckling":
            "Bygg webbplatser och digitala lösningar och utforska hur AI kan användas."
    };

    description.textContent =
        descriptions[program] ||
        "Upptäck vad eleverna arbetar med på programmet.";

    modal.classList.add("active");
}


/* CLOSE PROGRAM */

function closeProgram() {
    modal.classList.remove("active");
}


/* QR SCANNER */

function startScan() {

    const scannerContainer =
        document.getElementById("scanner-container");

    scannerContainer.style.display = "block";

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

            console.log("QR hittad:", decodedText);

            stopScan();

            /*
                Om QR-koden innehåller en URL
                skickas användaren dit.
            */

            if (
                decodedText.startsWith("http://") ||
                decodedText.startsWith("https://")
            ) {

                window.location.href = decodedText;

            } else {

                showQRCode(decodedText);

            }

        },

        function(errorMessage) {

            // Skannern försöker igen.
            // Vi behöver inte visa felmeddelanden.
        }
    )
    .catch(function(error) {

        console.error("Kunde inte starta kameran:", error);

        alert(
            "Kunde inte öppna kameran. Kontrollera att du har gett sidan tillåtelse att använda kameran."
        );

    });
}


/* STOP SCANNER */

function stopScan() {

    if (scanner) {

        scanner.stop()
            .then(() => {

                scanner.clear();

                document.getElementById(
                    "scanner-container"
                ).style.display = "none";

                scanner = null;

            })
            .catch(error => {

                console.error(
                    "Kunde inte stänga skannern:",
                    error
                );

            });

    } else {

        document.getElementById(
            "scanner-container"
        ).style.display = "none";
    }
}


/* QR RESULT */

function showQRCode(result) {

    alert(
        "QR-kod hittad:\n\n" + result
    );

}           