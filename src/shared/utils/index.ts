import { isBrowser } from "shared/constants";

const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

const getSessionStorageData = (key: string) => {
  if (!isBrowser) return;

  const json = sessionStorage.getItem(key);
  return JSON.parse(json as string);
};

const removeSessionStorageData = (key: string) => {
  if (!isBrowser) return;

  sessionStorage.removeItem(key);
};

const disableReactDevTools = () => {
  if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== "object") {
    return;
  }
  for (const prop in window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
    if (prop === "renderers") {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] = new Map();
    } else {
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] =
        typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__[prop] === "function"
          ? () => {}
          : null;
    }
  }
};
export {
  classNames,
  getSessionStorageData,
  removeSessionStorageData,
  disableReactDevTools,
};
