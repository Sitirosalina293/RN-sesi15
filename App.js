import React from 'react';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';

const size = Dimensions.get('window').width / 2;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/');
        const json = await response.json();
        setData(d => [...d, ...json.results]);
      } catch (error) {}
    };

    fetchUsers();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Customers</Text>
      </View>
      <ScrollView>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Image
                style={styles.image}
                source={{uri: item.picture.thumbnail}}
              />
              <View style={styles.itemText}>
                <Text style={styles.title}>
                  {`${item.name.title} ${item.name.first} ${item.name.last}`}
                </Text>

                <Text style={styles.titleSub}>
                  {`${item.location.street.number} ${item.location.street.name} ${item.location.city} ${item.location.state}`}
                </Text>

                <Text style={styles.titleSub}>{item.email}</Text>
              </View>
            </View>
          )}
          numColumns={2}
        />
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
  },
  header: {
    backgroundColor: 'transparant',
    padding: 15,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: '#C2B8A3',
  },
  item: {
    flex: 1,
    margin: 4,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
  },

  image: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  itemText: {
    padding: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
  },

  title: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  titleSub: {
    fontSize: 9,
  },
});

export default App;
