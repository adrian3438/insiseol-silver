'use client';

import Image from "next/image";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import { useCookies } from 'react-cookie'
import Cookies from 'js-cookie';

export default function Login() {
    const router = useRouter()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookies , setCookie] = useCookies(['hessid']);
    const [login, setLogin] = useState<{id :string, password : string}>({
        id : '', password : ''
    })
    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setLogin((prev) => ({...prev, [name] : value}))
    }
    //로그인
    async function handleLogin () {
        try{
            const formData = new FormData()
            formData.append('managerLoginId', login?.id)
            formData.append('managerPass', login?.password)
            const response = await fetch(`http://scwc2024.cafe24.com/controller/admin/manager/adminLogin.php?managerLoginId=${login.id}&managerPass=${login.password}`, { cache: 'no-store' });
            const loginResponse = await response.json();

            if(loginResponse?.result === true) {
                setCookie('hessid', loginResponse.uuid, { path: '/' }); // You can adjust the options as needed
                router.push('/main');
            }else{
                alert(loginResponse.resultMsg);
            }
        }catch{
            alert('Server Error');
        }
    }
    //엔터키 클릭 시 로그인 API 호출
    function handleEnter (e:React.KeyboardEvent<HTMLInputElement>){
        if(e.key==='Enter') handleLogin()
    }

    //로그인 이후 여부 확인
    async function loginConfirm() {
        const currentUuid = Cookies.get('hessid');
        if(currentUuid) {
            const response = await fetch(`http://scwc2024.cafe24.com/controller/admin/manager/adminInfo.php?managerUuid=${currentUuid}`);
            const loginUserInfo = await response.json();
            if(loginUserInfo?.list[0].uuid === currentUuid) {
                router.push('/main');
            } else {
                router.push('/')
                Cookies.remove('hessid')
            }
        }
    }
    useEffect(() => {
        loginConfirm();
    }, []);

    return (
        <div className="login">
            <section className="bg-section">
                <div>
                    <p className="login-p-1"><Image src="/images/login/logo-login.svg" alt="인천시설공단" width={369} height={68}/></p>
                    <h1>디지털트윈 기반 화재 감지 시스템 V1.0(dotsFire V1.0)</h1>
                    <p className="login-p-2"><span>인천노인종합문화회관</span> 3D 모델링 & IoT 센서 연동 화재 감지</p>
                </div>
            </section>
            <section className="login-section">
                <div>
                    <h2>로그인</h2>
                    <form id="login">
                        <fieldset className="input-email">
                            <label htmlFor="email">아이디</label>
                            <input id="email" type="text" name="id"
                               onChange={handleChange}
                               onKeyDown={handleEnter}
                            />
                        </fieldset>
                        <fieldset className="input-password">
                            <label htmlFor="password">비밀번호</label>
                            <input id="password" type="password" name="password"
                               onChange={handleChange}
                               onKeyDown={handleEnter}
                            />
                        </fieldset>
                        {/*<fieldset className="join">
                            <Link href="#">회원가입</Link> | <Link href="#">비밀번호 찾기</Link>
                        </fieldset>*/}
                        <input type="button" value="로그인" className="login-btn" onClick={() => router.push('/main')} onKeyDown={handleEnter}/>
                    </form>
                    <p><Image src="/images/login/ichoen-facility-corporation-logo.svg" alt="인천시설공단" width={295} height={43}/></p>
                </div>
            </section>
        </div>
    )
}
