namespace Placements {
  type PlacementType =
    | "side"
    | "top"
    | "hpTop"
    | "hpMain"
    | "hpFooter"
    | "bottom";

  type PlacementMap = Record<PlacementType, { typ: string; pattern: RegExp }>;

  interface PlacementContextData
    extends Partial<Record<PlacementType, PlacementData>> {
    plusAvailable?: boolean;
    status: Status;
  }

  type PlacementData = {
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

  type Status =
    | "success"
    | "geo_unsupported"
    | "cap_reached"
    | "loading"
    | "empty";
}
