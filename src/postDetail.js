// src/screens/PostDetail.js
import React, {useEffect} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {fetchPostDetail} from './Redux/slices/dataSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = ({onBackPress}) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={onBackPress}>
      <MaterialIcons name="arrow-back" size={32} color="#2C2C2C" />
    </TouchableOpacity>
  </View>
);

const PostImage = ({imageUri}) => (
  <View style={styles.imageContainer}>
    <Image source={{uri: imageUri}} style={styles.image} />
  </View>
);

const PostContent = ({title, body}) => (
  <View style={styles.contentContainer}>
    <Text style={styles.titleText}>{title}</Text>
    <Text style={styles.bodyText}>{body}</Text>
  </View>
);

const PostDetail = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const {id} = route.params;

  const {postDetail, loading, error} = useSelector(state => state.post);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostDetail(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Header onBackPress={() => navigation.goBack()} />
      <PostImage imageUri="https://img.freepik.com/free-photo/networking-media-sharing-icons-graphic-concept_53876-120836.jpg?t=st=1736409129~exp=1736412729~hmac=633eb8e3c4f5f0b02eb0800b9486b63e903f9074aa952d4b7c69d94247374bbe&w=1380" />
      <PostContent title={postDetail.title} body={postDetail.body} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  imageContainer: {
    height: 204,
    width: '100%',
    marginBottom: 14,
    borderRadius: 16,
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2C2C2C',
    marginBottom: 10,
  },
  bodyText: {
    fontSize: 16,
    color: '#2C2C2C',
  },
});

export default PostDetail;
