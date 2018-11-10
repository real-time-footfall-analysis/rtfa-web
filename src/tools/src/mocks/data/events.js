import _ from "lodash";

export const events = [
  {
    eventID: 1,
    organiserId: 1,
    name: "Leeds Festival",
    location: "Leeds, United Kingdom",
    startDate: "2018-10-31T00:00:00Z",
    endDate: "2018-11-07T00:00:00Z",
    indoorOutdoor: "outdoor",
    maxAttendance: 40000,
    coverPhotoUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-0.3.5\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb\u0026w=600\u0026h=400\u0026fit=crop\u0026ixid=eyJhcHBfaWQiOjF9\u0026s=b726b438e0a4089c1e028c11800f7098"
  },
  {
    eventID: 2,
    organiserId: 1,
    name: "Reading Festival",
    location: "Reading, United Kingdom",
    startDate: "2018-08-25T00:00:00Z",
    endDate: "2018-08-30T00:00:00Z",
    indoorOutdoor: "outdoor",
    maxAttendance: 40000,
    coverPhotoUrl:
      "https://images.unsplash.com/photo-1508481722335-1b8051aad92f?ixlib=rb-0.3.5\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb\u0026w=600\u0026h=400\u0026fit=crop\u0026ixid=eyJhcHBfaWQiOjF9\u0026s=cbe9eab442aaf41cf28855e58dc41905"
  },
  {
    eventID: 3,
    organiserId: 1,
    name: "Glastonbury",
    location: "Suffolk, United Kingdom",
    startDate: "2018-10-31T00:00:00Z",
    endDate: "2018-11-07T00:00:00Z",
    indoorOutdoor: "outdoor",
    maxAttendance: 40000,
    coverPhotoUrl:
      "https://images.unsplash.com/photo-1508521049563-61d4bb00b270?ixlib=rb-0.3.5\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb\u0026w=600\u0026h=400\u0026fit=crop\u0026ixid=eyJhcHBfaWQiOjF9\u0026s=5ce2d64f220cfe61fc32d13cd757c4f2"
  },
  {
    eventID: 12,
    organiserId: 1,
    name: "Latitude Festival",
    location: "Suffolk, United Kingdom",
    startDate: "2019-07-18T00:00:00Z",
    endDate: "2019-07-21T00:00:00Z",
    indoorOutdoor: "outdoor",
    maxAttendance: 150000,
    coverPhotoUrl:
      "https://www.latitudefestival.com/sites/live.inviqa.latitudefestival.com/files/images/news/kennerdeigh_scott_-_latitude_festival_2016_-_01f666ea-4db3-11e6-b71f-3645563dd1ea_-_api.jpg"
  }
];
export const newEvent = {
  eventID: _.random(5000, 100000000),
  organiserID: 1,
  name: "Latitude Festival",
  location: "Suffolk, United Kingdom",
  startDate: "2019-07-18T00:00:00Z",
  endDate: "2019-07-21T00:00:00Z",
  indoorOutdoor: "outdoor",
  maxAttendance: 150000,
  coverPhotoUrl:
    "https://www.latitudefestival.com/sites/live.inviqa.latitudefestival.com/files/images/news/kennerdeigh_scott_-_latitude_festival_2016_-_01f666ea-4db3-11e6-b71f-3645563dd1ea_-_api.jpg"
};
