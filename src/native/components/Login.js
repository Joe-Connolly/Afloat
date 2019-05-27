import React from 'react';
import PropTypes from 'prop-types';
import {
  Container, Content, Form, Item, Label, Input, Text, Button, View,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Dimensions } from 'react-native';
import Loading from './Loading';
import Messages from './Messages';
import { translate } from '../../i18n';
import Header from './Header';
import Spacer from './Spacer';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

function wph(percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    locale: PropTypes.string,
    error: PropTypes.string,
    success: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    success: null,
    locale: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      [name]: val,
    });
  }

  handleSubmit = () => {
    const { onFormSubmit } = this.props;
    onFormSubmit(this.state)
      .then(() => {
        console.log('replacing');
        Actions.replace('home');
      })
      .catch(e => console.log(`Error: ${e}`));
  }

  render() {
    const {
      loading,
      error,
      success,
      locale,
    } = this.props;
    const { email } = this.state;

    if (loading) return <Loading />;

    return (
      <Container
        style={{ backgroundColor: 'white' }}
      >
        <Content>
          <View padder>
            <Header
              title="Login"
            />
            { success ? <Messages type="success" message={success} /> : null }
            { error ? <Messages message={error} /> : null }
          </View>

          <Form>
            <Item stackedLabel>
              <Label>
                {translate('Email', locale)}
              </Label>
              <Input
                autoCapitalize="none"
                value={email}
                keyboardType="email-address"
                onChangeText={v => this.handleChange('email', v)}
              />
            </Item>
            <Item stackedLabel>
              <Label>
                {translate('Password', locale)}
              </Label>
              <Input
                secureTextEntry
                onChangeText={v => this.handleChange('password', v)}
              />
            </Item>

            <Spacer size={20} />

            <View padder>
              <Button
                block
                onPress={this.handleSubmit}
                style={{
                  display: 'flex',
                  alignSelf: 'center',
                  backgroundColor: '#21D0A5',
                  width: wp(60),
                  borderRadius: 35,
                  justifyContent: 'center',
                }}
              >
                <Text>
                  {translate('Login', locale)}
                </Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default Login;
