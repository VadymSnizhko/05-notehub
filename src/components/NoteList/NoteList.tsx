import { fetchNotes } from '../../services/noteService';
import { useQuery } from '@tanstack/react-query';
import {type Note } from '../../types/note';
import css from './NoteList.module.css';

const NotesList = () => {
    const { data: notes, isSuccess } = useQuery({
      queryKey: ['notes'],
      queryFn: fetchNotes,
      placeholderData: [],
    });
  
    if (!isSuccess || !notes || notes.length === 0) return null;
  
    return (
      <ul className={css.list}>
        {notes.map((note: Note) => (
          <li key={note.id} className={css.listItem}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <button className={css.button}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default NotesList;