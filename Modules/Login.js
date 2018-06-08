import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View, YellowBox } from 'react-native';
import * as firebase from 'firebase';
import { Input } from './../components/Input';
import { Button } from './../components/Button';
import AddActivity from './../components/AddActivity';
import { StackNavigator } from 'react-navigation';

class Login extends React.Component {
  constructor(props) {

   super(props);

   YellowBox.ignoreWarnings(

      ['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'

    ]);

 }
  state = {
    email: '',
    password: '',
    authenticating: false,
    user: null,
    error: '',
  }

  navigateKategori = () => {
   this.props.navigation.navigate('Kategori');
  }

  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCQX_6wWzkAFt9FIZ7wirelz8OPc5yWv-s',
      authDomain: 'projectuas-fbae9.firebaseapp.com',
    }

    firebase.initializeApp(firebaseConfig);
  }

  onPressSignIn() {
    this.setState({
      authenticating: true,
    });

    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => this.setState({
        authenticating: false,
        user,
        error: '',
      }))
      .catch(() => {
        // Login was not successful
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => this.setState({
            authenticating: false,
            user,
            error: '',
          }))
          .catch(() => this.setState({
            authenticating: false,
            user: null,
            error: 'Authentication Failure',
          }))
      })
  }

  onPressLogOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          email: '',
          password: '',
          authenticating: false,
          user: null,
        })
      }, error => {
        console.error('Sign Out Error', error);
      });
  }

  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    if (this.state.user !== null) {
      return (
        <View style={styles.form}>

          <Button title="Maps" onPress={this.navigateKategori} color="#0000">Cari Tempat</Button>
          <Button onPress={() => this.onPressLogOut()}>Log Out</Button>
        </View>
      )
    }

    return (
      <View style={styles.form}>
        <Input
          placeholder='Enter your email...'
          label='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          placeholder='Enter your password...'
          label='Password'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button onPress={() => this.onPressSignIn()}>Log In</Button>
        <Text>{this.state.error}</Text>
      </View>
    )

  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentState()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  form: {
    flex: 1
  }
});

export default Login;
