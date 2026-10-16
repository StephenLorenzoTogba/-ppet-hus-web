
const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

const exploreButton = document.getElementById("exploreButton");
const gallery = document.getElementById("gallery");

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".project-card");
const projectCount = document.getElementById("projectCount");

const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalType = document.getElementById("modalType");
const modalStudent = document.getElementById("modalStudent");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalOpen = document.getElementById("modalOpen");

let selectedCard = null;
let previousFocus = null;

menuButton.addEventListener("click", () => {
    menu.classList.toggle("active");
});

menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        menu.classList.remove("active");
    });
});

exploreButton.addEventListener("click", () => {
    gallery.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

filters.forEach(filter => {
    filter.addEventListener("click", () => {
        filters.forEach(button => button.classList.remove("active"));
        filter.classList.add("active");

        const type = filter.dataset.filter;
        let visibleCount = 0;

        cards.forEach(card => {
            const show = type === "all" || card.dataset.type === type;

            card.hidden = !show;

            if (show) {
                visibleCount++;
            }
        });

        projectCount.textContent =
            `${String(visibleCount).padStart(2, "0")} PROJECTS`;
    });
});

function openProject(card) {
    selectedCard = card;
    previousFocus = document.activeElement;

    modalType.textContent = card.dataset.type.toUpperCase();
    modalStudent.textContent = card.dataset.student;
    modalTitle.textContent = card.dataset.title;
    modalDescription.textContent = card.dataset.description;

    modalImage.replaceChildren();

    if (card.dataset.image) {
        const image = document.createElement("img");
        image.src = card.dataset.image;
        image.alt = card.dataset.title;
        modalImage.appendChild(image);
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    modalClose.focus();
}

function closeProject() {
    modal.classList.remove("active");
    document.body.style.overflow = "";

    if (previousFocus) {
        previousFocus.focus();
    }
}

cards.forEach(card => {
    card.addEventListener("click", () => openProject(card));
});

modalClose.addEventListener("click", closeProject);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        closeProject();
    }
});

modalOpen.addEventListener("click", () => {
    if (!selectedCard) return;

    const link = selectedCard.dataset.link;

    if (link && link !== "#") {
        window.location.href = link;
    }
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
        closeProject();
    }
});

