import React from "react";
import { registerRootComponent } from "expo";
import AppNavigator from "./src/navigation/AppNavigator";

// ✅ Define the component first
const App = () => {
  return <AppNavigator />;
};

// ✅ Register it after definition
registerRootComponent(App);

// ✅ Export it too (optional for testing or tools)
export default App;
