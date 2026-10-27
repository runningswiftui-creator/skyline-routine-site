/* Replace this with the checkout URL from Lemon Squeezy before launch. */
const SITE_CONFIG = {
  checkoutUrl: "",
  appStoreUrl: "",
  supportEmail: "runningswiftui@gmail.com"
};

const checkoutButtons = document.querySelectorAll("[data-checkout]");
const checkoutUrl = (SITE_CONFIG.checkoutUrl || "").trim();

for (const button of checkoutButtons) {
  if (checkoutUrl) {
    button.href = checkoutUrl;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  } else {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("Checkout is being connected. Please check back soon.");
    });
  }
}

const appStoreUrl = (SITE_CONFIG.appStoreUrl || "").trim();
for (const button of document.querySelectorAll("[data-appstore]")) {
  if (appStoreUrl) {
    button.href = appStoreUrl;
    button.target = "_blank";
    button.rel = "noopener noreferrer";
  } else {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      showToast("The Mac App Store link will be available after review.");
    });
  }
}

const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const open = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  siteNav.addEventListener("click", (event) => {
    if (!event.target.matches("a")) return;
    siteNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
}

for (const link of document.querySelectorAll("[data-year]")) {
  link.textContent = String(new Date().getFullYear());
}

function showToast(message) {
  let toast = document.querySelector(".site-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "site-toast";
    toast.setAttribute("role", "status");
    document.body.append(toast);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3200);
}
