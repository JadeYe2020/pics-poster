import { StyleSheet, View, Text, Pressable } from "react-native";
import { useSelector, useDispatch } from "react-redux";

const UploadScreen = ({ navigation }) => {
  const loggedInUser = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>New Post</Text>
      <Text>Email: {loggedInUser?.email}</Text>
      <View style={{ height: "50%" }}>
        <Text style={{ color: "green", fontSize: 20, textAlign: "center" }}>Image</Text>
        <Pressable style={[styles.button, { flex: 0 }]}>
          <Text style={styles.buttonText}>Select</Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: "row", gap: -20 }}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Posts")}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Post</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  subtitle: {
    color: "green",
    fontSize: 30,
    alignSelf: "flex-start",
    margin: 20,
  },
  button: {
    flex: 1,
    margin: 20,
    backgroundColor: "green",
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});

export default UploadScreen;