import React from "react";
import TextField from "../../../UI/TextField/TextField";
import { MultiSelect } from "@blueprintjs/select";
import Button from "../../../UI/Button/Button";

const SendNotificationForm = () => {
  return (
    <section>
      <h2>Send New Notification</h2>
      <TextField label="Title" />
      <TextField label="Description" />
      <MultiSelect
        tagRenderer={tag => <span>{tag}</span>}
        items={["Region 1", "Region 2", "Region 3"]}
        itemRenderer={item => item}
        onItemSelect={console.log}
      />
      <br />
      <Button>Submit</Button>
    </section>
  );
};

SendNotificationForm.propTypes = {};

export default SendNotificationForm;
