import { Tabs } from "expo-router";

export default function TabRoutesLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}
    >
      <Tabs.Screen
        name="welcome"
        options={{
          title: "Tela de bem-vindo",
        }}
      />

      <Tabs.Screen
        name="loading screen"
        options={{
          title: "Tela de carregamento",
        }}
      />

      <Tabs.Screen
        name="start"
        options={{
          title: "Início",
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
        }}
      />

      <Tabs.Screen
        name="register"
        options={{
          title: "Registro",
        }}
      />
    </Tabs>
  );
}
