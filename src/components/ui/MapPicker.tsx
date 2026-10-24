import { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrección de iconos de Leaflet
const defaultIconProto = L.Icon.Default.prototype as any;
delete defaultIconProto._getIconUrl;
const markerIcon = L.icon({
  iconUrl: '/images/marker.png', // Guarda la imagen en frontend/public/images/
  iconSize: [42, 42],            // Tamaño en píxeles
  iconAnchor: [16, 42],          // Punto que queda sobre la coordenada
});

// Componente interno para mover la cámara del mapa
function RecenterMap({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

type MapPickerProps = {
  value: [number, number];
  onChange?: (value: [number, number]) => void;
  height?: string;
  readOnly?: boolean;
  zoom?: number;
};

export default function MapPicker({ 
  value,            // Array [lat, lng] con la ubicación actual
  onChange,         // Función para actualizar la ubicación en el padre
  height = '400px', // Altura personalizable
  readOnly = false, // Si es true, el mapa sirve solo para mostrar, sin arrastrar
  zoom = 13         // Nivel de zoom inicial
}: MapPickerProps) {
  const markerRef = useRef<L.Marker | null>(null);

  // Escucha cuando se arrastra el marcador (solo si no es de lectura)
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null && onChange) {
          const newPos = marker.getLatLng();
          console.log(newPos)
          onChange([newPos.lat, newPos.lng]); // Le avisa al padre
        }
      },
    }),
    [onChange],
  );

  return (
    <div style={{ height: height, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
      <MapContainer center={value} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={markerIcon}
          draggable={!readOnly} // Desactiva el arrastre si es readonly
          eventHandlers={!readOnly ? eventHandlers : undefined}
          position={value}
          ref={markerRef}
        />
        <RecenterMap center={value} />
      </MapContainer>
    </div>
  );
}
