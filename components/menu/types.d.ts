import { ServerRenderedTemplate } from "@lit-labs/ssr";
interface BaseTab {
  id: string;
  buttonText: ButtonText;
}

type ButtonText = string | { long: string; short: string };

interface PanelTitle {
  text: string;
  slug?: string;
}

interface BaseItem {
  text: string;
  label?: string;
}

interface SlugItem extends BaseItem {
  slug: string;
}

interface HrefItem extends BaseItem {
  href: string;
  icon?: string;
}

type LinkItem = SlugItem | HrefItem;

interface RenderItem {
  render: () => ServerRenderedTemplate;
}

type PanelItem = LinkItem | RenderItem;

interface PanelGroup {
  title?: string;
  items: PanelItem[];
}

interface DropdownTab extends BaseTab {
  panelTitle: PanelTitle;
  panelGroups: PanelGroup[];
}

interface LinkTab extends BaseTab {
  href: string;
}

export type MenuTab = DropdownTab | LinkTab;
