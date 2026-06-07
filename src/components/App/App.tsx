import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '../../services/noteService';

import NoteList from '../NoteList/NoteList';

import Pagination from '../Pagination/Pagination';

import SearchBox from '../SearchBox/SearchBox';

import Modal from '../Modal/Modal';

import NoteForm from '../NoteForm/NoteForm';

import css from './App.module.css'

function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const { data, isLoading, isError } =
    useQuery({
      queryKey: [
        'notes',
        currentPage,
        search,
      ],

      queryFn: () =>
        fetchNotes({
          page: currentPage,
          search,
        }),

      placeholderData: previousData =>
        previousData,
    });

 // const [search,updateSearch] = useState<string>("")

  const updateSearch =
    useDebouncedCallback(
      (value: string) => {
        setSearch(value);

        setCurrentPage(1);
      },
      50
    );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  return (
    <div>
      <div className={css.toolbar}>
      <SearchBox
        value={search}
        onChange={updateSearch}
      />

      {data &&
        data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={
              setCurrentPage
            }
          />
        )}      

      <button
        onClick={() =>
          setIsModalOpen(true)
        }
        className={css.button}
      >
        Create note +
      </button>        
      </div>


      {data && (
        <NoteList notes={data.notes} />
      )}



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
          />
        </Modal>
      )}
    </div>
  );
}

export default App;