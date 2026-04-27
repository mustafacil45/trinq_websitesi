"use client";

import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import { Coffee, UtensilsCrossed, ShoppingBag, MapPin } from "lucide-react";

// Minimalist grayscale map style with subtle blue/water accents to match trinQ branding
const customMapStyle = [
  { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
  { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
  { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
  { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
  { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
  { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
  { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
  { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
  { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
  { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] }
];

const MOCK_LOCATIONS = [
  {
    id: "loc-1",
    name: "Kafe Merkez",
    category: "Gastronomi",
    type: "cafe",
    position: { lat: 41.0428, lng: 29.0079 }, // Beşiktaş
    cashback: "%10 Kazanç",
    address: "Beşiktaş Merkez",
    icon: Coffee
  },
  {
    id: "loc-2",
    name: "Double Dose Bistro",
    category: "Gastronomi",
    type: "bistro",
    position: { lat: 41.0519, lng: 28.9922 }, // Nişantaşı
    cashback: "%15 Kazanç",
    address: "Nişantaşı",
    icon: UtensilsCrossed
  },
  {
    id: "loc-3",
    name: "Fresh Market",
    category: "Perakende",
    type: "market",
    position: { lat: 40.9904, lng: 29.0292 }, // Kadıköy
    cashback: "%5 Kazanç",
    address: "Kadıköy Çarşı",
    icon: ShoppingBag
  }
];

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 41.025, // Centered roughly between Beşiktaş, Nişantaşı and Kadıköy
  lng: 29.015
};

export default function PartnerMerchantsMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  if (!isLoaded) return <div className="h-full w-full animate-pulse bg-slate-200" />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={defaultCenter}
      zoom={12}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: customMapStyle,
        disableDefaultUI: true,
        zoomControl: true,
      }}
      onClick={() => setActiveMarker(null)} // Close InfoWindow when clicking on empty map
    >
      {MOCK_LOCATIONS.map((loc) => (
        <Marker
          key={loc.id}
          position={loc.position}
          onClick={() => setActiveMarker(loc.id)}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: "#000000", // trinq-accent
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 8, // marker size
          }}
        >
          {activeMarker === loc.id && (
            <InfoWindow
              onCloseClick={() => setActiveMarker(null)}
              position={loc.position}
            >
              <div className="w-[200px] rounded-xl p-2 bg-white text-trinq-navy">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-trinq-accent/10 text-trinq-accent">
                    <loc.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold leading-tight">{loc.name}</h3>
                    <p className="text-[10px] text-trinq-muted font-medium">{loc.category}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-trinq-muted flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {loc.address}
                  </p>
                  <span className="inline-flex items-center rounded-md bg-green-50 px-1.5 py-0.5 text-[10px] font-bold text-green-700 ring-1 ring-inset ring-green-600/20">
                    {loc.cashback}
                  </span>
                </div>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${loc.position.lat},${loc.position.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full text-center rounded-lg bg-trinq-accent py-1.5 text-xs font-medium text-white transition hover:bg-trinq-accent-hover"
                >
                  Yol Tarifi Al
                </a>
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
}
