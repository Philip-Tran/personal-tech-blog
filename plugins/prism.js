import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-json.min.js";
import "prismjs/components/prism-css.min.js";

// Enable toolbar plugin
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/toolbar/prism-toolbar.min.js";

import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js";

// export default defineNuxtPlugin((nuxtApp) => {
//   const applyPrismHighlighting = () => {
//     Prism.highlightAll();
//   };

//   // Run Prism.js on initial load
//   nuxtApp.hook("app:mounted", applyPrismHighlighting);

//   // Run Prism.js after every route change
//   nuxtApp.hook("page:finish", applyPrismHighlighting);
// });
export default Prism;
