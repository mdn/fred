// @ts-ignore
import propertyGroups from "stylelint-config-recess-order/groups";

/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  rules: {
    "color-hex-length": "long",
    "custom-property-empty-line-before": null,
    "custom-property-pattern": "^([a-z][a-z0-9]*)(-[a-z0-9]+)*(--default)?$",
    "declaration-block-no-redundant-longhand-properties": null,
    "declaration-empty-line-before": null,
    "no-descending-specificity": null,
    "no-duplicate-selectors": null,
    "order/properties-order": [
      propertyGroups.map((/** @type {any} */ group) => ({
        ...group,
        emptyLineBefore: "threshold",
        noEmptyLineBetween: true,
      })),
      {
        emptyLineMinimumPropertyThreshold: 4,
      },
    ],
    "selector-class-pattern": null,
    "selector-id-pattern": null,
  },
};
