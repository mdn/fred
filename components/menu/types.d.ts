import { ServerRenderedTemplate } from "@lit-labs/ssr";

type ButtonText = string | { long: string; short: string };
type ButtonL10nId = string | { long: string; short: string };

interface BaseTab {
  id: string;
  buttonText: ButtonText;
  buttonL10nId: ButtonL10nId;
}

interface PanelTitle {
  text: string;
  slug?: string;
  l10nId: string;
}

interface BaseItem {
  text: string;
  label?: string;
  l10nId: string;
  labelL10nId?: string;
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
  titleL10nId?: string;
  items: PanelItem[];
}

interface DropdownTab extends BaseTab {
  panelTitle: PanelTitle;
  panelGroups: PanelGroup[];
}

interface LinkTab extends BaseTab {
  href: string;
  buttonL10nId: string;
}

export type MenuTab = DropdownTab | LinkTab;
