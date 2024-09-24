import Image from "next/image";
import Link from "next/link";
import '@/app/assets/login.scss'

export default function Home() {
    return (
        <div className="login">
            <section className="bg-section">
                <div>
                    <p className="login-p-1"><Image src="/images/login/logo-login.svg" alt="인천시설공단" width={369} height={68}/></p>
                    <h1>디지털트윈 기반 화재 감지 시스템 V 1.0</h1>
                    <p className="login-p-2"><span>인천노인종합문화회관</span> 3D 모델링 & IoT 센서 연동 화재 감지</p>
                </div>
            </section>
            <section className="login-section">
                <div>
                    <h2>로그인</h2>
                    <form id="login">
                        <fieldset className="input-email">
                            <label htmlFor="email">이메일</label>
                            <input id="email" type="text"/>
                        </fieldset>
                        <fieldset className="input-password">
                            <label htmlFor="password">이메일</label>
                            <input id="password" type="password"/>
                        </fieldset>
                        <fieldset className="join">
                            <Link href="#">회원가입</Link> | <Link href="#">비밀번호 찾기</Link>
                        </fieldset>
                        <input type="submit" value="로그인" className="login-btn"/>
                    </form>
                    <p><Image src="/images/login/ichoen-facility-corporation-logo.svg" alt="인천시설공단" width={295} height={43}/></p>
                </div>
            </section>
        </div>
    );
}
