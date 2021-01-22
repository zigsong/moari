import axios from 'axios';
import { CLUB_SERVER } from 'components/Config'
import { Club } from 'types';

export interface PostClubPayload {
  name: string;
  school: string;
  description: string;
  photos?: FileList;
  category: string;
  tags: string[];
  status: string;
  history: any;
}

export interface PostClubResponse {
  success: boolean,
  club: Club,
  err: any | null
}

export async function postClubRequest ({ name, school, description, photos, category, tags, status }: PostClubPayload){
  const formData = new FormData();
  
  formData.append("name", name);
  formData.append("school", school);
  formData.append("description", description);
  formData.append("tags", JSON.stringify(tags));
  formData.append("category", category);
  formData.append("status", status);

  if (photos) {
    for (let i=0; i<photos.length; i++) {
      formData.append("photos", photos[i]);
    }
  }

  // for (var key of formData.entries()) {
  //   console.log(key[0]);
  //   console.log(key[1]);
  // }

  return await axios.post<PostClubResponse>(CLUB_SERVER, formData)
  .then(res => res.data);
}