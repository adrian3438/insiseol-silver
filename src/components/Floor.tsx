'use client';

import { floorData } from "@/data/floorData";
import {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css';
import {Autoplay} from "swiper/modules";

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
    ssr: false,
});

interface Props {
    normalInfoData?: any;
    fireInfoData?: any;
}

export default function Floor({normalInfoData, fireInfoData} : Props) {
    //화재 시그널
    const [fireSignal, setFireSignal] = useState(true);

    //화재정보를 Gateway(중계기) 별로 묶는다
    const [gateway1, setGateway1] = useState<any>();
    const [gateway2, setGateway2] = useState<any>();
    const [gateway3, setGateway3] = useState<any>();

    useEffect(() => {
        if(fireInfoData?.length > 0) {
            setFireSignal(false);
            fireInfoData?.forEach((item: any) => {
                switch (item?.floorName) {
                    case 'Gateway1':
                        setGateway1(item);
                        break;
                    case 'Gateway2':
                        setGateway2(item);
                        break;
                    case 'Gateway3':
                        setGateway3(item);
                        break;
                }
            });
        } else {
            setFireSignal(true);
            setGateway1(null);
            setGateway2(null);
            setGateway3(null);
        }
    }, [fireInfoData]);

    //층별정보 Data
    const floorInfo = floorData;
    const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);
    const handleButtonClick = (index: number) => {
        setActiveIndex(index);
    }

    async function repairFire() {
        try {
            const response = await fetch(`http://scwc2024.cafe24.com/controller/setRecoveryFire.php`, {
                cache: 'no-store',
            });
            const data = await response.json(); // JSON 파싱
            if(data.result === true) {
                setFireSignal(true);
                alert(data.resultMsg);
            } else {
                setFireSignal(false);
            }
        } catch (error) {
            console.error("Error while repairing fire:", error);
        }
    }

    return (
        <>
            {fireInfoData?.length > 0 && !fireSignal && (
                <div className="fire-signal">
                    <div className="fire-signal-layer"></div>
                    <div className="fire-signal-text">
                        화재가 감지 되었습니다. 긴급대피 규칙에 따라 <br/>대표 명령을 안내해 주시기 바랍니다.
                    </div>
                </div>
            )}
            <ModelViewer
                floorNumber={activeIndex}
                gateway1={gateway1}
                gateway2={gateway2}
                gateway3={gateway3}
                fireSignal={fireSignal}
            />
            <div className="floor">
                <ul>
                    <li className={activeIndex === 5 ? `active ${gateway3 && gateway3?.sensor1 === 'false' ? 'fire' : ''}` : `${gateway3 && gateway3?.sensor1 === 'false' ? 'fire' : ''}`}>
                        <button onClick={() => handleButtonClick(5)}>5F</button>
                    </li>
                    <li className={activeIndex === 4 ? `active ${gateway3 && (gateway3?.sensor2 === 'false' || gateway3?.sensor3 === 'false') ? 'fire' : ''}` : `${gateway3 && (gateway3?.sensor2 === 'false' || gateway3?.sensor3 === 'false') ? 'fire' : ''}`}>
                        <button onClick={() => handleButtonClick(4)}>4F</button>
                    </li>
                    <li className={activeIndex === 3 ? `active ${gateway3 && (gateway3?.sensor4 === 'false' || gateway3?.sensor5 === 'false') ? 'fire' : ''}` : `${gateway3 && (gateway3?.sensor4 === 'false' || gateway3?.sensor5 === 'false') ? 'fire' : ''}`}>
                        <button onClick={() => handleButtonClick(3)}>3F</button>
                    </li>
                    <li className={activeIndex === 2 ? `active ${gateway2 && (gateway2?.sensor3 === 'false' || gateway2?.sensor4 === 'false') ? 'fire' : ''}` : `${gateway2 && (gateway2?.sensor3 === 'false' || gateway2.sensor4 === 'false') ? 'fire' : ''}`}>
                        <button onClick={() => handleButtonClick(2)}>2F</button>
                    </li>
                    <li className={activeIndex === 1 ? `active ${gateway2 && (gateway2?.sensor1 === 'false' || gateway2?.sensor2 === 'false') ? 'fire' : ''}` : `${gateway2 && (gateway2?.sensor1 === 'false' || gateway2?.sensor2 === 'false') ? 'fire' : ''}`}>
                        <button onClick={() => handleButtonClick(1)}>1F</button>
                    </li>
                    <li className={activeIndex === 0 ? `active ${gateway1 && gateway1?.sensor1 === 'false' ? 'fire' : ''}` : `${gateway1 && gateway1?.sensor1 === 'false' ? 'fire' : ''}`}>
                        <button onClick={() => handleButtonClick(0)}>B1</button>
                    </li>
                </ul>
            </div>
            <section className="sensor-info">
                <h2>
                    화재 감지
                </h2>
                {floorInfo && (
                    <div>
                        <Swiper
                            direction={'vertical'}
                            className="mySwiper"
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                        >
                            {floorInfo?.map((item: any, index: number) => (
                                <SwiperSlide key={index}>
                                <div className={`fire-status ${index === 0 && gateway1 ? " fire" : ""}${index === 1 && gateway2 ? " fire" : ""}${index === 2 && gateway3 ? " fire" : ""}`}>
                                    <p>{item.gatewayID}({item.gatewayName})</p>
                                    <dl>
                                        <dt>점검일자 : </dt>
                                        <dd>{normalInfoData && normalInfoData[0]?.createDate}</dd>
                                    </dl>
                                    <dl>
                                        <dt>화재상태 :</dt>
                                        <dd>
                                            <ul>
                                                {floorInfo[index].gatewayID === 'Gateway1' && (
                                                    <>
                                                        {floorInfo[index]?.sensor?.map((item: any, index) => (
                                                            <li key={index}>
                                                                <p className="sensor-area">
                                                                    {index === 0 && (<>
                                                                        {gateway1?.sensor1 === "false" ? <span>{item?.sensorID}(화재감지)</span> : `${item?.sensorID}(정상)`}
                                                                    </>)}
                                                                </p>
                                                            </li>
                                                        ))}
                                                    </>
                                                )}
                                                {floorInfo[index].gatewayID === 'Gateway2' && (
                                                    <>
                                                        {floorInfo[index]?.sensor?.map((item: any, index) => (
                                                            <li key={index}>
                                                                <p className="sensor-area">
                                                                    {index === 0 && (<>
                                                                        {gateway2?.sensor1 === "false" ? <span>{item?.sensorID}(화재감지)</span> : `${item?.sensorID}(정상)`}
                                                                    </>)}
                                                                    {index === 1 && (<>
                                                                        {gateway2?.sensor2 === "false" ? <span>{item?.sensorID}(화재감지)</span> : `${item?.sensorID}(정상)`}
                                                                    </>)}
                                                                    {index === 2 && (<>
                                                                        {gateway2?.sensor3 === "false" ? <span>{item?.sensorID}(화재감지)</span> : `${item?.sensorID}(정상)`}
                                                                    </>)}
                                                                    {index === 3 && (<>
                                                                        {gateway2?.sensor4 === "false" ? <span>{item?.sensorID}(화재감지)</span> : `${item?.sensorID}(정상)`}
                                                                    </>)}
                                                                </p>
                                                            </li>
                                                        ))}
                                                    </>
                                                )}
                                                {floorInfo[index].gatewayID === 'Gateway3' && (
                                                    <>
                                                        {floorInfo[index]?.sensor?.map((item: any, index) => (
                                                            <li key={index}>
                                                                <p className="sensor-area">
                                                                    {index === 0 && (<>
                                                                        {gateway3?.sensor1 === "false" ? <span>{item?.sensorID}(화재감지)</span> : `${item?.sensorID}(정상)`}
                                                                    </>)}
                                                                    {index === 1 && (<>
                                                                        {gateway3?.sensor2 === "false" ? <span>{item?.sensorID}(화재감지)</span> : `${item?.sensorID}(정상)`}
                                                                    </>)}
                                                                    {index === 2 && (<>
                                                                        {gateway3?.sensor3 === "false" ? <span>{item?.sensorID}(화재감지)</span> : `${item?.sensorID}(정상)`}
                                                                    </>)}
                                                                    {index === 3 && (<>
                                                                        {gateway3?.sensor4 === "false" ? <span>{item?.sensorID}(화재감지)</span> : `${item?.sensorID}(정상)`}
                                                                    </>)}
                                                                    {index === 4 && (<>
                                                                        {gateway3?.sensor5 === "false" ? <span>{item?.sensorID}(화재감지)</span> : `${item?.sensorID}(정상)`}
                                                                    </>)}
                                                                </p>
                                                            </li>
                                                        ))}
                                                    </>
                                                )}
                                            </ul>
                                        </dd>
                                    </dl>
                                </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </section>
            {fireInfoData?.length > 0 && !fireSignal && (
                <button className="repair" onClick={() => repairFire()}>화재복구</button>
            )}

        </>
    );
}
