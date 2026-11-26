import { Popup } from "./DynamicMapParts";

//Popup latitude and longitude onClick
export function LocationMarker(props) {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click(e) {
            setPosition(e.latlng);
            if (props.setLatLng) props.setLatLng(e.latlng);
        },
    });

    return position === null ? null : (
        <Popup position={position} onClose={() => setPosition(null)}>
            <div>
                {props.coordinateMsg ?? "Vous avez cliquer à"} <br />
                <strong>Latitude:</strong> {position.lat.toFixed(5)} <br />
                <strong>Longitude:</strong> {position.lng.toFixed(5)}
            </div>
        </Popup>
    );
}
