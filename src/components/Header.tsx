import Image from "next/image";
import Cookies from 'js-cookie';
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";

export default function Header() {
    const router = useRouter();
    const [userName, setUserName] = useState("");

    //로그인 여부 확인
    /*async function loginConfirm() {
        const currentUuid = Cookies.get('hessid');
        if(currentUuid) {
            const response = await fetch(`http://scwc2024.cafe24.com/controller/admin/manager/adminInfo.php?managerUuid=${currentUuid}`);
            const loginUserInfo = await response.json();
            setUserName(loginUserInfo?.list[0].name);
            if(loginUserInfo?.list[0].uuid !== currentUuid) {
                router.push('/')
                Cookies.remove('hessid')
            }
        } else {
            router.push('/')
            Cookies.remove('hessid')
        }
    }
    useEffect(() => {
        loginConfirm();
    }, []);*/


    //로그아웃
    function Logout () {
        Cookies.remove('hessid');
        router.push('/');
    }

    return (
        <header>
            <h1 className="logo"><Image src="/images/ichoen-facility-corporation-white-logo.svg" alt="인천시설공단" width={197} height={46}/></h1>
            <p className="page-title">인천노인복지회관 - 화재감지 시스템</p>
            <div className="logout">{userName} <a href="#" onClick={Logout}>로그아웃</a></div>
        </header>
    )
}
