import React, { FC, ReactNode, useEffect, useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';

import * as T from 'types';
import { BoldLargeText, TagText } from 'constants/styles';
import BaseLayout from 'components/templates/BaseLayout';
import likeSvg from 'assets/icons/like.svg';
import eyesSvg from 'assets/icons/eyes.svg';
import palette from 'constants/palette';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { fetchClub } from 'actions/club';

const Root = styled.div`
    margin: 36px 144px;
`

const IconTagWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: 18px 6px;
`

const IconCountWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 16px;
`

const Icon = styled.img`
    width: 28px;
    height: auto;
    margin-right: 4px;
`

const IconCount = styled.div`
    color: ${palette.greyNumber.toString()};
    margin-right: 8px;
`

const TagWrapper = styled.div`
    display: flex;
    transform: translateX(8px);
`

interface ClubInfoMenuProps {
    isSelected?: boolean;
}

const ClubDetailMenuWrapper = styled.div`
    display: flex;
    justify-content: center;
`
const ClubDetailMenuItem = styled.div<ClubInfoMenuProps>(({ isSelected }) => ({
    width: '300px',
    height: '40px',
    fontSize: '20px',
    fontWeight: 'bold',

    color: isSelected ? '#FFFFFF' : palette.primaryGradient.toString(),
    backgroundColor: isSelected ? palette.primaryGradient.toString() : '',
    border: `1px solid ${palette.greyBorder.toString()}`,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    cursor: 'pointer',
}))

const ClubContentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const ClubImageContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 72px;
`

const ClubImage = styled.img`
    width: 480px;
    height: auto;
    margin: 24px;
`

const ClubDescription = styled.div`
    border: 1px solid ${palette.primaryViolet.toString()};
    border-radius: 4px;
    padding: 12px;
    width: 1200px;
    text-align: center;
`

interface Props {

}

interface ClubInfoRouterProps {
    id: string;
}

const ClubDetailPage: FC<Props & RouteComponentProps<ClubInfoRouterProps>> = ({ match }) => {
    const [selectedTab, setSelectedTab] = useState<keyof T.ClubDetailTab>('CLUB_INTRO' as keyof T.ClubDetailTab);
    const club = useSelector((state: RootState) => state.fetchSingle.clubs[0]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchClub.request({ id: match.params.id }));
    }, [match.params.id]);

    useEffect(() => {
        console.log(club);
    }, [club]);

    const handleTabClick: (type: keyof T.ClubDetailTab) => void = (type) => {
        setSelectedTab(type);
    };

    const isSelectedTab: (type: keyof T.ClubDetailTab) => boolean = (type) => {
        return selectedTab === type;
    }

    const menuItems: ReactNode =  
        Object.entries(T.ClubDetailTab).map(([key, value]) => {
            return (
                <ClubDetailMenuItem 
                    key={key}
                    isSelected={isSelectedTab(key as keyof T.ClubDetailTab)} 
                    onClick={() => handleTabClick(key as keyof T.ClubDetailTab)}
                >
                {value}
                </ClubDetailMenuItem>
            );
        })

    const clubImages: ReactNode =
        club ? club.photos.map(photo => {
            const imageConverterPrefix = "data:image/png;base64,"
            const imageElem = imageConverterPrefix + btoa(String.fromCharCode.apply(null, photo.img.data.data));
            return (
                <ClubImage src={imageElem} />
            )
        }) : null;

    return club ? (
        <BaseLayout>
            <Root>
                <BoldLargeText>{club.name}</BoldLargeText>
                <IconTagWrapper>
                    <IconCountWrapper>
                        <Icon src={likeSvg} />
                        <IconCount>48</IconCount>
                        <Icon src={eyesSvg} />
                        <IconCount>1002</IconCount>
                    </IconCountWrapper>
                    <TagWrapper>
                        {/* array.map으로 전환 필요*/}  
                        <TagText>#학회</TagText>
                        <TagText>#생명과학</TagText>
                        <TagText>#화학</TagText>
                        <TagText>#논문읽기</TagText>
                    </TagWrapper>
                </IconTagWrapper>
                <ClubDetailMenuWrapper>
                    {menuItems}
                </ClubDetailMenuWrapper>
                <ClubContentsContainer>
                    <ClubImageContainer>
                        {clubImages}
                    </ClubImageContainer>
                    <ClubDescription>
                        {club ? club.description : null}
                    </ClubDescription>
                </ClubContentsContainer>
            </Root>
        </BaseLayout>
    ) : null;
}

export default withRouter(ClubDetailPage);