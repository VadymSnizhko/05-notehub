/*import css from './App.module.css'

function App() {

  return (
<div className={css.app}>
	<header className={css.toolbar}>
		//{ Компонент SearchBox }
		//{ Пагінація }
		//{ Кнопка створення нотатки }
  </header>
</div>
  )
}*/

/*import { useEffect } from 'react';
//import css from './App.module.css'
import { fetchNotes } from '../../services/noteService';


function App() {
  let message = '';
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchNotes({
          page: 1,
          search: '',
        });
        message = JSON.stringify(data);
      } catch (error) {
        console.info(error);
      }
    };

    getData();
  }, []);


  return <div>`mwssage: {message}`</div>;
}

export default App*/
/*
import { useEffect, useState } from 'react';
import { fetchNotes } from '../../services/noteService';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchNotes({
          page: 1,
          search: '',
        });

        setMessage(JSON.stringify(data));
      } catch (error) {
        setMessage('ERROR');
      }
    };

    getData();
  }, []);

  return <div>{message}</div>;
}

export default App;*/
/*
import { useEffect, useState } from 'react';
import { fetchNotes } from '../../services/noteService';
import type { Note } from '../../types/note';

import NoteList from '../NoteList/NoteList';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchNotes({
          page: 1,
          search: '',
        });

        setNotes(data.notes);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <NoteList notes={notes} />
    </div>
  );
}

export default App;*/
/*
import { useQuery } from '@tanstack/react-query';

import { fetchNotes } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';


function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes'],
    queryFn: () =>
      fetchNotes({
        page: 1,
        search: '',
      }),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  return (
    <div>
      {data && <NoteList notes={data.notes} />}
    </div>
  );
}

export default App;*/

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchNotes } from '../../services/noteService';

import NoteList from '../NoteList/NoteList';

//import ReactPaginate from 'react-paginate';

import Pagination from '../Pagination/Pagination';

import { useDebouncedCallback } from 'use-debounce';

import SearchBox from '../SearchBox/SearchBox';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '../../services/noteService';

import { deleteNote } from '../../services/noteService';

import Modal from '../Modal/Modal';

import type { CreateNote } from '../../types/note';

import NoteForm from '../NoteForm/NoteForm';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', currentPage, search],

    queryFn: () =>
      fetchNotes({
        page: currentPage,
        search,
      }),
  });

  const updateSearch = useDebouncedCallback(
  (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  },
  500
  );

  const mutation = useMutation({
  mutationFn: createNote,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['notes'],
    });
  },
});

const handleCreateNote = (
  values: CreateNote
) => {
  mutation.mutate(values);
};


const deleteMutation = useMutation({
  mutationFn: deleteNote,

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['notes'],
    });
  },
});

const handleDeleteNote = (
  noteId: string
) => {
  deleteMutation.mutate(noteId);
};

  const handlePageChange = (
    selectedItem: { selected: number }
  ) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  return (
    <div>

{isModalOpen && (
  <Modal
    onClose={() =>
      setIsModalOpen(false)
    }
  >
    <NoteForm
      onClose={() =>
        setIsModalOpen(false)
      }
      onSubmit={handleCreateNote}
    />
  </Modal>
)}

      <SearchBox value={search} onChange={updateSearch}/>
      <button  onClick={() => setIsModalOpen(true)}>Create note +</button>
      {data && <NoteList  notes={data.notes} onDelete={handleDeleteNote}/>}

      {data && data.totalPages > 1 && (
        <Pagination
          pageCount={data.totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          /*pageCount={data.totalPages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={handlePageChange}
          forcePage={currentPage - 1}
          previousLabel="<"
          nextLabel=">"*/
        />
      )}
    </div>
  );
}

export default App;