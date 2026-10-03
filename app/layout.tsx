import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { ContactBand } from "@/components/ContactBand";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PendingSectionScroll } from "@/components/PendingSectionScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VIORA — AI Creator Platform",
    template: "%s — VIORA",
  },
  description: "A small house for four digital creators, edited one post at a time.",
};

export const viewport: Viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
};

const stripExtensionAttributes = `
(function () {
  var pattern = /^(bis_|__processed)/;
  function clean(node) {
    if (!node || node.nodeType !== 1 || !node.getAttributeNames) return;
    var names = node.getAttributeNames();
    for (var i = 0; i < names.length; i++) {
      if (pattern.test(names[i])) node.removeAttribute(names[i]);
    }
  }
  function walk(node) {
    clean(node);
    var children = node.children;
    if (!children) return;
    for (var i = 0; i < children.length; i++) walk(children[i]);
  }
  walk(document.documentElement);
  var removed = 0;
  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var mutation = mutations[i];
      if (mutation.type === "attributes") {
        var target = mutation.target;
        if (target && target.nodeType === 1 && mutation.attributeName && pattern.test(mutation.attributeName)) {
          target.removeAttribute(mutation.attributeName);
          removed++;
        }
      }
      var added = mutation.addedNodes;
      if (!added) continue;
      for (var j = 0; j < added.length; j++) {
        if (added[j].nodeType === 1) walk(added[j]);
      }
    }
    if (removed > 80) observer.disconnect();
  });
  observer.observe(document.documentElement, {
    subtree: true,
    childList: true,
    attributes: true
  });
  window.addEventListener("load", function () {
    setTimeout(function () { observer.disconnect(); }, 1500);
  });
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          id="strip-extension-attrs"
          dangerouslySetInnerHTML={{ __html: stripExtensionAttributes }}
        />
      </head>
      <body
        className="min-h-svh overflow-x-clip bg-background font-sans text-foreground"
        suppressHydrationWarning
      >
        <PendingSectionScroll />
        <Header />
        {children}
        <ContactBand />
        <Footer />
      </body>
    </html>
  );
}
