import Header from "@/components/Header";
import '@/app/assets/main.scss';
import Floor from "@/components/Floor";
import { fireData } from "@/data/FireData"
import { floorData } from "@/data/floorData";

export default function Main() {
    //층별 정보 임시 데이터/임시 연동(하드코딩)
    // const response = await fetch(process.env.NEXT_PUBLIC_URL + '/api/info', {cache: 'no-store'});
    // const floorInfoList = await response.json();
    const floorInfoList = floorData;

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
