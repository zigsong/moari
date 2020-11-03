import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { ProposeClubText } from 'components/templates/SimpleText';
import ClubList from 'components/templates/ClubList';
import BaseLayout from 'components/templates/BaseLayout';
import { match } from 'assert';

interface Props {

}

interface MatchParams {
    keyword: string
}

const MainPage: FC<Props & RouteComponentProps<MatchParams>> = ({ match }) => {
    return (
        <BaseLayout>
            <ProposeClubText />
            <ClubList keyword={match.params.keyword} />
        </BaseLayout>
    );
}

export default MainPage;