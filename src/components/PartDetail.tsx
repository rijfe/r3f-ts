import styled from "styled-components";

function PartDetail(){
    return(
        <Container>
            <Box>
                <NameContainer>
                    <p>name</p>
                    <p>111111111111</p>
                </NameContainer>
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
    justify-content: center;
`;

const NameContainer = styled.div`
    width: 95%;
    height: 10%;
    display:flex;
    align-items: center;
    justify-content: space-around;
    border-bottom:solid 1.5px;
`;
