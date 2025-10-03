import { ServerRenderedTemplate } from "@lit-labs/ssr";
interface BaseTab {
  id: string;
}

type ButtonText = string | { long: string; short: string };

interface PanelTitle {
  text: string;
  slug?: string;
}

interface LinkItem {
  slug: string;
  text: string;
  label?: string;
}

interface RenderItem {
  render: () => ServerRenderedTemplate;
}

type PanelItem = LinkItem | RenderItem;

interface PanelGroup {
  title?: string;
  items: PanelItem[];
}

interface DropdownTab extends BaseTab {
  buttonText: ButtonText;
  panelTitle: PanelTitle;
  panelGroups: PanelGroup[];
}

interface LinkTab extends BaseTab {
  render: () => ServerRenderedTemplate;
}

export type MenuTab = DropdownTab | LinkTab;
