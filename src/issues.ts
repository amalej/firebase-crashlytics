import { FirebaseCrashlytics } from "./index";
import {
  GetIssueParams,
  Issue,
  UpdateIssueParams,
  UpdateIssueResponse,
} from "./types";
import { CRASHLYTICS_ENDPOINT, ENDPOINT_VERSION } from "./utils";

export async function getIssue(
  firebaseCrashlytics: FirebaseCrashlytics,
  params: GetIssueParams,
): Promise<Issue> {
  const projectId = await firebaseCrashlytics.getProjectId();
  const accessToken = await firebaseCrashlytics.getAccessToken();

  const response = await fetch(
    `${CRASHLYTICS_ENDPOINT}/${ENDPOINT_VERSION}/projects/${projectId}/apps/${params.appId}/issues/${params.issueId}`,
    {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
  );

  const textContent = await response.text();
  return JSON.parse(textContent);
}

export async function updateIssue(
  firebaseCrashlytics: FirebaseCrashlytics,
  params: UpdateIssueParams,
): Promise<UpdateIssueResponse> {
  const projectId = await firebaseCrashlytics.getProjectId();
  const accessToken = await firebaseCrashlytics.getAccessToken();

  const url = new URL(
    `${CRASHLYTICS_ENDPOINT}/${ENDPOINT_VERSION}/projects/${projectId}/apps/${params.appId}/issues/${params.issueId}`,
  );
  url.searchParams.append("updateMask", "state");
  const response = await fetch(url.toString(), {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      state: params.issueState,
    }),
  });

  const textContent = await response.text();
  return JSON.parse(textContent);
}
