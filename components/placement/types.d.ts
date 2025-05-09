export type PlacementType =
  | "side"
  | "top"
  | "hpTop"
  | "hpMain"
  | "hpFooter"
  | "bottom";

export type PlacementMap = Record<
  PlacementType,
  { typ: string; pattern: RegExp; renderer: RegExp }
>;

export interface PlacementContextData
  extends Partial<Record<PlacementType, PlacementData>> {
  plusAvailable?: boolean;
  status: Status;
}

type Colors = {
  textColor?: string;
  backgroundColor?: string;
  ctaTextColor?: string;
  ctaBackgroundColor?: string;
  textColorDark?: string;
  backgroundColorDark?: string;
  ctaTextColorDark?: string;
  ctaBackgroundColorDark?: string;
};

export type PlacementData = {
  status: Status;
  click: string;
  view: string;
  copy?: string;
  image?: string;
  alt?: string;
  cta?: string;
  colors?: Colors;
  version: number;
  heading?: string;
};

export type Status =
  | "success"
  | "geo_unsupported"
  | "cap_reached"
  | "loading"
  | "empty";
