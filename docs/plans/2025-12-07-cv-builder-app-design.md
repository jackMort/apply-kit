# CV Builder App — Design Document

**Data:** 2025-12-07
**Status:** Zatwierdzony

## Podsumowanie

Aplikacja webowa do generowania CV i listów motywacyjnych z dynamicznymi szablonami, formularzem wizard i wsparciem wielojęzycznym.

## Tech Stack

- **React 18 + Vite** — framework + bundler
- **TypeScript** — typowanie
- **Tailwind CSS** — stylowanie
- **react-i18next** — internacjonalizacja
- **Zustand** — state management
- **React Hook Form + Zod** — formularze z walidacją

## Struktura projektu

```
src/
├── components/           # UI komponenty (Button, Input, Card, ProgressBar)
├── features/
│   ├── wizard/           # Kroki formularza (6 kroków)
│   ├── templates/        # Szablony CV (5 designów)
│   └── cover-letter/     # Generator listu motywacyjnego
├── hooks/                # Custom hooks (useLocalStorage, useExport)
├── i18n/
│   ├── locales/          # Pliki tłumaczeń (pl.json, en.json, ...)
│   └── i18n.ts           # Konfiguracja
├── types/                # TypeScript interfaces
├── utils/                # Helpers
└── store/                # Zustand store
```

## Model danych

```typescript
interface CVData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    photo?: string; // base64
  };
  education: Array<{
    id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
    description?: string;
  }>;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    duties: string[];
  }>;
  skills: {
    hard: string[];
    soft: string[];
  };
  courses: string[];
  languages: Array<{
    name: string;
    level: string;
  }>;
}

interface CoverLetterData {
  position: string;
  company?: string;
  jobDescription?: string;
  content: string;
}

interface ExportData {
  version: string;
  exportedAt: string;
  cv: CVData;
  coverLetter?: CoverLetterData;
  selectedTemplate: string;
  language: string;
}
```

## Wizard — przepływ

| Krok | Nazwa | Pola |
|------|-------|------|
| 1 | Dane osobowe | imię, email, telefon, miejscowość, zdjęcie |
| 2 | Wykształcenie | lista: uczelnia, kierunek, daty, opis |
| 3 | Doświadczenie | lista: firma, stanowisko, daty, obowiązki |
| 4 | Umiejętności | tagi: twarde + miękkie |
| 5 | Kursy i języki | lista kursów + języki z poziomem |
| 6 | Wybór szablonu | siatka z podglądem 5 szablonów |

**Nawigacja:**
- Progress bar na górze (klikalne kropki)
- Przyciski Wstecz/Dalej
- Walidacja przy przejściu

## Szablony CV

| ID | Nazwa | Opis |
|----|-------|------|
| modern | Nowoczesny | Dwukolumnowy, akcent teal, timeline |
| classic | Klasyczny | Jednokolumnowy, czarno-biały |
| minimal | Minimalistyczny | Dużo białej przestrzeni, subtelny |
| creative | Kreatywny | Kolorowy nagłówek, ikony, fioletowy |
| professional | Profesjonalny | Ciemny sidebar, granatowy akcent |

Każdy szablon to osobny komponent React + dedykowane style druku.

## List motywacyjny

**Mini-wizard (3 kroki):**
1. Stanowisko — nazwa, firma, treść ogłoszenia (opcjonalnie)
2. Treść — edytor z podpowiedziami (`{imie}`, `{wyksztalcenie}`, etc.)
3. Podgląd — gotowy list w stylu CV

**Szablony treści:**
- Ogólny
- Pierwsza praca (student)
- Doświadczony

Automatyczna klauzula RODO.

## Zapis danych

**localStorage:**
- Klucz: `cv-builder-data`
- Automatyczny zapis (debounced 500ms)
- Odczyt przy starcie

**Eksport/Import:**
- Przycisk "Eksportuj" → `cv-backup-YYYY-MM-DD.json`
- Przycisk "Importuj" → file picker → walidacja
- Wersjonowanie dla kompatybilności

## Drukowanie

- Zoptymalizowany print CSS dla każdego szablonu
- Przycisk "Drukuj" → window.print()
- Użytkownik zapisuje jako PDF przez przeglądarkę (Ctrl+P)

## Wielojęzyczność (i18n)

**Obsługiwane języki:**
- Polski (domyślny)
- Angielski
- Łatwe dodawanie kolejnych

**Zakres:**
- UI aplikacji
- Nazwy sekcji CV
- Placeholdery
- Komunikaty walidacji

**Przełącznik:** dropdown w headerze z flagami

## Ekrany aplikacji

1. **Start** — wybór: nowe CV / wczytaj dane
2. **Wizard** — 6 kroków formularza
3. **Podgląd CV** — render wybranego szablonu z danymi
4. **List motywacyjny** — 3 kroki mini-wizarda
5. **Podgląd listu** — gotowy list do druku

## Kolejne kroki

1. Inicjalizacja projektu (Vite + React + TS)
2. Konfiguracja Tailwind + struktura folderów
3. Implementacja komponentów UI
4. Implementacja wizarda (6 kroków)
5. Implementacja 5 szablonów CV
6. System zapisu (localStorage + export/import)
7. Generator listu motywacyjnego
8. i18n (polski + angielski)
9. Testy i polish
