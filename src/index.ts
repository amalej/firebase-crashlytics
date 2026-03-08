import { GoogleAuth } from "google-auth-library";
import {
  CreateNoteParams,
  DeleteCrashReportResponse,
  DeleteCrashreportsParams,
  DeleteNoteParams,
  FirebaseCrashlyticsAuthOptions,
  GetIssueParams,
  Issue,
  ListNoteParams,
  ListNotesResponse,
  Note,
  UpdateIssueParams,
  UpdateIssueResponse,
} from "./types";

const CRASHLYTICS_ENDPOINT = "https://firebasecrashlytics.googleapis.com";
const ENDPOINT_VERSION = "v1alpha";
const AUTH_SCOPES = [
  "https://www.googleapis.com/auth/cloud-platform",
  "https://www.googleapis.com/auth/firebase",
];

export class FirebaseCrashlytics {
  private googleAuthOptions: FirebaseCrashlyticsAuthOptions;
  private accessToken: string | null | undefined;
  constructor(googleAuthOptions: FirebaseCrashlyticsAuthOptions) {
    this.googleAuthOptions = googleAuthOptions;
  }

  async #getAccessToken(): Promise<string> {
    const googleAuth = new GoogleAuth({
      ...this.googleAuthOptions,
      scopes: AUTH_SCOPES,
    });
    const accessToken = await googleAuth.getAccessToken();
    if (typeof accessToken !== "string") {
      throw Error("Could not get access token");
    }
    return accessToken;
  }

  async deleteCrashReport(
    params: DeleteCrashreportsParams,
  ): Promise<DeleteCrashReportResponse> {
    if (this.accessToken === null || this.accessToken === undefined) {
      this.accessToken = await this.#getAccessToken();
    }

    const response = await fetch(
      `${CRASHLYTICS_ENDPOINT}/${ENDPOINT_VERSION}/projects/${params.projectId}/apps/${params.appId}/users/${params.userId}/crashReports`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const textContent = await response.text();
    return JSON.parse(textContent);
  }

  async getIssue(params: GetIssueParams): Promise<Issue> {
    if (this.accessToken === null || this.accessToken === undefined) {
      this.accessToken = await this.#getAccessToken();
    }

    const response = await fetch(
      `${CRASHLYTICS_ENDPOINT}/${ENDPOINT_VERSION}/projects/${params.projectId}/apps/${params.appId}/issues/${params.issueId}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const textContent = await response.text();
    return JSON.parse(textContent);
  }

  async updateIssue(params: UpdateIssueParams): Promise<UpdateIssueResponse> {
    if (this.accessToken === null || this.accessToken === undefined) {
      this.accessToken = await this.#getAccessToken();
    }

    const url = new URL(
      `${CRASHLYTICS_ENDPOINT}/${ENDPOINT_VERSION}/projects/${params.projectId}/apps/${params.appId}/issues/${params.issueId}`,
    );
    url.searchParams.append("updateMask", "state");
    const response = await fetch(url.toString(), {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: params.issueState,
      }),
    });

    const textContent = await response.text();
    return JSON.parse(textContent);
  }

  async createNote(params: CreateNoteParams): Promise<Note> {
    if (this.accessToken === null || this.accessToken === undefined) {
      this.accessToken = await this.#getAccessToken();
    }

    const response = await fetch(
      `${CRASHLYTICS_ENDPOINT}/${ENDPOINT_VERSION}/projects/${params.projectId}/apps/${params.appId}/issues/${params.issueId}/notes`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${this.accessToken}`,
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

  async listNotes(params: ListNoteParams): Promise<ListNotesResponse> {
    if (this.accessToken === null || this.accessToken === undefined) {
      this.accessToken = await this.#getAccessToken();
    }

    const url = new URL(
      `${CRASHLYTICS_ENDPOINT}/${ENDPOINT_VERSION}/projects/${params.projectId}/apps/${params.appId}/issues/${params.issueId}/notes`,
    );
    url.searchParams.append("pageSize", params.pageSize?.toString() ?? "20");
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const textContent = await response.text();
    return JSON.parse(textContent);
  }

  async deleteNote(params: DeleteNoteParams): Promise<{}> {
    if (this.accessToken === null || this.accessToken === undefined) {
      this.accessToken = await this.#getAccessToken();
    }

    const response = await fetch(
      `${CRASHLYTICS_ENDPOINT}/${ENDPOINT_VERSION}/projects/${params.projectId}/apps/${params.appId}/issues/${params.issueId}/notes/${params.noteId}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const textContent = await response.text();
    return JSON.parse(textContent);
  }
}
