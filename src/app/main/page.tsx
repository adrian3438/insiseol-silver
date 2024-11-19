'use client';

import Header from "@/components/Header";
import '@/app/assets/main.scss';
import Floor from "@/components/Floor";
// import { floorData } from "@/data/floorData";
import {useEffect, useState} from "react";

export default function Main() {
    const [infoData, setInfoData] = useState();
    const fetchData = async () => {
        try {
            const response = await fetch('http://scwc2024.cafe24.com/controller/getSocketData.php', { cache: 'no-store' });
            const data = await response.json();
            if(data.result === true) {
                if(data.list.length > 0) {
                    setInfoData(data.list[data.list.length - 1]);
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(); // Initial fetch
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return(
        <>
            <div className={"wrapper"}>
                <Header/>
                <Floor
                    infoData={infoData}
                />
            </div>
        </>
    )
}
