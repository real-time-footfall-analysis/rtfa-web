/* API Constants */
import { KeyValueTask } from "../components/Pages/HeatMapPage/Tasks/TaskRenderers/KeyValueTask/KeyValueTask";
import { BounceRateTask } from "../components/Pages/HeatMapPage/Tasks/TaskRenderers/BounceRateTask/BounceRateTask";

const USE_MOCK_ENDPOINTS = process.env.REACT_APP_USE_MOCK_SERVER === "true";

export const BASE_URL = USE_MOCK_ENDPOINTS
  ? "http://localhost:8000"
  : "http://ec2co-ecsel-aho8usgy987y-668630006.eu-central-1.elb.amazonaws.com";

/* Global Constants */
export const MILLISECONDS_IN_A_SECOND = 1000;

/* Notification Constants */
export const EMERGENCY_NOTIFICATION_POLL_FREQUENCY = 4000;
export const MAX_NOTIFICATION_COUNT = 20;

/* Tasks Constants */
export const TASKS_METADATA = {
  1: {
    props: {
      taskName: "Average Stay Time",
      taskUnits: "minutes",
      taskIcon: "clock"
    },
    component: KeyValueTask
  },
  2: {
    props: {
      taskName: "Bounce Rate",
      taskUnits: "percent",
      taskIcon: "arrows-v",
      thresholdUnits: "minutes"
    },
    component: BounceRateTask
  }
};

export const MAX_DECIMAL_PLACES = 2;

/* Heat Map Constants */
export const HEATMAP_REFRESH_INTERVAL = 10000;
export const HEATMAP_USERS_SCALE_FACTOR = 1;
export const HEATMAP_POINT_RADIUS = 10;
export const HISTORICAL_HEATMAP_TASK_ID = 4;
export const HEATMAP_ANIMATION_FRAME_DELAY = 300;

/* Google Maps Constants */
export const GOOGLE_MAPS_API_KEY = "AIzaSyDaIck1_kxNWiyEQetkb_DH78bV6T7Lz-g";
export const GOOGLE_MAPS_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places,visualization&key=${GOOGLE_MAPS_API_KEY}`;
export const GOOGLE_MAPS_DEFAULT_CENTRE = { lat: 51.507441, lng: -0.127683 };
export const DARK_GOOGLE_MAPS_STYLES = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#212121"
      }
    ]
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9e9e9e"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#bdbdbd"
      }
    ]
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1b1b1b"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c2c2c"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8a8a8a"
      }
    ]
  },
  {
    featureType: "road.arterial",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3c3c3c"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4e4e4e"
      }
    ]
  },
  {
    featureType: "road.local",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161"
      }
    ]
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3d3d3d"
      }
    ]
  }
];
