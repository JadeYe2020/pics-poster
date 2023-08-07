import { Storage, API, graphqlOperation } from "aws-amplify";
import { useState } from "react";
import { StyleSheet, View, Text, Pressable, Image, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../src/graphql/mutations";
import ThemePicker from "../components/ThemePicker";
import theme from "../theme";


const UploadScreen = ({ navigation }) => {
  const loggedInUser = useSelector(state => state.user);
  const themeMode = useSelector(state => state.themeMode);

  console.log("loggedInUser", loggedInUser);
  const [image, setImage] = useState(null);

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const uploadImage = (filename, img) => {
    return Storage.put(filename, img, {
      level: "public",
      contentType: "image/*",
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

  const createNewPost = async (uploadUrl) => {
    let result = null;
    try {
      const res = await API.graphql(graphqlOperation(createPost, { input: { img: uploadUrl, userID: loggedInUser.id } }));
      res && (result = res.data.createPost);
    } catch (error) {
      console.log("error from createNewPost()", error.errors[0].message);
    }
    return result;
  }

  const handleImagePicked = async (uri) => {
    try {
      if (!uri) {
        Alert.alert("Warning", "No image selected. Please retry.");
        return;
      } else {
        const filename = uri.slice(-16);
        const imgBlob = await fetchImageFromUri(uri);
        const uploadUrl = await uploadImage(filename, imgBlob);
        console.log("uploadUrl", uploadUrl);
        // create a new post with the stored file key and return to Posts screen
        const result = await createNewPost(uploadUrl);
        console.log("result from createNewPost", result);
        Alert.alert("Upload successfully");
        result && navigation.navigate("Posts");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Upload failed");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    // console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, themeMode === "DARK" && styles.darkModeContainer]}>
      <Text style={styles.title}>SavorHub</Text>
      <ThemePicker />
      <Text style={[styles.subtitle, { marginTop: 100 }]}>New Post</Text>
      {/* <Text>Email: {loggedInUser?.email}</Text> */}
      <View style={{ height: "50%" }}>
        {image ? <Image source={{ uri: image }} style={{ width: 400, height: 300 }} />
          : <View>
            <Text style={{ color: theme.colors.primary, fontSize: 20, textAlign: "center" }}>Image</Text>
            <Pressable style={[styles.button, { flex: 0 }]} onPress={pickImage} >
              <Text style={styles.buttonText}>Select</Text>
            </Pressable>
          </View>
        }
      </View>
      <View style={{ flexDirection: "row", gap: -20 }}>
        <Pressable style={styles.button} onPress={() => navigation.navigate("Posts")}>
          <Text style={styles.buttonText}>Go Back</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleImagePicked(image)}>
          <Text style={styles.buttonText}>Post</Text>
        </Pressable>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightBackground,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  darkModeContainer: {
    backgroundColor: theme.colors.darkBackground,
  },
  title: {
    position: "absolute",
    top: 50,
    color: theme.colors.primary,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  subtitle: {
    color: theme.colors.primary,
    fontSize: 30,
    alignSelf: "flex-start",
    margin: 20,
  },
  button: {
    flex: 1,
    margin: 20,
    backgroundColor: theme.colors.primary,
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