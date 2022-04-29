import * as React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Dashboard from '../dashboard';
import { ICard } from '../models/card';
import NavBar from './NavBar';
import AuthRoute from './../components/common/authRoute';
import LoginForm from '../components/auth/loginForm';

interface AppProps {}

interface AppState {}

class AppNew extends React.Component<AppProps, AppState> {
  state = {};

  cards: ICard[] = [];

  render() {
    return (
      <>
        <NavBar></NavBar>
        <ToastContainer />
        <div className='container' style={{ marginTop: 30 }}>
          {/* <Dashboard cards={this.cards}></Dashboard> */}
          {/* <Users></Users> */}
          <LoginForm></LoginForm>
        </div>
      </>
    );
  }

  authRoute(path: string, element: React.ReactNode) {
    return (
      <Route path={path} element={<AuthRoute>{element}</AuthRoute>}></Route>
    );
  }

  anonymousRoute(path: string, element: React.ReactNode) {
    return <Route path={path} element={element}></Route>;
  }
}

export default App;

function App() {
  // const [cards, setCards] = useState<ICard[]>([]);

  const cards: ICard[] = [
    {
      id: 25,
      name: 'General ....',
      notes: [
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
        {
          id: 5666,
          content: 'Hello how are you',
          wordbook: {
            id: 25,
            words: [
              {
                id: 'dasd',
                word: 'cram',
                definition: ['to fit in tight'],
              },
            ],
          },
        },
      ],
    },
  ];

  return (
    <>
      <NavBar></NavBar>
      <ToastContainer />
      <div className='container' style={{ marginTop: 30 }}>
        <Dashboard cards={cards}></Dashboard>
        {/* <Users></Users> */}
      </div>
    </>
  );
}
