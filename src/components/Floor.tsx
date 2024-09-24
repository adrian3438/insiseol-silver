'use client';

import {useState} from "react";

interface Props {
    floorInfo? : FloorInfo[];
}

interface FloorInfo {
    floorId?: string;
    sensor?: { sensorId: string; sensorArea: string; sensorLocation: string }[];
}

export default function Floor({floorInfo} : Props) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [activeFloor, setActiveFloor] = useState<boolean>(false);

    const handleButtonClick = (index:number) => {
        setActiveIndex(index);
        setActiveFloor(true);
    }
    return (
        <>
            <div className="floor">
                <ul>
                    {floorInfo?.map((item, index) => (
                        <li key={index} className={activeIndex === index ? "active" : ""}>
                            <button onClick={() => handleButtonClick(index)}>{item.floorId}</button>
                        </li>
                    ))}
                </ul>
            </div>
            {activeFloor && activeIndex !== null && (
                <section className="sensor-info">
                    <h2>{floorInfo && floorInfo[activeIndex]?.floorId && floorInfo[activeIndex]?.floorId.replace('F', '층').replace('B1', '지하 1층')} 센서 위치 정보</h2>
                    {floorInfo && (
                        <ul>
                            {floorInfo[activeIndex]?.sensor?.map((item, index) => (
                                <li key={index}>
                                    <p className="sensor-area">{item.sensorArea}</p>
                                    <p className="sensor-location">{item.sensorLocation}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            )}
        </>
    );
}