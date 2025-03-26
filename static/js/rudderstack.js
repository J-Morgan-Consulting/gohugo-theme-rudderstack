// Create empty array for events backlog
window.rudderEventsBacklog = [];
// Track events, appending consent preferences
const trackRudderEvent = (eventName, eventProperties) => {
    try {
        // Looks for cookiejar window and if it does not exist adds to backlog
        if (window.rudderanalytics) {
            try {
                if (eventName === "identify") {
                    const { id, ...otherProps } = eventProperties;
                    if (!id) {
                        console.warn("Identify event missing 'id'. Skipping.");
                        return;
                    }
                    rudderanalytics.identify(id, {
                        ...otherProps,
                    });
                } else {
                    rudderanalytics.track(eventName, eventProperties);
                }
            } catch (e) {
                console.log(e);
            }
        } else {
            window.rudderEventsBacklog.push({"name": eventName, "properties": eventProperties})
        }
    } catch (e) {
        console.log(e);
    }
} 

const backfillRudderEvents = () => {
    if (rudderEventsBacklog.length > 0) {
        var tmpBacklog = window.rudderEventsBacklog.slice(); // Create a copy of the array
        tmpBacklog.forEach(function(event, index) {
            var eventName = event["name"];
            var eventProperties = event["properties"];
            // Remove the specific element from the original array.  If it fails again it will be re added by the track function. 
            window.rudderEventsBacklog.splice(index, 1);
            trackRudderEvent(eventName, eventProperties);
        });
    }
}

window.trackRudderEvent = trackRudderEvent;
window.backfillRudderEvents = backfillRudderEvents;

export { trackRudderEvent, backfillRudderEvents };