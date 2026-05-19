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

import { useEffect } from 'react';
//import css from './App.module.css'
import { fetchNotes } from '../../services/noteService';

/*
function App() {
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchNotes({
          page: 1,
          search: '',
        });

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  return <div>NoteHub</div>;
}

export default App*/

function App() {
  useEffect(() => {
	console.log('USE EFFECT WORK');
    const getData = async () => {
      try {
        const data = await fetchNotes({
          page: 1,
          search: '',
        });

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  console.log('App render');
  return <div>NoteHub01</div>;
}

export default App;