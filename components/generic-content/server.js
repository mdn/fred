import { html } from "lit";

import { ContentSection } from "../content-section/server.js";

import AiHelpCodeExamplesPlaygroundPath from "../plus/assets/ai-help/code-examples-playground.png?url";
import AiHelpCodeExamplesQueuePath from "../plus/assets/ai-help/code-examples-queue.png?url";
import AiHelpExampleQuestionAnsweringPath from "../plus/assets/ai-help/example-question-answering.png?url";
import AiHelpExampleQuestionEditingPath from "../plus/assets/ai-help/example-question-editing.png?url";
import AiHelpHistoryBannerPath from "../plus/assets/ai-help/history-banner.png?url";
import AiHelpHistorySettingsPath from "../plus/assets/ai-help/history-settings.png?url";
import AiHelpIssueTemplatePath from "../plus/assets/ai-help/issue-template.png?url";
import AiHelpLoginSignupPath from "../plus/assets/ai-help/login-signup.png?url";
import AiHelpRateAnswersPath from "../plus/assets/ai-help/rate-answers.png?url";
import AiHelpReportFeedbackPath from "../plus/assets/ai-help/report-feedback.png?url";
import CollectionsCollectionsDashboardPath from "../plus/assets/collections/collections-dashboard.png?url";
import CollectionsDesktopCollectionsDashboardDeletePath from "../plus/assets/collections/desktop-collections-dashboard-delete.png?url";
import CollectionsDesktopCollectionsDeleteFvaPath from "../plus/assets/collections/desktop-collections-delete-fva.png?url";
import CollectionsDesktopCollectionsEditDialogAddNotePath from "../plus/assets/collections/desktop-collections-edit-dialog-add-note.png?url";
import CollectionsDesktopCollectionsEditDialogPath from "../plus/assets/collections/desktop-collections-edit-dialog.png?url";
import CollectionsDesktopCollectionsEditMenuPath from "../plus/assets/collections/desktop-collections-edit-menu.png?url";
import CollectionsDesktopCollectionsFilterPath from "../plus/assets/collections/desktop-collections-filter.png?url";
import CollectionsDesktopCollectionsFvaPath from "../plus/assets/collections/desktop-collections-fva.png?url";
import CollectionsDesktopCollectionsSortPath from "../plus/assets/collections/desktop-collections-sort.png?url";
import CollectionsDesktopCollectionsThreeDotMenuPath from "../plus/assets/collections/desktop-collections-three-dot-menu.png?url";
import CollectionsDesktopCollectionsUndoPath from "../plus/assets/collections/desktop-collections-undo.png?url";
import CollectionsDesktopCollectionsUserMenuPath from "../plus/assets/collections/desktop-collections-user-menu.png?url";
import CollectionsDesktopPageAddNotePath from "../plus/assets/collections/desktop-page-add-note.png?url";
import CollectionsDesktopPageDialogSavePath from "../plus/assets/collections/desktop-page-dialog-save.png?url";
import CollectionsDesktopPageOpenDialogPath from "../plus/assets/collections/desktop-page-open-dialog.png?url";
import CollectionsDesktopRemoveSavedDeletePath from "../plus/assets/collections/desktop-remove-saved-delete.png?url";
import CollectionsDesktopRemoveSavedPath from "../plus/assets/collections/desktop-remove-saved.png?url";
import CollectionsDesktopSavingPagePath from "../plus/assets/collections/desktop-saving-page.png?url";
import CollectionsMobileAddNotePath from "../plus/assets/collections/mobile-add-note.png?url";
import CollectionsMobileBurgerMenuPath from "../plus/assets/collections/mobile-burger-menu.png?url";
import CollectionsMobileCollectionsDashboardDeleteEntryPath from "../plus/assets/collections/mobile-collections-dashboard-delete-entry.png?url";
import CollectionsMobileCollectionsDashboardEditEntryPath from "../plus/assets/collections/mobile-collections-dashboard-edit-entry.png?url";
import CollectionsMobileCollectionsDashboardEditPath from "../plus/assets/collections/mobile-collections-dashboard-edit.png?url";
import CollectionsMobileCollectionsDashboardThreeDotsPath from "../plus/assets/collections/mobile-collections-dashboard-three-dots.png?url";
import CollectionsMobileCollectionsDashboardPath from "../plus/assets/collections/mobile-collections-dashboard.png?url";
import CollectionsMobileCollectionsDeleteEntryPath from "../plus/assets/collections/mobile-collections-delete-entry.png?url";
import CollectionsMobileCollectionsFvaUndoPath from "../plus/assets/collections/mobile-collections-fva-undo.png?url";
import CollectionsMobileCollectionsMenuItemPath from "../plus/assets/collections/mobile-collections-menu-item.png?url";
import CollectionsMobileCollectionsUndoPath from "../plus/assets/collections/mobile-collections-undo.png?url";
import CollectionsMobileMenuPath from "../plus/assets/collections/mobile-menu.png?url";
import CollectionsMobileOpenArticleActionsPath from "../plus/assets/collections/mobile-open-article-actions.png?url";
import CollectionsMobilePlusMenuPath from "../plus/assets/collections/mobile-plus-menu.png?url";
import CollectionsMobileSavePageStepOnePath from "../plus/assets/collections/mobile-save-page-step-one.png?url";
import CollectionsMobileSavePagePath from "../plus/assets/collections/mobile-save-page.png?url";
import CollectionsMobileSavedPagePath from "../plus/assets/collections/mobile-saved-page.png?url";
import NotificationsAccessNotificationsFromMainMenuPath from "../plus/assets/notifications/access-notifications-from-main-menu.png?url";
import NotificationsBulkUnwatchDashboardPath from "../plus/assets/notifications/bulk-unwatch-dashboard.png?url";
import NotificationsMobileNotificationsUserMenuPath from "../plus/assets/notifications/mobile-notifications-user-menu.png?url";
import NotificationsNotificationsUserMenuPath from "../plus/assets/notifications/notifications-user-menu.png?url";
import NotificationsStarNotificationPath from "../plus/assets/notifications/star-notification.png?url";
import NotificationsUnwatchDashboardPath from "../plus/assets/notifications/unwatch-dashboard.png?url";
import NotificationsUnwatchPagePath from "../plus/assets/notifications/unwatch-page.png?url";
import NotificationsWatchListPath from "../plus/assets/notifications/watch-list.png?url";
import NotificationsWatchPagePath from "../plus/assets/notifications/watch-page.png?url";
import OfflineDesktopOfflineClearDataPath from "../plus/assets/offline/desktop-offline-clear-data.png?url";
import OfflineDesktopOfflineEnableAutoUpdatePath from "../plus/assets/offline/desktop-offline-enable-auto-update.png?url";
import OfflineDesktopOfflineEnableOfflinePath from "../plus/assets/offline/desktop-offline-enable-offline.png?url";
import OfflineDesktopOfflineManualUpdatePath from "../plus/assets/offline/desktop-offline-manual-update.png?url";
import OfflineDesktopOfflineUserMenuPath from "../plus/assets/offline/desktop-offline-user-menu.png?url";
import PlaygroundPlaygroundExamplePath from "../plus/assets/playground/playground-example.png?url";
import PlaygroundPlaygroundMenuPath from "../plus/assets/playground/playground-menu.png?url";
import PlaygroundPlaygroundSamplePath from "../plus/assets/playground/playground-sample.png?url";
import UpdatesCollectionsPath from "../plus/assets/updates/collections.png?url";
import UpdatesUpdatesPath from "../plus/assets/updates/updates.png?url";
import UpdatesUpdatesBcdPath from "../plus/assets/updates/updates_bcd.png?url";
import UpdatesUpdatesCollectionPath from "../plus/assets/updates/updates_collection.png?url";
import UpdatesUpdatesFilterPath from "../plus/assets/updates/updates_filter.png?url";
import UpdatesUpdatesSearchPath from "../plus/assets/updates/updates_search.png?url";

