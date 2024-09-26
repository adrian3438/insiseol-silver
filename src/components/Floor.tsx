'use client';

import {useEffect, useState} from "react";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
    ssr: false,
});

interface Props {
    floorInfo? : FloorInfo[];
    fireInfo? : FireInfo[];
    fireSignal? : boolean;
}

interface FireInfo {
    floorId?: string;
    signal?: boolean;
    sensor?: { sensorId: string; sensorArea: string; sensorLocation: string, signal: boolean }[];
}

interface FloorInfo {
    floorId?: string;
    sensor?: { sensorId: string; sensorArea: string; sensorLocation: string }[];
}

export default function Floor({floorInfo, fireInfo, fireSignal} : Props) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [activeFloor, setActiveFloor] = useState<boolean>(false);
    const [floorName, setFloorName] = useState<string>();

    const handleButtonClick = (index: number, floorName: string | undefined) => {
        setActiveIndex(index);
        setActiveFloor(true);
        setFloorName(floorName);
    }
    useEffect(() => {
        if(fireSignal) {
            setActiveIndex(null);
            setActiveFloor(true);
        }
    }, [fireSignal]);
    //className={activeIndex === index ? "active" : ""}
    //activeIndex === index ? `${!(fireInfo) || fireInfo[index]?.signal ? 'fire active' : ''}` : ""
    return (
        <>
            <ModelViewer floorName={floorName}/>
            <div className="floor">
                <ul>
                    {floorInfo?.map((item, index) => (
                        <li key={index} className={
                            // !(fireInfo) || fireInfo[index]?.signal ? 'fire active' : `${activeIndex === index ? 'active' : ''}`
                            activeIndex === index ? "active" : `${fireInfo && fireInfo[index].signal ? 'fire active' : ''}`
                        }>
                            <button onClick={() => handleButtonClick(index, item.floorId)}>{item.floorId}</button>
                        </li>
                    ))}
                </ul>
            </div>
            {activeFloor && activeIndex !== null && !fireSignal && (
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

            {fireSignal && fireInfo && (
                <section className="fire-location-list">
                    <h2>경보 층 및 위치</h2>
                    <ul>
                        {fireInfo.map((item, index) => (
                            <li key={index} className={item.signal ? 'fire' : ''}>
                                {item.floorId}
                                <ul>
                                    {item.sensor?.map((item, index) => (
                                        <li key={index} className={item.signal ? 'fire' : ''}>{item.sensorArea}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </section>
                )}
        </>
    );
}
