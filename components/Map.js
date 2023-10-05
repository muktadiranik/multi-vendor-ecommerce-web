import React, { useCallback, useEffect, useRef, useState } from "react";
// import ReactMapboxGl, { Layer, Feature, Marker } from "react-mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
import markericon from "../public/images/mapicon.png";
import mapboxMarker from "../public/mapbox-marker-icon-blue.svg";
// import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import { client } from "/graphql/apolloClient";
// import mapboxgl from "mapbox-gl";
// import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
// import {
//   getAllProductTypesAndRates,
//   getAllProducts,
// } from "../common/queries/products";
// import { Cluster } from "react-mapbox-gl";
// import { features } from "process";
import { useSelector } from "react-redux";
import mapboxgl, { Marker } from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { Popup } from "mapbox-gl";

// mapboxgl.accessToken =
//   "pk.eyJ1IjoiZ28tdmVsbyIsImEiOiJjbGYxanQ1dXEwOTUxM3JuenA2YnY2NGwzIn0.ncsVJb5HHZB5UB_bBsn3Ag";

// const accessToken =
//   "pk.eyJ1IjoiZ28tdmVsbyIsImEiOiJjbGYxanQ1dXEwOTUxM3JuenA2YnY2NGwzIn0.ncsVJb5HHZB5UB_bBsn3Ag";

const MapBox = () => {
  // const [geoJson, setGeoJson] = useState({});

  const filterProducts = useSelector((state) => state.filterProducts);
  console.log(filterProducts?.filterProducts?.products?.edges);

  const products = filterProducts?.filterProducts?.products?.edges;
  const geoJson = {
    type: "FeatureCollection",
    features: [
      products?.map((product, index) => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              Number(product?.node?.shop?.longitude),
              Number(product?.node?.shop?.latitude),
            ],
          },
          properties: {
            id: index,
            title: product?.node?.brand,
            image: product?.node?.image,
            description: product?.node?.description,
          },
        };
      }),
    ],
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZ28tdmVsbyIsImEiOiJjbGYxanQ1dXEwOTUxM3JuenA2YnY2NGwzIn0.ncsVJb5HHZB5UB_bBsn3Ag";

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/examples/cjgiiz9ck002j2ss5zur1vjji",
      center: [91.83725375037245, 22.357716088087063],
      zoom: 10.7,
    });

    map.on("load", (event) => {
      map.addSource("places", {
        type: "geojson",
        data: geoJson,
      });
      addMarkers();
    });
    function addMarkers() {
      /* For each feature in the GeoJSON object above: */
      if (geoJson?.features[0]) {
        for (const marker of geoJson?.features[0]) {
          /* Create a div element for the marker. */
          const el = document.createElement("div");
          /* Assign a unique `id` to the marker. */
          el.id = `marker-${marker?.properties?.id}`;
          /* Assign the `marker` class to each marker for styling. */
          el.className = "marker";
          // el.innerHTML = `${marker?.properties?.id}`;
          el.innerHTML = `<img src="/mapbox-marker-icon-blue.svg"></img>`;

          /**
           * Create a marker using the div element
           * defined above and add it to the map.
           **/
          if (marker?.geometry?.type === "Point") {
            const coordinates = marker?.geometry?.coordinates;
            new Marker(el, { offset: [0, -23] })
              .setLngLat(coordinates)
              .addTo(map);
          }

          /**
           * Listen to the element and when it is clicked, do three things:
           * 1. Fly to the point
           * 2. Close all other popups and display popup for clicked store
           * 3. Highlight listing in sidebar (and remove highlight for all other listings)
           **/
          el.addEventListener("click", (e) => {
            /* Fly to the point */
            flyToStore(marker);
            /* Close all other popups and display popup for clicked store */
            createPopUp(marker);
            /* Highlight listing in sidebar */
            const activeItem = document.getElementsByClassName("active");
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove("active");
            }
            const listing = document.getElementById(
              `listing-${marker.properties?.id}`
            );
            listing?.classList.add("active");
          });
        }
      }
    }

    function flyToStore(currentFeature) {
      if (currentFeature.geometry.type === "Point") {
        const coordinates = currentFeature.geometry.coordinates;
        map.flyTo({
          center: coordinates,
          zoom: 15,
        });
      }
    }
    function createPopUp(currentFeature) {
      const popUps = document.getElementsByClassName("mapboxgl-popup");
      if (popUps[0]) popUps[0].remove();
      if (currentFeature.geometry.type === "Point") {
        const coordinates = currentFeature.geometry.coordinates;
        const popup = new Popup({ closeOnClick: true })
          .setLngLat(coordinates)
          .setHTML(
            `<div><div class="popup-header"><h3 className="text-xl font-semibold">Go Velo</h3><div id="close-popup"><h1>${currentFeature.properties.title}</h1></div></div><img src="${currentFeature.properties?.image}" /></div>`
          )
          .addTo(map);
        document
          .getElementById("close-popup")
          ?.addEventListener("click", () => {
            popup.remove();
          });
      }
    }

    // return () => map.remove();
  }, [geoJson.features]);

  // });
  return (
    <div>
      {/* <Map
      style="mapbox://styles/mapbox/streets-v9"
      containerStyle={{
        height: "80vh",
        width: "100vw",
      }}>
      {products?.products?.edges?.map((item) => {
        <Marker
          coordinates={[
            item?.node?.shop?.longitude,
            item?.node?.shop?.latitude,
          ]}
          anchor="bottom">
          <img src="/images/mapicon.png" />
        </Marker>;
      })}
      <Marker
        coordinates={[91.83708208900106, 22.357993912690876]}
        anchor="bottom">
        <img src="/images/mapicon.png" />
      </Marker>
      <Cluster ClusterMarkerFactory={clusterMarker}>
        {products?.products?.edges?.map((feature, key) => (
          <Marker
            key={key}
            style={styles.marker}
            coordinates={[
              feature?.node?.shop?.longitude,
              feature?.node?.shop?.latitude,
            ]}
            onClick={() =>
              onMarkerClick([
                feature?.node?.shop?.longitude,
                feature?.node?.shop?.latitude,
              ])
            }>
            M
          </Marker>
        ))}
      </Cluster>

      <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
        <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
      </Layer>
    </Map> */}
      <div
        id="map"
        style={{ position: "absolute", top: 0, bottom: 0, width: "100%" }}
      />
      ;
    </div>
  );
};

export default MapBox;
