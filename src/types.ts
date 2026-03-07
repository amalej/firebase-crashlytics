import { GoogleAuthOptions } from "google-auth-library";

export interface FirebaseCrashlyticsAuthOptions extends Omit<
  GoogleAuthOptions,
  "scopes"
> {}

export type ErrorMessage =
  | "Requested entity was not found."
  | "The caller does not have permission"
  | string;

export type ErrorStatus = "NOT_FOUND" | "PERMISSION_DENIED" | string;

export interface DeleteCrashreportsParams {
  projectId: string;
  appId: string;
  userId: string;
}

export interface DeleteCrashReportResponse {
  targetCompleteTime: string;
}

export interface GetIssueParams {
  projectId: string;
  appId: string;
  issueId: string;
}

export interface UpdateIssueParams {
  projectId: string;
  appId: string;
  issueId: string;
  issueState: State;
}

export interface UpdateIssueResponse {
  state?: State;
  name: string;
}

// Most of the types in this file is from https://github.com/firebase/firebase-tools/blob/main/src/crashlytics/types.ts

export interface Issue {
  id?: string;
  title?: string;
  subtitle?: string;
  errorType?: ErrorType;
  sampleEvent?: string;
  uri?: string;
  firstSeenVersion?: string;
  lastSeenVersion?: string;
  signals?: IssueSignals[];
  state?: State;
  notesCount?: number;
  name?: string;
  variants?: IssueVariant[];
}

export enum ErrorType {
  ERROR_TYPE_UNSPECIFIED = "ERROR_TYPE_UNSPECIFIED",
  FATAL = "FATAL",
  NON_FATAL = "NON_FATAL",
  ANR = "ANR",
}

export interface IssueSignals {
  signal: Signal;
  description: string;
}

export interface IssueVariant {
  id?: string;
  sampleEvent?: string;
  uri?: string;
}

export enum Signal {
  SIGNAL_UNSPECIFIED = "SIGNAL_UNSPECIFIED",
  SIGNAL_EARLY = "SIGNAL_EARLY",
  SIGNAL_FRESH = "SIGNAL_FRESH",
  SIGNAL_REGRESSED = "SIGNAL_REGRESSED",
  SIGNAL_REPETITIVE = "SIGNAL_REPETITIVE",
}

export enum State {
  STATE_UNSPECIFIED = "STATE_UNSPECIFIED",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  MUTED = "MUTED",
}
