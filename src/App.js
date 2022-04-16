import React from 'react';
import { ThemeProvider } from 'styled-components';

import QuestionnairePage from './pages/questionnaire/QuestionnairePage';
import { theme } from './common/theme';

import './App.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <main>
          <QuestionnairePage />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
