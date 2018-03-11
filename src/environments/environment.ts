// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAZibsmlJ5t4NUwZhH6k6hIWQjlQrTVYA4",
    authDomain: "webjot-dev.firebaseapp.com",
    databaseURL: "https://webjot-dev.firebaseio.com",
    projectId: "webjot-dev",
    storageBucket: "webjot-dev.appspot.com",
    messagingSenderId: "210594280208"
  }
};
