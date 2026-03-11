import { FirebaseCrashlytics } from ".";
import {
  CreateNoteParams,
  DeleteNoteParams,
  ListNoteParams,
  ListNotesResponse,
  Note,
} from "./types";
import { CRASHLYTICS_ENDPOINT, ENDPOINT_VERSION } from "./utils";

export class Notes {
  private parent: FirebaseCrashlytics;
  constructor(firebaseCrashlytics: FirebaseCrashlytics) {
    this.parent = firebaseCrashlytics;
  }

  async create(params: CreateNoteParams): Promise<Note> {
    const projectId = await this.parent.getProjectId();
    const accessToken = await this.parent.getAccessToken();

    const response = await fetch(
      `${CRASHLYTICS_ENDPOINT}/${ENDPOINT_VERSION}/projects/${projectId}/apps/${params.appId}/issues/${params.issueId}/notes`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: params.note,
        }),
      },
    );

    const textContent = await response.text();
    return JSON.parse(textContent);
  }

  async list(params: ListNoteParams): Promise<ListNotesResponse> {
    const projectId = await this.parent.getProjectId();
    const accessToken = await this.parent.getAccessToken();

    const url = new URL(
      `${CRASHLYTICS_ENDPOINT}/${ENDPOINT_VERSION}/projects/${projectId}/apps/${params.appId}/issues/${params.issueId}/notes`,
    );
    url.searchParams.append("pageSize", params.pageSize?.toString() ?? "20");
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const textContent = await response.text();
    return JSON.parse(textContent);
  }

  async delete(params: DeleteNoteParams): Promise<{}> {
    const projectId = await this.parent.getProjectId();
    const accessToken = await this.parent.getAccessToken();

    const response = await fetch(
      `${CRASHLYTICS_ENDPOINT}/${ENDPOINT_VERSION}/projects/${projectId}/apps/${params.appId}/issues/${params.issueId}/notes/${params.noteId}`,
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
