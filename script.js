// web-main.html to web-listview.html
document.addEventListener("DOMContentLoaded", function () {
  const clothesItem = document.querySelectorAll(".clothes-link");

  clothesItem.forEach(function (label) {
    label.addEventListener("click", function () {
      window.location.href = "web-listview.html";
    });
  });
});


// web-gridview.html to web-detail.html
document.addEventListener("DOMContentLoaded", function () {
  const itemDetail = document.querySelectorAll(".view-detail");

  itemDetail.forEach(function (label) {
    label.addEventListener("click", function () {
      window.location.href = "web-detail.html";
    });
  });
});


// header logo back to home page
document.addEventListener("DOMContentLoaded", function () {
  const homeBack = document.querySelectorAll(".back-home");

  homeBack.forEach(function (label) {
    label.addEventListener("click", function () {
      window.location.href = "web-main.html";
    });
  });
});


// web-listview.html to web-gridview.html and opposite
document.addEventListener("DOMContentLoaded", function () {
  const icon1 = document.querySelector(".icon1");
  const icon2 = document.querySelector(".icon2");

  // Assign page-specific active state
  const page = window.location.pathname.split("/").pop();

  if (page === "web-gridview.html") {
    icon1.classList.add("active");
  } else if (page === "web-listview.html") {
    icon2.classList.add("active");
  }

  // Navigation on click
  icon1.addEventListener("click", function () {
    window.location.href = "web-gridview.html";
  });

  icon2.addEventListener("click", function () {
    window.location.href = "web-listview.html";
  });
});


// product-box to web-detail.html
document.addEventListener("DOMContentLoaded", function () {
  const detailView = document.querySelectorAll(".detail-view");

  detailView.forEach(function (label) {
    label.addEventListener("click", function () {
      window.location.href = "web-detail.html";
    });
  });
});


// to main-page
document.addEventListener("DOMContentLoaded", function () {
  const mainPage = document.querySelectorAll(".home-page");

  mainPage.forEach(function (label) {
    label.addEventListener("click", function () {
      window.location.href = "web-main.html";
    });
  });
});


// cart state update

document.addEventListener('DOMContentLoaded', () => {

  /* NEW: fixed items that already live in the cart */
  const BASE_COUNT = 3;

  /*  helpers  */
  const lsKey = 'cart-items';
  const badge = document.getElementById('cart-count');
  const getItems = () => JSON.parse(localStorage.getItem(lsKey) || '[]');
  const setItems = arr => localStorage.setItem(lsKey, JSON.stringify(arr));

  /* badge updater now adds BASE_COUNT */
  const syncBadge = arr => {
    if (badge) badge.textContent = BASE_COUNT + arr.length;
  };

  /*  initial load  */
  let items = getItems();
  syncBadge(items);

  document.body.addEventListener('click', e => {
    const btn = e.target.closest('.add-to-cart, .move-to-cart');
    if (!btn) return;

    const id = btn.dataset.id || btn.closest('[data-id]')?.dataset.id;
    if (!id) return;

    const idx = items.indexOf(id);
    if (idx === -1) {
      items.push(id);
      btn.classList.add('in-cart');
      btn.innerHTML = '<ion-icon name="cart-outline"></ion-icon> Remove from Cart';
    } else {
      items.splice(idx, 1);
      btn.classList.remove('in-cart');
      btn.innerHTML = '<ion-icon name="cart-outline"></ion-icon> Add to Cart';
    }

    setItems(items);
    syncBadge(items);
  });

});


// wishlist state update

document.addEventListener("DOMContentLoaded", () => {
  const wishlistKey = "wishlist-items";
  const countBadge = document.getElementById("wishlist-count");
  const hearts = document.querySelectorAll(".heart");

  // Load the current list (or empty array if none saved yet)
  let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];


  const pagePrefix = document.body.dataset.page ||
    window.location.pathname.split("/").pop().replace(/\.[^/.]+$/, "");

  hearts.forEach((heart, idx) => {
    const card = heart.closest(".product, .produc-detail");
    if (!card) return;

    if (!card.dataset.id) {
      card.dataset.id = `${pagePrefix}-product-${idx + 1}`;
    }
    const id = card.dataset.id;

    if (wishlist.includes(id)) {
      heart.classList.add("active");
      heart.querySelector("ion-icon").setAttribute("name", "heart");
    }
  });

  // Show current wishlist count in the navbar badge (if present)
  if (countBadge) countBadge.textContent = wishlist.length;

  hearts.forEach(heart => {
    heart.addEventListener("click", () => {
      const card = heart.closest(".product, .produc-detail");
      if (!card) return;

      const id = card.dataset.id;
      const icon = heart.querySelector("ion-icon");

      if (wishlist.includes(id)) {
        // Remove
        wishlist = wishlist.filter(item => item !== id);
        heart.classList.remove("active");
        icon.setAttribute("name", "heart-outline");
      } else {
        // Add
        wishlist.push(id);
        heart.classList.add("active");
        icon.setAttribute("name", "heart");
      }

      localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
      if (countBadge) countBadge.textContent = wishlist.length;
    });
  });
});