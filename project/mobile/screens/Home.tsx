import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-native";

interface Post {
  id: number;
  title: string;
  postText: string;
  username: string;
}

export default function Home() {
  const [listOfPosts, setListOfPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [limit, setLimit] = useState(3); // Change this value as per your requirement
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.2.7:3001/posts?page=${1}&limit=${limit}`
      );
      const newData = response.data;
      setListOfPosts(newData);

      return newData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Item = React.memo(({ value }: { value: Post }) => (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={1}
      onPress={() => {
        navigate("/post", { state: value?.id });
      }}
    >
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: `https://picsum.photos/id/${value?.id + 180}/200` }}
          resizeMode="contain"
          style={styles.profile}
        />
        <View style={{ paddingLeft: 10 }}>
          <Text style={styles.title}>{value?.username}</Text>
          <Text style={styles.username}>
            {moment(new Date()).format("LLLL")}
          </Text>
        </View>
      </View>
      <View style={{ width: "100%", marginBottom: 30 }}>
        <Text style={styles.title}>{value?.title}</Text>
        <Text style={styles.body}>{value?.postText}</Text>
        <Text style={styles.username}>Main Character: {value?.username}</Text>
      </View>
      <Image
        source={{ uri: `https://picsum.photos/id/${value?.id + 150}/200` }}
        resizeMode="cover"
        style={styles.image}
      />
    </TouchableOpacity>
  ));

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setLimit(3);
    setListOfPosts([{ id: 0, title: "", postText: "", username: "" }]);
    await fetchData().then(() => {
      setRefreshing(false);
    });
  }, []);

  const handleLoadMore = async () => {
    if (!loadingMore) {
      setLoadingMore(true);
      try {
        if (listOfPosts.length === limit) {
          setLimit(limit + 3);
        } else {
          await fetchData();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  const renderItem = ({ item }: { item: Post }) => <Item value={item} />;

  return (
    <SafeAreaView style={styles.safeareaview}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.hOne}>SUPER MOVIES</Text>
        </View>
        <FlatList
          data={listOfPosts}
          renderItem={renderItem}
          keyExtractor={(item: Post) => item?.id.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.flatlist}
          contentContainerStyle={{ alignItems: "center" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loadingMore ? <Text>Loading...</Text> : null}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeareaview: {
    flex: 1,
    backgroundColor: "maroon",
  },
  top: {
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
  },
  hOne: {
    fontFamily: "Helvetica-Bold",
    color: "maroon",
    fontSize: 24,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "lightcoral",
    alignItems: "center",
    justifyContent: "center",
  },
  flatlist: {
    flex: 1,
  },
  row: {
    width: Dimensions.get("screen").width * 0.85,
    backgroundColor: "#f8f8f8",
    padding: 20,
    marginVertical: 20,
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
  title: {
    fontFamily: "Helvetica-Bold",
    color: "green",
    fontSize: 16,
    textAlign: "left",
  },
  body: {
    fontFamily: "Helvetica",
    color: "black",
    fontSize: 14,
    textAlign: "left",
  },
  username: {
    fontFamily: "Helvetica",
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
});
