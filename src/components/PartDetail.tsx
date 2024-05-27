import styled from "styled-components";

function PartDetail(){
    return(
        <Container>
            <Box>
                <NameContainer>
                    <NameBox style={{width:"40%", justifyContent:"center"}}>
                        <p style={{fontSize:"1.8rem", fontWeight:"bold"}}>Name</p>
                    </NameBox>
                    <NameBox style={{width:"60%", justifyContent:"center"}}>
                        <NameInput value={"Test"} disabled/>
                    </NameBox>
                </NameContainer>
                <BlankContainer/>
                <DetailContainer>
                    <DetailTitleContainer></DetailTitleContainer>
                </DetailContainer>
            </Box>
        </Container>
    );
}

export default PartDetail;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display:flex;
    align-items: start;
    justify-content: center;
`;

const Box = styled.div`
    width: 98%;
    height: 98%;
    display:flex;
    align-items: center;
    flex-direction: column;
`;

const NameContainer = styled.div`
    width: 95%;
    height: 10%;
    display:flex;
    align-items: center;
    border-bottom:solid 1.5px;
`;

const NameBox = styled.div`
    height: 100%;
    display:flex;
    align-items: center;
`;

const NameInput = styled.input`
    width: 80%;
    border:solid 1px #f0f0f0
    background-color:#ffffff;
    text-align:center;
`;

const BlankContainer = styled.div`
    height: 2%;
`;

const DetailContainer = styled.div`
    width: 95%;
    height: 13%;
    background: #f8f8f8;
`;

const DetailTitleContainer = styled.div`
    width: 100%;
    height: 40%;
    background: #c7c7c7;
`;