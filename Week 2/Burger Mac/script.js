const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

const orbtn = document.getElementById("OrderBtn");

orbtn.addEventListener("click", function (e) {
  e.preventDefault();
  this.classList.remove("active");

  console.log("Button clicked and .active removed");
});
