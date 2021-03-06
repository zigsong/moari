import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import * as T from 'types';
import prepareSvg from 'assets/icons/stat-prepare.svg';
import alwaysSvg from 'assets/icons/stat-always.svg';
import openSvg from 'assets/icons/stat-open.svg';
import closedSvg from 'assets/icons/stat-closed.svg';

const Root = styled.div<{ image?: string | undefined }>`
    background-image: url(${(props) => props.image});
    // background-size: cover;
    background-position: center;
    width: 358px;
    height: 512px;
    border-radius: 20px;
    background-color: #EEEEEE;
    position: relative;
    cursor: pointer;
    margin: 0 72px;
    flex-shrink: 0;
` 

const StatusLabel = styled.img`
    width: 108px;
    height: auto;
    position: absolute;
    left: -12px;
    top: 16px;
`

interface Props {
    key: string;
    id: string;
    name: string;
    description: string;
    image?: any; // need change
    status?: T.ClubStatus
    tags?: Array<string>; // types에 tag 정의
}

const ClubCard: FC<Props & RouteComponentProps> = ({ id, status, image, history }) => {

    // const goClubDetail: (e: React.MouseEvent<HTMLDivElement>) => void = (e) => {
    const goClubDetail: (id: string) => void = (id) => {
        history.push(`/club/${id}`);
    }
        
    const imageBuffer = image.img.data.data;
    const imageConverterPrefix = "data:image/png;base64,"
    const imageElem = imageConverterPrefix + btoa(String.fromCharCode.apply(null, imageBuffer));
    console.log(imageElem);
    
    // need refactoring: switch-case
    return (
        <Root onClick={() => goClubDetail(id)} image={imageElem} >
            {(() => {
                switch (status) {
                    case T.ClubStatus.PREPARE:
                        return <StatusLabel src={prepareSvg} />
                    case T.ClubStatus.ALWAYS:
                        return <StatusLabel src={alwaysSvg} />
                    case T.ClubStatus.OPEN:
                        return <StatusLabel src={openSvg} />
                    case T.ClubStatus.CLOSED:
                        return <StatusLabel src={closedSvg} />
                    default:
                        return null;
                }
            })()}
        </Root>
    );
}

export default withRouter(ClubCard);
