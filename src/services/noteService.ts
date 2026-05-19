import axios from 'axios';
//import { useMutation } from '@tanstack/react-query';
import {type Note, type CreateNote} from '../types/note'

const BASE_URL = 'https://notehub-public.goit.study/api/notes';
/*
export const fetchNotes = async(search: string):Promise<Note[]> => {
    const res = await axios.get(BASE_URL, {
    params: { search },
    headers: { Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}` },
  });
    return res.data;
}*/

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface FetchNotesParams {
  page: number;
  search: string;
}

export const fetchNotes = async ({
  page,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get<FetchNotesResponse>(BASE_URL, {
    params: {
      page,
      perPage: 12,
      search,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const createNote = async (
  newNote: CreateNote
): Promise<Note> => {
  const response = await axios.post<Note>(BASE_URL, newNote, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });

  return response.data;
};

export const deleteNote = async (
  noteId: string
): Promise<Note> => {
  const response = await axios.delete<Note>(
    `${BASE_URL}/${noteId}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    }
  );

  return response.data;
};