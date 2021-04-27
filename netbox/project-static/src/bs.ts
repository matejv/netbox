import { Modal, Tab, Toast, Tooltip } from 'bootstrap';
import Masonry from 'masonry-layout';
import { getElements } from './util';

type ToastLevel = 'danger' | 'warning' | 'success' | 'info';

/**
 * Initialize masonry-layout for homepage (or any other masonry layout cards).
 */
function initMasonry(): void {
  for (const grid of getElements<HTMLDivElement>('.masonry')) {
    new Masonry(grid, {
      itemSelector: '.masonry-item',
      percentPosition: true,
    });
  }
}

function initTooltips() {
  for (const tooltip of getElements('[data-bs-toggle="tooltip"]')) {
    new Tooltip(tooltip, { container: 'body', boundary: 'window' });
  }
}

function initModals() {
  for (const modal of getElements('[data-bs-toggle="modal"]')) {
    new Modal(modal);
  }
}

export function createToast(
  level: ToastLevel,
  title: string,
  message: string,
  extra?: string,
): Toast {
  let iconName = 'bi-exclamation-triangle-fill';
  switch (level) {
    case 'warning':
      iconName = 'bi-exclamation-triangle-fill';
    case 'success':
      iconName = 'bi-check-circle-fill';
    case 'info':
      iconName = 'bi-info-circle-fill';
    case 'danger':
      iconName = 'bi-exclamation-triangle-fill';
  }

  const container = document.createElement('div');
  container.setAttribute('class', 'toast-container position-fixed bottom-0 end-0 m-3');

  const main = document.createElement('div');
  main.setAttribute('class', `toast bg-${level}`);
  main.setAttribute('role', 'alert');
  main.setAttribute('aria-live', 'assertive');
  main.setAttribute('aria-atomic', 'true');

  const header = document.createElement('div');
  header.setAttribute('class', `toast-header bg-${level} text-body`);

  const icon = document.createElement('i');
  icon.setAttribute('class', `bi ${iconName}`);

  const titleElement = document.createElement('strong');
  titleElement.setAttribute('class', 'me-auto ms-1');
  titleElement.innerText = title;

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('class', 'btn-close');
  button.setAttribute('data-bs-dismiss', 'toast');
  button.setAttribute('aria-label', 'Close');

  const body = document.createElement('div');
  body.setAttribute('class', 'toast-body');

  header.appendChild(icon);
  header.appendChild(titleElement);

  if (typeof extra !== 'undefined') {
    const extraElement = document.createElement('small');
    extraElement.setAttribute('class', 'text-muted');
    header.appendChild(extraElement);
  }

  header.appendChild(button);

  body.innerText = message.trim();

  main.appendChild(header);
  main.appendChild(body);
  container.appendChild(main);
  document.body.appendChild(container);

  const toast = new Toast(main);
  return toast;
}

/**
 * Open the tab specified in the URL. For example, /dcim/device-types/1/#tab_frontports will
 * change the open tab to the Front Ports tab.
 */
function initTabs() {
  const { hash } = location;
  if (hash && hash.match(/^\#tab_.+$/)) {
    // The tab element will have a data-bs-target attribute with a value of the object type for
    // the corresponding tab. Once we drop the `tab_` prefix, the hash will match the target
    // element's data-bs-target value. For example, `#tab_frontports` becomes `#frontports`.
    const target = hash.replace('tab_', '');
    for (const element of getElements(`ul.nav.nav-tabs .nav-link[data-bs-target="${target}"]`)) {
      // Instantiate a Bootstrap tab instance.
      // See https://getbootstrap.com/docs/5.0/components/navs-tabs/#javascript-behavior
      const tab = new Tab(element);
      // Show the tab.
      tab.show();
    }
  }
}

/**
 * Enable any defined Bootstrap Tooltips.
 *
 * @see https://getbootstrap.com/docs/5.0/components/tooltips
 */
export function initBootstrap(): void {
  for (const func of [initTooltips, initModals, initMasonry, initTabs]) {
    func();
  }
}
