import Header from "@/components/Header";
import '@/app/assets/main.scss';
import Floor from "@/components/Floor";
import dynamic from "next/dynamic";

interface FloorInfo {
    floor: string;
    sensor: Sensor[];
}

interface Sensor {
    sensorId: string;
    sensorArea: string;
    sensorLocation: string;
}

const ModelViewer = dynamic(() => import('@/components/ModelViewer'), {
    ssr: false,
});

export default async function Main() {
    const fireSignal = true;
    const response = await fetch('http://localhost:3000/api/info', {cache: 'no-store'});
    const infoList:FloorInfo[] = await response.json();

    return(
        <>
            {fireSignal && <div className="fire-signal">
                <div>
                    화재가 감지 되었습니다. 긴급대피 규칙에 따라 대표 명령을 안내해 주시기 바랍니다.
                </div>
            </div>}
            <div className={"wrapper"}>
                <Header />
                <ModelViewer/>
                <Floor floorInfo={infoList}/>
            </div>
        </>
    )
}
