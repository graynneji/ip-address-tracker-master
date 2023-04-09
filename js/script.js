"use strict";
// const locationData = document.querySelector(".location");
const theContainer = document.querySelector(".container");
const button = document.querySelector(".btn");
const searchInput = document.querySelector(".search-tab").value;
// let map = L.map("map").setView([51.505, -0.09], 13);

// L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution:
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// }).addTo(map);

// L.marker([51.5, -0.09])
//   .addTo(map)
//   .bindPopup("A pretty CSS3 popup.<br> Easily customizable.")
//   .openPopup();

// if (navigator.geolocation)
//   navigator.geolocation.getCurrentPosition(showPosition);

// function showPosition(position) {
//   console.log(position);
// }
// showPosition();

// const getIPLocation = function (ipDomain) {
//   fetch(
//     `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_xKWaomCkKIieL4m49RzOLCr5gy4Uz&ipAddress=${ipDomain}`
//   )
//     .then((response) => response.json())
//     .then((data) => console.log(data, data.location.lat));
// };
// getIPLocation("160.152.198.144");

// const html = `
// <div class="ip-location">
//           <p class="sec">IP ADDRESS</p>
//           <span class="content">${this.ip}</span>
//         </div>
//         <div>
//           <p class="sec">LOCATION</p>
//           <span class="content">Brooklyn, NY <br />10001</span>
//         </div>
//         <div>
//           <p class="sec">TIME-ZONE</p>
//           <span class="content">UTC-5:00</span>
//         </div>
//         <div>
//           <p class="sec">ISP</p>
//           <span class="content">SpaceX <br />Starlink</span>
//         </div>
// `

class Geo {
  constructor(val) {
    this.val = val;
    // this.location = location;
    // this.timezone = timezone;
    // this.isp = isp;
    // this.getLocation();

    this.getCurrentIpAddress();
    button.addEventListener("click", this.inputs.bind(this));
    // this.getSearchInput();
    // this.captureInput(this.ip).bind(this);
  }
  getIP(ipDomain) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_xKWaomCkKIieL4m49RzOLCr5gy4Uz&ipAddress=${ipDomain}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.renderLocation(data);
        console.log(data);

        this.getLocation(data);
      });
  }
  getLocation(lo) {
    let map = L.map("map").setView([lo.location.lat, lo.location.lng], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([lo.location.lat, lo.location.lng])
      .addTo(map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
        })
      )
      .setPopupContent(
        `<strong>${lo.location.city}, ${lo.location.region}, <br> ${lo.location.country}</strong>`
      )
      .openPopup();
  }
  renderLocation(soft) {
    let html = `
    <div class="location">
<div class="ip-location">
          <p class="sec">IP ADDRESS</p>
          <span class="content">${soft.ip}</span>
        </div>
        <div>
          <p class="sec">LOCATION</p>
          <span class="content">${soft.location.region}</span>
        </div>
        <div>
          <p class="sec">TIME-ZONE</p>
          <span class="content">${soft.location.timezone}</span>
        </div>
        <div>
          <p class="sec">ISP</p>
          <span class="content">${soft.isp}</span>
        </div>
        </div>
`;
    theContainer.insertAdjacentHTML("beforeend", html);
  }
  getCurrentIpAddress() {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.getIP(data.ip);
      });
  }
  inputs(e) {
    e.preventDefault();
    this.val = searchInput;
    this.getIP(searchInput);
    this.p();
    console.log(this.val, searchInput);
  }
  p() {
    document.querySelector(".search-tab").value = "";
  }
}

const geographt = new Geo();
console.log(geographt);
