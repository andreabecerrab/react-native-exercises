import React from 'react';
import { Keyboard, StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

//class for banner display
class Banner extends React.Component {
  render() {
    return (
      <View style={styles.banner}>
        <Text style={styles.bannerText}>ToDo - Exercise 01</Text>
      </View>
    )
  }
}

//class for ListItem
class ListItem extends React.Component {

  //functions
  deleteToDoItem = (index) => {
    this.props.deleteToDoItem(index);
  }


  render() {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemText}>* {this.props.text}</Text>
        <Text style={styles.listItemDelete}
          onPress={(e) => this.deleteToDoItem(this.props.index)}>X</Text>
      </View>
    )
  }
}

//class for List 
class ToDoList extends React.Component {

  //adding constructor
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
  }

  //functions
  addToDoItem = () => {
    if (this.state.text !== ' ') {
      this.setState({
        items: [...this.state.items, this.state.text],
        text: ''
      });
      Keyboard.dismiss();
    }
  }

  deleteToDoItem = (index) => {
    var items = this.state.items;
    items.splice(index, 1);
    this.setState({ items: items });
  }


  render() {
    var items = this.state.items.map(function (item, index) {
      return (
        <ListItem text={item} key={index} index={index}
          deleteToDoItem={this.deleteToDoItem}
        />
      )
    }.bind(this));

    return (
      <View>
        <View style={styles.addToDo}>

          <TextInput style={styles.addToDoTextInput}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text} />

          <Button title="Add" style={styles.addToDoButton}
            onPress={this.addToDoItem} />


        </View>

        <ScrollView style={styles.list}>
          {items}
        </ScrollView>

      </View>
    )
  }
}

//Rendering
export default function App() {
  return (
    <View style={styles.container}>
      <Banner />
      <ToDoList />
    </View>
  );
}


//styles for app
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    margin: 0
  },
  banner: {
    backgroundColor: 'cadetblue',
    justifyContent: 'center',
    marginBottom: 20
  },
  bannerText: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 50,
    paddingBottom: 20
  },

  addToDo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addToDoTextInput: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    padding: 5,
    margin: 3,
    flex: 1,
  },
  list: {
    color: 'black',
    margin: 2,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    margin: 5
  },
  listItemText: {
  },
  listItemDelete: {
    marginStart: 10,
    color: 'red',
    fontWeight: 'bold'
  },
  addToDoButton: {
    backgroundColor: 'cadetblue',
  }
});
