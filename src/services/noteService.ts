import axios from 'axios';
import {type Note, type CreateNoteDto} from '../types/note'

const BASE_URL = 'https://notehub-public.goit.study/api/notes';

export function fetchNotes = async(search = ''): Promise<Note[]> => {
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