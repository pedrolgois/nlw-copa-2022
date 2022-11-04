import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

// Provider
import { AuthContextProvider } from "./src/contexts/AuthContext";

import { NativeBaseProvider, StatusBar } from "native-base";
import { Loading } from "./src/components/Loading";

import { Routes } from "./src/routes";

// Estilização
import { theme } from "./src/styles/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  return (
    <NativeBaseProvider theme={theme}>
      <AuthContextProvider>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={"transparent"}
          translucent
        />
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
