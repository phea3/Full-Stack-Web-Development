import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useLocation, useNavigate } from "react-router-native";

export default function Post() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;
  const [postObject, setPostObject] = useState<any>({});
  const [comments, setComments] = useState<{ commentBody: string }[]>([]);

  const [newComment, setNewComment] = useState("");
  const [limit, setLimit] = useState(3);

  const handleInputChange = (text: any) => {
    setNewComment(text);
  };

  useEffect(() => {
    axios.get(`http://192.168.2.7:3001/posts/byId/${id}`).then((res) => {
      setPostObject(res?.data);
    });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://192.168.2.7:3001/comments/${id}/limited/${limit}`)
      .then((res) => {
        setComments(res?.data);
      });
  }, [id, limit]);

  const addComment = () => {
    axios
      .post("http://192.168.2.7:3001/comments", {
        commentBody: newComment,
        PostId: id,
      })
      .then((res) => {
        const commentToAdd: { commentBody: string } = {
          commentBody: newComment,
        };
        setComments([...comments, commentToAdd]);
        setNewComment("");
      });
  };

  return (
    <SafeAreaView style={styles.safeareaview}>
      <KeyboardAvoidingView
        style={styles.keyboardavoidingview}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View style={styles.top}>
            <TouchableOpacity
              onPress={() => {
                navigate("/");
              }}
            >
              <Text style={styles.back}> {"<"} Back</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.bodyContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.row}>
              <View style={styles.profileContainer}>
                <Image
                  source={{ uri: `https://picsum.photos/id/${id + 180}/200` }}
                  resizeMode="contain"
                  style={styles.profile}
                />
                <View style={{ paddingLeft: 10 }}>
                  <Text style={styles.title}>{postObject?.username}</Text>
                  <Text style={styles.username}>
                    {moment(new Date()).format("LLLL")}
                  </Text>
                </View>
              </View>
              <View style={{ width: "100%", marginBottom: 30 }}>
                <Text style={styles.title}>{postObject?.title}</Text>
                <Text style={styles.body}>{postObject?.postText}</Text>
                <Text style={styles.username}>
                  Main Character: {postObject?.username}
                </Text>
              </View>
              <Image
                source={{
                  uri: `https://picsum.photos/id/${postObject?.id + 150}/200`,
                }}
                resizeMode="cover"
                style={styles.image}
              />
            </View>
            <View style={styles.comment}>
              <View style={styles.commentInput}>
                <TextInput
                  onChangeText={handleInputChange}
                  value={newComment}
                  placeholder="Type something..."
                  style={styles.commentText}
                />
              </View>
              <TouchableOpacity style={styles.submit} onPress={addComment}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
            </View>
            {comments.map((comment, key) => {
              return (
                <View style={styles.listOfComments} key={key}>
                  <View style={styles.profileContainer}>
                    <Image
                      source={{
                        uri: `https://picsum.photos/id/${key + 180}/200`,
                      }}
                      resizeMode="contain"
                      style={styles.profile}
                    />
                    <View style={{ paddingLeft: 10 }}>
                      <Text style={styles.title}>{postObject?.username}</Text>
                      <Text style={styles.username}>
                        {moment(new Date()).format("LLLL")}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.commentTextList}>
                    {comment.commentBody}
                  </Text>
                </View>
              );
            })}
            {comments.length === limit && (
              <TouchableOpacity
                style={styles.seemore}
                onPress={() => {
                  if (comments.length === limit) {
                    setLimit(limit + 3);
                  }
                }}
              >
                <Text style={styles.submitText}>See more...</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: "azure",
    paddingTop: Platform.OS === "android" ? 35 : 0, // Adjust this value as needed
  },
  keyboardavoidingview: {
    flex: 1,
  },
  top: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
  },
  bodyContainer: {
    backgroundColor: "azure",
    flex: 1,
    paddingTop: 10,
  },
  back: {
    color: "maroon",
    fontSize: 14,
    textAlign: "left",
  },
  container: {
    flex: 1,
    backgroundColor: "azure",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    width: Dimensions.get("screen").width * 0.85,
    backgroundColor: "#f8f8f8",
    padding: 20,
    marginHorizontal: 20,
    borderColor: "maroon",
    borderWidth: 2,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  comment: {
    width: Dimensions.get("screen").width * 0.85,
    marginVertical: 20,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  commentInput: {
    width: "70%",
    backgroundColor: "#f8f8f8",
    borderColor: "maroon",
    borderWidth: 2,
    padding: 20,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
  commentText: {
    color: "black",
    fontSize: 14,
    textAlign: "left",
  },
  commentTextList: {
    color: "black",
    fontSize: 14,
    textAlign: "left",
  },
  submit: {
    width: "30%",
    backgroundColor: "deepskyblue",
    borderColor: "maroon",
    borderWidth: 2,
    padding: 20,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    alignItems: "center",
  },
  seemore: {
    width: "100%",
    backgroundColor: "deepskyblue",
    borderColor: "maroon",
    borderWidth: 2,
    padding: 10,
    marginBottom: 20,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontSize: 14,
  },
  title: {
    color: "green",
    fontSize: 16,
    textAlign: "left",
  },
  body: {
    color: "black",
    fontSize: 14,
    textAlign: "left",
  },
  username: {
    color: "darkslategrey",
    fontSize: 12,
    textAlign: "left",
  },
  image: {
    width: "90%",
    height: 250,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "navy",
  },
  profileContainer: {
    width: "100%",
    flexDirection: "row",
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "orange",
    marginBottom: 10,
  },
  listOfComments: {
    width: Dimensions.get("screen").width * 0.85,
    backgroundColor: "#f8f8f8",
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 20,
    borderColor: "maroon",
    borderWidth: 2,
    borderRadius: 60,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
  },
});
