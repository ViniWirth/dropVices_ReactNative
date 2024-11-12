import { Tabs } from "expo-router";

export default function TabsRoutesCentral() {
  return (
    <Tabs
      screenOptions={() => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
        },
      })}
    >
      <Tabs.Screen name="exibicaoValor" />
      <Tabs.Screen name="metodos" />
      <Tabs.Screen name="home" />
    </Tabs>
  );
}
