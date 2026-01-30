import missingDocs from "./missing-docs.json" with { type: "json" };

/** @type {import("./types.js").MenuTab[]}*/
export const TABS = [
  {
    id: "html",
    buttonText: "HTML",
    panelTitle: {
      slug: "Web/HTML",
      text: "HTML: Markup language",
    },
    panelGroups: [
      {
        title: "HTML reference",
        items: [
          { slug: "Web/HTML/Reference/Elements", text: "Elements" },
          {
            slug: "Web/HTML/Reference/Global_attributes",
            text: "Global attributes",
          },
          { slug: "Web/HTML/Reference/Attributes", text: "Attributes" },
          {
            slug: "Web/HTML/Reference",
            text: "See all…",
            label: "See all HTML references",
          },
        ],
      },
      {
        title: "HTML guides",
        items: [
          {
            slug: "Web/HTML/Guides/Responsive_images",
            text: "Responsive images",
          },
          { slug: "Web/HTML/Guides/Cheatsheet", text: "HTML cheatsheet" },
          {
            slug: "Web/HTML/Guides/Date_and_time_formats",
            text: "Date & time formats",
          },
          {
            slug: "Web/HTML/Guides",
            text: "See all…",
            label: "See all HTML guides",
          },
        ],
      },
      {
        title: "Markup languages",
        items: [
          { slug: "Web/SVG", text: "SVG" },
          { slug: "Web/MathML", text: "MathML" },
          { slug: "Web/XML", text: "XML" },
        ],
      },
    ],
  },
  {
    id: "css",
    buttonText: "CSS",
    panelTitle: {
      slug: "Web/CSS",
      text: "CSS: Styling language",
    },
    panelGroups: [
      {
        title: "CSS reference",
        items: [
          { slug: "Web/CSS/Reference/Properties", text: "Properties" },
          { slug: "Web/CSS/Reference/Selectors", text: "Selectors" },
          { slug: "Web/CSS/Reference/At-rules", text: "At-rules" },
          { slug: "Web/CSS/Reference/Values", text: "Values" },
          {
            slug: "Web/CSS/Reference",
            text: "See all…",
            label: "See all CSS references",
          },
        ],
      },
      {
        title: "CSS guides",
        items: [
          {
            slug: "Web/CSS/Guides/Box_model/Introduction",
            text: "Box model",
          },
          {
            slug: "Web/CSS/Guides/Animations/Using",
            text: "Animations",
          },
          {
            slug: "Web/CSS/Guides/Flexible_box_layout/Basic_concepts",
            text: "Flexbox",
          },
          { slug: "Web/CSS/Guides/Colors/Applying_color", text: "Colors" },
          {
            slug: "Web/CSS/Guides",
            text: "See all…",
            label: "See all CSS guides",
          },
        ],
      },
      {
        title: "Layout cookbook",
        items: [
          {
            slug: "Web/CSS/How_to/Layout_cookbook/Column_layouts",
            text: "Column layouts",
          },
          {
            slug: "Web/CSS/How_to/Layout_cookbook/Center_an_element",
            text: "Centering an element",
          },
          {
            slug: "Web/CSS/How_to/Layout_cookbook/Card",
            text: "Card component",
          },
          { slug: "Web/CSS/How_to/Layout_cookbook", text: "See all…" },
        ],
      },
    ],
  },
  {
    id: "javascript",
    buttonText: {
      long: "JavaScript",
      short: "JS",
    },
    panelTitle: {
      slug: "Web/JavaScript",
      text: "JavaScript: Scripting language",
    },
    panelGroups: [
      {
        title: "JS reference",
        items: [
          {
            slug: "Web/JavaScript/Reference/Global_Objects",
            text: "Standard built-in objects",
          },
          {
            slug: "Web/JavaScript/Reference/Operators",
            text: "Expressions & operators",
          },
          {
            slug: "Web/JavaScript/Reference/Statements",
            text: "Statements & declarations",
          },
          { slug: "Web/JavaScript/Reference/Functions", text: "Functions" },
          {
            slug: "Web/JavaScript/Reference",
            text: "See all…",
            label: "See all JavaScript references",
          },
        ],
      },
      {
        title: "JS guides",
        items: [
          {
            slug: "Web/JavaScript/Guide/Control_flow_and_error_handling",
            text: "Control flow & error handing",
          },
          {
            slug: "Web/JavaScript/Guide/Loops_and_iteration",
            text: "Loops and iteration",
          },
          {
            slug: "Web/JavaScript/Guide/Working_with_objects",
            text: "Working with objects",
          },
          {
            slug: "Web/JavaScript/Guide/Using_classes",
            text: "Using classes",
          },
          {
            slug: "Web/JavaScript/Guide",
            text: "See all…",
            label: "See all JavaScript guides",
          },
        ],
      },
    ],
  },
  {
    id: "webapis",
    buttonText: "Web APIs",
    panelTitle: {
      slug: "Web/API",
      text: "Web APIs: Programming interfaces",
    },
    panelGroups: [
      {
        title: "Web API reference",
        items: [
          { slug: "Web/API/File_System_API", text: "File system API" },
          { slug: "Web/API/Fetch_API", text: "Fetch API" },
          { slug: "Web/API/Geolocation_API", text: "Geolocation API" },
          { slug: "Web/API/HTML_DOM_API", text: "HTML DOM API" },
          { slug: "Web/API/Push_API", text: "Push API" },
          {
            slug: "Web/API/Service_Worker_API",
            text: "Service worker API",
          },
          {
            slug: "Web/API",
            text: "See all…",
            label: "See all Web API guides",
          },
        ],
      },
      {
        title: "Web API guides",
        items: [
          {
            slug: "Web/API/Web_Animations_API/Using_the_Web_Animations_API",
            text: "Using the Web animation API",
          },
          {
            slug: "Web/API/Fetch_API/Using_Fetch",
            text: "Using the Fetch API",
          },
          {
            slug: "Web/API/History_API/Working_with_the_History_API",
            text: "Working with the History API",
          },
          {
            slug: "Web/API/Web_Speech_API/Using_the_Web_Speech_API",
            text: "Using the Web speech API",
          },
          {
            slug: "Web/API/Web_Workers_API/Using_web_workers",
            text: "Using web workers",
          },
        ],
      },
    ],
  },
  {
    id: "all",
    buttonText: "All",
    panelTitle: {
      slug: "Web",
      text: "All web technology",
    },
    panelGroups: [
      {
        title: "Technologies",
        items: [
          { slug: "Web/Accessibility", text: "Accessibility" },
          { slug: "Web/HTTP", text: "HTTP" },
          { slug: "Web/URI", text: "URI" },
          { slug: "Mozilla/Add-ons/WebExtensions", text: "Web extensions" },
          { slug: "WebAssembly", text: "WebAssembly" },
          { slug: "Web/WebDriver", text: "WebDriver" },
          {
            slug: "Web",
            text: "See all…",
            label: "See all web technology references",
          },
        ],
      },
      {
        title: "Topics",
        items: [
          { slug: "Web/Media", text: "Media" },
          { slug: "Web/Performance", text: "Performance" },
          { slug: "Web/Privacy", text: "Privacy" },
          { slug: "Web/Security", text: "Security" },
          {
            slug: "Web/Progressive_web_apps",
            text: "Progressive web apps",
          },
        ],
      },
    ],
  },
  {
    id: "learn",
    buttonText: "Learn",
    panelTitle: {
      slug: "Learn_web_development",
      text: "Learn web development",
    },
    panelGroups: [
      {
        title: "Frontend developer course",
        items: [
          {
            slug: "Learn_web_development/Getting_started",
            text: "Getting started modules",
          },
          { slug: "Learn_web_development/Core", text: "Core modules" },
          {
            href: "/en-US/curriculum/",
            text: "MDN Curriculum",
          },
        ],
      },
      {
        title: "Learn HTML",
        items: [
          {
            slug: "Learn_web_development/Core/Structuring_content",
            text: "Structuring content with HTML module",
          },
        ],
      },
      {
        title: "Learn CSS",
        items: [
          {
            slug: "Learn_web_development/Core/Styling_basics",
            text: "CSS styling basics module",
          },
          {
            slug: "Learn_web_development/Core/CSS_layout",
            text: "CSS layout module",
          },
        ],
      },
      {
        title: "Learn JavaScript",
        items: [
          {
            slug: "Learn_web_development/Core/Scripting",
            text: "Dynamic scripting with JavaScript module",
          },
        ],
      },
    ],
  },
  {
    id: "tools",
    buttonText: "Tools",
    panelTitle: {
      text: "Discover our tools",
    },
    panelGroups: [
      {
        items: [
          {
            href: "/en-US/play",
            text: "Playground",
            icon: "circle-play",
          },
          {
            href: "/en-US/observatory",
            text: "HTTP Observatory",
            icon: "shield-check",
          },
        ],
      },
      {
        items: [
          {
            slug: "Web/CSS/CSS_backgrounds_and_borders/Border-image_generator",
            text: "Border-image generator",
          },
          {
            slug: "Web/CSS/CSS_backgrounds_and_borders/Border-radius_generator",
            text: "Border-radius generator",
          },
          {
            slug: "Web/CSS/CSS_backgrounds_and_borders/Box-shadow_generator",
            text: "Box-shadow generator",
          },
          {
            slug: "Web/CSS/CSS_colors/Color_format_converter",
            text: "Color format converter",
          },
          { slug: "Web/CSS/CSS_colors/Color_mixer", text: "Color mixer" },
          {
            slug: "Web/CSS/CSS_shapes/Shape_generator",
            text: "Shape generator",
          },
        ],
      },
    ],
  },
  {
    id: "about",
    buttonText: "About",
    panelTitle: {
      text: "Get to know MDN better",
    },
    panelGroups: [
      {
        items: [
          {
            href: "/en-US/about",
            text: "About MDN",
            icon: "mdn-m",
          },
          {
            href: "/en-US/advertising",
            text: "Advertise with us",
            icon: "chart-no-axes-combined",
          },
        ],
      },
      {
        items: [
          {
            href: "/en-US/community",
            text: "Community",
            icon: "users",
          },
          {
            href: "https://github.com/mdn",
            text: "MDN on GitHub",
            icon: "github",
          },
        ],
      },
    ],
  },
  {
    id: "blog",
    buttonText: "Blog",
    href: "/en-US/blog/",
  },
];

/**
 * Lists untranslated menu pages per locale.
 *
 * Tip: Run `node update-missing-docs.js` to update.
 */
/** @type {Record<string, string[]>} */
export const MISSING_DOCS = Object.freeze(missingDocs);

export const TRANSLATED_LOCALES = [
  "es",
  "fr",
  "ja",
  "ko",
  "pt-BR",
  "ru",
  "zh-CN",
  "zh-TW",
];
