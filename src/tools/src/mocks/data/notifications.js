import _ from "lodash";

export const sentNotifications = {
  1: [
    {
      notificationId: 237,
      title: "Discount at Campsite Bar!",
      description: "Quote 25POFF to bar staff for 25% off drinks.",
      occurredAt: 1543114876,
      regionIds: [39],
      eventID: 1 // This field isn't actually in API response, but makes generation easier
    },
    {
      notificationId: 238,
      title: "The 1975 are now on stage!",
      description: "Come to the main stage to see them perform.",
      occurredAt: 1543214979,
      regionIds: [42, 50],
      eventID: 1 // This field isn't actually in API response, but makes generation easier
    },
    {
      notificationId: 239,
      title: "Free churros in the canteen!",
      description: "Come to the churro stand and get a delicious free dessert.",
      occurredAt: 1541214876,
      regionIds: [42, 50],
      eventID: 1 // This field isn't actually in API response, but makes generation easier
    }
  ]
};

export const newSentNotification = {
  notificationId: _.random(300, 100000),
  title: "New Notification Title!",
  description:
    "This is the description of the notification in the mock server.",
  occurredAt: 1543415876,
  regionIds: [42]
};
