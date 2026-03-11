import { FirebaseCrashlytics } from ".";
import { DeleteCrashreportsParams, DeleteCrashReportResponse } from "./types";
import { CRASHLYTICS_ENDPOINT, ENDPOINT_VERSION } from "./utils";

export class Users {
  private parent: FirebaseCrashlytics;
  constructor(firebaseCrashlytics: FirebaseCrashlytics) {
    this.parent = firebaseCrashlytics;
  }

  async deleteCrashReport(
    params: DeleteCrashreportsParams,
  ): Promise<DeleteCrashReportResponse> {
    const projectId = await this.parent.getProjectId();
    const accessToken = await this.parent.getAccessToken();

    const response = await fetch(
      `${CRASHLYTICS_ENDPOINT}/${ENDPOINT_VERSION}/projects/${projectId}/apps/${params.appId}/users/${params.userId}/crashReports`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const textContent = await response.text();
    return JSON.parse(textContent);
  }
}
