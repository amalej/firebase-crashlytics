import { FirebaseCrashlytics } from ".";
import { DeleteCrashreportsParams, DeleteCrashReportResponse } from "./types";
import { CRASHLYTICS_ENDPOINT, ENDPOINT_VERSION } from "./utils";

export async function deleteCrashReport(
  firebaseCrashlytics: FirebaseCrashlytics,
  params: DeleteCrashreportsParams,
): Promise<DeleteCrashReportResponse> {
  const projectId = await firebaseCrashlytics.getProjectId();
  const accessToken = await firebaseCrashlytics.getAccessToken();

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
