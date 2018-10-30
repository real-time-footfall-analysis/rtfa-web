export const eventsMock = {
  312839: {
    name: "Leeds Festival",
    eventID: 312839,
    location: "Leeds, United Kingdom",
    startDate: "2018-08-25",
    endDate: "2018-08-30",
    maxAttendance: 150000,
    coverPhoto:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=400&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=b726b438e0a4089c1e028c11800f7098",
    regions: {
      0: {
        name: "FiveSixEight Bar",
        type: "beacon",
        radius: 20,
        position: { lat: 51.507441, lng: -0.127683 },
        regionID: 0,
        isBoxOpen: false
      },
      1: {
        name: "Metric",
        type: "beacon",
        radius: 10,
        position: { lat: 51.707441, lng: -0.157683 },
        regionID: 1,
        isBoxOpen: false
      }
    }
  },
  312840: {
    name: "Reading Festival",
    eventID: 312840,
    location: "Reading, United Kingdom",
    startDate: "2018-08-25",
    endDate: "2018-08-30",
    maxAttendance: 150000,
    coverPhoto:
      "https://images.unsplash.com/photo-1508481722335-1b8051aad92f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=400&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=cbe9eab442aaf41cf28855e58dc41905"
  },
  312841: {
    name: "Glastonbury",
    eventID: "312841",
    location: "Somerset, United Kingdom",
    startDate: "2018-08-25",
    endDate: "2018-08-30",
    maxAttendance: "150000",
    coverPhoto:
      "https://images.unsplash.com/photo-1508521049563-61d4bb00b270?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=600&h=400&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=5ce2d64f220cfe61fc32d13cd757c4f2"
  }
};

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
