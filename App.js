/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React, {useState} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   FlatList,
   TextInput,
   Button,
   TouchableHighlight
 } from 'react-native';
 import { SearchBar } from 'react-native-elements';
 import Icon from 'react-native-vector-icons/FontAwesome';
 import Modal from "react-native-modal";

 let allTasks = [];
 const App = () => {

    const generateUUID = () => { // Public Domain/MIT
      var d = new Date().getTime();//Timestamp
      var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16;//random number between 0 and 16
          if(d > 0){//Use timestamp until depleted
              r = (d + r)%16 | 0;
              d = Math.floor(d/16);
          } else {//Use microseconds since page-load if supported
              r = (d2 + r)%16 | 0;
              d2 = Math.floor(d2/16);
          }
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    };

    //{ id: string, name: string, state: 'todo' | 'doing' | 'completed' }
    const [tasks, setTasks] = useState(allTasks);
    const [search, setSearch] = useState('');
    const [taskName, setTaskName] = useState('');
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [isModalVisible, setModalVisible] = useState(false);
    const [editId, setEditId] = useState('');

    const openModal = (id) => {
      setModalVisible(!isModalVisible);
      setEditId(id);
    };

    const closeModal = (option) => {

      allTasks = allTasks.map(item => {
            var temp = Object.assign({}, item);
            if (temp.id === editId) {
                temp.state = option;
            }
            return temp;
        });

        setModalVisible(!isModalVisible);
        setTasks(allTasks);
        forceUpdate();
    };

    const updateSearch = (search) => {
      setSearch(search);
      setTasks(allTasks.filter(t => t.name.includes(search)));
      forceUpdate();
    };

    const addTask = (name) => {
      allTasks.push({ id: generateUUID(), name, state:'todo' });
      setTasks(allTasks);
      setTaskName('')
      forceUpdate();
    };

    const deleteTask = (id) => {
      var index = allTasks.map(x => {
        return x.id;
      }).indexOf(id);
      
      allTasks.splice(index, 1);

      setTasks(allTasks);
      forceUpdate();
    };
 
    return (
            <SafeAreaView style={styles.container}>
              <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={search}
              />

              <View style={styles.addFieldStyle}>
                <View style={{flex:4}}>
                  <TextInput
                      onChangeText = {(textEntry) => {setTaskName(textEntry)}}
                      style={{backgroundColor:'transparent'}}
                      value={taskName}
                    />
                </View>
                <View style={{flex:1}}>
                  <Button title='Add' onPress={ () => addTask(taskName) }>
                  </Button>
                </View>
              </View>


              <Modal isVisible={isModalVisible}>
              <View style={styles.centered}>
                <Text style={styles.title}>Change the Task Status</Text>
                <Button title="ToDo" onPress={ () => closeModal('ToDo')} />
                <Button title="Doing" onPress={ () => closeModal('Doing')} />
                <Button title="Completed" onPress={ () => closeModal('Completed')} />
              </View>
              </Modal>


            <FlatList
                data={tasks}
                keyExtractor={(item, index) => item.id}
                renderItem={(rowData) => <View style={styles.containerTasks}>
                                          <Text style={styles.titleTasks}>{rowData.item.name}</Text>
                                          <Text style={styles.titleTasks}>{rowData.item.state}</Text>
                                            <View style={styles.cardButtonsStyle}>
                                              <View>
                                                <TouchableHighlight onPress={()=>{deleteTask(rowData.item.id)}}>
                                                    <View>
                                                      <Icon name="trash" size={30} color="#900" />
                                                    </View>
                                                </TouchableHighlight>
                                              </View>
                                              <View style={{paddingLeft:10}}>
                                                <TouchableHighlight onPress={()=>{openModal(rowData.item.id)}}>
                                                    <View>
                                                      <Icon name="edit" size={30} color="#900" />
                                                    </View>
                                                </TouchableHighlight>
                                              </View>
                                          </View>
                                        </View>
                }
                ListHeaderComponent={() => (!tasks.length ? <Text style={styles.emptyMessageStyle}>The To Do List is empty</Text>  : null)}
              />
            </SafeAreaView>
    );
 };
 
const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  containerTasks: {
    backgroundColor: 'orange',
    height: 100,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  titleTasks: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  emptyMessageStyle: {
    textAlign: 'center',
  },
  addFieldStyle: {
    flexDirection:'row', width: window.width, margin: 10, padding:4, alignItems:'center', justifyContent:'center', borderWidth:4, borderColor:'#888', borderRadius:10, backgroundColor:'#fff'
  },
  cardButtonsStyle: {
    flexDirection:'row',  alignItems:'center', justifyContent:'center'
  },
  centered: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: 100,
    marginBottom: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
});

export default App;