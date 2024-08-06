import React from 'react';
import Header from './header';
import CommentSection from "./comment";
import { faker } from '@faker-js/faker';
import 'semantic-ui-css/semantic.min.css';
import moment from 'moment';


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


function App() {
  // const message = "This is app.js";
  const name = "Syalza";
  const comments = generateComments(4);

    return (
      <div className="App">
        <Header />
        <div className="App-content">
            <div>
                {/* <h1>{message}</h1> */}
                <h1>Hi, I am {name}.I am a bootcamp participant from batch 10.</h1>
            </div>
            <CommentSection comments={comments} />
        </div>
      </div>
    );
  }

export default App;

  // const date = new Date();
  // const time = date.toLocaleDateString();
  /* <h1>{time}</h1> */

