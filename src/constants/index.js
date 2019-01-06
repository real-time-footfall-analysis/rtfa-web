import { KeyValueTask } from "../components/Pages/HeatMapPage/Tasks/TaskRenderers/KeyValueTask/KeyValueTask";
import { BounceRateTask } from "../components/Pages/HeatMapPage/Tasks/TaskRenderers/BounceRateTask/BounceRateTask";
import PopularTimesTask from "../components/Pages/HeatMapPage/Tasks/TaskRenderers/PopularTimesTask/PopularTimesTask";
import { TaskTransformers } from "../api/tasks/transformers";

/* API Constants */
const USE_MOCK_ENDPOINTS = process.env.REACT_APP_USE_MOCK_SERVER === "true";

export const BASE_URL = USE_MOCK_ENDPOINTS
  ? "http://localhost:8000"
  : "http://ec2co-ecsel-aho8usgy987y-668630006.eu-central-1.elb.amazonaws.com";

export const newEventMock = {
  name: "Latitude Festival",
  location: "Suffolk, United Kingdom",
  startDate: new Date("2019-07-18").toISOString(),
  endDate: new Date("2019-07-21").toISOString(),
  maxAttendance: 150000,
  coverPhotoUrl:
    "https://www.latitudefestival.com/sites/live.inviqa.latitudefestival.com/files/images/news/kennerdeigh_scott_-_latitude_festival_2016_-_01f666ea-4db3-11e6-b71f-3645563dd1ea_-_api.jpg",
  organiserID: 1,
  indoorOutdoor: "outdoor"
};

/* Pusher */
export const PUSHER_API_KEY = "544e69db41ad4dcc08db";
export const PUSHER_API_OPTIONS = {
  cluster: "eu"
};

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
    component: KeyValueTask,
    transformer: TaskTransformers.averageStayTime
  },
  2: {
    props: {
      taskName: "Bounce Rate",
      taskUnits: "percent",
      taskIcon: "arrows-v",
      thresholdUnits: "minutes"
    },
    component: BounceRateTask
  },
  5: {
    props: {
      taskName: "Popular Times",
      taskIcon: "signal"
    },
    component: PopularTimesTask,
    transformer: TaskTransformers.popularTimes
  }
};
export const MAX_DECIMAL_PLACES = 2;

/* Region Categories Metadata */
export const REGION_CATEGORIES = {
  0: {
    category: "Uncategorised",
    icon: ""
  },
  1: {
    category: "Pubs and Bars",
    icon: ""
  },
  2: {
    category: "Rides",
    icon: ""
  },
  3: {
    category: "Entertainment",
    icon: ""
  },
  4: {
    category: "Restaurants",
    icon: ""
  },
  5: {
    category: "Toilets",
    icon: ""
  }
};

/* Heat Map Constants */
export const HEATMAP_REFRESH_INTERVAL = 5000;
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
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36
      },
      {
        color: "#000000"
      },
      {
        lightness: 40
      }
    ]
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on"
      },
      {
        color: "#000000"
      },
      {
        lightness: 16
      }
    ]
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 20
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 17
      },
      {
        weight: 1.2
      }
    ]
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.locality",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      },
      {
        saturation: "-100"
      },
      {
        lightness: "30"
      }
    ]
  },
  {
    featureType: "administrative.neighborhood",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "all",
    stylers: [
      {
        visibility: "simplified"
      },
      {
        gamma: "0.00"
      },
      {
        lightness: "74"
      }
    ]
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#34334f"
      },
      {
        lightness: "-37"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "all",
    stylers: [
      {
        lightness: "3"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "all",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 21
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        visibility: "simplified"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2d2c45"
      },
      {
        lightness: "0"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000"
      },
      {
        lightness: 29
      },
      {
        weight: 0.2
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7d7c9b"
      },
      {
        lightness: "43"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
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
        color: "#2d2c45"
      },
      {
        lightness: "1"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7d7c9b"
      }
    ]
  },
  {
    featureType: "road.arterial",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#2d2c45"
      },
      {
        lightness: "-1"
      },
      {
        gamma: "1"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "on"
      },
      {
        hue: "#ff0000"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#7d7c9b"
      },
      {
        lightness: "-31"
      }
    ]
  },
  {
    featureType: "road.local",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#2d2c45"
      },
      {
        lightness: "-36"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#2d2c45"
      },
      {
        lightness: "0"
      },
      {
        gamma: "1"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "off"
      }
    ]
  }
];
