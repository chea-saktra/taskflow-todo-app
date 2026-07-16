export function select(selector, parent = document) {
  return parent.querySelector(selector);
}

export function selectAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

export function createElement(tagName, options = {}) {
  const element = document.createElement(tagName);

  if (options.className) {
    element.className = options.className;
  }

  if (options.textContent !== undefined) {
    element.textContent = options.textContent;
  } else if (options.innerHTML !== undefined) {
    element.innerHTML = options.innerHTML;
  }

  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== false) {
        element.setAttribute(key, String(value));
      }
    });
  }

  if (options.events) {
    Object.entries(options.events).forEach(([eventName, handler]) => {
      if (typeof handler === "function") {
        element.addEventListener(eventName, handler);
      }
    });
  }

  if (options.children) {
    const childrenArray = Array.isArray(options.children)
      ? options.children
      : [options.children];

    childrenArray.forEach((child) => {
      if (child instanceof Node) {
        element.append(child);
      }
    });
  }

  return element;
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

export function clearElement(element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
}
