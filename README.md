# Firebase Crashlytics

This is a library which uses the [Firebase Crashlytics REST API](https://firebase.google.com/docs/reference/crashlytics/rest) to delete crash reports of specific users.

## Pre-requisites

1. A service account with permission to access the API.
   1. `Firebase Crashlytics Admin` role should suffice.

## How to use

```js
const firebaseCrashlytics = new FirebaseCrashlytics({
  keyFile: "./service-account.json",
});

async function main() {
  const deleteRequest = await firebaseCrashlytics.deleteCrashReport({
    projectId: "firebase-project-id",
    appId: "1:1234567891011:android:f93747b2261218f38f7c6c",
    userId: "user123456789",
  });

  console.log(deleteRequest);
}

main();
```

outputs

```
{ targetCompleteTime: '2025-02-20T23:15:57.392034Z' }
```

## Ways to authenticate request

### Using a service-account file

Just provide the path to your `service-account` file

```js
const firebaseCrashlytics = new FirebaseCrashlytics({
  serviceAccountPath: "./service-account.json",
});
```

### Using service-account credentials

Just provide the JSON object of your `service-account` credentials

```js
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
