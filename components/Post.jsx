import { StyleSheet, View, Text, Pressable, FlatList, Image, ActivityIndicator } from "react-native";
import { Storage, API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import theme from "../theme";

const Post = ({ item, themeMode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const downloadImage = async () => {
    setIsLoading(true);
    const result = await Storage.get(item.img)
    // console.log("result", result);
    if (result) {
      setImage(result);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    downloadImage();
  }, [])

  const dateTime = new Date(item.createdAt);
  const formated = dateTime.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  })

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>{item.author.email}</Text>
      <Text style={themeMode === "DARK" && styles.textInDark}>{formated}</Text>
      {!isLoading ?
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        : <ActivityIndicator color="green" />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,  
    BorderColor: "grey",
  },
  emailText: {
    color: theme.colors.primary,
  },
  textInDark: {
    color: theme.colors.textInDark
  },
});

export default Post;