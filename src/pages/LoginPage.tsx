import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function LoginPage(){
    const navigate = useNavigate();
    
    return(
        <LoginPageContainer>
            <LoginBtn onClick={()=>{
                navigate("/main");
            }}>
                Login
            </LoginBtn>
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
`

const LoginBtn = styled.div`
    display: flex;
    width:10rem;
    height: 5rem;
    border: 1px solid;
    justify-content: center;
    align-items: center;
`