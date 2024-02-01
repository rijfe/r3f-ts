import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage(){
    const navigate = useNavigate();

    const [id, setId] = useState<string>("");
    const [pwd, setPwd] = useState<string>("");
    
    return(
        <LoginPageContainer>
            <LoginBox>
                <TitleContainer>
                    <TitleText>LOGIN</TitleText>
                </TitleContainer>
                <InputBoxContainer>
                    <InputBox placeholder=" ID" value={id} onChange={(event)=>{
                        setId(event.target.value);
                    }}/>
                    <InputBox placeholder=" PASSWORD" value={pwd} type="password" onChange={(event)=>{
                        setPwd(event.target.value);
                    }}/>
                </InputBoxContainer>
                <LogintBtnContainer>
                    <LoginBtn onClick={()=>{
                        if(id === "김영우" && pwd === "123") navigate("/main");
                        else window.alert("ID와 비밀번호를 확인해주세요.");
                    }}>LOGIN</LoginBtn>
                    @ 아름덴티스트리
                </LogintBtnContainer>
            </LoginBox>
        </LoginPageContainer>
    );
}

export default LoginPage;

const LoginPageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const LoginBox = styled.div`
    display: flex;
    width:50rem;
    height: 50rem;
    border: 1px solid;
    border-radius:4px;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const TitleContainer = styled.div`
    width:100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
`;

const TitleText = styled.h1`
    font-weight:500;
`;

const InputBoxContainer = styled.div`
    width:100%;
    height:40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const InputBox = styled.input`
    width:70%;
    height: 4rem;
    margin-bottom: 2rem;
`;

const LogintBtnContainer = styled.div`
    width:100%;
    height: 30%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
`;

const LoginBtn = styled.div`
    width:70%;
    height: 5rem;
    border: 1px solid;
    border-radius:4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size:1.5rem;
    margin-bottom:3rem;
`;