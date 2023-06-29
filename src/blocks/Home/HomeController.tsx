import {Component} from 'react';

interface IProps {
  navigation: any;
}

export default class HomeController extends Component<IProps, {}> {
  state = {
    message: 'Hello World',
  };
}
