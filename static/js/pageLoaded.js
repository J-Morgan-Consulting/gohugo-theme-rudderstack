// pageLoaded.js

import './rudderstack.js'; 

document.addEventListener("DOMContentLoaded", function () {
    window.theCookieJar.addLoadOption(function() {
        let consentcookie = theCookieJar.current();
        let currentState = {};
        if (consentcookie) {
            currentState = theCookieJar.decode(consentcookie);
        }

        // Default denied keys if not present
        const defaults = {
            analytics_storage: 'denied',
            ad_storage: 'denied'
        };

        currentState = { ...defaults, ...currentState };

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
});

