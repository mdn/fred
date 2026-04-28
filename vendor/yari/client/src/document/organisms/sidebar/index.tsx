import { useEffect, useState } from "react";
import { Button } from "../../../ui/atoms/button";

import { useUIStatus } from "../../../ui-context";

import "./index.scss";
import { TOC } from "../toc";
import { SidebarFilter } from "./filter";

export function SidebarContainer({
  doc,
  label,
  children,
  tocTitle,
}: {
  doc: any;
  label?: string;
  children: React.ReactNode;
  tocTitle?: string;
}) {
  const { isSidebarOpen, setIsSidebarOpen } = useUIStatus();
  const [classes, setClasses] = useState<string>("sidebar");

  useEffect(() => {
    let timeoutID;

    if (isSidebarOpen) {
      setClasses("sidebar is-expanded");
    } else {
      setClasses("sidebar is-animating");
      timeoutID = setTimeout(() => {
        setClasses("sidebar");
      }, 300);
    }

    if (timeoutID) {
      return () => clearTimeout(timeoutID);
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    const sidebar = document.querySelector("#sidebar-quicklinks");
    const currentSidebarItem = sidebar?.querySelector("em");
    if (sidebar && currentSidebarItem) {
      [sidebar, sidebar.querySelector(".sidebar-inner-nav")].forEach((n) =>
        n?.scrollTo({
          top: currentSidebarItem.offsetTop - window.innerHeight / 4,
        }),
      );
    }
  }, []);

  return (
    <>
      <aside
        id="sidebar-quicklinks"
        className={classes}
        data-macro={doc.sidebarMacro}
      >
        <Button
          extraClasses="backdrop"
          type="action"
          onClickHandler={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-label="Collapse sidebar"
        />
        <nav aria-label={label} className="sidebar-inner">
          {doc.sidebarHTML && (
            <header className="sidebar-actions">
              <SidebarFilter />
            </header>
          )}
          <div className="sidebar-inner-nav">
            <div className="in-nav-toc">
              {doc.toc && !!doc.toc.length && (
                <TOC toc={doc.toc} title={tocTitle} />
              )}
            </div>
            {children}
          </div>
        </nav>
      </aside>
    </>
  );
}
