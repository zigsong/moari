import axios from 'axios';
import { CLUB_SERVER } from 'components/Config'
import { Recruit } from 'types';

export interface PostRecruitPayload {
  clubId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  contact: string;
  description: string;
  history: any;
}

export interface PostRecruitResponse {
  success: boolean,
  club: Recruit,
  err: any | null
}

export async function postRecruitRequest ({ clubId, title, startDate, endDate, contact, description }: PostRecruitPayload){
  return await axios.post<PostRecruitResponse>(`${CLUB_SERVER}/${clubId}/recruit/`, {
    clubId, title, startDate, endDate, contact, description
  })
  .then(res => res.data);
}