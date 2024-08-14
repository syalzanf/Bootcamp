import React from 'react';
import Header from './header';
import Comment from "./comment";
import Form from './inputForm';
import Search from './search';
import Videos from './video';
import Hooks from './hooks';
import Test from './testRedux';
import { faker } from '@faker-js/faker';
import 'semantic-ui-css/semantic.min.css';
import moment from 'moment';

import MyForm from './MyForm';

// Helper function to format the date
const formatDate = (date) => {
  const dateMoment = moment(date);
  
  return dateMoment.format('dddd [at] h:mm A');
};

const generateComments = (num) => {
  return Array.from({ length: num }, () => ({
    author: faker.name.fullName(),
    date: formatDate(faker.date.recent()),
    text: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
  }));
};


//class for counting button
class Counting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count:0,
    };
  }
  render() {
  return (
    <div>
      <h4>you clicked {this.state.count} times</h4>
      <button className="btn btn-primary" onClick={() => this.setState({count:this.state.count + 1})}>
        click on me!
      </button>
    </div>
  );
  }
}

class App extends React.Component {
  render() {
  const name = "Syalza";
  const comments = generateComments(4);

    return (
      <div>
      <Header />
      <div className="App-content row">
        <div className="col-md-8 offset-md-2"><br></br>
        <Search />
        <Videos />
        <MyForm />
        <Test />
        <Hooks />
          <h5 className="text-center">Hi, I am {name}. I am a bootcamp participant from batch 10.</h5>
          <Form />
          <Counting />
        </div>
        <div className="col-md-8 offset-md-2">
          <Comment comments={comments} />
        </div>
      </div>
    </div>
    );
  }
}

export default App;





// const date = new Date();
// const time = date.toLocaleDateString();
// <h1>{time}</h1>




