import { Task } from "@lit/task";
import { nothing } from "lit";
import { createRef } from "lit/directives/ref.js";

import { globalPlacementContext } from "../global/placements.js";
import "../placement-no/element.js";
import { ViewedController } from "../viewed-controller/viewed-controller.js";

import { viewedLink } from "./links.js";

/**
 * @import { LitElement, TemplateResult } from "lit";
 */

/**
 * @template {new (...args: any[]) => LitElement} TBase
 * @param {TBase} Base
 */
export const PlacementMixin = (Base) =>
  class PlacementElement extends Base {
    _placementRef = createRef();

    /**
     * @type {string | undefined}
     */
    viewedUrl;
    /**
     * @type {number | undefined}
     */
    version;

    _dataTask = new Task(this, {
      task: async () => {
        return await globalPlacementContext();
      },
    });

    /**
     *
     * @param  {...any} args
     */
    constructor(...args) {
      super(...args);
      /** @type {ViewedController} */
      this.viewed = new ViewedController(this, this._placementRef, () => {
        if (this.viewedUrl) {
          navigator.sendBeacon?.(viewedLink(this.viewedUrl, this.version));
        }
      });
    }

    connectedCallback() {
      super.connectedCallback();
      this._dataTask.run();
    }

    /**
     *
     * @param {Placements.PlacementContextData} _placementContext
     */
    renderComplete(_placementContext) {}

    /**
     *
     * @returns {TemplateResult | symbol}
     */
    renderPending() {
      return nothing;
    }
    /**
     *
     * @returns {TemplateResult | symbol}
     */
    renderInitial() {
      return nothing;
    }

    render() {
      return this._dataTask.render({
        initial: () => this.renderInitial(),
        pending: () => this.renderPending(),

        complete: (placementContext) => {
          return this.renderComplete(placementContext);
        },
      });
    }
  };
