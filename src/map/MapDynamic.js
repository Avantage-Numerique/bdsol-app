'use client'

import dynamic from 'next/dynamic';
import styles from 'leaflet/dist/leaflet.css';

const MapDynamic = dynamic(() => import('@/src/map/Map'), {
    ssr: false,
});

const DEFAULT_WIDTH = 600;
const DEFAULT_HEIGHT = 600;

const Map = (props) => {
    const { width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT } = props;
    return (
        <div style={{ aspectRatio: width / height }}>
            <MapDynamic {...props} />
        </div>
    )
}

export { Map }