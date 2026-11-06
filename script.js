// Interaktiv SVG-side
const svgElement = document.querySelector(".svg-spotlight");

const detailsItems = document.querySelectorAll(".accordion-item");

let spotlight = null;
let overlay = null;

if (svgElement) {
  fetch("./svg/spotlight.svg")
    .then((response) => response.text())
    .then((svgCode) => {
      const parser = new DOMParser();
      const svgDocument = parser.parseFromString(svgCode, "image/svg+xml");

      svgElement.innerHTML = svgDocument.documentElement.innerHTML;

      spotlight = svgElement.querySelector("#spotlight-circle");
      overlay = svgElement.querySelector("#overlay");

      // Skjul overlay fra start
      overlay.classList.remove("is-visible");

      updateSvgPosition();
    });

  // Sørg for, at kun ét punkt kan være åbent ad gangen
  detailsItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        detailsItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.open = false;
          }
        });
      }

      updateSvgPosition();
    });
  });
}

function updateSvgPosition() {
  if (!spotlight || !overlay) return;

  const openDetails = document.querySelector(".accordion-item[open]");

  if (openDetails) {
    const positions = {
      cocktail: 470,
      pasta: 920,
      dessert: 1420,
    };

    // Flyt spotlight til den valgte workshop
    spotlight.setAttribute("cx", positions[openDetails.dataset.spotlight]);

    // Vis spotlight og overlay
    spotlight.setAttribute("r", 220);
    overlay.classList.add("is-visible");
  } else {
    // Skjul overlay med fade-out
    overlay.classList.remove("is-visible");
  }
}

// Opsamlingsside
const opsamlingPlaceholder = document.querySelector(".opsamling-placeholder");

if (opsamlingPlaceholder) {
  const params = new URLSearchParams(window.location.search);
  // Eksempel: params.get("navn") henter værdien fra et formularfelt med name="navn".
}
