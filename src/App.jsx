import { useState } from 'react';
import Toolbar from './components/Header/Toolbar.jsx';
import AddLanguageModal from './components/Header/AddLanguageModal.jsx';
import TableContainer from './components/Table/TableContainer.jsx';
import Toast from './components/common/Toast.jsx';
import { useTranslationStore } from './hooks/useTranslationStore.js';
import { downloadCsv } from './utils/csv.js';
import { LANGUAGE_BY_CODE } from './data/languages.js';

export default function App() {
  const {
    translations,
    languages,
    setTranslation,
    addLanguage,
    removeLanguage,
    getTranslation,
    getCompletion,
  } = useTranslationStore();

  const [query, setQuery] = useState('');
  const [addOpen, setAddOpen] = useState(false);
  const [toast, setToast] = useState('');

  const handleRemove = (code) => {
    const lang = LANGUAGE_BY_CODE[code];
    const name = lang?.name || code;
    if (window.confirm(`Remove ${name}? All translations for this language will be lost.`)) {
      removeLanguage(code);
      setToast(`${name} removed`);
    }
  };

  const handleDownload = () => {
    downloadCsv(languages, translations);
    setToast('CSV downloaded');
  };

  const handleAdd = (code) => {
    addLanguage(code);
    setToast(`${LANGUAGE_BY_CODE[code]?.name || code} added`);
  };

  return (
    <div className="h-full flex flex-col">
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        languageCount={languages.length}
        onAddLanguage={() => setAddOpen(true)}
        onDownloadCsv={handleDownload}
      />
      <TableContainer
        query={query}
        languages={languages}
        getTranslation={getTranslation}
        getCompletion={getCompletion}
        onCommit={setTranslation}
        onRemoveLanguage={handleRemove}
      />
      <footer className="border-t border-border-subtle px-8 py-3 text-xs text-fg-subtle font-serif italic flex flex-wrap items-center justify-between gap-2">
        <span>
          Released into the public domain under <span className="font-mono not-italic">CC0 1.0</span>.
          Compiled from OPUS, Microsoft Terminology, Apple Glossaries, Material Design, GNOME/KDE/Mozilla Pontoon, W3C ARIA, and Unicode CLDR.
        </span>
        <span className="smallcaps not-italic font-sans">colophon</span>
      </footer>
      <AddLanguageModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        activeCodes={languages}
        onAdd={handleAdd}
      />
      <Toast message={toast} onDismiss={() => setToast('')} />
    </div>
  );
}
