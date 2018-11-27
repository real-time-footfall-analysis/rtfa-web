import React from "react";
import Page from "../../UI/Page/Page";
import { SentNotificationsList } from "./SentNotificationsList/SentNotificationsList";

const NotificationsPage = () => {
  return (
    <Page title={<span>Notifications</span>}>
      <SentNotificationsList />
    </Page>
  );
};

export default NotificationsPage;
