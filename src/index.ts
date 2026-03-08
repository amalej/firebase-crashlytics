import { GoogleAuth } from "google-auth-library";
import { FirebaseCrashlyticsAuthOptions } from "./types";
import { AUTH_SCOPES } from "./utils";

export class FirebaseCrashlytics {
  private static _instances: Map<string, FirebaseCrashlytics> = new Map();

  authOptions: FirebaseCrashlyticsAuthOptions;
  accessToken: string | null = null;
  projectId: string | null = null;

  private constructor(authOptions: FirebaseCrashlyticsAuthOptions) {
    this.authOptions = authOptions;
    this.projectId = authOptions.projectId ?? null;
  }

  static get instances() {
    return FirebaseCrashlytics._instances;
  }

  static getInstance(
    authOptions: FirebaseCrashlyticsAuthOptions,
    name: string = "default",
  ) {
    if (!FirebaseCrashlytics._instances.has(name)) {
      FirebaseCrashlytics._instances.set(
        name,
        new FirebaseCrashlytics(authOptions),
      );
    }
    return FirebaseCrashlytics._instances.get(name)!;
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
    const googleAuth = new GoogleAuth({
      ...this.authOptions,
      scopes: AUTH_SCOPES,
    });
    const accessToken = await googleAuth.getAccessToken();
    if (typeof accessToken !== "string") {
      throw Error("Could not get access token");
    }
    return accessToken;
  }

  public async getProjectId(): Promise<string> {
    if (this.projectId) {
      return this.projectId;
    }
    const googleAuth = new GoogleAuth({
      ...this.authOptions,
      scopes: AUTH_SCOPES,
    });
    const projectId = await googleAuth.getProjectId();
    if (!projectId) {
      throw Error("Could not get project id");
    }
    return projectId;
  }

  /**
   * Deletes the instance with the given name. If the instance does not exist, it does nothing.
   * @param name Name of the instance
   * @returns
   */
  public delete(name: string) {
    return FirebaseCrashlytics._instances.delete(name);
  }
}

export function initialize(
  googleAuthOptions: FirebaseCrashlyticsAuthOptions,
  name: string = "default",
) {
  return FirebaseCrashlytics.getInstance(googleAuthOptions, name);
}

export function listInstances() {
  return FirebaseCrashlytics.instances;
}
