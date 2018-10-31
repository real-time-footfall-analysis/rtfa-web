/* eslint-disable react/display-name */
import EventsPage from "./components/Pages/EventsPage/EventsPage";
import NewEventPage from "./components/Pages/NewEventPage/NewEventPage";
import React from "react";
import AddRegionsPage from "./components/Pages/AddRegionsPage/AddRegionsPage";

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
    path: "/maps",
    name: "Maps",
    iconName: "map",
    content: () => <h1>Maps Page</h1>,
    inSidebar: true
  },
  {
    path: "/regionGroups",
    name: "Region Groups",
    shortName: "Groups",
    iconName: "layer-group",
    content: () => <h1>Region Groups</h1>,
    inSidebar: true
  },
  {
    path: "/regions",
    name: "Regions",
    description: "Edit your region names, type and radii.",
    iconName: "object-ungroup",
    content: AddRegionsPage,
    inSidebar: true
  },
  {
    path: "/heatMap",
    name: "Heat Map",
    iconName: "fire",
    content: () => <h1>HeatMap</h1>,
    inSidebar: true
  }
];

export default routes;
