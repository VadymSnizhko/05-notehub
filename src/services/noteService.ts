import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import {type Note} from '../types/note'

const BASE_URL = 'https://notehub-public.goit.study/api/notes';

export const fetchNotes = async(search: string):Promise<Note[]> => {
    const res = await axios.get(BASE_URL, {
    params: { search },
    headers: { Authorization: `Bearer ${import.meta.env.TOKEN_NOTEHUB}` },
  });
    return res.data;
}

export function createNote(){

}

export function deleteNote(){
    
}