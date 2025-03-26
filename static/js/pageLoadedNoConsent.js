// pageLoaded.js

import './rudderstack.js'; 

document.addEventListener("DOMContentLoaded", function () {
    const currentState = {
        security_storage: "granted",
        functionality_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
        personalization_storage: "granted",
    };

    const allowedConsentIds = [];
    const deniedConsentIds = [];

    for (let key in currentState) {
        if (currentState[key] === 'granted') {
            allowedConsentIds.push(key);
        } else if (currentState[key] === 'denied') {
            deniedConsentIds.push(key);
        }
    }

    if (window.rudderanalytics && typeof rudderanalytics.consent === 'function') {
        rudderanalytics.consent({
            consentManagement: {
                allowedConsentIds,
                deniedConsentIds
            }
        });
    }

    if (window.rudderanalytics && typeof rudderanalytics.page === 'function') {
        rudderanalytics.page(document.title);
    }

    // Call the globally available function
    window.backfillRudderEvents();
});

