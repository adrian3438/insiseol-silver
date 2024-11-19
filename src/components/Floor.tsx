'use client';

import { floorData } from "@/data/floorData";
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
    ssr: false,
});

interface Props {
    infoData? : any;
}

export default function Floor({infoData} : Props) {
    const floorInfo = floorData;
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
    const [gatewayName, setGatewayName] = useState<string>();
    const [gatewayIndex, setGatewayIndex] = useState<number>(0);
    const handleButtonClick = (index: number) => {
        setActiveIndex(index);
    }
    useEffect(() => {
        if (activeIndex === 5 || activeIndex === 4 || activeIndex === 3) {
            setGatewayName('Gateway3');
            setGatewayIndex(0);
        } else if (activeIndex === 0) {
            setGatewayName('Gateway1');
            setGatewayIndex(2);
        } else {
            setGatewayName('Gateway2');
            setGatewayIndex(1);
        }
    }, [activeIndex, infoData]);

    const [sensorsData, setSensorsData] = useState<any[]>([]);
    const [fireSignal, setFireSignal] = useState<boolean>(false);
    useEffect(() => {
        setSensorsData([
            {"status" : infoData?.sensor1},
            {"status" : infoData?.sensor2},
            {"status" : infoData?.sensor3},
            {"status" : infoData?.sensor4},
            {"status" : infoData?.sensor5},
        ]);
    }, [infoData]);

    useEffect(() => {
        const hasFalseStatus = sensorsData.some((sensor) => sensor.status === "false");
        setFireSignal(hasFalseStatus);
    }, [sensorsData]);

    return (
        <>
            {fireSignal && (
                <div className="fire-signal">
                    <div className="fire-signal-layer"></div>
                    <div className="fire-signal-text">
                        화재가 감지 되었습니다. 긴급대피 규칙에 따라 <br/>대표 명령을 안내해 주시기 바랍니다.
                    </div>
                </div>
            )}
            <ModelViewer floorNumber={activeIndex}/>
            <div className="floor">
                <ul>
                    <li className={infoData?.floorName === 'Gateway3' ? `${activeIndex === 5 ? 'active ' : ''}${infoData?.sensor1 === "false" ? 'fire ' : ''}` : `${activeIndex === 5 ? 'active' : ''}`}>
                        <button onClick={() => handleButtonClick(5)}>5F</button>
                    </li>
                    <li className={infoData?.floorName === 'Gateway3' ? `${activeIndex === 4 ? 'active ' : ''}${(infoData?.sensor2 === "false" || infoData?.sensor3 === false) ? 'fire' : ''}` : `${activeIndex === 4 ? 'active' : ''}`}>
                        <button onClick={() => handleButtonClick(4)}>4F</button>
                    </li>
                    <li className={infoData?.floorName === 'Gateway3' ? `${activeIndex === 3 ? 'active ' : ''}${(infoData?.sensor4 === "false" || infoData?.sensor5 === false) ? 'fire' : ''}` : `${activeIndex === 3 ? 'active' : ''}`}>
                        <button onClick={() => handleButtonClick(3)}>3F</button>
                    </li>
                    <li className={infoData?.floorName === 'Gateway2' ? `${activeIndex === 2 ? 'active ' : ''}${(infoData?.sensor3 === "false" || infoData?.sensor4 === false) ? 'fire' : ''}` : `${activeIndex === 2 ? 'active' : ''}`}>
                        <button onClick={() => handleButtonClick(2)}>2F</button>
                    </li>
                    <li className={infoData?.floorName === 'Gateway2' ? `${activeIndex === 1 ? 'active ' : ''}${(infoData?.sensor1 === "false" || infoData?.sensor2 === false) ? 'fire' : ''}` : `${activeIndex === 1 ? 'active' : ''}`}>
                        <button onClick={() => handleButtonClick(1)}>1F</button>
                    </li>
                    <li className={infoData?.floorName === 'Gateway1' ? `${activeIndex === 0 ? 'active ' : ''}${infoData?.sensor1 === "false" ? 'fire' : ''}` : `${activeIndex === 0 ? 'active' : ''}`}>
                        <button onClick={() => handleButtonClick(0)}>B1</button>
                    </li>
                </ul>
            </div>
            <section className="sensor-info">
                <h2>
                    화재 감지
                </h2>
                {floorInfo && infoData && (
                    <div className={(infoData?.floorName === floorInfo[gatewayIndex].gatewayID) && fireSignal ? 'fire' : ''}>
                        <p>{gatewayName}({floorInfo[gatewayIndex]?.gatewayName})</p>
                        <dl>
                            <dt>점검일자 : </dt>
                            <dd>{infoData?.createDate}</dd>
                        </dl>
                        <dl>
                            <dt>화재상태 : </dt>
                            <dd>
                                <ul>
                                    {floorInfo[gatewayIndex]?.sensor?.map((item, index) => (
                                        <li key={index}>
                                            <p className="sensor-area">
                                                {item.sensorID}
                                                {infoData?.floorName === floorInfo[gatewayIndex].gatewayID ? (
                                                    sensorsData[index]?.status === "false" ? (
                                                        <span>(화재 감지)</span>
                                                    ) : (
                                                        "(정상)"
                                                    )
                                                ) : (
                                                    "(정상)"
                                                )}
                                            </p>
                                            {/*<p>{infoData?.floorName} {floorInfo[gatewayIndex].gatewayID}</p>*/}
                                        </li>
                                    ))}
                                </ul>
                            </dd>
                        </dl>
                    </div>
                )}
            </section>
        </>
    );
}
