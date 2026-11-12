import type { TemplateResult } from "@lit";

export type ButtonVariants = "primary" | "secondary" | "plain";
export type ButtonActions = "positive" | "negative" | undefined;
export type ButtonIconPositions = "before" | "after";

export type ButtonLabel =
  | {
      label: string;
      /** Ignored for string labels. */
      labelId?: string;
    }
  | {
      label: TemplateResult;
      /** Must be unique within the containing tree. */
      labelId: string;
    };

export type ButtonOptions = ButtonLabel & {
  icon?: TemplateResult;
  iconOnly?: boolean;
  iconPosition?: ButtonIconPositions;
  disabled?: boolean;
  ariaDisabled?: boolean;
  ariaDescription?: string;
  title?: string;
  href?: string;
  target?: string;
  rel?: string;
  variant?: ButtonVariants;
  action?: ButtonActions;
};
