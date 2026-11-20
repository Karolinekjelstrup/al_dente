// Interaktiv SVG-side
const svgElement = document.querySelector(".svg-spotlight");

const detailsItems = document.querySelectorAll(".accordion-item");

let spotlight = null;
let overlay = null;

if (svgElement) {
  fetch("./spotlight.svg")
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
const opsamlingPlaceholder = document.querySelector(".invitation-card");

if (opsamlingPlaceholder) {
  const params = new URLSearchParams(window.location.search);

  // Hent oplysninger fra formularen
  const name = params.get("name");
  const activity = params.get("activity");

  // Indhold til de tre invitationer
  const invitations = {
    Pasta: {
      title: "Get your hands covered in flour",
      description: "Join us for a hands-on pasta workshop!",
      image: "./svg/pasta.svg",
      alt: "Illustration of pasta",
    },

    Dessert: {
      title: "Bring out your inner pastry chef",
      description: "Join us for a sweet dessert workshop!",
      image: "./svg/dessert.svg",
      alt: "Illustration of dessert",
    },

    Cocktail: {
      title: "Shake, stir, and sip",
      description: "Join us for a cocktail workshop!",
      image: "./svg/cocktail.svg",
      alt: "Illustration of a cocktail",
    },
  };

  const invitation = invitations[activity];

  if (invitation) {
    document.querySelector("#invitation-name").textContent = name || "Guest";

    document.querySelector("#invitation-activity").textContent =
      activity.toUpperCase();

    document.querySelector("#invitation-title").textContent = invitation.title;

    document.querySelector("#invitation-description").textContent =
      invitation.description;

    const image = document.querySelector("#invitation-image");

    image.src = invitation.image;
    image.alt = invitation.alt;
  } else {
    opsamlingPlaceholder.textContent =
      "Please sign up to receive your invitation.";
  }
}
