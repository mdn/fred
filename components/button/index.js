import { ServerComponent } from "../server.js";

import PureButton from "./pure.js";

export class Button extends ServerComponent {
  /**
   * @param {Fred.Context} _context
   * @param {Parameters<PureButton>[0]} args
   */
  render(_context, args) {
    return PureButton(args);
  }
}
