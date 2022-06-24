/*global chrome*/
import React from "react";
import FailedIcon from "./Assets/failed.png";
import BrowsingCard from "./Components/BrowsingCard";
import CookiesCard from "./Components/CookiesCard";
import DownloadsCard from "./Components/DownloadsCard";
import MaliciousCard from "./Components/MaliciousCard";
import Loader from "./Components/Loader";
import "./App.css";
import { solveResourceURL } from "./Components/Utils";

var data = {
        "history": {
            "downloads": [
                {
                    "bytesReceived": 7431942,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-10T08:40:43.425Z",
                    "exists": true,
                    "fileSize": 7431942,
                    "filename": "/Users/teodorcazamir/Downloads/httpd-2.4.53 (1).tar.bz2",
                    "finalUrl": "https://dlcdn.apache.org/httpd/httpd-2.4.53.tar.bz2",
                    "id": 28,
                    "incognito": false,
                    "mime": "application/x-bzip2",
                    "paused": false,
                    "referrer": "",
                    "startTime": "2022-05-10T08:40:42.608Z",
                    "state": "complete",
                    "totalBytes": 7431942,
                    "url": "https://dlcdn.apache.org/httpd/httpd-2.4.53.tar.bz2"
                },
                {
                    "bytesReceived": 12032,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-10T08:46:30.505Z",
                    "exists": true,
                    "fileSize": 12032,
                    "filename": "/Users/teodorcazamir/Downloads/image8-2.webp",
                    "finalUrl": "https://blog.hubspot.com/hubfs/image8-2.jpg",
                    "id": 29,
                    "incognito": false,
                    "mime": "image/webp",
                    "paused": false,
                    "referrer": "https://www.google.com/",
                    "startTime": "2022-05-10T08:46:26.063Z",
                    "state": "complete",
                    "totalBytes": 12032,
                    "url": "https://blog.hubspot.com/hubfs/image8-2.jpg"
                },
                {
                    "bytesReceived": 4297,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-20T14:21:41.565Z",
                    "exists": true,
                    "fileSize": 4297,
                    "filename": "/Users/teodorcazamir/Downloads/output-onlinepngtools.png",
                    "finalUrl": "blob:https://onlinepngtools.com/dc3097f7-ead0-4559-b281-dd182fc15f6c",
                    "id": 42,
                    "incognito": false,
                    "mime": "image/png",
                    "paused": false,
                    "referrer": "",
                    "startTime": "2022-05-20T14:21:41.488Z",
                    "state": "complete",
                    "totalBytes": 4297,
                    "url": "blob:https://onlinepngtools.com/dc3097f7-ead0-4559-b281-dd182fc15f6c"
                },
                {
                    "bytesReceived": 165075,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-20T14:18:43.013Z",
                    "exists": true,
                    "fileSize": 165075,
                    "filename": "/Users/teodorcazamir/Desktop/Icons8-Windows-8-Security-Delete-Shield.ico",
                    "finalUrl": "https://iconarchive.com/download/i91623/icons8/windows-8/Security-Delete-Shield.ico",
                    "id": 41,
                    "incognito": false,
                    "mime": "image/x-icon",
                    "paused": false,
                    "referrer": "https://www.google.com/",
                    "startTime": "2022-05-20T14:18:39.382Z",
                    "state": "complete",
                    "totalBytes": 165075,
                    "url": "https://iconarchive.com/download/i91623/icons8/windows-8/Security-Delete-Shield.ico"
                },
                {
                    "bytesReceived": 29147,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-20T14:07:34.684Z",
                    "exists": true,
                    "fileSize": 29147,
                    "filename": "/Users/teodorcazamir/Desktop/digithrone/src/popup/src/assets/green-lock.png",
                    "finalUrl": "https://www.kindpng.com/picc/m/495-4950519_unlock-alt-icons-download-for-free-in-png.png",
                    "id": 40,
                    "incognito": false,
                    "mime": "image/png",
                    "paused": false,
                    "referrer": "https://www.google.com/",
                    "startTime": "2022-05-20T14:07:12.954Z",
                    "state": "complete",
                    "totalBytes": 29147,
                    "url": "https://www.kindpng.com/picc/m/495-4950519_unlock-alt-icons-download-for-free-in-png.png"
                },
                {
                    "bytesReceived": 16383,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-19T16:16:17.620Z",
                    "exists": true,
                    "fileSize": 16383,
                    "filename": "/Users/teodorcazamir/Desktop/digithrone/src/popup/src/assets/downloads.png",
                    "finalUrl": "https://icons.iconarchive.com/icons/janosch500/tropical-waters-folders/512/Downloads-icon.png",
                    "id": 39,
                    "incognito": false,
                    "mime": "image/png",
                    "paused": false,
                    "referrer": "https://www.google.com/",
                    "startTime": "2022-05-19T16:16:12.146Z",
                    "state": "complete",
                    "totalBytes": 16383,
                    "url": "https://icons.iconarchive.com/icons/janosch500/tropical-waters-folders/512/Downloads-icon.png"
                },
                {
                    "bytesReceived": 131878,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-19T16:14:59.219Z",
                    "exists": true,
                    "fileSize": 131878,
                    "filename": "/Users/teodorcazamir/Desktop/digithrone/src/popup/src/assets/globe.png",
                    "finalUrl": "https://cdn.pixabay.com/photo/2014/04/02/17/00/globe-307634_1280.png",
                    "id": 38,
                    "incognito": false,
                    "mime": "image/webp",
                    "paused": false,
                    "referrer": "https://pixabay.com/",
                    "startTime": "2022-05-19T16:14:43.896Z",
                    "state": "complete",
                    "totalBytes": 131878,
                    "url": "https://cdn.pixabay.com/photo/2014/04/02/17/00/globe-307634_1280.png"
                },
                {
                    "bytesReceived": 0,
                    "canResume": false,
                    "danger": "safe",
                    "error": "USER_CANCELED",
                    "exists": true,
                    "fileSize": 131878,
                    "filename": "",
                    "finalUrl": "https://cdn.pixabay.com/photo/2014/04/02/17/00/globe-307634_1280.png",
                    "id": 37,
                    "incognito": false,
                    "mime": "image/webp",
                    "paused": false,
                    "referrer": "https://www.google.com/",
                    "startTime": "2022-05-19T16:14:13.006Z",
                    "state": "interrupted",
                    "totalBytes": 131878,
                    "url": "https://cdn.pixabay.com/photo/2014/04/02/17/00/globe-307634_1280.png"
                },
                {
                    "bytesReceived": 489613,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-17T22:10:21.667Z",
                    "exists": true,
                    "fileSize": 489613,
                    "filename": "/Users/teodorcazamir/Downloads/Screen Recording 2022-05-18 at 1.09.04 AM.gif",
                    "finalUrl": "https://www.zamzar.com/download.php?uid=1e8ff547d627599c66273edeedec83b0-c4865346d5275a2c&tcs=Z76&fileID=p1g3a139p81qen1hpmj7d1d3l1evd4.gif",
                    "id": 36,
                    "incognito": false,
                    "mime": "application/octet-stream",
                    "paused": false,
                    "referrer": "https://www.zamzar.com/uploadComplete.php?session=1e8ff547d627599c66273edeedec83b0&tcs=Z76",
                    "startTime": "2022-05-17T22:10:20.826Z",
                    "state": "complete",
                    "totalBytes": 489613,
                    "url": "https://www.zamzar.com/download.php?uid=1e8ff547d627599c66273edeedec83b0-c4865346d5275a2c&tcs=Z76&fileID=p1g3a139p81qen1hpmj7d1d3l1evd4.gif"
                },
                {
                    "bytesReceived": 701628,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-17T22:06:50.138Z",
                    "exists": true,
                    "fileSize": 701628,
                    "filename": "/Users/teodorcazamir/Downloads/Screen Recording 2022-05-18 at 1.04.54 AM.gif",
                    "finalUrl": "https://www.zamzar.com/download.php?uid=edd3fb9922e6c383ba7d2438548b-a47df12167b71edf&tcs=Z81&fileID=p1g3a0t1uh1l8s1pn48hboo01av14.gif",
                    "id": 35,
                    "incognito": false,
                    "mime": "application/octet-stream",
                    "paused": false,
                    "referrer": "https://www.zamzar.com/uploadComplete.php?session=edd3fb9922e6c383ba7d2438548b&tcs=Z81",
                    "startTime": "2022-05-17T22:06:49.575Z",
                    "state": "complete",
                    "totalBytes": 701628,
                    "url": "https://www.zamzar.com/download.php?uid=edd3fb9922e6c383ba7d2438548b-a47df12167b71edf&tcs=Z81&fileID=p1g3a0t1uh1l8s1pn48hboo01av14.gif"
                },
                {
                    "bytesReceived": 15174,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-15T15:26:53.639Z",
                    "exists": true,
                    "fileSize": 15174,
                    "filename": "/Users/teodorcazamir/Desktop/med-repair/med-repair/src/assets/images/clinic.jpeg",
                    "finalUrl": "https://png.pngtree.com/png-vector/20190321/ourlarge/pngtree-vector-hospital-icon-png-image_857263.jpg",
                    "id": 34,
                    "incognito": false,
                    "mime": "image/jpeg",
                    "paused": false,
                    "referrer": "https://www.google.com/",
                    "startTime": "2022-05-15T15:26:38.062Z",
                    "state": "complete",
                    "totalBytes": 15174,
                    "url": "https://png.pngtree.com/png-vector/20190321/ourlarge/pngtree-vector-hospital-icon-png-image_857263.jpg"
                },
                {
                    "bytesReceived": 123552,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-15T15:13:03.794Z",
                    "exists": true,
                    "fileSize": 123552,
                    "filename": "/Users/teodorcazamir/Desktop/med-repair/med-repair/src/assets/images/star.png",
                    "finalUrl": "https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png",
                    "id": 33,
                    "incognito": false,
                    "mime": "image/png",
                    "paused": false,
                    "referrer": "https://www.google.com/",
                    "startTime": "2022-05-15T15:12:57.255Z",
                    "state": "complete",
                    "totalBytes": 123552,
                    "url": "https://www.freepnglogos.com/uploads/star-png/star-vector-png-transparent-image-pngpix-21.png"
                },
                {
                    "bytesReceived": 10200,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-15T14:57:09.421Z",
                    "exists": true,
                    "fileSize": 10200,
                    "filename": "/Users/teodorcazamir/Desktop/med-repair/med-repair/src/assets/images/surgeon-doctor.png",
                    "finalUrl": "https://www.pngrepo.com/png/284250/180/surgeon-doctor.png",
                    "id": 32,
                    "incognito": false,
                    "mime": "image/png",
                    "paused": false,
                    "referrer": "https://www.google.com/",
                    "startTime": "2022-05-15T14:56:51.649Z",
                    "state": "complete",
                    "totalBytes": 10200,
                    "url": "https://www.pngrepo.com/png/284250/180/surgeon-doctor.png"
                },
                {
                    "bytesReceived": 9929,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-14T20:27:28.503Z",
                    "exists": true,
                    "fileSize": 9929,
                    "filename": "/Users/teodorcazamir/Desktop/med-repair/med-repair/src/assets/images/user.jpeg",
                    "finalUrl": "https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg",
                    "id": 31,
                    "incognito": false,
                    "mime": "image/jpeg",
                    "paused": false,
                    "referrer": "https://www.google.com/",
                    "startTime": "2022-05-14T20:27:19.356Z",
                    "state": "complete",
                    "totalBytes": 9929,
                    "url": "https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg"
                },
                {
                    "bytesReceived": 4073,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-14T20:00:07.642Z",
                    "exists": true,
                    "fileSize": 4073,
                    "filename": "/Users/teodorcazamir/Desktop/med-repair/med-repair/src/assets/images/bot.png",
                    "finalUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADhCAMAAADmr0l2AAAA6lBMVEXxIQD///9RUVHwAADq6uppzvZDQ0P/+fjV1dVdXV3xFADw8PDxGwDq7+/1dGfxEADst7RMTEz+8e/q8vJISEj2e3BQSUb+7Or3k4r7yMNq1P72f3X96ej80875rab6vbf93tv0XU9AQEBoye/6tK3yPCfzSTi5ubmXl5f5qaFUZGtlutz7xsD1aVv2eGv4nZT0V0jzRDLyMBjr3Nr94d3syMTulIzr0c72iYDi4uLExMR3d3eJiYlSWl1fnLZhqMVbh5pWcHvyNh/tnJbsy8f0WUtqamqqqqrsr6pVanOBgYFbiZ2/v7+RkZEGLkw4AAAOuklEQVR4nN2dfXfauBKH7YjEqWNwMaFAgBBSoCEN4SVpQra77S5dsrm9t9//61zLxtgGSxoZjTH7+yPn9Byn9hO9jUYzI03/l0vL6kWG49RqtVar5f50HCOr16IDGk67M2yOJoO+ZtrEl21qi+mke1/vNVropIiAtcb4fmD6RJYrLSL3n6YPvBjVO1d4H4EE6LTHIx9ME8nyOAfzuxrKlyAAGu361KbdUEaWSzmrdhzlX6MasNYbacQWtxsD0p6MVXdXlYDO5ZIQQK/kQ/brShmVARo9l24nuJBxNm6p+ixVgO2qGro146SjaAFRAWhcTomtjG7FSLS5kmbcHdCpawobL4Jok5KC0bgr4GMz7aQJkEkmd/sFbJWU9824LDJt7A+wVUXG8xEnOyGmBzTmGeD5iN3HPQBeWtngUZmkmXrRSAnYWKDMnEzZZJgloFPKFo+K9NOtGWkAO1p2vTOUReZp+qk8oNPNvvl8kVmK+VQasEPkdnoq5TYiNqBxT/aGRyU/EuUA27N9jL6oLNnpVArwcl+jLypSQgPcc/cMZC9k9lFwwFZ/390zkEU6CIBtvF2RtCwyVg7YycPwC0WqigHH+Rh+ocgSaNbAAHMyvURlL2BeYh",
                    "id": 30,
                    "incognito": false,
                    "mime": "image/png",
                    "paused": false,
                    "referrer": "https://www.google.com/",
                    "startTime": "2022-05-14T19:59:51.797Z",
                    "state": "complete",
                    "totalBytes": 4073,
                    "url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADhCAMAAADmr0l2AAAA6lBMVEXxIQD///9RUVHwAADq6uppzvZDQ0P/+fjV1dVdXV3xFADw8PDxGwDq7+/1dGfxEADst7RMTEz+8e/q8vJISEj2e3BQSUb+7Or3k4r7yMNq1P72f3X96ej80875rab6vbf93tv0XU9AQEBoye/6tK3yPCfzSTi5ubmXl5f5qaFUZGtlutz7xsD1aVv2eGv4nZT0V0jzRDLyMBjr3Nr94d3syMTulIzr0c72iYDi4uLExMR3d3eJiYlSWl1fnLZhqMVbh5pWcHvyNh/tnJbsy8f0WUtqamqqqqrsr6pVanOBgYFbiZ2/v7+RkZEGLkw4AAAOuklEQVR4nN2dfXfauBKH7YjEqWNwMaFAgBBSoCEN4SVpQra77S5dsrm9t9//61zLxtgGSxoZjTH7+yPn9Byn9hO9jUYzI03/l0vL6kWG49RqtVar5f50HCOr16IDGk67M2yOJoO+ZtrEl21qi+mke1/vNVropIiAtcb4fmD6RJYrLSL3n6YPvBjVO1d4H4EE6LTHIx9ME8nyOAfzuxrKlyAAGu361KbdUEaWSzmrdhzlX6MasNYbacQWtxsD0p6MVXdXlYDO5ZIQQK/kQ/brShmVARo9l24nuJBxNm6p+ixVgO2qGro146SjaAFRAWhcTomtjG7FSLS5kmbcHdCpawobL4Jok5KC0bgr4GMz7aQJkEkmd/sFbJWU9824LDJt7A+wVUXG8xEnOyGmBzTmGeD5iN3HPQBeWtngUZmkmXrRSAnYWKDMnEzZZJgloFPKFo+K9NOtGWkAO1p2vTOUReZp+qk8oNPNvvl8kVmK+VQasEPkdnoq5TYiNqBxT/aGRyU/EuUA27N9jL6oLNnpVArwcl+jLypSQgPcc/cMZC9k9lFwwFZ/390zkEU6CIBtvF2RtCwyVg7YycPwC0WqigHH+Rh+ocgSaNbAAHMyvURlL2BeYh"
                },
                {
                    "bytesReceived": 343761271,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-23T12:36:59.491Z",
                    "exists": true,
                    "fileSize": 343761271,
                    "filename": "/Users/teodorcazamir/Downloads/ghidra_10.1.4_PUBLIC_20220519.zip",
                    "finalUrl": "https://objects.githubusercontent.com/github-production-release-asset-2e65be/173228436/c132d7ff-4dce-4c09-a0b3-3ac987328fce?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20220523%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20220523T123621Z&X-Amz-Expires=300&X-Amz-Signature=02f8ae6c594232f7955375499edd4e8640956f3925277aa65caebdbf9099937e&X-Amz-SignedHeaders=host&actor_id=0&key_id=0&repo_id=173228436&response-content-disposition=attachment%3B%20filename%3Dghidra_10.1.4_PUBLIC_20220519.zip&response-content-type=application%2Foctet-stream",
                    "id": 54,
                    "incognito": false,
                    "mime": "application/octet-stream",
                    "paused": false,
                    "referrer": "https://github.com/NationalSecurityAgency/ghidra/releases",
                    "startTime": "2022-05-23T12:36:21.698Z",
                    "state": "complete",
                    "totalBytes": 343761271,
                    "url": "https://github.com/NationalSecurityAgency/ghidra/releases/download/Ghidra_10.1.4_build/ghidra_10.1.4_PUBLIC_20220519.zip"
                },
                {
                    "bytesReceived": 6098226,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-23T12:34:55.942Z",
                    "exists": true,
                    "fileSize": 6098226,
                    "filename": "/Users/teodorcazamir/Downloads/ataclock.exe",
                    "finalUrl": "http://www.drive-software.com/download/ataclock.exe",
                    "id": 53,
                    "incognito": false,
                    "mime": "application/x-msdos-program",
                    "paused": false,
                    "referrer": "",
                    "startTime": "2022-05-23T12:34:54.261Z",
                    "state": "complete",
                    "totalBytes": 6098226,
                    "url": "http://www.drive-software.com/download/ataclock.exe"
                },
                {
                    "bytesReceived": 0,
                    "canResume": true,
                    "danger": "safe",
                    "error": "SERVER_FAILED",
                    "exists": true,
                    "fileSize": 575,
                    "filename": "/Users/teodorcazamir/Downloads/PngItem_2302592.png",
                    "finalUrl": "https://www.pngitem.com/pimgs/b/230-2302592_brain-outline-png.png",
                    "id": 52,
                    "incognito": false,
                    "mime": "text/html",
                    "paused": false,
                    "referrer": "https://www.pngitem.com/download/iboxmhh_brain-outline-brain-png-transparent-png/",
                    "startTime": "2022-05-22T19:25:40.271Z",
                    "state": "interrupted",
                    "totalBytes": 575,
                    "url": "https://www.pngitem.com/pimgs/b/230-2302592_brain-outline-png.png"
                },
                {
                    "bytesReceived": 0,
                    "canResume": true,
                    "danger": "safe",
                    "error": "SERVER_FAILED",
                    "exists": true,
                    "fileSize": 575,
                    "filename": "/Users/teodorcazamir/Downloads/PngItem_2302592.png",
                    "finalUrl": "https://www.pngitem.com/pimgs/b/230-2302592_brain-outline-png.png",
                    "id": 51,
                    "incognito": false,
                    "mime": "text/html",
                    "paused": false,
                    "referrer": "https://www.pngitem.com/download/iboxmhh_brain-outline-brain-png-transparent-png/",
                    "startTime": "2022-05-22T19:25:35.281Z",
                    "state": "interrupted",
                    "totalBytes": 575,
                    "url": "https://www.pngitem.com/pimgs/b/230-2302592_brain-outline-png.png"
                },
                {
                    "bytesReceived": 5562,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-22T15:13:11.987Z",
                    "exists": false,
                    "fileSize": 5562,
                    "filename": "/Users/teodorcazamir/Downloads/close.png",
                    "finalUrl": "https://uxwing.com/wp-content/themes/uxwing/download/48-checkmark-cross/close.png",
                    "id": 50,
                    "incognito": false,
                    "mime": "image/png",
                    "paused": false,
                    "referrer": "https://uxwing.com/close-icon/",
                    "startTime": "2022-05-22T15:13:11.881Z",
                    "state": "complete",
                    "totalBytes": 5562,
                    "url": "https://uxwing.com/wp-content/themes/uxwing/download/48-checkmark-cross/close.png"
                },
                {
                    "bytesReceived": 0,
                    "canResume": false,
                    "danger": "safe",
                    "error": "USER_CANCELED",
                    "exists": true,
                    "fileSize": 4388,
                    "filename": "",
                    "finalUrl": "https://uxwing.com/wp-content/themes/uxwing/download/48-checkmark-cross/close.png",
                    "id": 49,
                    "incognito": false,
                    "mime": "image/webp",
                    "paused": false,
                    "referrer": "https://www.google.com/",
                    "startTime": "2022-05-22T15:12:47.453Z",
                    "state": "interrupted",
                    "totalBytes": 4388,
                    "url": "https://uxwing.com/wp-content/themes/uxwing/download/48-checkmark-cross/close.png"
                },
                {
                    "bytesReceived": 2826,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-22T15:07:20.789Z",
                    "exists": false,
                    "fileSize": 2826,
                    "filename": "/Users/teodorcazamir/Downloads/image.png",
                    "finalUrl": "blob:https://pinetools.com/2bad7900-d7ec-4b88-9612-91dc0b0c0404",
                    "id": 48,
                    "incognito": false,
                    "mime": "image/png",
                    "paused": false,
                    "referrer": "",
                    "startTime": "2022-05-22T15:07:20.673Z",
                    "state": "complete",
                    "totalBytes": 2826,
                    "url": "blob:https://pinetools.com/2bad7900-d7ec-4b88-9612-91dc0b0c0404"
                },
                {
                    "bytesReceived": 12487,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-21T17:42:27.660Z",
                    "exists": false,
                    "fileSize": 12487,
                    "filename": "/Users/teodorcazamir/Downloads/image.png",
                    "finalUrl": "blob:https://pinetools.com/29998b8f-8dd9-438d-bb04-9499561fdb74",
                    "id": 47,
                    "incognito": false,
                    "mime": "image/png",
                    "paused": false,
                    "referrer": "",
                    "startTime": "2022-05-21T17:42:27.584Z",
                    "state": "complete",
                    "totalBytes": 12487,
                    "url": "blob:https://pinetools.com/29998b8f-8dd9-438d-bb04-9499561fdb74"
                },
                {
                    "bytesReceived": 7089,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-21T17:42:21.943Z",
                    "exists": false,
                    "fileSize": 7089,
                    "filename": "/Users/teodorcazamir/Downloads/no-icon-png-6.jpg",
                    "finalUrl": "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg",
                    "id": 46,
                    "incognito": false,
                    "mime": "image/jpeg",
                    "paused": false,
                    "referrer": "https://icon-library.com/icon/no-icon-png-6.html",
                    "startTime": "2022-05-21T17:42:21.824Z",
                    "state": "complete",
                    "totalBytes": 7089,
                    "url": "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg"
                },
                {
                    "bytesReceived": 12487,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-21T17:18:43.493Z",
                    "exists": false,
                    "fileSize": 12487,
                    "filename": "/Users/teodorcazamir/Downloads/image.png",
                    "finalUrl": "blob:https://pinetools.com/fad5a0d4-9057-4164-93f0-ca5befd22480",
                    "id": 45,
                    "incognito": false,
                    "mime": "image/png",
                    "paused": false,
                    "referrer": "",
                    "startTime": "2022-05-21T17:18:43.375Z",
                    "state": "complete",
                    "totalBytes": 12487,
                    "url": "blob:https://pinetools.com/fad5a0d4-9057-4164-93f0-ca5befd22480"
                },
                {
                    "bytesReceived": 7089,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-21T17:18:20.625Z",
                    "exists": false,
                    "fileSize": 7089,
                    "filename": "/Users/teodorcazamir/Downloads/no-icon-png-6.jpg",
                    "finalUrl": "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg",
                    "id": 44,
                    "incognito": false,
                    "mime": "image/jpeg",
                    "paused": false,
                    "referrer": "https://icon-library.com/icon/no-icon-png-6.html",
                    "startTime": "2022-05-21T17:18:20.447Z",
                    "state": "complete",
                    "totalBytes": 7089,
                    "url": "https://icon-library.com/images/no-icon-png/no-icon-png-6.jpg"
                },
                {
                    "bytesReceived": 4908,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-21T12:42:42.814Z",
                    "exists": false,
                    "fileSize": 4908,
                    "filename": "/Users/teodorcazamir/Downloads/clipart1120803.png",
                    "finalUrl": "https://www.clipartmax.com/png/full/112-1120803_picking-up-trash-clipart.png",
                    "id": 43,
                    "incognito": false,
                    "mime": "image/png",
                    "paused": false,
                    "referrer": "https://www.clipartmax.com/download/m2i8Z5m2i8b1K9N4_trash-can-icon-white/",
                    "startTime": "2022-05-21T12:42:42.643Z",
                    "state": "complete",
                    "totalBytes": 4908,
                    "url": "https://www.clipartmax.com/png/full/112-1120803_picking-up-trash-clipart.png"
                },
                {
                    "bytesReceived": 57072,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-24T12:33:43.254Z",
                    "exists": true,
                    "fileSize": 57072,
                    "filename": "/Users/teodorcazamir/Desktop/reversing_and_exploiting_free_tools_part_7_image_37_exploit_32_bits.png",
                    "finalUrl": "https://www.coresecurity.com/sites/default/files/2021-02/reversing_and_exploiting_free_tools_part_7_image_37_exploit_32_bits.png",
                    "id": 55,
                    "incognito": false,
                    "mime": "image/png",
                    "paused": false,
                    "referrer": "https://www.coresecurity.com/core-labs/articles/reversing-exploiting-free-tools-part-7",
                    "startTime": "2022-05-24T12:33:39.555Z",
                    "state": "complete",
                    "totalBytes": 57072,
                    "url": "https://www.coresecurity.com/sites/default/files/2021-02/reversing_and_exploiting_free_tools_part_7_image_37_exploit_32_bits.png"
                },
                {
                    "bytesReceived": 7431942,
                    "canResume": false,
                    "danger": "safe",
                    "endTime": "2022-05-28T18:04:41.214Z",
                    "exists": true,
                    "fileSize": 7431942,
                    "filename": "/Users/teodorcazamir/Downloads/httpd-2.4.53.tar.bz2",
                    "finalUrl": "https://dlcdn.apache.org/httpd/httpd-2.4.53.tar.bz2",
                    "id": 56,
                    "incognito": false,
                    "mime": "application/x-bzip2",
                    "paused": false,
                    "referrer": "",
                    "startTime": "2022-05-28T18:04:40.413Z",
                    "state": "complete",
                    "totalBytes": 7431942,
                    "url": "https://dlcdn.apache.org/httpd/httpd-2.4.53.tar.bz2"
                },
                {
                    "bytesReceived": 0,
                    "canResume": false,
                    "danger": "safe",
                    "exists": true,
                    "fileSize": 192704413,
                    "filename": "/Users/teodorcazamir/Downloads/googlechrome (1).dmg",
                    "finalUrl": "https://dl.google.com/chrome/mac/universal/stable/CHFA/googlechrome.dmg",
                    "id": 4,
                    "incognito": false,
                    "mime": "application/x-apple-diskimage",
                    "paused": false,
                    "referrer": "",
                    "startTime": "2022-06-05T18:19:28.372Z",
                    "state": "in_progress",
                    "totalBytes": 192704413,
                    "url": "https://dl.google.com/chrome/mac/universal/stable/CHFA/googlechrome.dmg"
                }
            ],
            "browsing": [
                {
                    "lastVisitTime": 1654444464674,
                    "url": "https://www.google.com/search?q=dasd&rlz=1C5CHFA_enRO897RO897&oq=dasd&aqs=chrome..69i57j46i512j46i175i199i512j0i512j0i10j46i10j46i10i199i291j0i10l2.320j0j7&sourceid=chrome&ie=UTF-8",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654444538232,
                    "url": "https://httpd.apache.org/download.cgi#:~:text=httpd%2D2.4.53.tar.bz2",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654444563822,
                    "url": "https://httpd.apache.org/download.cgi#:~:text=httpd-2.4.53.tar.bz2",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654444635864,
                    "url": "https://dlcdn.apache.org/httpd/httpd-2.4.53.tar.gz",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654444817242,
                    "url": "https://httpd.apache.org/download.cgi#:~:text=httpd-2.4.53.tar.bz2",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654453027077,
                    "url": "https://www.google.com/search?q=download+chrome&rlz=1C5CHFA_enRO897RO897&oq=download+chrome&aqs=chrome..69i57j0i512l9.1643j0j9&sourceid=chrome&ie=UTF-8",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1120",
                    "lastVisitTime": 1654453089969.41,
                    "title": "ads - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=ads&rlz=1C5CHFA_enRO897RO897&oq=ads&aqs=chrome..69i57j0i512l4j46i175i199i512j46i199i465i512j0i10i512j0i512.337j0j9&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1121",
                    "lastVisitTime": 1654453101223.433,
                    "title": "download google chrome - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=download+google+chrome&rlz=1C5CHFA_enRO897RO897&ei=YfOcYuXaOc7ukgXjmqewCw&ved=0ahUKEwilj-WF9pb4AhVOt6QKHWPNCbYQ4dUDCA4&uact=5&oq=download+google+chrome&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIABBDOgsILhCABBDHARCjAjoOCC4QgAQQxwEQowIQ1AI6CAguEIAEENQCOgUILhCABDoLCC4QgAQQxwEQ0QM6BwguENQCEEM6BQgAEJECSgQIQRgASgQIRhgAUN8HWMIfYMsgaAFwAXgAgAFsiAGTD5IBBDIwLjKYAQCgAQHAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1125",
                    "lastVisitTime": 1654453103312.144,
                    "title": "Google Chrome - Download the Fast, Secure Browser from Google",
                    "typedCount": 0,
                    "url": "https://www.google.com/chrome/?brand=YTUH&gclid=EAIaIQobChMI--Odi_aW-AIVlJBoCR0kyQNCEAAYASAAEgJ9BfD_BwE&gclsrc=aw.ds",
                    "visitCount": 1
                },
                {
                    "id": "1127",
                    "lastVisitTime": 1654453117693.777,
                    "title": "",
                    "typedCount": 0,
                    "url": "https://www.google.com/chrome/?brand=YTUH&gclid=EAIaIQobChMI--Odi_aW-AIVlJBoCR0kyQNCEAAYASAAEgJ9BfD_BwE&gclsrc=aw.ds",
                    "visitCount": 1
                },
                {
                    "id": "1126",
                    "lastVisitTime": 1654453115115.532,
                    "title": "Google Chrome Web Browser",
                    "typedCount": 0,
                    "url": "https://www.google.com/chrome/thank-you.html?brand=YTUH&statcb=0&installdataindex=empty&defaultbrowser=0",
                    "visitCount": 1
                },
                {
                    "id": "1128",
                    "lastVisitTime": 1654453161999.46,
                    "title": "download chrome - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=download+chrome&rlz=1C5CHFA_enRO897RO897&oq=download+chrome&aqs=chrome.0.0i512l10.1956j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1132",
                    "lastVisitTime": 1654453165212.106,
                    "title": "Google Chrome - Download the Fast, Secure Browser from Google",
                    "typedCount": 0,
                    "url": "https://www.google.com/chrome/?brand=YTUH&gclid=EAIaIQobChMIx6KaqPaW-AIVhbp3Ch1I9QYiEAAYASAAEgJ1wvD_BwE&gclsrc=aw.ds",
                    "visitCount": 1
                },
                {
                    "id": "1133",
                    "lastVisitTime": 1654453169312.682,
                    "title": "Google Chrome Web Browser",
                    "typedCount": 0,
                    "url": "https://www.google.com/chrome/thank-you.html?brand=YTUH&statcb=0&installdataindex=empty&defaultbrowser=0",
                    "visitCount": 1,
                    "canceled": true
                },
                {
                    "id": "1134",
                    "lastVisitTime": 1654453267890.2148,
                    "title": "download chrome - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=download+chrome&rlz=1C5CHFA_enRO897RO897&oq=download+chrome&aqs=chrome..69i57j0i512l9.5242j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654453269918,
                    "url": "https://dlcdn.apache.org/httpd/mod_ftp/mod_ftp-0.9.6-beta.tar.bz2",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1138",
                    "lastVisitTime": 1654453273226.485,
                    "title": "Google Chrome - Download the Fast, Secure Browser from Google",
                    "typedCount": 0,
                    "url": "https://www.google.com/chrome/?brand=YTUH&gclid=EAIaIQobChMIpcTZ2vaW-AIVfpBoCR2HQAdTEAAYASAAEgLWMvD_BwE&gclsrc=aw.ds",
                    "visitCount": 1
                },
                {
                    "id": "1139",
                    "lastVisitTime": 1654453297133.952,
                    "title": "download dbeaver - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=download+dbeaver&rlz=1C5CHFA_enRO897RO897&oq=download+dbeaver&aqs=chrome..69i57j0i512l9.2306j0j4&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1140",
                    "lastVisitTime": 1654453299694.03,
                    "title": "Download | DBeaver Community",
                    "typedCount": 0,
                    "url": "https://dbeaver.io/download/",
                    "visitCount": 1
                },
                {
                    "id": "1141",
                    "lastVisitTime": 1654453331786.609,
                    "title": "npm get mime type from url - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=npm+get+mime+type+from+url&rlz=1C5CHFA_enRO897RO897&oq=npm+get+mime+type+from+url&aqs=chrome..69i57j33i160l2.4130j0j4&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1142",
                    "lastVisitTime": 1654453335618.98,
                    "title": "mime-types - npm",
                    "typedCount": 0,
                    "url": "https://www.npmjs.com/package/mime-types",
                    "visitCount": 1
                },
                {
                    "id": "1143",
                    "lastVisitTime": 1654453401876.035,
                    "title": "npm requests module get mime type - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=npm+requests+module+get+mime+type&rlz=1C5CHFA_enRO897RO897&oq=npm+requests+module+get+mime+type&aqs=chrome..69i57j33i160l2.6478j0j4&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1145",
                    "lastVisitTime": 1654453421461.9229,
                    "title": "",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=npm+requests+module+get+mime+type&rlz=1C5CHFA_enRO897RO897&oq=npm+requests+module+get+mime+type&aqs=chrome..69i57j33i160l2.6478j0j4&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1144",
                    "lastVisitTime": 1654453406190.9758,
                    "title": "mime-types - npm",
                    "typedCount": 0,
                    "url": "https://www.npmjs.com/package/mime-types",
                    "visitCount": 1
                },
                {
                    "id": "1147",
                    "lastVisitTime": 1654453457026.5789,
                    "title": "",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=npm+requests+module+get+mime+type&rlz=1C5CHFA_enRO897RO897&oq=npm+requests+module+get+mime+type&aqs=chrome..69i57j33i160l2.6478j0j4&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1146",
                    "lastVisitTime": 1654453425108.194,
                    "title": "node.js - Getting the mime type from a request in nodeJS - Stack Overflow",
                    "typedCount": 0,
                    "url": "https://stackoverflow.com/questions/19074581/getting-the-mime-type-from-a-request-in-nodejs",
                    "visitCount": 1
                },
                {
                    "id": "1148",
                    "lastVisitTime": 1654453461013.699,
                    "title": "node.js - Get MIME type of Node Request.js response in Proxy - Display if image - Stack Overflow",
                    "typedCount": 0,
                    "url": "https://stackoverflow.com/questions/19673384/get-mime-type-of-node-request-js-response-in-proxy-display-if-image",
                    "visitCount": 1
                },
                {
                    "id": "1149",
                    "lastVisitTime": 1654453619778.819,
                    "title": "go - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=go&rlz=1C5CHFA_enRO897RO897&oq=go&aqs=chrome..69i57j46i199i465i512j0i512l7j0i271.486j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1150",
                    "lastVisitTime": 1654453662175.989,
                    "title": "people com cn - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=people+com+cn&rlz=1C5CHFA_enRO897RO897&ei=c_WcYoehMPuG9u8P1euLqAo&ved=0ahUKEwjHpriC-Jb4AhV7g_0HHdX1AqUQ4dUDCA4&uact=5&oq=people+com+cn&gs_lcp=Cgdnd3Mtd2l6EAMyBggAEB4QFjIGCAAQHhAWMgYIABAeEBYyCAgAEB4QDxAWMgYIABAeEBYyBggAEB4QFjIGCAAQHhAWMggIABAeEA8QFjoICAAQsAMQkQI6CAgAEIAEELADOgcIABCwAxBDOgoIABDkAhCwAxgBOg0ILhCABBDIAxCwAxgCOhAILhDUAhDIAxCwAxCRAhgCOgUIABCABDoFCC4QgAQ6BAgAEEM6CAguEIAEENQCOgsILhCABBDHARCjAjoLCC4QgAQQxwEQ0QM6BwgAEIAEEApKBAhBGAFKBAhGGAFKBAhBGAFKBAhGGAFQr58CWKKwAmCPsgJoAnAAeACAAZQBiAGCCpIBAzkuNJgBAKABAcgBEcABAdoBBggBEAEYCdoBBggCEAEYCA&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654453948103,
                    "url": "https://dlcdn.apache.org/httpd/httpd-2.4.53.tar.bz2",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654453966735,
                    "url": "https://dlcdn.apache.org/httpd/httpd-2.4.53.tar.bz2",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1153",
                    "lastVisitTime": 1654454323047.526,
                    "title": "lidl near - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=lidl+near&rlz=1C5CHFA_enRO897RO897&oq=lidl+near&aqs=chrome..69i57j0i512l8j46i175i199i512.1034j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1155",
                    "lastVisitTime": 1654454333275.2458,
                    "title": "lidl near - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?rlz=1C5CHFA_enRO897RO897&tbs=lf:1,lf_ui:4&tbm=lcl&q=lidl+near&rflfq=1&num=10&rldimm=15347882304808757203#rlfi=hd:;si:15347882304808757203;mv:[[44.455743899999995,26.157715],[44.3708344,26.0080858]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!2m1!1e3,lf:1",
                    "visitCount": 1
                },
                {
                    "id": "1154",
                    "lastVisitTime": 1654454332475.688,
                    "title": "lidl near - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?rlz=1C5CHFA_enRO897RO897&tbs=lf:1,lf_ui:4&tbm=lcl&q=lidl+near&rflfq=1&num=10&rldimm=15347882304808757203",
                    "visitCount": 1
                },
                {
                    "id": "1156",
                    "lastVisitTime": 1654454344410.315,
                    "title": "lidl near - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?rlz=1C5CHFA_enRO897RO897&q=lidl+near&sa=X&ved=2ahUKEwjHgKTW-pb4AhWpk4sKHZRDBbcQuzF6BAgBEAI&biw=1325&bih=758&dpr=2",
                    "visitCount": 1
                },
                {
                    "id": "1157",
                    "lastVisitTime": 1654454858553.523,
                    "title": "react disable chunking - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=react+disable+chunking&rlz=1C5CHFA_enRO897RO897&oq=react+disable+chunking&aqs=chrome..69i57j0i22i30j0i390l4.3286j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1158",
                    "lastVisitTime": 1654454860815.357,
                    "title": "javascript - Can I turn off create-react-app chunking mechanism? - Stack Overflow",
                    "typedCount": 0,
                    "url": "https://stackoverflow.com/questions/55909340/can-i-turn-off-create-react-app-chunking-mechanism",
                    "visitCount": 1
                },
                {
                    "id": "1159",
                    "lastVisitTime": 1654457005031.955,
                    "title": "white x png - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=white+x+png&rlz=1C5CHFA_enRO897RO897&oq=white+x+png&aqs=chrome..69i57j0i512j0i22i30l8.1452j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1160",
                    "lastVisitTime": 1654457009228.191,
                    "title": "white x png - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=white+x+png&rlz=1C5CHFA_enRO897RO897&tbm=isch&source=iu&ictx=1&vet=1&fir=SVb8F_3LIkdrzM%252C4UQHz0MvHhS6sM%252C_%253B85d363nXUK-sBM%252Cr7Nw19Cy7RLjxM%252C_%253BYFbOEp8OpWGVKM%252C6fJjENOixnyePM%252C_%253BHtWeQEsXPoz0DM%252CRro1HNjqFEK-DM%252C_%253Bqo40FzdDFfu9IM%252CAVLkbjvukdpOCM%252C_%253B9u_h7V6jrMvkaM%252C3tsxfiL0M-v_uM%252C_%253BeQzLOBPzT9rvHM%252C4y8zkVw3lIwZBM%252C_%253BIVre7gTLtLpOxM%252CyG0T0G-e111ifM%252C_&usg=AI4_-kRW6R7ufa4BJwLqBxADX1b8mHIIaA&sa=X&ved=2ahUKEwigl8nQhJf4AhWpgv0HHd1SDNAQ9QF6BAgLEAE&biw=1325&bih=758&dpr=2#imgrc=85d363nXUK-sBM",
                    "visitCount": 1
                },
                {
                    "id": "1161",
                    "lastVisitTime": 1654457326104.928,
                    "title": "velkoz build ap - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=velkoz+build+ap&rlz=1C5CHFA_enRO897RO897&oq=velkoz+build+ap&aqs=chrome..69i57j0i22i30l3.2099j0j9&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1198",
                    "lastVisitTime": 1654509910124.474,
                    "title": "gdfg - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=gdfg&rlz=1C5CHFA_enRO897RO897&oq=gdfg&aqs=chrome..69i57j0i512l9.618j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1199",
                    "lastVisitTime": 1654509971257.505,
                    "title": "yosevu (Yosevu Kilonzo) · GitHub",
                    "typedCount": 0,
                    "url": "https://github.com/yosevu",
                    "visitCount": 1
                },
                {
                    "id": "1201",
                    "lastVisitTime": 1654509979717.842,
                    "title": "GitHub - yosevu/react-content-script: How to Inject a React app into a Chrome Extension as a content script.",
                    "typedCount": 0,
                    "url": "https://github.com/yosevu/react-content-script",
                    "visitCount": 1
                },
                {
                    "id": "1200",
                    "lastVisitTime": 1654509978162.572,
                    "title": "react-content-script/App.js at main · yosevu/react-content-script · GitHub",
                    "typedCount": 0,
                    "url": "https://github.com/yosevu/react-content-script/blob/main/src/App.js",
                    "visitCount": 1
                },
                {
                    "id": "1203",
                    "lastVisitTime": 1654510373437.521,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1204",
                    "lastVisitTime": 1654511252492.5261,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/blank.html",
                    "visitCount": 1
                },
                {
                    "id": "1207",
                    "lastVisitTime": 1654511522333.708,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1212",
                    "lastVisitTime": 1654512507529.289,
                    "title": "gasd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=gasd&rlz=1C5CHFA_enRO897RO897&oq=gasd&aqs=chrome..69i57j0i512j46i512j46i199i291i512j46i512j0i512l3j46i512l2.407j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1213",
                    "lastVisitTime": 1654512512106.114,
                    "title": "Welcome to The Apache Software Foundation!",
                    "typedCount": 0,
                    "url": "https://apache.org/",
                    "visitCount": 1
                },
                {
                    "id": "1215",
                    "lastVisitTime": 1654512556332.228,
                    "title": "Foundation Project",
                    "typedCount": 0,
                    "url": "https://apache.org/foundation/",
                    "visitCount": 1
                },
                {
                    "id": "1216",
                    "lastVisitTime": 1654512633644.309,
                    "title": "Foundation Project",
                    "typedCount": 0,
                    "url": "https://apache.org/foundation/",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654512717515,
                    "url": "https://apache.org/foundation/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1217",
                    "lastVisitTime": 1654512743829.293,
                    "title": "google - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=google&rlz=1C5CHFA_enRO897RO897&oq=goo&aqs=chrome.0.0i355i512j46i199i465i512j0i512l2j69i57j0i512l5.697j0j4&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654512765556,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1218",
                    "lastVisitTime": 1654512901854.454,
                    "title": "google - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=google&rlz=1C5CHFA_enRO897RO897&oq=goo&aqs=chrome.0.0i355i512j46i199i465i512j0i512l2j69i57j0i512l5.697j0j4&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654512905710,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1219",
                    "lastVisitTime": 1654513020502.328,
                    "title": "gasd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=gasd&rlz=1C5CHFA_enRO897RO897&oq=gasd&aqs=chrome..69i57j46i199i465i512j0i512l7j0i271.385j0j9&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654513025609,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654513031009,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1220",
                    "lastVisitTime": 1654513045030.804,
                    "title": "react disable scroll - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=react+disable+scroll&rlz=1C5CHFA_enRO897RO897&oq=react+disable+scroll&aqs=chrome..69i57j0i512l3j0i22i30l6.2555j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1222",
                    "lastVisitTime": 1654513229082.644,
                    "title": "",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=react+disable+scroll&rlz=1C5CHFA_enRO897RO897&oq=react+disable+scroll&aqs=chrome..69i57j0i512l3j0i22i30l6.2555j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1221",
                    "lastVisitTime": 1654513050917.9849,
                    "title": "React hook to enable/disable page scroll · GitHub",
                    "typedCount": 0,
                    "url": "https://gist.github.com/reecelucas/2f510e6b8504008deaaa52732202d2da",
                    "visitCount": 1
                },
                {
                    "id": "1224",
                    "lastVisitTime": 1654513363601.0498,
                    "title": "gasd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=gasd&rlz=1C5CHFA_enRO897RO897&oq=gasd&aqs=chrome..69i57j46i199i465i512j0i512l7j0i271.385j0j9&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654513368243,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654513460667,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654513470268,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1225",
                    "lastVisitTime": 1654513483849.585,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=096dYtWNJYGP9u8P65qLkA8&ved=0ahUKEwiVw8HK1pj4AhWBh_0HHWvNAvIQ4dUDCA4&uact=5&oq=apache&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BAguEEM6BAgAEEM6CgguEMcBENEDEEM6CgguEMcBEKMCEEM6CwguEIAEEMcBEKMCOgUILhCABDoLCC4QgAQQxwEQ0QM6CwguEMcBENEDEJECOgsILhCABBDHARCvAToFCAAQkQJKBAhBGABKBAhGGABQAFiFBWC6CWgAcAF4AIABcYgBvgSSAQM0LjKYAQCgAQHAAQE&sclient=gws-wiz-serp",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654513486440,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654513504497,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654513510033,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654513549910,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1226",
                    "lastVisitTime": 1654517123278.564,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=096dYtWNJYGP9u8P65qLkA8&ved=0ahUKEwiVw8HK1pj4AhWBh_0HHWvNAvIQ4dUDCA4&uact=5&oq=apache&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQ6BAguEEM6BAgAEEM6CgguEMcBENEDEEM6CgguEMcBEKMCEEM6CwguEIAEEMcBEKMCOgUILhCABDoLCC4QgAQQxwEQ0QM6CwguEMcBENEDEJECOgsILhCABBDHARCvAToFCAAQkQJKBAhBGABKBAhGGABQAFiFBWC6CWgAcAF4AIABcYgBvgSSAQM0LjKYAQCgAQHAAQE&sclient=gws-wiz-serp",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654517125644,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654517129798,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654517131964,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1230",
                    "lastVisitTime": 1654524083757.555,
                    "title": "google - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=google&rlz=1C5CHFA_enRO897RO897&oq=goo&aqs=chrome.0.0i355i512j46i199i465i512j0i512l2j69i57j0i512l5.885j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1231",
                    "lastVisitTime": 1654524087855.824,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=swieYpf5K6nisAf-2YKwDg&ved=0ahUKEwjXnqHC_pj4AhUpMewKHf6sAOYQ4dUDCA4&uact=5&oq=apache&gs_lcp=Cgdnd3Mtd2l6EAMyBAgAEEMyBAgAEEMyBAgAEEMyBAgAEEMyCgguEMcBEKMCEEMyBAgAEEMyBAgAEEMyBAgAEEMyBAgAEEMyBAgAEEM6BwgAEEcQsAM6BwgAELADEEM6DwguENQCEMgDELADEEMYAToMCC4QyAMQsAMQQxgBOgoILhDHARDRAxBDOgsILhCABBDHARCjAjoFCC4QgAQ6CwguEIAEEMcBENEDOgUIABCABDoOCC4QgAQQxwEQ0QMQ1AI6BwgAEMkDEEM6BQgAEJIDOgsILhCABBDHARCvAUoECEEYAEoECEYYAVCmBFi6CGCcCmgBcAF4AIABc4gBrASSAQM1LjGYAQCgAQHIARPAAQHaAQYIARABGAg&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654524089793,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654524095271,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1232",
                    "lastVisitTime": 1654524220840.855,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=swieYpf5K6nisAf-2YKwDg&ved=0ahUKEwjXnqHC_pj4AhUpMewKHf6sAOYQ4dUDCA4&uact=5&oq=apache&gs_lcp=Cgdnd3Mtd2l6EAMyBAgAEEMyBAgAEEMyBAgAEEMyBAgAEEMyCgguEMcBEKMCEEMyBAgAEEMyBAgAEEMyBAgAEEMyBAgAEEMyBAgAEEM6BwgAEEcQsAM6BwgAELADEEM6DwguENQCEMgDELADEEMYAToMCC4QyAMQsAMQQxgBOgoILhDHARDRAxBDOgsILhCABBDHARCjAjoFCC4QgAQ6CwguEIAEEMcBENEDOgUIABCABDoOCC4QgAQQxwEQ0QMQ1AI6BwgAEMkDEEM6BQgAEJIDOgsILhCABBDHARCvAUoECEEYAEoECEYYAVCmBFi6CGCcCmgBcAF4AIABc4gBrASSAQM1LjGYAQCgAQHIARPAAQHaAQYIARABGAg&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654524222454,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654524230755,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1233",
                    "lastVisitTime": 1654524239412.982,
                    "title": "people com cn - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=people+com+cn&rlz=1C5CHFA_enRO897RO897&ei=PAmeYtSLM8a0kgWa-ZOoDA&ved=0ahUKEwjUmdKD_5j4AhVGmqQKHZr8BMUQ4dUDCA4&uact=5&oq=people+com+cn&gs_lcp=Cgdnd3Mtd2l6EAMyBggAEB4QFjIGCAAQHhAWMgYIABAeEBYyCAgAEB4QDxAWMgYIABAeEBYyBggAEB4QFjIGCAAQHhAWMggIABAeEA8QFjoECAAQQzoFCAAQgAQ6BwguENQCEEM6BQguEIAEOgsILhCABBDHARCjAjoLCC4QgAQQxwEQ0QM6CwguEMcBENEDEJECOgUIABCRAjoECC4QQzoHCAAQgAQQCjoICC4QgAQQ1AJKBAhBGABKBAhGGABQAFjKH2CYI2gAcAF4AIABzAGIAfQLkgEFNi42LjGYAQCgAQHAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1234",
                    "lastVisitTime": 1654524456369.191,
                    "title": "people com cn - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=people+com+cn&rlz=1C5CHFA_enRO897RO897&ei=PAmeYtSLM8a0kgWa-ZOoDA&ved=0ahUKEwjUmdKD_5j4AhVGmqQKHZr8BMUQ4dUDCA4&uact=5&oq=people+com+cn&gs_lcp=Cgdnd3Mtd2l6EAMyBggAEB4QFjIGCAAQHhAWMgYIABAeEBYyCAgAEB4QDxAWMgYIABAeEBYyBggAEB4QFjIGCAAQHhAWMggIABAeEA8QFjoECAAQQzoFCAAQgAQ6BwguENQCEEM6BQguEIAEOgsILhCABBDHARCjAjoLCC4QgAQQxwEQ0QM6CwguEMcBENEDEJECOgUIABCRAjoECC4QQzoHCAAQgAQQCjoICC4QgAQQ1AJKBAhBGABKBAhGGABQAFjKH2CYI2gAcAF4AIABzAGIAfQLkgEFNi42LjGYAQCgAQHAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1235",
                    "lastVisitTime": 1654524607001.944,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j0i271l3j5l3.308j0j9&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1237",
                    "lastVisitTime": 1654525064022.974,
                    "title": "gads - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=gads&rlz=1C5CHFA_enRO897RO897&oq=gads&aqs=chrome..69i57j46i199i465i512j0i512l7j0i271.640j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1238",
                    "lastVisitTime": 1654525067059.039,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=hwyeYrzQPPK29u8Pne-VyA8&ved=0ahUKEwj8r9iVgpn4AhVym_0HHZ13BfkQ4dUDCA4&uact=5&oq=apache&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIABBDOgsILhCABBDHARCjAjoFCC4QgAQ6CwguEIAEEMcBENEDOgsILhDHARDRAxCRAjoFCAAQkQI6CwguEIAEEMcBEK8BSgQIQRgASgQIRhgAUABYxQRgigZoAHABeACAAZgBiAHjBJIBAzQuMpgBAKABAcABAQ&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654525068422,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1239",
                    "lastVisitTime": 1654525074210.885,
                    "title": "people com cn - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=people+com+cn&rlz=1C5CHFA_enRO897RO897&ei=iwyeYp67AaeX9u8Ph5KyoA4&ved=0ahUKEwjerJGXgpn4AhWni_0HHQeJDOQQ4dUDCA4&uact=5&oq=people+com+cn&gs_lcp=Cgdnd3Mtd2l6EAMyBggAEB4QFjIGCAAQHhAWMgYIABAeEBYyCAgAEB4QDxAWMgYIABAeEBYyBggAEB4QFjIGCAAQHhAWMggIABAeEA8QFjoECAAQQzoFCAAQgAQ6BwguENQCEEM6BQguEIAEOgsILhCABBDHARCjAjoLCC4QgAQQxwEQ0QM6CwguEMcBENEDEJECOgUIABCRAjoECC4QQzoHCAAQgAQQCjoICC4QgAQQ1AJKBAhBGABKBAhGGABQAFjOC2CxDWgAcAF4AIABjAGIAfUJkgEEMTAuM5gBAKABAcABAQ&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654528339209,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654528551790,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1256",
                    "lastVisitTime": 1654528551887.5479,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1257",
                    "lastVisitTime": 1654528579402.996,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654528582219,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1258",
                    "lastVisitTime": 1654528601834.382,
                    "title": "asdsd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asdsd&rlz=1C5CHFA_enRO897RO897&oq=asdsd&aqs=chrome..69i57j0i512j46i512j46i199i291i512j0i512l5j46i175i199i512.598j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654528608126,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1259",
                    "lastVisitTime": 1654528608277.977,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1269",
                    "lastVisitTime": 1654529443885.0889,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i512j46i199i291i512j0i512l5j46i175i199i512l2.385j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1270",
                    "lastVisitTime": 1654529448463.554,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=ox2eYq3CNKfnsAfvyI3YBg&ved=0ahUKEwjtn5a-kpn4AhWnM-wKHW9kA2sQ4dUDCA4&uact=5&oq=apache&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIABBDOgQILhBDOgoILhDHARCjAhBDOgoILhDHARDRAxBDOgcILhDUAhBDOgsILhCABBDHARCvAToLCC4QgAQQxwEQ0QM6CgguEIAEENQCEApKBAhBGABKBAhGGABQAFjTCmDrDGgBcAF4AIABbYgBwQWSAQMyLjWYAQCgAQHAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654529450664,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1271",
                    "lastVisitTime": 1654529525961.162,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=ox2eYq3CNKfnsAfvyI3YBg&ved=0ahUKEwjtn5a-kpn4AhWnM-wKHW9kA2sQ4dUDCA4&uact=5&oq=apache&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIABBDOgQILhBDOgoILhDHARCjAhBDOgoILhDHARDRAxBDOgcILhDUAhBDOgsILhCABBDHARCvAToLCC4QgAQQxwEQ0QM6CgguEIAEENQCEApKBAhBGABKBAhGGABQAFjTCmDrDGgBcAF4AIABbYgBwQWSAQMyLjWYAQCgAQHAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654529527539,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1272",
                    "lastVisitTime": 1654529619873.094,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=ox2eYq3CNKfnsAfvyI3YBg&ved=0ahUKEwjtn5a-kpn4AhWnM-wKHW9kA2sQ4dUDCA4&uact=5&oq=apache&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIABBDOgQILhBDOgoILhDHARCjAhBDOgoILhDHARDRAxBDOgcILhDUAhBDOgsILhCABBDHARCvAToLCC4QgAQQxwEQ0QM6CgguEIAEENQCEApKBAhBGABKBAhGGABQAFjTCmDrDGgBcAF4AIABbYgBwQWSAQMyLjWYAQCgAQHAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654529621643,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1273",
                    "lastVisitTime": 1654529749072.143,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=ox2eYq3CNKfnsAfvyI3YBg&ved=0ahUKEwjtn5a-kpn4AhWnM-wKHW9kA2sQ4dUDCA4&uact=5&oq=apache&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIABBDOgQILhBDOgoILhDHARCjAhBDOgoILhDHARDRAxBDOgcILhDUAhBDOgsILhCABBDHARCvAToLCC4QgAQQxwEQ0QM6CgguEIAEENQCEApKBAhBGABKBAhGGABQAFjTCmDrDGgBcAF4AIABbYgBwQWSAQMyLjWYAQCgAQHAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654529754032,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1274",
                    "lastVisitTime": 1654529791953.4731,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=ox2eYq3CNKfnsAfvyI3YBg&ved=0ahUKEwjtn5a-kpn4AhWnM-wKHW9kA2sQ4dUDCA4&uact=5&oq=apache&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQIABBDOgQILhBDOgoILhDHARCjAhBDOgoILhDHARDRAxBDOgcILhDUAhBDOgsILhCABBDHARCvAToLCC4QgAQQxwEQ0QM6CgguEIAEENQCEApKBAhBGABKBAhGGABQAFjTCmDrDGgBcAF4AIABbYgBwQWSAQMyLjWYAQCgAQHAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1275",
                    "lastVisitTime": 1654529798385.761,
                    "title": "people com cn - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=people+com+cn&rlz=1C5CHFA_enRO897RO897&ei=1R6eYsIat4X27w-YqJDgDA&ved=0ahUKEwiC2dbPk5n4AhW3gv0HHRgUBMwQ4dUDCA4&uact=5&oq=people+com+cn&gs_lcp=Cgdnd3Mtd2l6EAMyBggAEB4QFjIGCAAQHhAWMgYIABAeEBYyCAgAEB4QDxAWMgYIABAeEBYyBggAEB4QFjIGCAAQHhAWMggIABAeEA8QFjoECAAQQzoFCAAQgAQ6BwguENQCEEM6BQguEIAEOgsILhCABBDHARCjAjoLCC4QgAQQxwEQ0QM6CwguEMcBENEDEJECOgUIABCRAjoECC4QQzoHCAAQgAQQCjoICC4QgAQQ1AJKBAhBGABKBAhGGABQAFi-E2D0FGgBcAF4AIAB3QGIAbQLkgEGMTAuMy4xmAEAoAEBwAEB&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1276",
                    "lastVisitTime": 1654529868367.858,
                    "title": "people com cn - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=people+com+cn&rlz=1C5CHFA_enRO897RO897&ei=Bh-eYvT2EuGF9u8P1K6BmAw&ved=0ahUKEwj0kZjnk5n4AhXhgv0HHVRXAMMQ4dUDCA4&uact=5&oq=people+com+cn&gs_lcp=Cgdnd3Mtd2l6EAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsANKBAhBGABKBAhGGABQAFgAYPACaAFwAXgAgAEAiAEAkgEAmAEAyAEIwAEB&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1277",
                    "lastVisitTime": 1654529883634.13,
                    "title": "people com cn - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=people+com+cn&rlz=1C5CHFA_enRO897RO897&ei=Bh-eYvT2EuGF9u8P1K6BmAw&ved=0ahUKEwj0kZjnk5n4AhXhgv0HHVRXAMMQ4dUDCA4&uact=5&oq=people+com+cn&gs_lcp=Cgdnd3Mtd2l6EAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsAMyBwgAEEcQsANKBAhBGABKBAhGGABQAFgAYPACaAFwAXgAgAEAiAEAkgEAmAEAyAEIwAEB&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1278",
                    "lastVisitTime": 1654529944925.909,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=TB-eYoTHEtmJ9u8PqpKliAs&ved=0ahUKEwiEnciIlJn4AhXZhP0HHSpJCbEQ4dUDCA4&uact=5&oq=apache&gs_lcp=Cgdnd3Mtd2l6EAMyBAgAEEMyBAgAEEMyBAgAEEMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgsILhDHARDRAxCRAjoLCC4QgAQQxwEQowI6BQguEIAEOgsILhCABBDHARDRAzoOCC4QgAQQxwEQ0QMQ1AI6BQguEJECOgsILhDHARCjAhCRAjoLCC4QgAQQxwEQrwE6BQgAEJECSgQIQRgASgQIRhgAUABYngRgjgZoAHABeACAAbMBiAHSBZIBAzMuM5gBAKABAcABAQ&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654529946451,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1280",
                    "lastVisitTime": 1654530216841.519,
                    "title": "Alemia",
                    "typedCount": 1,
                    "url": "http://localhost/",
                    "visitCount": 1
                },
                {
                    "id": "1281",
                    "lastVisitTime": 1654530302361.433,
                    "title": "macos stop apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=macos+stop+apache&rlz=1C5CHFA_enRO897RO897&oq=macos+stop+apache&aqs=chrome.0.0i512l10.1736j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1282",
                    "lastVisitTime": 1654530320137.6008,
                    "title": "Alemia",
                    "typedCount": 1,
                    "url": "http://localhost/",
                    "visitCount": 1
                },
                {
                    "id": "1283",
                    "lastVisitTime": 1654530336948.479,
                    "title": "Alemia",
                    "typedCount": 1,
                    "url": "http://localhost/",
                    "visitCount": 1
                },
                {
                    "id": "1284",
                    "lastVisitTime": 1654530339916.7021,
                    "title": "Alemia",
                    "typedCount": 1,
                    "url": "http://localhost/",
                    "visitCount": 1
                },
                {
                    "id": "1285",
                    "lastVisitTime": 1654530344798.749,
                    "title": "Alemia",
                    "typedCount": 1,
                    "url": "http://localhost/",
                    "visitCount": 1
                },
                {
                    "id": "1287",
                    "lastVisitTime": 1654540380644.1519,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i512j46i199i291i512j0i512l5j46i175i199i512l2.349j0j4&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1288",
                    "lastVisitTime": 1654540388628.14,
                    "title": "people com cn - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=people+com+cn&rlz=1C5CHFA_enRO897RO897&ei=XEieYpG9I9jk7_UPu5SekAI&ved=0ahUKEwiR25qdu5n4AhVY8rsIHTuKByIQ4dUDCA4&uact=5&oq=people+com+cn&gs_lcp=Cgdnd3Mtd2l6EAMyBggAEB4QFjIGCAAQHhAWMgYIABAeEBYyCAgAEB4QDxAWMgYIABAeEBYyBggAEB4QFjIGCAAQHhAWMggIABAeEA8QFjoFCC4QgAQ6BQgAEIAEOgsILhCABBDHARCjAjoLCC4QgAQQxwEQ0QM6BAgAEEM6BwguENQCEEM6EQguENQCEJECEIsDEKgDEJ0DOggIABCRAhCLAzoICAAQgAQQiwM6CAguEIAEEIsDOg4ILhCABBDHARDRAxCLAzoUCC4QxwEQrwEQkQIQiwMQpgMQqAM6DgguEMcBENEDEJECEIsDOgoIABCABBAKEIsDOgsILhCABBDUAhCLA0oECEEYAEoECEYYAFAAWPgNYPQRaABwAXgAgAG6AYgB-Q6SAQQwLjEzmAEAoAEBuAECwAEB&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1305",
                    "lastVisitTime": 1654595650343.7258,
                    "title": "\"https://prod-live-chat.sprinklr.com/api/livechat/event/fetch-notifications?cursor=A_629e5cf10000000000000000\" - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=%22https%3A%2F%2Fprod-live-chat.sprinklr.com%2Fapi%2Flivechat%2Fevent%2Ffetch-notifications%3Fcursor%3DA_629e5cf10000000000000000%22&rlz=1C5CHFA_enRO897RO897&oq=%22https%3A%2F%2Fprod-live-chat.sprinklr.com%2Fapi%2Flivechat%2Fevent%2Ffetch-notifications%3Fcursor%3DA_629e5cf10000000000000000%22&aqs=chrome..69i57.169j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1306",
                    "lastVisitTime": 1654595656155.7751,
                    "title": "sprinklr - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=sprinklr&rlz=1C5CHFA_enRO897RO897&ei=QiCfYpy8Fczi7_UPs7qGmAY&ved=0ahUKEwic5fGPiZv4AhVM8bsIHTOdAWMQ4dUDCA4&uact=5&oq=sprinklr&gs_lcp=Cgdnd3Mtd2l6EAMyCwguEMcBENEDEJECMgUIABCRAjIICAAQkQIQiwMyCAgAEJECEIsDMggIABCABBCLAzIICAAQgAQQiwMyCAgAEIAEEIsDMggIABCABBCLAzIICAAQgAQQiwMyCAgAEIAEEIsDOgcIABBHELADOgQIABBDOg0ILhDHARDRAxDUAhBDOgUIABCABDoLCC4QgAQQxwEQowI6CwguEIAEEMcBENEDOgoILhDHARDRAxBDOhAILhDUAhBDEIsDEKQDEKgDOgcILhBDEIsDOgoILhDUAhBDEIsDOgcIABBDEIsDOgQILhBDOgsILhCABBDHARCvAToOCC4QxwEQ0QMQkQIQiwM6DgguEIAEEMcBEK8BEIsDOggILhCABBDUAkoECEEYAEoECEYYAFCxBVj0FWDWF2gCcAF4AIABpwGIAewIkgEDMy42mAEAoAEByAEDuAEDwAEB&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1307",
                    "lastVisitTime": 1654595658716.236,
                    "title": "Sprinklr: Unified Customer Experience Management Platform | Sprinklr",
                    "typedCount": 0,
                    "url": "https://www.sprinklr.com/",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654596014185,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1310",
                    "lastVisitTime": 1654596014318.534,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1311",
                    "lastVisitTime": 1654596055592.885,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i512j46i199i291i512j0i512l5j46i175i199i512l2.360j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654596061902,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1312",
                    "lastVisitTime": 1654596062036.367,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654596090999,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1314",
                    "lastVisitTime": 1654608540589.301,
                    "title": "sad - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=sad&rlz=1C5CHFA_enRO897RO897&oq=sad&aqs=chrome..69i57j0i271l3.229j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654608552907,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1315",
                    "lastVisitTime": 1654608553047.8809,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654608586755,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1316",
                    "lastVisitTime": 1654608586885.066,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654608606086,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654608942998,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1319",
                    "lastVisitTime": 1654609090488.515,
                    "title": "ads - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=ads&rlz=1C5CHFA_enRO897RO897&oq=ads&aqs=chrome..69i57j0i512l4j46i175i199i512j46i199i465i512j0i10i512j0i512.202j0j4&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1320",
                    "lastVisitTime": 1654609095068.8281,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache+&rlz=1C5CHFA_enRO897RO897&ei=wlSfYuDOGtnzsAehyKjICw&ved=0ahUKEwjgt8-Yu5v4AhXZOewKHSEkCrkQ4dUDCA4&uact=5&oq=apache+&gs_lcp=Cgdnd3Mtd2l6EAMyCAgAEJECEIsDMggIABCRAhCLAzIICAAQkQIQiwMyCAgAEJECEIsDMggIABCRAhCLAzIHCAAQQxCLAzIHCAAQQxCLAzIICAAQgAQQiwMyCAgAEIAEEIsDMggIABCABBCLAzoECAAQQzoKCC4QxwEQ0QMQQzoKCC4QxwEQowIQQzoHCC4Q1AIQQzoFCAAQgAQ6CwguEIAEEMcBEK8BSgQIQRgASgQIRhgAUIgEWNUKYPQSaAFwAXgAgAGVAYgBxQaSAQMzLjSYAQCgAQG4AQPAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654609096503,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654609104162,
                    "url": "https://hadoop.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1321",
                    "lastVisitTime": 1654609116744.028,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache+&rlz=1C5CHFA_enRO897RO897&ei=wlSfYuDOGtnzsAehyKjICw&ved=0ahUKEwjgt8-Yu5v4AhXZOewKHSEkCrkQ4dUDCA4&uact=5&oq=apache+&gs_lcp=Cgdnd3Mtd2l6EAMyCAgAEJECEIsDMggIABCRAhCLAzIICAAQkQIQiwMyCAgAEJECEIsDMggIABCRAhCLAzIHCAAQQxCLAzIHCAAQQxCLAzIICAAQgAQQiwMyCAgAEIAEEIsDMggIABCABBCLAzoECAAQQzoKCC4QxwEQ0QMQQzoKCC4QxwEQowIQQzoHCC4Q1AIQQzoFCAAQgAQ6CwguEIAEEMcBEK8BSgQIQRgASgQIRhgAUIgEWNUKYPQSaAFwAXgAgAGVAYgBxQaSAQMzLjSYAQCgAQG4AQPAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654609119149,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654609123160,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1322",
                    "lastVisitTime": 1654609133646.985,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache+&rlz=1C5CHFA_enRO897RO897&ei=wlSfYuDOGtnzsAehyKjICw&ved=0ahUKEwjgt8-Yu5v4AhXZOewKHSEkCrkQ4dUDCA4&uact=5&oq=apache+&gs_lcp=Cgdnd3Mtd2l6EAMyCAgAEJECEIsDMggIABCRAhCLAzIICAAQkQIQiwMyCAgAEJECEIsDMggIABCRAhCLAzIHCAAQQxCLAzIHCAAQQxCLAzIICAAQgAQQiwMyCAgAEIAEEIsDMggIABCABBCLAzoECAAQQzoKCC4QxwEQ0QMQQzoKCC4QxwEQowIQQzoHCC4Q1AIQQzoFCAAQgAQ6CwguEIAEEMcBEK8BSgQIQRgASgQIRhgAUIgEWNUKYPQSaAFwAXgAgAGVAYgBxQaSAQMzLjSYAQCgAQG4AQPAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1324",
                    "lastVisitTime": 1654609279424.994,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache+&rlz=1C5CHFA_enRO897RO897&ei=wlSfYuDOGtnzsAehyKjICw&ved=0ahUKEwjgt8-Yu5v4AhXZOewKHSEkCrkQ4dUDCA4&uact=5&oq=apache+&gs_lcp=Cgdnd3Mtd2l6EAMyCAgAEJECEIsDMggIABCRAhCLAzIICAAQkQIQiwMyCAgAEJECEIsDMggIABCRAhCLAzIHCAAQQxCLAzIHCAAQQxCLAzIICAAQgAQQiwMyCAgAEIAEEIsDMggIABCABBCLAzoECAAQQzoKCC4QxwEQ0QMQQzoKCC4QxwEQowIQQzoHCC4Q1AIQQzoFCAAQgAQ6CwguEIAEEMcBEK8BSgQIQRgASgQIRhgAUIgEWNUKYPQSaAFwAXgAgAGVAYgBxQaSAQMzLjSYAQCgAQG4AQPAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654609282366,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654609284937,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654609288180,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654609296099,
                    "url": "https://hadoop.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654609303364,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1325",
                    "lastVisitTime": 1654609303498.383,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1326",
                    "lastVisitTime": 1654609314166.228,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654609735246,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654609820557,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654609872959,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654609936909,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1333",
                    "lastVisitTime": 1654609937042.441,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1334",
                    "lastVisitTime": 1654609975510.555,
                    "title": "google - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=google&rlz=1C5CHFA_enRO897RO897&oq=goo&aqs=chrome.0.0i355i512j46i199i465i512j0i512l2j69i57j0i512l5.507j0j4&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1335",
                    "lastVisitTime": 1654609979653.993,
                    "title": "people com cn - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=people+com+cn&rlz=1C5CHFA_enRO897RO897&ei=N1ifYtnjHc-csAejvL7IDg&ved=0ahUKEwiZ29K-vpv4AhVPDuwKHSOeD-kQ4dUDCA4&uact=5&oq=people+com+cn&gs_lcp=Cgdnd3Mtd2l6EAMyBggAEB4QFjIGCAAQHhAWMgYIABAeEBYyCAgAEB4QDxAWMgYIABAeEBYyBggAEB4QFjIGCAAQHhAWMggIABAeEA8QFjoFCAAQkQI6BQguEIAEOgUIABCABDoLCC4QgAQQxwEQowI6CwguEIAEEMcBENEDOgoILhDHARDRAxBDOggILhCABBDUAjoECAAQQzoECC4QQzoKCC4QxwEQowIQQzoHCAAQgAQQCkoECEEYAEoECEYYAFAAWOMLYM0NaABwAXgAgAF8iAGmCpIBAzUuOJgBAKABAcABAQ&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1337",
                    "lastVisitTime": 1654610002967.412,
                    "title": "LinkedIn: Log In or Sign Up",
                    "typedCount": 0,
                    "url": "https://www.linkedin.com/",
                    "visitCount": 1
                },
                {
                    "id": "1338",
                    "lastVisitTime": 1654610017120.3188,
                    "title": "Feed | LinkedIn",
                    "typedCount": 0,
                    "url": "https://www.linkedin.com/feed/?trk=homepage-basic_signin-form_submit",
                    "visitCount": 2
                },
                {
                    "id": "1339",
                    "lastVisitTime": 1654610014622.783,
                    "title": "LinkedIn",
                    "typedCount": 0,
                    "url": "https://www.linkedin.com/notifications/",
                    "visitCount": 1
                },
                {
                    "id": "1342",
                    "lastVisitTime": 1654610024064.1338,
                    "title": "Sign Up | LinkedIn",
                    "typedCount": 0,
                    "url": "https://www.linkedin.com/signup/cold-join?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Ffeed%2F%3Ftrk%3Dhomepage-basic_signin-form_submit&trk=login_reg_redirect",
                    "visitCount": 1
                },
                {
                    "id": "1344",
                    "lastVisitTime": 1654610030381.15,
                    "title": "Feed | LinkedIn",
                    "typedCount": 0,
                    "url": "https://www.linkedin.com/feed/?trk=homepage-basic_signin-form_submit",
                    "visitCount": 1
                },
                {
                    "id": "1350",
                    "lastVisitTime": 1654629488548.065,
                    "title": "dasdasd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=dasdasd&rlz=1C5CHFA_enRO897RO897&oq=dasdasd&aqs=chrome..69i57j0i271l3.540j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1357",
                    "lastVisitTime": 1654630198105.043,
                    "title": "dasdasd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=dasdasd&rlz=1C5CHFA_enRO897RO897&oq=dasdasd&aqs=chrome..69i57j0i271l3.540j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1374",
                    "lastVisitTime": 1654676467032.0498,
                    "title": "das - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=das&rlz=1C5CHFA_enRO897RO897&oq=das&aqs=chrome..69i57j46i175i199i512j0i512j46i175i199i512j0i512l2j46i512j46i175i199i512j0i512j0i271.291j0j9&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1378",
                    "lastVisitTime": 1654679947341.6108,
                    "title": "dasd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=dasd&rlz=1C5CHFA_enRO897RO897&oq=dasd&aqs=chrome..69i57j46i512j46i175i199i512j0i512j0i10j46i10j46i10i199i291j0i10l2.5510j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1379",
                    "lastVisitTime": 1654679998947.489,
                    "title": "dasd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=dasd&rlz=1C5CHFA_enRO897RO897&oq=dasd&aqs=chrome..69i57j46i512j46i175i199i512j0i512j0i10j46i10j46i10i199i291j0i10l2.5510j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1387",
                    "lastVisitTime": 1654684093717.1162,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i512j46i199i291i512j0i512l5j46i175i199i512l2.541j0j9&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1389",
                    "lastVisitTime": 1654684215926.708,
                    "title": "dasd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=dasd&rlz=1C5CHFA_enRO897RO897&oq=dasd&aqs=chrome..69i57j0i271l3.340j0j9&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1390",
                    "lastVisitTime": 1654684226208.613,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i512j46i199i291i512j0i512l5j46i175i199i512l2.362j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1392",
                    "lastVisitTime": 1654684528960.285,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i512j46i199i291i512j0i512l5j46i175i199i512l2.317j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1393",
                    "lastVisitTime": 1654685699911.0662,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654685796060,
                    "url": "https://www.google.com/search?q=gods&rlz=1C5CHFA_enRO897RO897&oq=gods&aqs=chrome..69i57j46i512j0i512j46i512l2j0i512l3j46i512j0i271.1351j0j4&sourceid=chrome&ie=UTF-8",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654685802819,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654685859501,
                    "url": "https://www.google.com/search?q=google&rlz=1C5CHFA_enRO897RO897&oq=goo&aqs=chrome.0.0i355i512j46i199i465i512j0i512l2j69i57j0i512l5.495j0j4&sourceid=chrome&ie=UTF-8",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654685887746,
                    "url": "https://www.google.com/search?q=dasd&rlz=1C5CHFA_enRO897RO897&oq=dasd&aqs=chrome..69i57j46i512j46i175i199i512j0i512j0i10j46i10j46i10i199i291j0i10l2.428j0j4&sourceid=chrome&ie=UTF-8",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654685908279,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654685933549,
                    "url": "https://www.google.com/search?q=google&rlz=1C5CHFA_enRO897RO897&oq=goo&aqs=chrome.0.0i355i512j46i199i465i512j0i512l2j69i57j0i512l5.673j0j4&sourceid=chrome&ie=UTF-8",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654685937588,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654685990559,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i199i291i512j46i199i465i512l3j5l3.315j0j4&sourceid=chrome&ie=UTF-8",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654686057614,
                    "url": "https://www.google.com/search?q=google&rlz=1C5CHFA_enRO897RO897&oq=goo&aqs=chrome.0.0i355i512j46i199i465i512j0i512l2j69i57j0i512l5.666j0j4&sourceid=chrome&ie=UTF-8",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654686069259,
                    "url": "https://www.google.com/search?q=dasd&rlz=1C5CHFA_enRO897RO897&oq=dasd&aqs=chrome..69i57j46i512j46i175i199i512j0i512j0i10j46i10j46i10i199i291j0i10l2.339j0j4&sourceid=chrome&ie=UTF-8",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654686107538,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j0i271l3j5l3.283j0j4&sourceid=chrome&ie=UTF-8",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654686147189,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "lastVisitTime": 1654686211190,
                    "url": "https://www.google.com/search?q=ads&rlz=1C5CHFA_enRO897RO897&oq=ads&aqs=chrome..69i57j0i512l4j46i175i199i512j46i199i465i512j0i10i512j0i512.235j0j4&sourceid=chrome&ie=UTF-8",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1394",
                    "lastVisitTime": 1654686273449.377,
                    "title": "asdsds - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asdsds&rlz=1C5CHFA_enRO897RO897&oq=asdsds&aqs=chrome..69i57.25313j0j4&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1395",
                    "lastVisitTime": 1654686277516.574,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=QYKgYp-oGI23kwWMp7CABQ&ved=0ahUKEwjfzKnc2p34AhWN26QKHYwTDFAQ4dUDCA4&uact=5&oq=apache&gs_lcp=Cgdnd3Mtd2l6EAMyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEOgQILhBDOgQIABBDOgoILhDHARCjAhBDOgsILhCABBDHARCjAjoFCAAQkQI6CwguEMcBEKMCEJECOgsILhDHARCvARCRAkoECEEYAEoECEYYAFAAWKIEYMIFaABwAHgAgAFeiAGUBJIBATaYAQCgAQHAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1396",
                    "lastVisitTime": 1654686279241.266,
                    "title": "Welcome! - The Apache HTTP Server Project",
                    "typedCount": 0,
                    "url": "https://httpd.apache.org/",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654686466023,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1397",
                    "lastVisitTime": 1654686475199.687,
                    "title": "google - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=google&rlz=1C5CHFA_enRO897RO897&oq=goo&aqs=chrome.0.0i355i512j46i199i465i512j0i512l2j69i57j0i512l5.541j0j4&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1398",
                    "lastVisitTime": 1654686477992.823,
                    "title": "apache - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=apache&rlz=1C5CHFA_enRO897RO897&ei=C4OgYtSNCZjzkgWswJfwAQ&ved=0ahUKEwiUv8O82534AhWYuaQKHSzgBR4Q4dUDCA4&uact=5&oq=apache&gs_lcp=Cgdnd3Mtd2l6EAMyBAgAEEMyBAgAEEMyBAgAEEMyBAgAEEMyCgguEMcBEKMCEEMyBAgAEEMyBAgAEEMyBAgAEEMyBAgAEEMyBAgAEEM6BwgAEEcQsAM6BwgAELADEEM6DwguENQCEMgDELADEEMYAToMCC4QyAMQsAMQQxgBOgoILhDHARDRAxBDOgsILhCABBDHARCjAjoFCC4QgAQ6CwguEIAEEMcBENEDOgUIABCABDoOCC4QgAQQxwEQ0QMQ1AI6BwgAEMkDEEM6BQgAEJIDOgsILhCABBDHARCvAUoECEEYAEoECEYYAVDQA1j3BmC6CGgBcAF4AIABlAGIAacFkgEDMC42mAEAoAEByAETwAEB2gEGCAEQARgI&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654686479483,
                    "url": "https://httpd.apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1400",
                    "lastVisitTime": 1654686935567.2979,
                    "title": "gf - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=gf&rlz=1C5CHFA_enRO897RO897&oq=gf&aqs=chrome..69i57j46i199i465i512j0i512l7j0i271.330j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1401",
                    "lastVisitTime": 1654686979377.757,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j0i271l3j5l3.302j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1402",
                    "lastVisitTime": 1654687040431.862,
                    "title": "gf - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=gf&rlz=1C5CHFA_enRO897RO897&oq=gf&aqs=chrome..69i57j46i199i465i512j0i512l7j0i271.382j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1403",
                    "lastVisitTime": 1654687118983.3428,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i512j46i199i291i512j0i512l5j46i175i199i512l2.292j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1404",
                    "lastVisitTime": 1654687181420.328,
                    "title": "asds - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asds&rlz=1C5CHFA_enRO897RO897&oq=asds&aqs=chrome..69i57j0i512j46i512j46i199i291i512j0i512l5j46i175i199i512.344j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1405",
                    "lastVisitTime": 1654698352164.8918,
                    "title": "asds - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asds&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome.0.69i59j69i57j46i512j46i199i291i512j0i512l5j46i175i199i512.336j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1406",
                    "lastVisitTime": 1654698373478.535,
                    "title": "asds - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asds&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome.0.69i59j69i57j46i199i291i512j46i199i465i512l2j5l3.329j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "lastVisitTime": 1654698396376,
                    "url": "https://apache.org/",
                    "title": "Blocked website",
                    "canceled": true
                },
                {
                    "id": "1408",
                    "lastVisitTime": 1654698673282.9539,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 2
                },
                {
                    "id": "1409",
                    "lastVisitTime": 1654698737636.293,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1411",
                    "lastVisitTime": 1654712812023.118,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1413",
                    "lastVisitTime": 1654713005802.685,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1414",
                    "lastVisitTime": 1654713112090.026,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1417",
                    "lastVisitTime": 1654713467877.87,
                    "title": "sad - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=sad&rlz=1C5CHFA_enRO897RO897&oq=sad&aqs=chrome..69i57j46i512l2j0i512l4j46i512l2j0i271.214j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1416",
                    "lastVisitTime": 1654713462890.827,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1418",
                    "lastVisitTime": 1654713475356.807,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i512j46i199i291i512j0i512l5j46i175i199i512l2.429j0j9&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1420",
                    "lastVisitTime": 1654713529303.753,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome.0.69i59j46i512j46i199i291i512j0i512l5j46i175i199i512l2.362j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1419",
                    "lastVisitTime": 1654713518017.489,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1421",
                    "lastVisitTime": 1654713640872.695,
                    "title": "asdas - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asdas&rlz=1C5CHFA_enRO897RO897&ei=ueygYvK2EIbvkgXerZr4DQ&ved=0ahUKEwiy9_egwJ74AhWGt6QKHd6WBt8Q4dUDCBg&uact=5&oq=asdas&gs_lcp=Cgdnd3Mtd2l6EAMyDAguEMcBENEDEAoQQzIECC4QQzIECC4QQzIECC4QQzIECAAQQzIKCC4QxwEQ0QMQQzIFCAAQgAQyBAgAEEMyBAgAEAoyBAgAEApKBAhBGABKBAhGGABQaFiIBGDvB2gCcAF4AIABaogBpgKSAQMxLjKYAQCgAQHAAQE&sclient=gws-wiz",
                    "visitCount": 1
                },
                {
                    "id": "1423",
                    "lastVisitTime": 1654713657990.1172,
                    "title": "asdasd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asdasd&rlz=1C5CHFA_enRO897RO897&oq=asdasd&aqs=chrome..69i57j46i512l3j0i512l6.529j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1422",
                    "lastVisitTime": 1654713653414.5132,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1425",
                    "lastVisitTime": 1654714524175.159,
                    "title": "LoL Stats, Record Replay, Database, Guide - OP.GG",
                    "typedCount": 0,
                    "url": "https://eune.op.gg/",
                    "visitCount": 1
                },
                {
                    "id": "1428",
                    "lastVisitTime": 1654714619180.707,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i512j46i199i291i512j0i512l5j46i175i199i512l2.407j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1427",
                    "lastVisitTime": 1654714609941.1719,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1429",
                    "lastVisitTime": 1654714681565.813,
                    "title": "ads - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=ads&rlz=1C5CHFA_enRO897RO897&oq=ads&aqs=chrome..69i57l2j0i271l3j5l3.248j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1431",
                    "lastVisitTime": 1654714704839.387,
                    "title": "dasd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=dasd&rlz=1C5CHFA_enRO897RO897&oq=dasd&aqs=chrome..69i57j0i271l3.196j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1430",
                    "lastVisitTime": 1654714700611.9011,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1432",
                    "lastVisitTime": 1654714707119.938,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i199i291i512j46i199i465i512l3j5l3.282j0j9&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1433",
                    "lastVisitTime": 1654714757220.0369,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome.0.69i59j69i57j0i271l3j5l3.135j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1435",
                    "lastVisitTime": 1654714812581.5999,
                    "title": "njk - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=njk&rlz=1C5CHFA_enRO897RO897&oq=njk&aqs=chrome..69i57j46i10i199i291j0i10l5j46i10l2.391j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1434",
                    "lastVisitTime": 1654714808333.332,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1438",
                    "lastVisitTime": 1654714904503.173,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i512j46i199i291i512j0i512l5j46i175i199i512l2.403j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1437",
                    "lastVisitTime": 1654714899213.2512,
                    "title": "blank",
                    "typedCount": 0,
                    "url": "https://blank.org/",
                    "visitCount": 1
                },
                {
                    "id": "1439",
                    "lastVisitTime": 1654714907710.643,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i512j46i199i291i512j0i512l5j46i175i199i512l2.403j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1441",
                    "lastVisitTime": 1654720984310.872,
                    "title": "facebook - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=facebook&rlz=1C5CHFA_enRO897RO897&oq=face&aqs=chrome.0.0i355i512j46i199i465i512j69i57j46i199i465i512j0i512l5j46i175i199i512.719j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1443",
                    "lastVisitTime": 1654874289561.405,
                    "title": "gsdf - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=gsdf&rlz=1C5CHFA_enRO897RO897&oq=gsdf&aqs=chrome..69i57j46i199i465i512j0i512l7j0i271.405j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1444",
                    "lastVisitTime": 1654874307127.543,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i199i291i512j0i512l2j46i512j0i512l2j46i175i199i512l2j46i512.338j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1448",
                    "lastVisitTime": 1654874419545.583,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i199i291i512j0i512l2j46i512j0i512l2j46i175i199i512l2j46i512.321j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1452",
                    "lastVisitTime": 1654874496308.238,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j46i199i291i512j0i512l2j46i512j0i512l2j46i175i199i512l2j46i512.315j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1456",
                    "lastVisitTime": 1654874589052.274,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j0i271l3j5l3.305j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1459",
                    "lastVisitTime": 1654874594490.7,
                    "title": "Feed | LinkedIn",
                    "typedCount": 0,
                    "url": "https://www.linkedin.com/feed/",
                    "visitCount": 1
                },
                {
                    "id": "1458",
                    "lastVisitTime": 1654874593654.888,
                    "title": "LinkedIn",
                    "typedCount": 0,
                    "url": "https://www.linkedin.com/",
                    "visitCount": 1
                },
                {
                    "id": "1460",
                    "lastVisitTime": 1654874625808.165,
                    "title": "asd - Google Search",
                    "typedCount": 0,
                    "url": "https://www.google.com/search?q=asd&rlz=1C5CHFA_enRO897RO897&oq=asd&aqs=chrome..69i57j0i271l3j5l3.268j0j7&sourceid=chrome&ie=UTF-8",
                    "visitCount": 1
                },
                {
                    "id": "1462",
                    "lastVisitTime": 1654874635566.534,
                    "title": "OLX - Cumpără și vinde",
                    "typedCount": 0,
                    "url": "https://www.olx.ro/",
                    "visitCount": 1
                }
            ]
        },
        "cookies": {
            "Linkedin": {
                "count": 17,
                "domain": ".linkedin.com"
            },
            "Google": {
                "count": 10,
                "domain": ".google.com"
            },
            "Chrome": {
                "count": 1,
                "domain": ".developer.chrome.com"
            },
            "Stackoverflow": {
                "count": 6,
                "domain": ".stackoverflow.com"
            },
            "Npmjs": {
                "count": 1,
                "domain": ".npmjs.com"
            },
            "Github": {
                "count": 4,
                "domain": "github.com"
            },
            "Sprinklr": {
                "count": 8,
                "domain": ".sprinklr.com"
            },
            "Op": {
                "count": 8,
                "domain": ".op.gg"
            }
        }
    };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestSent: false,
    };
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
    console.log("Sending request");
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
      this.setState({ requestSent: true });
      callback(null);
    });
  }

  componentDidMount() {
    if (chrome?.storage) {
      console.log("Set state from backend");
      this.sendRequest({ route: "/user/stats" }, async (res) => {
        res = await res.json();
        console.log(res);
        this.setState({
          data: res.data,
        });
      });
    } else {
      this.setState({ data: data });
    }
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
      console.log("malicious_visits :>> ", malicious_visits);
      console.log("malicious_downloads :>> ", malicious_downloads);
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
              src={solveResourceURL(FailedIcon)}
              alt="failed-icon"
            />
            <p>
              An error has occured! Please try again by refreshing the page!
            </p>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default App;
