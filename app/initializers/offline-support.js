import Ember from "ember";

const { log } = Ember.Logger;

export default {
  name: "offline-support",
  initialize(/*application*/) {
    // const notify = application.__container__.lookup("service:notify");

    if ("serviceWorker" in window.navigator) {
      window.navigator.serviceWorker.register("/offline-support.js").then((registration) => {
        const isUpdate = !!registration.active;

        registration.onupdatefound = function () {
          registration.installing.onstatechange = function () {
            if (this.state === "installed") {
              if (isUpdate) {
                Ember.Logger.info("App updated. Restart for the new version.");
              } else {
                Ember.Logger.info("App ready for offline use.");
              }
            }
          };
        };
      }).catch((err) => {
        log(err);
      });
    }
  },
};