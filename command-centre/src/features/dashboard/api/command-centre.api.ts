import createApiClient from "@/lib/axios";

import { COMMAND_CENTRE_CONFIG } from "../config/command-centre.config";

export const commandCentreApi = {
  async getDashboard() {
    const results = await Promise.allSettled(
      COMMAND_CENTRE_CONFIG.map(async (app) => {
        const api = createApiClient(app.baseUrl);

        const [entities, categories, images, reviews] =
          await Promise.allSettled([
            api.get(app.endpoints.entities),
            api.get(app.endpoints.categories),
            api.get(app.endpoints.images),
            api.get(app.endpoints.reviews),
          ]);

        return {
          id: app.id,
          name: app.name,
          emoji: app.emoji,

          entities,
          categories,
          images,
          reviews,
        };
      }),
    );

    return results
      .filter(
        (result): result is PromiseFulfilledResult<any> =>
          result.status === "fulfilled",
      )
      .map((result) => result.value);
  },
};
