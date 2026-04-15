import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_LANGUAGES } from '../data/languages.js';

const STORAGE_KEY_TRANSLATIONS = 'openlang:translations';
const STORAGE_KEY_LANGUAGES = 'openlang:active_languages';
const SAVE_DEBOUNCE_MS = 300;

function loadInitial() {
  if (typeof window === 'undefined') {
    return { translations: {}, languages: [...DEFAULT_LANGUAGES] };
  }
  let translations = {};
  let languages = [...DEFAULT_LANGUAGES];
  try {
    const t = window.localStorage.getItem(STORAGE_KEY_TRANSLATIONS);
    if (t) translations = JSON.parse(t);
    const l = window.localStorage.getItem(STORAGE_KEY_LANGUAGES);
    if (l) {
      const parsed = JSON.parse(l);
      if (Array.isArray(parsed) && parsed.length > 0) languages = parsed;
    }
  } catch {
    // ignore corrupted storage
  }
  return { translations, languages };
}

export function useTranslationStore() {
  const initial = useRef(loadInitial());
  const [translations, setTranslations] = useState(initial.current.translations);
  const [languages, setLanguages] = useState(initial.current.languages);

  const saveTimer = useRef(null);
  useEffect(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      try {
        window.localStorage.setItem(STORAGE_KEY_TRANSLATIONS, JSON.stringify(translations));
        window.localStorage.setItem(STORAGE_KEY_LANGUAGES, JSON.stringify(languages));
      } catch {
        // storage may be full / disabled — fail silent
      }
    }, SAVE_DEBOUNCE_MS);
    return () => clearTimeout(saveTimer.current);
  }, [translations, languages]);

  const setTranslation = useCallback((langCode, term, value) => {
    setTranslations((prev) => {
      const next = { ...prev };
      const langMap = { ...(next[langCode] || {}) };
      const trimmed = value.trim();
      if (trimmed === '') {
        delete langMap[term];
      } else {
        langMap[term] = trimmed;
      }
      next[langCode] = langMap;
      return next;
    });
  }, []);

  const addLanguage = useCallback((langCode) => {
    setLanguages((prev) => (prev.includes(langCode) ? prev : [...prev, langCode]));
  }, []);

  const removeLanguage = useCallback((langCode) => {
    setLanguages((prev) => prev.filter((c) => c !== langCode));
    setTranslations((prev) => {
      const next = { ...prev };
      delete next[langCode];
      return next;
    });
  }, []);

  const reorderLanguages = useCallback((fromIndex, toIndex) => {
    setLanguages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }, []);

  const getTranslation = useCallback(
    (langCode, term) => translations[langCode]?.[term] || '',
    [translations]
  );

  const getCompletion = useCallback(
    (langCode, totalTerms) => {
      const filled = Object.keys(translations[langCode] || {}).length;
      return totalTerms ? Math.min(1, filled / totalTerms) : 0;
    },
    [translations]
  );

  return {
    translations,
    languages,
    setTranslation,
    addLanguage,
    removeLanguage,
    reorderLanguages,
    getTranslation,
    getCompletion,
  };
}
