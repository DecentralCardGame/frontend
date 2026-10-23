import type { AxiosInstance } from "axios";

/** Adapt the published legacy query client to Cardchain development's REST API.
 * Opt-in only: transaction encoding is deliberately not changed here.
 */
export function adaptDevelopmentChainApi(instance: AxiosInstance) {
  // Legacy Status numbering differs; the new gateway requires numeric enums.
  const legacyStatuses = ["scheme", "prototype", "trial", "permanent", "suspended",
    "banned", "bannedSoon", "bannedVerySoon", "none", "adventureItem"];
  const currentStatusNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 0, 9];
  instance.interceptors.request.use((config) => {
    config.url = config.url?.replace(
      "/DecentralCardGame/Cardchain/cardchain/q_",
      "/DecentralCardGame/cardchain/cardchain/"
    );
    if (config.url?.endsWith("/cards") && config.params) {
      const { statuses, cardTypes, classes, ...params } = config.params;
      config.params = {
        ...params,
        ...(statuses !== undefined ? { status: statuses.map((s: number | string) =>
          currentStatusNumbers[typeof s === "number" ? s : legacyStatuses.indexOf(s)] ?? s) } : {}),
        ...(cardTypes !== undefined ? { cardType: cardTypes } : {}),
        ...(classes !== undefined ? { class: classes } : {}),
      };
    }
    return config;
  });
  instance.interceptors.response.use((response) => {
    const path = response.config.url || "";
    if (path.endsWith("/cards")) {
      response.data = { cardsList: response.data.cardIds.map(Number) };
    } else if (/\/card\/[^/]+$/.test(path)) {
      const { card, image, hash } = response.data.card;
      const content = new TextDecoder().decode(
        Uint8Array.from(atob(card.content), (c) => c.charCodeAt(0))
      );
      response.data = { ...card, content, image, hash };
    } else if (/\/user\/[^/]+$/.test(path)) {
      response.data = response.data.user;
    }
    return response;
  });
}
