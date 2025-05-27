import { ServerComponent } from "../server/index.js";

import PureButton from "./pure.js";

export class Button extends ServerComponent {
  /**
   * @param {import("@fred").Context} _context
   * @param {Parameters<PureButton>[0]} args
   */
  render(_context, args) {
    return PureButton(args);
  }
}
