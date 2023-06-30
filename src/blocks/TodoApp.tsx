// TodoApp.js
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {addTodo, deleteTodo, updateTodo} from '../redux/todoSlice';

class TodoApp extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      todoText: '',
      editingTodoId: null,
      editingTodoText: '',
    };
  }

  handleAddTodo = () => {
    const {todoText} = this.state;
    if (todoText.trim() !== '') {
      this.props.addTodo({
        id: Date.now(),
        text: todoText,
      });
      this.setState({todoText: ''});
    }
  };

  handleEditTodo = (id, text) => {
    this.setState({editingTodoId: id, todoText: text});
  };

  handleUpdateTodo = () => {
    const {editingTodoId, editingTodoText} = this.state;
    if (this.state.todoText.trim() !== '') {
      this.props.updateTodo({
        id: editingTodoId,
        text: this.state.todoText,
      });
      this.setState({editingTodoId: null, todoText: ''});
    }
  };

  handleDeleteTodo = (id: any) => {
    this.props.deleteTodo(id);
  };

  render() {
    const {todoText, editingTodoId, editingTodoText} = this.state;
    const {todos} = this.props;

    return (
      <View>
        <View
          style={{
            backgroundColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{padding: 20, color: '#ffffff'}}>Todo</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <TextInput
            value={todoText}
            style={{
              padding: 10,
              borderWidth: 1,
              borderColor: 'grey',
              borderRadius: 10,
              width: '80%',
              marginLeft: 20,
            }}
            onChangeText={text => this.setState({todoText: text})}
            placeholder="Enter the task"
          />
          <TouchableOpacity
            style={{}}
            onPress={
              editingTodoId !== null
                ? () => this.handleUpdateTodo()
                : this.handleAddTodo
            }>
            <Text>{editingTodoId !== null ? 'Update' : 'Add'}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <Text>{item.text}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={{backgroundColor: 'blue', borderRadius: 10}}
                    onPress={() => this.handleEditTodo(item.id, item.text)}>
                    <Text style={{padding: 10, color: '#ffffff'}}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{backgroundColor: 'blue', borderRadius: 10}}
                    onPress={() => this.handleDeleteTodo(item.id)}>
                    <Text style={{padding: 10, color: '#ffffff'}}>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    todos: state.todo.todos,
  };
};

const mapDispatchToProps = {
  addTodo,
  deleteTodo,
  updateTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
