(() => {
  const book = document.querySelector("[data-thought-book]");
  const pageStack = book.querySelector(".thought-cards");
  const pages = [...pageStack.querySelectorAll(".thought-card")];
  const turnButton = book.querySelector(".thought-book-turn");
  const status = book.querySelector(".thought-book-status");
  let current = 0;

  function renderPage(direction) {
    book.dataset.turn = direction;
    pages.forEach((page, index) => {
      page.hidden = index !== current;
    });
    status.textContent = `${current + 1} / ${pages.length}`;
  }

  function turnPage(step) {
    current = (current + step + pages.length) % pages.length;
    renderPage(step > 0 ? "forward" : "backward");
  }

  pageStack.addEventListener("click", (event) => {
    if (event.target === turnButton || !window.getSelection()?.toString()) turnPage(1);
  });

  turnButton.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      turnPage(event.key === "ArrowLeft" ? -1 : 1);
    }
  });

  renderPage("");
  book.classList.add("is-ready");
  turnButton.hidden = false;
  status.hidden = false;
})();
