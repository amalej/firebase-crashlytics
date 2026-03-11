import { GoogleAuth } from "google-auth-library";
import { FirebaseCrashlyticsAuthOptions } from "./types";
import { AUTH_SCOPES } from "./utils";
import Issues from "./issues";
import { Notes } from "./notes";
import { Users } from "./users";

export class FirebaseCrashlytics {
  private googleAuth: GoogleAuth;
  private accessToken: string | null = null;
  private projectId: string | null = null;

  issues: Issues;
  notes: Notes;
  users: Users;

  constructor(authOptions: FirebaseCrashlyticsAuthOptions) {
    this.googleAuth = new GoogleAuth({
      ...authOptions,
      scopes: AUTH_SCOPES,
    });
    this.projectId = authOptions.projectId ?? null;
    this.issues = new Issues(this);
    this.notes = new Notes(this);
    this.users = new Users(this);
  }

  /**
   * Get an access token for the instance. If the token is already present, it returns the existing token.
   * @param force Force refresh the access token. Can be used when the token expires
   * @returns Access token
   */
  public async getAccessToken(force: boolean = false): Promise<string> {
    if (this.accessToken && !force) {
      return this.accessToken;
    }

    const accessToken = await this.googleAuth.getAccessToken();
    if (typeof accessToken !== "string") {
      throw Error("Could not get access token");
    }
    return accessToken;
  }

  public async getProjectId(): Promise<string> {
    if (this.projectId) {
      return this.projectId;
    }

    const projectId = await this.googleAuth.getProjectId();
    if (!projectId) {
      throw Error("Could not get project id");
    }
    return projectId;
  }
}
