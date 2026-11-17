(() => {
  const map = document.querySelector(".footprint-map");
  if (!map) return;

  const svgNS = "http://www.w3.org/2000/svg";
  const language = document.documentElement.lang === "en" ? "en" : "zh";
  const world = map.querySelector(".world-map");
  const overview = map.querySelector(".map-overview");
  const picker = map.querySelector(".map-picker select");
  const status = map.querySelector(".map-status");
  const dialog = map.querySelector(".country-dialog");
  const countryName = dialog.querySelector("h3");
  const countryMap = dialog.querySelector(".country-map");
  const countryStage = dialog.querySelector(".country-stage");
  const visitedList = dialog.querySelector(".visited-cities");
  const zoomIn = dialog.querySelector(".zoom-in");
  const zoomOut = dialog.querySelector(".zoom-out");
  const resetZoom = dialog.querySelector(".zoom-reset");
  const arc = Math.PI / 180;
  const maxZoom = 12;
  const minZoom = 1;
  let atlas;
  let visits;
  let scene;
  let hoverTimer;
  let hoverCountry;
  let openingControl;
  let drag;

  function svg(tag, attributes) {
    const node = document.createElementNS(svgNS, tag);
    for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, value);
    return node;
  }

  function pathData(rings, project, closed = true) {
    return rings.map(ring => {
      const points = ring.map(([lon, lat]) => project(lon, lat).map(value => value.toFixed(3)));
      return "M" + points.join("L") + (closed ? "Z" : "");
    }).join("");
  }

  function worldPoint(lon, lat) {
    const taper = 0.77 + 0.23 * Math.cos(lat * arc);
    return [500 + 2.65 * lon * taper, 254 - 2.68 * lat];
  }

  function localProjection(country) {
    if (country.id === "ATA") {
      return (lon, lat) => [(90 + lat) * Math.sin(lon * arc), -(90 + lat) * Math.cos(lon * arc)];
    }
    const [meridian, latitude] = country.center;
    const taper = Math.cos(latitude * arc);
    return (lon, lat) => [(((lon - meridian + 540) % 360) - 180) * taper, latitude - lat];
  }

  function drawGraticule() {
    const lines = [];
    for (let lon = -180; lon <= 180; lon += 30) {
      lines.push(Array.from({ length: 37 }, (_, i) => [lon, -90 + i * 5]));
    }
    for (let lat = -60; lat <= 60; lat += 30) {
      lines.push([[-180, lat], [180, lat]]);
    }
    world.append(svg("path", { class: "map-graticule", d: pathData(lines, worldPoint, false) }));
  }

  function createPopover(stage) {
    const popover = document.createElement("div");
    popover.className = "map-popover";
    popover.setAttribute("role", "status");
    popover.hidden = true;
    const title = document.createElement("strong");
    const text = document.createElement("p");
    popover.append(title, text);
    stage.append(popover);
    let current;
    let pinned = false;
    let hideTimer;

    function hide() {
      window.clearTimeout(hideTimer);
      popover.hidden = true;
      current = null;
      pinned = false;
    }

    function show(marker, visit, pin = false) {
      if (pinned && !pin && marker !== current) return;
      window.clearTimeout(hideTimer);
      current = marker;
      pinned = pinned || pin;
      title.textContent = visit.city;
      text.textContent = visit.note || map.dataset.pending;
      text.lang = visit.note ? visit.noteLanguage : language;
      popover.hidden = false;
      const box = stage.getBoundingClientRect();
      const anchor = marker.getBoundingClientRect();
      const left = anchor.left + anchor.width / 2 - box.left;
      const above = anchor.top - box.top - popover.offsetHeight - 8;
      popover.style.left = Math.max(8, Math.min(left - popover.offsetWidth / 2, box.width - popover.offsetWidth - 8)) + "px";
      popover.style.top = Math.max(8, Math.min(above >= 8 ? above : anchor.bottom - box.top + 8, box.height - popover.offsetHeight - 8)) + "px";
    }

    function scheduleHide() {
      if (!pinned) hideTimer = window.setTimeout(hide, 150);
    }

    stage.addEventListener("pointerdown", event => {
      if (!event.target.closest(".map-visit, .map-popover")) hide();
    });
    popover.addEventListener("pointerenter", () => window.clearTimeout(hideTimer));
    popover.addEventListener("pointerleave", scheduleHide);

    return {
      hide,
      bind(marker, visit) {
        marker.addEventListener("pointerenter", event => {
          if (event.pointerType === "mouse") show(marker, visit);
        });
        marker.addEventListener("pointerleave", scheduleHide);
        marker.addEventListener("focus", () => show(marker, visit));
        marker.addEventListener("blur", scheduleHide);
        marker.addEventListener("click", () => {
          if (pinned && current === marker) hide();
          else show(marker, visit, true);
        });
        marker.addEventListener("keydown", event => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            marker.dispatchEvent(new MouseEvent("click"));
          }
          if (event.key === "Escape" && !popover.hidden) {
            event.preventDefault();
            hide();
          }
        });
      }
    };
  }

  const worldPopover = createPopover(overview);
  const countryPopover = createPopover(countryStage);

  function visitMarker(x, y, visit, popover) {
    const marker = svg("g", {
      class: "map-visit",
      transform: `translate(${x} ${y})`,
      role: "button",
      tabindex: "0",
      "aria-label": visit.city
    });
    marker.append(
      svg("circle", { r: 14, class: "visit-hit" }),
      svg("circle", { r: 6, class: "visit-dot" })
    );
    popover.bind(marker, visit);
    return marker;
  }

  function showWorld(countries) {
    drawGraticule();
    const outlines = svg("g", { class: "world-outlines" });
    const smallAreas = svg("g", { class: "world-small-areas" });
    world.append(outlines, smallAreas);
    for (const country of countries) {
      const attributes = { class: "map-land", "data-country": country.id };
      const outline = svg("path", { ...attributes, d: pathData(country.rings, worldPoint) });
      outlines.append(outline);
      const bounds = outline.getBBox();
      if (bounds.width < 4 && bounds.height < 4) {
        smallAreas.append(svg("circle", {
          ...attributes,
          class: "map-land map-small-area",
          cx: bounds.x + bounds.width / 2,
          cy: bounds.y + bounds.height / 2,
          r: 2.2
        }));
      }
    }
    for (const visit of visits) {
      world.append(visitMarker(...worldPoint(visit.lon, visit.lat), visit, worldPopover));
    }
  }

  function drawCountry() {
    if (!scene || !dialog.open) return;
    const width = countryMap.clientWidth;
    const height = countryMap.clientHeight;
    if (!width || !height) return;

    const { bounds, center, zoom } = scene;
    const scale = zoom * Math.min(
      (width - 44) / Math.max(bounds.right - bounds.left, 0.004),
      (height - 44) / Math.max(bounds.bottom - bounds.top, 0.004)
    );
    if (scale <= 0) return;
    const xOffset = width / 2 - center[0] * scale;
    const yOffset = height / 2 - center[1] * scale;
    const onScreen = ([x, y]) => [xOffset + x * scale, yOffset + y * scale];
    const isVisible = ([x, y]) => x >= 0 && x <= width && y >= 0 && y <= height;

    scene.scale = scale;
    countryPopover.hide();
    countryMap.setAttribute("viewBox", `0 0 ${width} ${height}`);
    scene.land.setAttribute("transform", `translate(${xOffset} ${yOffset}) scale(${scale})`);
    scene.places.replaceChildren();
    scene.markers = new Map();
    const labelBoxes = [];

    function addLabel(x, y, name, style) {
      const label = svg("text", { x: x + 9, y: y - 8, class: style });
      label.textContent = name;
      scene.places.append(label);
      const box = label.getBBox();
      if (box.x + box.width + 4 > width || box.y < 4 || labelBoxes.some(other =>
        box.x < other.x + other.width + 6 && box.x + box.width + 6 > other.x &&
        box.y < other.y + other.height + 3 && box.y + box.height + 3 > other.y
      )) {
        label.remove();
      } else {
        labelBoxes.push(box);
      }
    }

    const visibleVisits = scene.visits.map(visit => ({ visit, point: onScreen(visit.point) }))
      .filter(({ point }) => isVisible(point));
    for (const { visit, point } of visibleVisits) addLabel(...point, visit.city, "visited-label");
    for (const city of scene.cities) {
      const point = onScreen(city.point);
      if (!isVisible(point) || visibleVisits.some(visit =>
        Math.hypot(point[0] - visit.point[0], point[1] - visit.point[1]) < 14
      )) continue;
      scene.places.prepend(svg("circle", { cx: point[0], cy: point[1], r: 2.2, class: "reference-city" }));
      addLabel(...point, city.name, "reference-label");
    }
    for (const { visit, point } of visibleVisits) {
      const marker = visitMarker(...point, visit, countryPopover);
      scene.places.append(marker);
      scene.markers.set(visit, marker);
    }
    zoomIn.disabled = zoom >= maxZoom;
    zoomOut.disabled = zoom <= minZoom;
  }

  function openCountry(id, control) {
    const country = atlas.countries.find(item => item.id === id);
    if (!country || dialog.open) return;
    openingControl = control;
    worldPopover.hide();
    const project = localProjection(country);
    const outline = svg("path", { class: "map-land", d: pathData(country.rings, project) });
    const places = svg("g", {});
    const localVisits = visits.filter(visit => visit.country === id).map(visit => ({
      ...visit, point: project(visit.lon, visit.lat)
    }));
    const referenceCities = (atlas.cities[id] || []).map(city => ({
      name: city[language], point: project(city.lon, city.lat)
    }));
    countryMap.replaceChildren(outline, places);
    countryName.textContent = country[language];
    visitedList.replaceChildren();
    for (const visit of localVisits) {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = "map-button";
      button.textContent = visit.city;
      button.addEventListener("click", () => {
        if (!scene.markers.has(visit)) {
          scene.center = [...visit.point];
          drawCountry();
        }
        scene.markers.get(visit)?.focus();
      });
      item.append(button);
      visitedList.append(item);
    }
    if (!localVisits.length) {
      const empty = document.createElement("li");
      empty.textContent = map.dataset.empty;
      visitedList.append(empty);
    }
    dialog.showModal();
    const box = outline.getBBox();
    const bounds = { left: box.x, right: box.x + box.width, top: box.y, bottom: box.y + box.height };
    for (const { point: [x, y] } of localVisits) {
      bounds.left = Math.min(bounds.left, x);
      bounds.right = Math.max(bounds.right, x);
      bounds.top = Math.min(bounds.top, y);
      bounds.bottom = Math.max(bounds.bottom, y);
    }
    const center = [(bounds.left + bounds.right) / 2, (bounds.top + bounds.bottom) / 2];
    scene = { land: outline, places, bounds, home: center, center: [...center], zoom: minZoom, visits: localVisits, cities: referenceCities };
    drawCountry();
  }

  function zoomBy(amount) {
    scene.zoom = Math.min(maxZoom, Math.max(minZoom, scene.zoom * amount));
    if (scene.zoom === minZoom) scene.center = [...scene.home];
    drawCountry();
  }

  function cancelHover() {
    window.clearTimeout(hoverTimer);
    hoverCountry = undefined;
  }

  world.addEventListener("pointermove", event => {
    if (!atlas || dialog.open || event.pointerType !== "mouse" || event.buttons) return;
    const id = event.target.closest("[data-country]")?.dataset.country;
    if (hoverCountry === id) return;
    cancelHover();
    if (!id) return;
    hoverCountry = id;
    hoverTimer = window.setTimeout(() => openCountry(id), 430);
  });
  world.addEventListener("pointerleave", cancelHover);
  world.addEventListener("click", event => {
    cancelHover();
    const id = event.target.closest("[data-country]")?.dataset.country;
    if (id) openCountry(id);
  });
  picker.addEventListener("change", () => {
    if (picker.value) openCountry(picker.value, picker);
  });
  dialog.querySelector(".map-back").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    cancelHover();
    countryPopover.hide();
    picker.value = "";
    scene = null;
    drag = null;
    openingControl?.focus({ preventScroll: true });
  });

  zoomIn.addEventListener("click", () => zoomBy(1.55));
  zoomOut.addEventListener("click", () => zoomBy(1 / 1.55));
  resetZoom.addEventListener("click", () => {
    scene.zoom = minZoom;
    scene.center = [...scene.home];
    drawCountry();
  });
  countryMap.addEventListener("pointerdown", event => {
    if (!scene || scene.zoom === minZoom || event.button !== 0 || event.target.closest(".map-visit")) return;
    drag = { x: event.clientX, y: event.clientY, center: [...scene.center], id: event.pointerId };
    countryMap.setPointerCapture(event.pointerId);
  });
  countryMap.addEventListener("pointermove", event => {
    if (drag?.id !== event.pointerId) return;
    const { bounds, scale } = scene;
    const x = drag.center[0] - (event.clientX - drag.x) / scale;
    const y = drag.center[1] - (event.clientY - drag.y) / scale;
    scene.center = [
      Math.max(bounds.left, Math.min(x, bounds.right)),
      Math.max(bounds.top, Math.min(y, bounds.bottom))
    ];
    drawCountry();
  });
  countryMap.addEventListener("lostpointercapture", () => { drag = null; });
  new ResizeObserver(drawCountry).observe(countryMap);

  async function loadAtlas() {
    const response = await fetch(map.dataset.mapUrl);
    if (!response.ok) throw new Error("Unable to load the footprint atlas");
    atlas = await response.json();
    const otherLanguage = language === "en" ? "zh" : "en";
    visits = JSON.parse(map.dataset.visits).map(entry => {
      const localized = entry[language];
      const noteLanguage = localized?.note ? language : otherLanguage;
      return {
        ...entry,
        city: (localized || entry[otherLanguage]).city,
        note: entry[noteLanguage]?.note,
        noteLanguage
      };
    });
    const countries = [...atlas.countries].sort((a, b) => a[language].localeCompare(b[language], language));
    showWorld(countries);
    for (const country of countries) picker.add(new Option(country[language], country.id));
    picker.disabled = false;
    status.hidden = true;
  }

  loadAtlas().catch(error => {
    status.textContent = map.dataset.error;
    console.error(error);
  });
})();
