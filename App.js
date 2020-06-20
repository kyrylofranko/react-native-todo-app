import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { loadFonts } from "./src/helpers/loadFonts";
import { TodoState } from "./src/context/todo/TodoState";
import { ScreenState } from "./src/context/screen/ScreenState";
import { MainLayout } from "./src/MainLayout";


export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <AppLoading
      startAsync={loadFonts}
      onError={() => 'Error'}
      onFinish={() => setIsReady(true)}
    />;
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
};


