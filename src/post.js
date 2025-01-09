import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchAllPosts, searchPosts} from './Redux/slices/dataSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ListItem = ({item, navigation}) => (
  <TouchableOpacity
    onPress={() => navigation.navigate('postDetail', {id: item?.id})}
    style={{marginRight: 20, width: 290, flex: 1, height: '100%'}}>
    <View
      style={{
        height: 176,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 12,
      }}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-photo/toy-bricks-table-with-word-my-blog_144627-47466.jpg?t=st=1736419043~exp=1736422643~hmac=47e5ba8fe3e772458917452be6ce80982f9db9d7bfe355cb9bde914c22f306f6&w=1800',
        }}
        style={{height: '100%', width: '100%'}}
        resizeMode="stretch"
      />
    </View>
    <Text style={styles.listMainText}>{item?.title}</Text>
    <Text numberOfLines={2}>{item?.body}</Text>
  </TouchableOpacity>
);

const FilterList = () => (
  <View style={styles.filterComponent}>
    <Text>filterComponent</Text>
  </View>
);

const ItemList = () => (
  <View style={styles.listView}>
    <View
      style={{
        height: '100%',
        width: 96,
        borderRadius: 16,
        marginRight: 12,
        overflow: 'hidden',
      }}>
      <Image
        source={{
          uri: 'https://img.freepik.com/free-photo/networking-media-sharing-icons-graphic-concept_53876-120836.jpg?t=st=1736409129~exp=1736412729~hmac=633eb8e3c4f5f0b02eb0800b9486b63e903f9074aa952d4b7c69d94247374bbe&w=1380',
        }}
        style={{height: '100%', width: '100%'}}
      />
    </View>
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
        <Text>Technology</Text>
        <Text>jan 4,2024</Text>
      </View>
      <View>
        <Text style={styles.listMainText}>
          Augmented Reality Trends for 2022
        </Text>
      </View>
    </View>
  </View>
);

const Divider = () => (
  <View style={{height: 1, backgroundColor: '#3031360D'}} />
);

const SearchHeader = ({searchQuery, handleSearch, toggleModal}) => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
      marginTop: 20,
    }}>
    <View style={styles.textInputContainer}>
      <IonIcon name="search" size={20} color="black" style={styles.leftIcon} />
      <TextInput
        placeholder="Search"
        style={styles.textInput}
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.rightIcon} onPress={toggleModal}>
        <AntDesign name="filter" size={24} color="#2C2C2C" />
      </TouchableOpacity>
    </View>
    <View
      style={{
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <MaterialIcons
        name="notifications-none"
        size={32}
        color="#2C2C2C"
        style={styles.rightIcon}
      />
    </View>
  </View>
);

const FilterModal = ({modalVisible, toggleModal, handleOrderChange}) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={toggleModal}>
    <View style={styles.modalBackground}>
      <View style={styles.modalContainer}>
        <View
          style={{
            height: 50,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <TouchableOpacity onPress={toggleModal}>
            <MaterialIcons name="arrow-back" size={32} color="#2C2C2C" />
          </TouchableOpacity>
          <Text style={{fontSize: 18, color: '#303136', fontWeight: '700'}}>
            Filter by
          </Text>
          <Text style={{fontSize: 14, color: '#5143D9', fontWeight: '600'}}>
            Done
          </Text>
        </View>
        <TouchableOpacity onPress={() => handleOrderChange('asc')}>
          <Text style={styles.modalText}>Ascending</Text>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={() => handleOrderChange('desc')}>
          <Text style={styles.modalText}>Descending</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const Post = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {posts, searchResults, loading} = useSelector(state => state.post);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    dispatch(fetchAllPosts({order: sortOrder}));
  }, [dispatch, sortOrder]);

  useEffect(() => {
    dispatch(searchPosts({query: searchQuery, order: sortOrder}));
  }, [searchQuery, dispatch]);

  const handleOrderChange = order => {
    setSortOrder(order);
    dispatch(fetchAllPosts(order));
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  return (
    <ScrollView style={styles.mainContainer}>
      <SearchHeader
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        toggleModal={toggleModal}
      />
      <Text style={styles.headerText}>Recommended</Text>
      <View style={styles.horizontalList}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={searchQuery ? searchResults : posts}
          contentContainerStyle={{paddingLeft: 16}}
          ListEmptyComponent={() => (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No posts available</Text>
            </View>
          )}
          ListHeaderComponent={
            loading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
              </View>
            ) : null
          }
          renderItem={({item}) => (
            <ListItem item={item} navigation={navigation} />
          )}
        />
      </View>
      <Divider />
      <View style={{marginVertical: 24}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{paddingLeft: 16}}
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={({item, index}) => (
            <FilterList item={item} index={index} />
          )}
        />
      </View>
      <FlatList
        data={[1, 2, 3, 4, 5]}
        contentContainerStyle={{paddingHorizontal: 16}}
        renderItem={({item}) => <ItemList item={item} />}
      />
      <FilterModal
        modalVisible={modalVisible}
        toggleModal={toggleModal}
        handleOrderChange={handleOrderChange}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    flex: 1,
    backgroundColor: '#d8d8d8',
    marginHorizontal: 16,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#d8d8d8',
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  leftIcon: {},
  rightIcon: {
    position: 'absolute',
    right: 15,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    marginHorizontal: 16,
    color: '#2C2C2C',
    lineHeight: 32,
    marginBottom: 8,
  },
  horizontalList: {
    height: 271,
    marginBottom: 24,
  },
  listMainText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2C2C2C',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
    marginBottom: 24,
  },
  filterComponent: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#828282',
    marginRight: 8,
  },
  listView: {
    height: 79,
    width: '100%',
    marginBottom: 16,
    flexDirection: 'row',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    height: 250,
    width: '100%',
    padding: 20,
    backgroundColor: 'white',
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginVertical: 8,
    color: 'black',
  },
});

export default Post;
