import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript.min.js";
import "prismjs/components/prism-json.min.js";
import "prismjs/components/prism-css.min.js";

// toolbar plugin
import "prismjs/plugins/toolbar/prism-toolbar.css";
import "prismjs/plugins/toolbar/prism-toolbar.min.js";

import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      highlight: () => {
        Prism.highlightAll();
      },
    },
  };
});
