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
  const formatedDate = dateTime.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formatedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  })

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.emailText}>{item.author.email}</Text>
        <Text style={themeMode === "DARK" && styles.textInDark}>{formatedDate}</Text>
        <Text style={themeMode === "DARK" && styles.textInDark}>{formatedTime}</Text>
      </View>
      {!isLoading ?
        <Image source={{ uri: image }} style={{ width: 80, height: 60, alignSelf: "flex-end" }} />
        : <ActivityIndicator color="green" />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "grey",
    margin: 5,
    padding: 10,
    width: "auto",
  },
  emailText: {
    color: theme.colors.primary,
    fontSize:18,
  },
  textInDark: {
    color: theme.colors.textInDark
  },
});

export default Post;