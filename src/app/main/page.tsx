import Header from "@/components/Header";
import '@/app/assets/main.scss';
import Floor from "@/components/Floor";
import { fireData } from "@/data/FireData"

export default async function Main() {
    //층별 정보 임시 데이터/임시 연동(하드코딩)
    const response = await fetch('http://localhost:3000/api/info', {cache: 'no-store'});
    const floorInfoList = await response.json();

    //화재 경보 임시데이터
    const fireSignalInfo = fireData;
    //화재 경보 임시 시그널 변수
    const totalSignal = fireSignalInfo.filter((item) => {
        return item.signal === true;
    });
    const fireSignal = totalSignal.length > 0;

    return(
        <>
            {fireSignal && (
                <div className="fire-signal">
                    <div className="fire-signal-layer"></div>
                    <div className="fire-signal-text">
                        화재가 감지 되었습니다. 긴급대피 규칙에 따라 <br/>대표 명령을 안내해 주시기 바랍니다.
                    </div>
                </div>
            )}
            <div className={"wrapper"}>
                <Header/>
                <Floor
                    floorInfo={floorInfoList}
                    {...(fireSignal && { fireSignal: fireSignal, fireInfo: fireSignalInfo })}
                />
            </div>
        </>
    )
}