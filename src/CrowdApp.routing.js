/* eslint-disable react/display-name */
import _ from "lodash";

import EventsPage from "./components/Pages/EventsPage/EventsPage";
import NewEventPage from "./components/Pages/NewEventPage/NewEventPage";
import AddRegionsPage from "./components/Pages/AddRegionsPage/AddRegionsPage";
import HeatMapPage from "./components/Pages/HeatMapPage/HeatMapPage";
import NotificationsPage from "./components/Pages/NotificationsPage/NotificationsPage";
import { store } from "./store";
import { loadSentNotifications } from "./actions/notifications";

const routes = [
  {
    path: "/events",
    name: "Events",
    exact: true,
    iconName: "calendar",
    content: EventsPage,
    inSidebar: false
  },
  {
    path: "/events/new",
    name: "Create New Event",
    content: NewEventPage,
    inSidebar: false
  },
  {
    path: "/event/addRegions",
    name: "Add Regions",
    description:
      "Regions are either Bluetooth iBeacons or GPS coordinates with a radius, both of which can be used represent a point of interest at your event.",
    content: AddRegionsPage,
    inSidebar: false
  },
  {
    path: "/regions",
    name: "Regions",
    description: "Edit your region names, type and radii.",
    iconName: "object-ungroup",
    content: AddRegionsPage,
    inSidebar: true,
    /* itemCounter is a function that calculates how many "items" that this page
     * is displaying, (e.g. itemCounter for the regions page should return
     * the number of regions that currently exist)
     */
    itemCounter: event => {
      return event && event.regions ? _.size(event.regions) : 0;
    }
  },
  {
    path: "/heatMap",
    name: "Heat Maps",
    iconName: "fire",
    content: HeatMapPage,
    inSidebar: true,
    itemCounter: () => 2
  },
  {
    path: "/notifications",
    name: "Notifications",
    iconName: "bell",
    content: NotificationsPage,
    inSidebar: true,
    itemCounter: event => {
      if (event.sentNotifications) {
        return _.size(event.sentNotifications);
      } else if (event != null && event.eventID != null) {
        /* Load notifications */
        store.dispatch(loadSentNotifications(event.eventID));
        return _.size(event.sentNotifications);
      }
      return 0;
    }
  }
];

export default routes;
