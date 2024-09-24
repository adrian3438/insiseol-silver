import Image from "next/image";

export default function Header() {
    return (
        <header>
            <h1 className="logo"><Image src="/images/ichoen-facility-corporation-white-logo.svg" alt="인천시설공단" width={197} height={46}/></h1>
            <p className="page-title">인천노인복지회관 - 화재감지 시스템</p>
            <div className="logout">홍길동 | <a href="#">로그아웃</a></div>
        </header>
    )
}