# Trigger and Alert System

## Triggers

Triggers are called when a condition is met. The `Trigger` class is a metaclass that defines a general way that trigger matching will be done. `ElasticTrigger` is an example of a trigger subclass that gets data from an Elasticsearch instance.

There are many other classes that will need to be used when making a trigger. Here is an example of construction for a trigger.


```javascript
// Create Match object with what to match
let newMatch = new Match('COUNT', 5, { sign: '>' });
// Create Alert object for alerting when match succeeds
let newAlert = new SayAlert("Found > 5 fuzzy searches with 'max'");

// Create ElasticTrigger and search for 'max~'
// Client creation not shown
let maxTrigger = new ElasticTrigger(client, 'max~', match, { delay: 5 });

// Add alert to internal alert system
maxTrigger.addAlert(maxalert);

// Start the trigger
maxTrigger.start();

// Stop trigger after 16 seconds (should let it run for 3 times
setTimeout(maxTrigger.stop, 16000)
```
