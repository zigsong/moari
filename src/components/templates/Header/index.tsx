import React, { FC } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import logoCampusSvg from 'assets/icons/logo-campus.svg';
import searchSvg from 'assets/icons/search.svg';
import likeSvg from 'assets/icons/like.svg';
import alarmSvg from 'assets/icons/alarm.svg';
import mypageSvg from 'assets/icons/mypage.svg';
import signupSvg from 'assets/icons/signup.svg';
import loginSvg from 'assets/icons/login.svg';
import logoutSvg from 'assets/icons/logout.svg';
import tempProfile from 'assets/images/temp-profile.jpg';

const Root = styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #ffffff;

    display: flex;
    align-items: center;
    z-index: 100;
    padding: 36px;
`

const LogoCampusIcon = styled.img`
    cursor: pointer;
`

const SearchBoxWrapper = styled.div`
    width: 48vw;
    height: 32px;
    border: 1px solid #EEEEEE;
    padding: 8px;

    display: flex;
    align-items: center;
    transform: translateX(16px);
`

const SearchIcon = styled.img`
    margin: 4px;
`

const SearchBox = styled.input`
    border: none;
    width: 100%;
    height: 100%;
    &:focus {
        outline: none;
    }

    font-size: 18px;
`

const ProfileWrapper = styled.div`
    width: auto;
    height: 32px;

    display: flex;
    align-items: center;
    transform: translateX(36px);
`

const ProfileName = styled.div`
    font-size: 18px;
`

// need props (profile img)
const ProfileImage = styled.img`
    width: auto;
    height: 100%;
    border-radius: 50%;
`

const ButtonsWrapper = styled.div`
    position: absolute;
    right: 48px
`

const HeaderButton = styled.img`
    margin: 8px;
    cursor: pointer;
`

interface Props {
    campusName: string;
    username: string;
}

const Header: FC<Props & RouteComponentProps> = ({ campusName, username, history }) => {    
    const goMainPage: () => void = () => {
        history.push('/');
    }

    const goSignup: () => void = () => {
        history.push('/signup');
    }
    
    const goLogin: () => void = () => {
        history.push('/login');
    }

    return (
        <Root>
            <LogoCampusIcon src={logoCampusSvg} onClick={() => goMainPage()}/>
            <SearchBoxWrapper>
                <SearchIcon src={searchSvg} />
                <SearchBox placeholder="동아리 이름이나 태그로 검색해보세요"/>
            </SearchBoxWrapper>
            <ProfileWrapper>
                <ProfileName>{username}님</ProfileName>
                <ProfileImage src={tempProfile} />
            </ProfileWrapper>
            <ButtonsWrapper>
                {/* if user logged in */}
                <HeaderButton src={likeSvg} />
                <HeaderButton src={alarmSvg} />
                {/* <HeaderButton src={mypageSvg} />
                <HeaderButton src={logoutSvg} /> */}
                {/* else */}
                <HeaderButton src={signupSvg} onClick={() => goSignup()} />
                <HeaderButton src={loginSvg} onClick={() => goLogin()} />
            </ButtonsWrapper>
        </Root>
    );
}

export default withRouter(Header);
