# Firebase Crashlytics [![npm](https://img.shields.io/npm/v/firebase-crashlytics)](https://www.npmjs.com/package/firebase-crashlytics) [![npm](https://img.shields.io/npm/dt/firebase-crashlytics)](https://www.npmjs.com/package/firebase-crashlytics?activeTab=versions)

This is a library which uses the [Firebase Crashlytics REST API](https://firebase.google.com/docs/reference/crashlytics/rest) to delete crash reports of specific users.

## Pre-requisites

1. A service account with permission to access the API.
   - `Firebase Crashlytics Admin` role should suffice.
2. The Firebase Crashlytics API should be enabled on your project
   - Visit https://console.cloud.google.com/apis/library/firebasecrashlytics.googleapis.com?project=PROJECT_ID to enable

## How to use

### Installation

```
npm i firebase-crashlytics
```

### Code example

#### Deleting crash reports of a specific user

```ts
import { FirebaseCrashlytics } from "firebase-crashlytics";

async function main() {
  const firebaseCrashlytics = new FirebaseCrashlytics({
    keyFile: "./service-account.json",
  });

  const deleteResponse = await firebaseCrashlytics.users.deleteCrashReport({
    appId: APP_ID,
    userId: USER_ID,
  });

  console.log(deleteResponse);
}

main();
```

outputs

```json
{
  "targetCompleteTime": "2026-04-10T21:08:11.688025Z"
}
```

#### Getting issue data

```ts
import { FirebaseCrashlytics } from "firebase-crashlytics";

async function main() {
  const firebaseCrashlytics = new FirebaseCrashlytics({
    keyFile: "./service-account.json",
  });

  const issueDetails = await firebaseCrashlytics.issues.get({
    appId: APP_ID,
    issueId: ISSUE_ID,
  });

  console.log(issueDetails);
}

main();
```

outputs

```json
{
  "id": "ISSUE_ID",
  "title": "APP_PACKAGE_NAME.ComposableSingletons$MainActivityKt$lambda-2$1.invoke$lambda$1$lambda$0",
  "subtitle": "java.lang.RuntimeException - Test Crash",
  "errorType": "FATAL",
  "sampleEvent": "projects/PROJECT_NUMBER/apps/APP_ID/events/EVENT_ID",
  "uri": "https://console.firebase.google.com/project/PROJECT_ID/crashlytics/app/android:APP_PACKAGE_NAME/issues/ISSUE_ID?&time=last-ninety-days",
  "firstSeenVersion": "1.0",
  "lastSeenVersion": "1.0",
  "signals": [
    {
      "signal": "SIGNAL_FRESH",
      "description": "This issue first appeared 3 days ago."
    }
  ],
  "state": "OPEN",
  "notesCount": "1",
  "name": "projects/PROJECT_NUMBER/apps/APP_ID/issues/ISSUE_ID",
  "variants": [
    {
      "id": "64ce7b28f09448b6bfbcb581314bbbcd",
      "sampleEvent": "projects/PROJECT_NUMBER/apps/APP_ID/events/EVENT_ID",
      "uri": "https://console.firebase.google.com/project/PROJECT_ID/crashlytics/app/android:APP_PACKAGE_NAME/issues/ISSUE_ID?&time=last-ninety-days&subIssues=64ce7b28f09448b6bfbcb581314bbbcd"
    }
  ]
}
```

#### Updating issue state

```ts
import { FirebaseCrashlytics } from "firebase-crashlytics";

async function main() {
  const firebaseCrashlytics = new FirebaseCrashlytics({
    keyFile: "./service-account.json",
  });

  const issueDetails = await firebaseCrashlytics.issues.update({
    appId: APP_ID,
    issueId: ISSUE_ID,
    issueState: "OPEN",
  });

  console.log(issueDetails);
}

main();
```

outputs

```json
{
  "state": "OPEN",
  "name": "projects/PROJECT_ID/apps/APP_ID/issues/ISSUE_ID"
}
```

## Ways to authenticate request

### Using a service-account file

Just provide the path to your `service-account` file

```ts
const firebaseCrashlytics = new FirebaseCrashlytics({
  keyFile: "./service-account.json",
});
```

### Using service-account credentials

Just provide the JSON object of your `service-account` credentials

```ts
const firebaseCrashlytics = new FirebaseCrashlytics({
  credentials: {
    type: "service_account",
    project_id: "<PROJECT_ID>",
    private_key_id: "<PRIVATE_KEY_ID>",
    private_key: "<PRIVATE_KEY>",
    client_email: "<CLIENT_EMAIL>",
    client_id: "<CLIENT_ID>",
    auth_uri: "<AUTH_URI>",
    token_uri: "<TOKEN_URI>",
    auth_provider_x509_cert_url: "<AUTH_PROVIDER_X509_CERT_URL>",
    client_x509_cert_url: "<CLIENT_X509_CERT_URL>",
    universe_domain: "<UNIVERSE_DOMAIN>",
  },
});
```
