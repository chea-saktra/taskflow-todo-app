/**
 * បង្កើត Global Custom Event សម្រាប់បិទ UI Component ផ្សេងទៀតពេលមានមួយកំពុងបើក
 * @param {string} eventName - ឈ្មោះ Event (ឧ. 'ui:menu-open')
 * @param {HTMLElement} activeElement - DOM Element ដែលកំពុងបើក
 */

export function broadcastOpen(eventName, activeElement) {
  document.dispatchEvent(
    new CustomEvent(eventName, { detail: { activeElement } }),
  );
}

/**
 * ភ្ជាប់ Click Outside Listener ដើម្បីបិទ Component ពេលចុចខាងក្រៅ
 * @param {HTMLElement} element - DOM Element របស់ Component
 * @param {Function} onClose - Callback Function សម្រាប់បិទ Menu
 * @returns {Function} Function សម្រាប់ remove event listener ចេញវិញ
 */

export function setupOutsideClick(element, onClose) {
  const handleOutsideClick = (e) => {
    if (!element.contains(e.target)) {
      onClose();
    }
  };
  setTimeout(() => {
    document.addEventListener("click", handleOutsideClick);
  }, 0);

  return () => document.removeEventListener("click", handleOutsideClick);
}

/**
 * ភ្ជាប់ Listener សម្រាប់ស្តាប់ការបើក Component ផ្សេងទៀត ដើម្បបិទខ្លួនឯង
 * @param {string} eventName - ឈ្មោះ Event
 * @param {HTMLElement} currentElement - DOM Element របស់ Component ខ្លួនឯង
 * @param {Function} onClose - Callback Function សម្រាប់បិទ
 * @returns {Function} Function សម្រាប់ remove event listener
 */

export function setupOtherOpenListener(eventName, currentElement, onClose) {
  const handleOtherOpen = (e) => {
    if (e.detail?.activeElement !== currentElement) {
      onClose();
    }
  };
  document.addEventListener(eventName, handleOtherOpen);
  return () => document.removeEventListener(eventName, handleOtherOpen);
}
