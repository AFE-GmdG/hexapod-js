import React from "react";
import { createRoot } from "react-dom/client";
import { JSDOM } from "jsdom";

const dom = new JSDOM(`<!DOCTYPE html>
<html lang="en">

<head>
  <base href="/" />
  <meta charset="utf-8" />
  <title>JSDOM</title>
</head>

<body>
  <div id="app"></div>
</body>

</html>
`, {
  url: "http://localhost/",
  contentType: "text/html",
  includeNodeLocations: false,
  storageQuota: 1000,
  pretendToBeVisual: true,
});

(globalThis as any).window = dom.window;
const document = dom.window.document;
const orgCreateElement = document.createElement;

function createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions): HTMLElementTagNameMap[K];
function createElement(tagName: string, options?: ElementCreationOptions): HTMLElement;
function createElement(tagName: any, options?: any) {
  console.log(tagName, options);
  return orgCreateElement.call(document, tagName, options);
}
document.createElement = createElement;

import App from "./app";

const appDiv = dom.window.document.getElementById("app");
const root = createRoot(appDiv!);

root.render(<App />);
