import { Task } from "@lit/task";
import { nothing } from "lit";
import { createRef } from "lit/directives/ref.js";

import { ViewedController } from "../viewed-controller/viewed-controller.js";

import { globalPlacementContext } from "./context.js";

import "../placement-no/element.js";

/**
 * @import { LitElement, TemplateResult } from "lit";
 * @import * as Placements from "./types.js";
 */

/**
 * @template {new (...args: any[]) => LitElement} TBase
 * @param {TBase} Base
 */
export const PlacementMixin = (Base) =>
  class PlacementElement extends Base {
    _placementRef = createRef();

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
      /**
       * @type {string | undefined}
       */
      this._viewedUrl;
      /**
       * @type {number | undefined}
       */
      this._version;
      /** @type {ViewedController} */
      this.viewed = new ViewedController(this, this._placementRef, () => {
        if (this._viewedUrl) {
          navigator.sendBeacon?.(
            this.viewedLink(this._viewedUrl, this._version),
          );
        }
      });
    }

    connectedCallback() {
      super.connectedCallback();
      this._dataTask.run();
    }

    /**
     *
     * @abstract
     * @param {Placements.PlacementContextData} _placementContext
     */
    renderComplete(_placementContext) {
      console.error("Must be implemented by subclass");
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
        pending: () => this.renderInitial(),

        complete: (placementContext) => {
          return this.renderComplete(placementContext);
        },
      });
    }

    /**
     *
     * @param {string} click
     * @param {number |undefined } version
     * @returns
     */
    clickLink(click, version) {
      return `/pong/click?code=${encodeURIComponent(click)}&version=${version}`;
    }

    /**
     *
     * @param {string | undefined} image
     * @returns
     */
    imgLink(image) {
      return `/pimg/${encodeURIComponent(image || "")}`;
    }

    /**
     *
     * @param {string} viewed
     * @param {number | undefined} version
     * @returns
     */
    viewedLink(viewed, version) {
      return `/pong/viewed?code=${encodeURIComponent(viewed)}${
        version ? `&version=${version}` : ""
      }`;
    }
  };
