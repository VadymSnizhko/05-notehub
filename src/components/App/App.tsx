import css from './App.module.css'
import NotesList from '../NoteList/NoteList';

function App() {

  return (
<div className={css.app}>
	<header className={css.toolbar}>
		{/* Компонент SearchBox */}
		{/* Пагінація */}
		{/* Кнопка створення нотатки */}
		<NotesList />
  </header>
</div>
  )
}

export default App