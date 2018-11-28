/* eslint-disable react/display-name */
import EventsPage from "./components/Pages/EventsPage/EventsPage";
import NewEventPage from "./components/Pages/NewEventPage/NewEventPage";
import AddRegionsPage from "./components/Pages/AddRegionsPage/AddRegionsPage";
import HeatMapPage from "./components/Pages/HeatMapPage/HeatMapPage";
import NotificationsPage from "./components/Pages/NotificationsPage/NotificationsPage";

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
    inSidebar: true
  },
  {
    path: "/heatMap",
    name: "Heat Map",
    iconName: "fire",
    content: HeatMapPage,
    inSidebar: true
  },
  {
    path: "/notifications",
    name: "Notifications",
    iconName: "bell",
    content: NotificationsPage,
    inSidebar: true
  }
];

export default routes;
