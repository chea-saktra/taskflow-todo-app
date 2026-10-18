export function select(selector, parent = document) {
  return parent.querySelector(selector);
}

export function selectAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

const SVG_TAGS = new Set([
  "svg",
  "circle",
  "path",
  "rect",
  "line",
  "g",
  "polygon",
  "polyline",
]);

export function createElement(tag, options = {}) {
  const isSvg = SVG_TAGS.has(tag.toLowerCase());
  const el = isSvg
    ? document.createElementNS("http://www.w3.org/2000/svg", tag)
    : document.createElement(tag);

  const {
    className,
    textContent,
    innerHTML,
    attributes,
    events,
    children,
    ...rest
  } = options;

  if (className) el.className = className;
  if (textContent !== undefined) el.textContent = textContent;
  if (innerHTML !== undefined) el.innerHTML = innerHTML;

  if (attributes) {
    Object.entries(attributes).forEach(([key, value]) => {
      if (value !== null && value !== false)
        el.setAttribute(
          key,
          typeof value === "object" ? value.name || value.icon : value,
        );
    });
  }

  if (events) {
    Object.entries(events).forEach(
      ([eventName, handler]) =>
        typeof handler === "function" &&
        el.addEventListener(eventName, handler),
    );
  }

  Object.entries(rest).forEach(([key, value]) => {
    if (value == null || value === false) return;
    if (key.startsWith("on") && typeof value === "function") {
      const eventName = key.toLowerCase().substring(2);
      el.addEventListener(eventName, value);
    } else if (key in el && !isSvg) {
      try {
        el[key] = value;
      } catch (e) {
        el.setAttribute(key, value);
      }
    } else {
      el.setAttribute(
        key,
        typeof value === "object" ? value.name || value.icon : value,
      );
    }
  });

  if (children) {
    const childrenArray = Array.isArray(children) ? children : [children];

    childrenArray.forEach((child) => {
      if (child instanceof Node) {
        el.append(child);
      } else if (child !== null && child !== undefined && child !== false) {
        el.append(document.createTextNode(String(child)));
      }
    });
  }

  return el;
}

export function renderSlot(targetElement, content) {
  if (!targetElement) return;

  targetElement.innerHTML = "";

  if (!content) return;

  if (content instanceof Node) {
    targetElement.append(content);
  } else if (Array.isArray(content)) {
    content.forEach((child) => {
      if (child instanceof Node) targetElement.append(child);
    });
  } else {
    targetElement.innerHTML = String(content);
  }
}

export function clearElement(el) {
  while (el.firstChild) {
    el.firstChild.remove();
  }
}
