import Header from "@/components/Header";
import '@/app/assets/main.scss';
import Floor from "@/components/Floor";

interface FloorInfo {
    floor: string;
    sensor: Sensor[];
}

interface Sensor {
    sensorId: string;
    sensorArea: string;
    sensorLocation: string;
}

export default async function Main() {
    const fireSignal = true;
    const response = await fetch('http://localhost:3000/api/info', {cache: 'no-store'});
    const infoList:FloorInfo[] = await response.json();

    return(
        <>
            {fireSignal && <div className="fire-signal"></div>}
            <div className={"wrapper"}>
                <Header />
                <Floor floorInfo={infoList}/>
            </div>
        </>
    )
}