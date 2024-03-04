import styled from "styled-components";

interface PartListProps {
    isPartOpen : boolean,
}

function PartList({isPartOpen} : PartListProps){
    return (
        <PartListContainer className = {isPartOpen ? "part":""}>
            <PartContainer></PartContainer>
            <BlankContainer></BlankContainer>
            <ListContainer></ListContainer>
        </PartListContainer>
    );
}

export default PartList;

const PartListContainer = styled.div`
    width: 35rem;
    height: 100%;
    position: fixed;
    left: -50%;
    transition: 0.5s ease;
    z-index:-1;
    &.part{
        left: 8rem;
        transition: 0.5s ease;
        z-index:1;
    }
`

const PartContainer = styled.div`
    width:100%;
    height: 9%;
    background: #D8D8D8;
    display: flex;
`;

const BlankContainer = styled.div`
    width:100%;
    height: 1%;
`;

const ListContainer = styled.div`
    width:100%;
    height:90%;
    background: #D8D8D8;
`;