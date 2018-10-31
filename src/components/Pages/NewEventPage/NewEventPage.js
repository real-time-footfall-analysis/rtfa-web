import React from "react";
import Page from "../../UI/Page/Page";
import NewEventForm from "./NewEventForm";

const NewEventPage = () => {
  return (
    <Page title={<span>Create New Event</span>}>
      <NewEventForm />
    </Page>
  );
};

export default NewEventPage;
