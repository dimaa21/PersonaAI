const storageKey = "viora:scroll-target";

export function sectionId(href: string) {
  const hash = href.indexOf("#");
  if (hash === -1) return "";
  return href.slice(hash + 1);
}

export function sectionPath(href: string) {
  const hash = href.indexOf("#");
  if (hash === -1) return href || "/";
  const path = href.slice(0, hash);
  return path || "/";
}

export function rememberSection(id: string) {
  sessionStorage.setItem(storageKey, id);
}

export function peekSection() {
  return sessionStorage.getItem(storageKey) ?? "";
}

export function forgetSection() {
  sessionStorage.removeItem(storageKey);
}

export function scrollToId(id: string) {
  const node = document.getElementById(id);
  if (!node) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  node.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  return true;
}

export function clearHash() {
  if (!window.location.hash) return;
  history.replaceState(null, "", window.location.pathname + window.location.search);
}
