import React, { Component, createRef } from 'react';
import cn from 'classnames';
import { Formik } from 'formik';
// import { FixedSizeList as List } from 'react-window';

class Todo extends Component {
  state = {
    todoList: [],
    filterType: 'all',
  };

  addTodo = (values, actions) => {
    this.setState(
      ({ todoList }) => ({
        todoList: [
          ...todoList,
          {
            id: new Date().valueOf(),
            text: values.todoText,
            isDone: false,
          },
        ],
      }),
      () => {
        actions.resetForm();
      }
    );
  };

  toggleComplete = id => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex(
        item => item.id === id
      );
      return {
        todoList: [
          ...todoList.slice(0, index),
          {
            ...todoList[index],
            isDone: !todoList[index].isDone,
          },
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  deleteTodo = id => {
    this.setState(({ todoList }) => {
      const index = todoList.findIndex(
        item => item.id === id
      );
      return {
        todoList: [
          ...todoList.slice(0, index),
          ...todoList.slice(index + 1),
        ],
      };
    });
  };

  filter = filterType => {
    this.setState({ filterType });
  };

  render() {
    const { todoList, filterType } = this.state;

    return (
      <div className="flex flex-col items-center bg-slate-100 h-screen">
        <h1>Todo Application</h1>
        <Formik
          initialValues={{
            todoText: '',
          }}
          onSubmit={this.addTodo}
          validate={values => {
            const errors = {};
            if (!values.todoText.trim()) {
              errors.todoText = 'required...';
            }
            return errors;
          }}>
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            errors,
            isValid,
            dirty,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center">
              <div>
                <input
                  value={values.todoText}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  name="todoText"
                  placeholder="Please Enter your todo here..."
                />
                <button
                  disabled={
                    !dirty || !isValid || isSubmitting
                  }
                  className="btn rounded-l-none disabled:bg-slate-400 disabled:cursor-not-allowed"
                  type="submit">
                  Add Todo
                </button>
              </div>
              {errors.todoText && (
                <span className="text-red-400">
                  {errors.todoText}
                </span>
              )}
            </form>
          )}
        </Formik>
        <div className="w-full max-w-5xl flex-1 overflow-y-auto">
          {todoList.map(item => {
            const listItem = (
              <div
                key={item.id}
                className="flex m-4 items-center">
                <input
                  type="checkbox"
                  checked={item.isDone}
                  onChange={() =>
                    this.toggleComplete(item.id)
                  }
                />
                <p
                  className={cn('flex-1 px-4', {
                    'line-through': item.isDone,
                  })}>
                  {item.text}
                </p>
                <button
                  type="button"
                  className="btn bg-red-400"
                  onClick={() => this.deleteTodo(item.id)}>
                  Delete
                </button>
              </div>
            );

            if (
              (filterType === 'completed' && item.isDone) ||
              (filterType === 'pending' && !item.isDone) ||
              filterType === 'all'
            ) {
              return listItem;
            }

            return null;
          })}
        </div>
        <div className="w-full flex">
          <button
            type="button"
            className="btn flex-1 rounded-none"
            onClick={() => this.filter('all')}>
            All
          </button>
          <button
            type="button"
            className="btn flex-1 rounded-none"
            onClick={() => this.filter('pending')}>
            Pending
          </button>
          <button
            type="button"
            className="btn flex-1 rounded-none"
            onClick={() => this.filter('completed')}>
            Completed
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;
