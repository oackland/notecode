import React from 'react';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; 
`;

const ContentContainer = styled.div`
  display: flex;
  gap:100px;
  max-width: 1200px; 
`;

const LeftSection = styled.div`
  flex: 1;
`;

const RightSection = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover; 
`;

const TitleSection = styled.div`
  font-size: 28px;
  background: -webkit-linear-gradient(left, red, orange, yellow, green, blue, indigo, violet);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(255, 255, 255, 0.5),  0 0 15px rgba(255, 255, 255, 0.3),
  0 0 20px rgba(255, 255, 255, 0.2);
  font-family: "Droid Sans Mono Slashed", SansSerif,serif;
`;

const ContentSection = styled.div`
  padding: 15px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  letter-spacing: 1px;
  font-size: 18px;
  font-weight: normal;
  line-height: 1.6;
  margin: 0 auto;
`;

interface TwoSectionLayoutProps {
    title: React.ReactNode;
    content: React.ReactNode;
    imageUrl: string;
}

const TwoSectionLayout: React.FC<TwoSectionLayoutProps> = ({title, content, imageUrl}) => {
    return (
        <LayoutContainer>
            <ContentContainer>
                <LeftSection>
                    <TitleSection>{title}</TitleSection>
                    <ContentSection>{content}</ContentSection>
                </LeftSection>
                <RightSection>
                    <Image src={imageUrl} alt="Home Image"/>
                </RightSection>
            </ContentContainer>
        </LayoutContainer>
    );
};

export default TwoSectionLayout;
