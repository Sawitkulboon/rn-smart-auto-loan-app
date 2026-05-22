import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/input");
    }, 3000);

    return () => { clearTimeout(timer);
    };
  }, []);
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/splass.png")} style={{ width: 200, height: 200, marginBottom: 20 }} />
      <Text style={styles.txtAppname}>Smart Auto Loan</Text>
      <Text style={styles.txtAppname2}>วางแผนออกรถฉบับมือโปร</Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#37288d",
    alignItems: "center",
    justifyContent: "center",
  },
  txtAppname: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  txtAppname2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
});