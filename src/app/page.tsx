import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="login">
        <div>
            <h1><Image src="/images/login/logo-login.svg" alt="인천시설공단" width={369} height={67.21}/></h1>
            <p className="login-p-1">디지털트윈 기반 화재 감지 시스템 V1.0</p>
            <p className="login-p-2">인천노인종합문화회관 3D 모델링 & IoT 센서 연동 화재 감지</p>
        </div>
        <div>
            <h2>로그인</h2>
            <form>
                <fieldset className="input-email">
                    <label htmlFor="email">이메일</label>
                    <input id="email" type="text"/>
                </fieldset>
                <fieldset className="input-password">
                    <label htmlFor="password">이메일</label>
                    <input id="password" type="password"/>
                </fieldset>
                <fieldset>
                    <Link href="#">회원가입</Link> | <Link href="#">비밀번호 찾기</Link>
                </fieldset>
                <input type="submit" value="로그인"/>
            </form>
            <p><Image src="/images/login/ichoen-facility-corporation-logo.svg" alt="인천시설공단" width={204} height={45}/></p>
        </div>
    </div>
  );
}