import { ServerComponent } from "../server/index.js";

export class GenericContent extends ServerComponent {
  /**
   * @param {import("@fred").Context<import("@rari").GenericPage>} context
   * @returns {import("@lit").TemplateResult}
   */
  render(context) {
    const className = [
      "features/ai-help",
      "features/collection",
      "features/offline",
      "features/overview",
      "features/playground",
      "features/updates",
    ].includes(context.id)
      ? "generic-content generic-content__plus-docs-content"
      : "generic-content";

    return html`<main id="content" class=${className}>
      ${context.hyData.sections.map((section) => {
        if (section.type === "prose") {
          // Map plus docs assets path to imported asset paths
          section.value.content = section.value.content.replaceAll(
            /"(\/assets\/[^"]*)"/g,
            (_, key) => assets[key] ?? key,
          );
        }
        return ContentSection.render(context, section);
      })}
    </main>`;
  }
}

/**
 * @type {{[key: string]: string}}
 */
const assets = {
  "/assets/plus-docs/playground/playground-menu.png":
    PlaygroundPlaygroundMenuPath,
  "/assets/plus-docs/playground/playground-sample.png":
    PlaygroundPlaygroundSamplePath,
  "/assets/plus-docs/playground/playground-example.png":
    PlaygroundPlaygroundExamplePath,
  "/assets/plus-docs/ai-help/issue-template.png": AiHelpIssueTemplatePath,
  "/assets/plus-docs/ai-help/example-question-editing.png":
    AiHelpExampleQuestionEditingPath,
  "/assets/plus-docs/ai-help/report-feedback.png": AiHelpReportFeedbackPath,
  "/assets/plus-docs/ai-help/code-examples-queue.png":
    AiHelpCodeExamplesQueuePath,
  "/assets/plus-docs/ai-help/history-settings.png": AiHelpHistorySettingsPath,
  "/assets/plus-docs/ai-help/example-question-answering.png":
    AiHelpExampleQuestionAnsweringPath,
  "/assets/plus-docs/ai-help/code-examples-playground.png":
    AiHelpCodeExamplesPlaygroundPath,
  "/assets/plus-docs/ai-help/history-banner.png": AiHelpHistoryBannerPath,
  "/assets/plus-docs/ai-help/rate-answers.png": AiHelpRateAnswersPath,
  "/assets/plus-docs/ai-help/login-signup.png": AiHelpLoginSignupPath,
  "/assets/plus-docs/updates/updates_collection.png":
    UpdatesUpdatesCollectionPath,
  "/assets/plus-docs/updates/updates_filter.png": UpdatesUpdatesFilterPath,
  "/assets/plus-docs/updates/updates_search.png": UpdatesUpdatesSearchPath,
  "/assets/plus-docs/updates/updates_bcd.png": UpdatesUpdatesBcdPath,
  "/assets/plus-docs/updates/updates.png": UpdatesUpdatesPath,
  "/assets/plus-docs/updates/collections.png": UpdatesCollectionsPath,
  "/assets/plus-docs/collections/desktop-collections-dashboard-delete.png":
    CollectionsDesktopCollectionsDashboardDeletePath,
  "/assets/plus-docs/collections/mobile-save-page-step-one.png":
    CollectionsMobileSavePageStepOnePath,
  "/assets/plus-docs/collections/mobile-save-page.png":
    CollectionsMobileSavePagePath,
  "/assets/plus-docs/collections/desktop-remove-saved.png":
    CollectionsDesktopRemoveSavedPath,
  "/assets/plus-docs/collections/mobile-collections-dashboard-delete-entry.png":
    CollectionsMobileCollectionsDashboardDeleteEntryPath,
  "/assets/plus-docs/collections/mobile-menu.png": CollectionsMobileMenuPath,
  "/assets/plus-docs/collections/mobile-collections-dashboard-edit.png":
    CollectionsMobileCollectionsDashboardEditPath,
  "/assets/plus-docs/collections/desktop-collections-sort.png":
    CollectionsDesktopCollectionsSortPath,
  "/assets/plus-docs/collections/desktop-collections-undo.png":
    CollectionsDesktopCollectionsUndoPath,
  "/assets/plus-docs/collections/mobile-collections-dashboard-three-dots.png":
    CollectionsMobileCollectionsDashboardThreeDotsPath,
  "/assets/plus-docs/collections/mobile-burger-menu.png":
    CollectionsMobileBurgerMenuPath,
  "/assets/plus-docs/collections/mobile-saved-page.png":
    CollectionsMobileSavedPagePath,
  "/assets/plus-docs/collections/desktop-page-add-note.png":
    CollectionsDesktopPageAddNotePath,
  "/assets/plus-docs/collections/mobile-collections-menu-item.png":
    CollectionsMobileCollectionsMenuItemPath,
  "/assets/plus-docs/collections/mobile-collections-fva-undo.png":
    CollectionsMobileCollectionsFvaUndoPath,
  "/assets/plus-docs/collections/mobile-collections-dashboard.png":
    CollectionsMobileCollectionsDashboardPath,
  "/assets/plus-docs/collections/mobile-plus-menu.png":
    CollectionsMobilePlusMenuPath,
  "/assets/plus-docs/collections/desktop-remove-saved-delete.png":
    CollectionsDesktopRemoveSavedDeletePath,
  "/assets/plus-docs/collections/desktop-collections-user-menu.png":
    CollectionsDesktopCollectionsUserMenuPath,
  "/assets/plus-docs/collections/mobile-open-article-actions.png":
    CollectionsMobileOpenArticleActionsPath,
  "/assets/plus-docs/collections/desktop-collections-edit-dialog.png":
    CollectionsDesktopCollectionsEditDialogPath,
  "/assets/plus-docs/collections/desktop-collections-filter.png":
    CollectionsDesktopCollectionsFilterPath,
  "/assets/plus-docs/collections/mobile-add-note.png":
    CollectionsMobileAddNotePath,
  "/assets/plus-docs/collections/desktop-collections-edit-dialog-add-note.png":
    CollectionsDesktopCollectionsEditDialogAddNotePath,
  "/assets/plus-docs/collections/desktop-collections-delete-fva.png":
    CollectionsDesktopCollectionsDeleteFvaPath,
  "/assets/plus-docs/collections/desktop-collections-edit-menu.png":
    CollectionsDesktopCollectionsEditMenuPath,
  "/assets/plus-docs/collections/mobile-collections-delete-entry.png":
    CollectionsMobileCollectionsDeleteEntryPath,
  "/assets/plus-docs/collections/collections-dashboard.png":
    CollectionsCollectionsDashboardPath,
  "/assets/plus-docs/collections/desktop-collections-fva.png":
    CollectionsDesktopCollectionsFvaPath,
  "/assets/plus-docs/collections/mobile-collections-undo.png":
    CollectionsMobileCollectionsUndoPath,
  "/assets/plus-docs/collections/mobile-collections-dashboard-edit-entry.png":
    CollectionsMobileCollectionsDashboardEditEntryPath,
  "/assets/plus-docs/collections/desktop-page-dialog-save.png":
    CollectionsDesktopPageDialogSavePath,
  "/assets/plus-docs/collections/desktop-collections-three-dot-menu.png":
    CollectionsDesktopCollectionsThreeDotMenuPath,
  "/assets/plus-docs/collections/desktop-saving-page.png":
    CollectionsDesktopSavingPagePath,
  "/assets/plus-docs/collections/desktop-page-open-dialog.png":
    CollectionsDesktopPageOpenDialogPath,
  "/assets/plus-docs/notifications/notifications-user-menu.png":
    NotificationsNotificationsUserMenuPath,
  "/assets/plus-docs/notifications/watch-list.png": NotificationsWatchListPath,
  "/assets/plus-docs/notifications/unwatch-dashboard.png":
    NotificationsUnwatchDashboardPath,
  "/assets/plus-docs/notifications/mobile-notifications-user-menu.png":
    NotificationsMobileNotificationsUserMenuPath,
  "/assets/plus-docs/notifications/star-notification.png":
    NotificationsStarNotificationPath,
  "/assets/plus-docs/notifications/unwatch-page.png":
    NotificationsUnwatchPagePath,
  "/assets/plus-docs/notifications/access-notifications-from-main-menu.png":
    NotificationsAccessNotificationsFromMainMenuPath,
  "/assets/plus-docs/notifications/watch-page.png": NotificationsWatchPagePath,
  "/assets/plus-docs/notifications/bulk-unwatch-dashboard.png":
    NotificationsBulkUnwatchDashboardPath,
  "/assets/plus-docs/offline/desktop-offline-manual-update.png":
    OfflineDesktopOfflineManualUpdatePath,
  "/assets/plus-docs/offline/desktop-offline-user-menu.png":
    OfflineDesktopOfflineUserMenuPath,
  "/assets/plus-docs/offline/desktop-offline-enable-offline.png":
    OfflineDesktopOfflineEnableOfflinePath,
  "/assets/plus-docs/offline/desktop-offline-enable-auto-update.png":
    OfflineDesktopOfflineEnableAutoUpdatePath,
  "/assets/plus-docs/offline/desktop-offline-clear-data.png":
    OfflineDesktopOfflineClearDataPath,
};
