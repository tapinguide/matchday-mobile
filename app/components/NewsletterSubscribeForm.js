// Adapted from react-mailchimp-subscribe:
// https://github.com/revolunet/react-mailchimp-subscribe

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Form
} from 'react-native';

const getAjaxUrl = url => url.replace('/post?', '/post-json?')

class NewsletterSubscribeForm extends Component {
  state = {
    status: null,
    input: {
      email: ''
    },
    formIsShown: true,
    action: "https://tapinguide.us14.list-manage.com/subscribe/post?u=14e98619ae4c42af11b4222bb&id=8e0497d99f"
  }

  handleSubmit = () => {
    const { email } = this.state.input;


    // Check field for properly formatted email
    if (!email || email.length < 5 || email.indexOf("@") === -1) {
      this.setState({
        status: "error"
      })
      return;
    }
    const url = getAjaxUrl(this.state.action) + `&EMAIL=${encodeURIComponent(email)}`;

    this.submitToMailchimp(url);
  } // End onSubmit()

  submitToMailchimp(url) {

    // payload is your post data
    const payload = {param: 'c'};
    const options = {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(payload),
     cors: true, // allow cross-origin HTTP request
     credentials: 'same-origin' // This is similar to XHR’s withCredentials flag
    };

    // SEND REQUEST
    fetch(url, options).then((response) => {
    // TODO
    // Set success message if successful
    //       // this.setState({
    //       //   status: 'success',
    //       //   formIsShown: false,
    //       //   msg: data.msg
    //       // })
    console.log('response: ', response)
    }).catch((error) => {
     // TODO
     // Set error state if error is returned
     // this.setState({
     //   status: 'error',
     //   msg: error
     // })
    });
  }

  renderForm() {
    let { status, input, formIsShown } = this.state;

    if (formIsShown) {
      return(
        <View>
          <TextInput
            style={styles.input}
            placeholder="Newsletter"
            onChangeText={(text) => this.handleInputChange({email: text})}
            value={input.email}
          />
          <TouchableOpacity
            disabled={status === "sending" || status === "success"}
            onPress={this.handleSubmit}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Subscribe
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  handleInputChange = (newPartialInput) => {
    console.log('handle')
    this.setState(state => ({
      ...state,
      input: {
        ...state.input,
        ...newPartialInput,
      }
    }))
  }

  renderErrorMessage() {
    let { msg } = this.state;

    if (msg) {
      if(msg.includes('already subscribed')) {
        return 'This email has already been subscribed to our newsletter';
      } else {
        return "Oops, there's been an error. Please try again."
      }
    }
  }

  renderMessage() {
    let { status } = this.state;

    if (status === "success") {
      return (
        <Text style={styles.errorMessage}>
          Thanks for subscribing to Tap In!
        </Text>
      )
    } else if (status === "error") {
      return(
        <Text style={styles.errorMessage}>
          {this.renderErrorMessage()}
        </Text>
      )
    }
  }

  render() {
    return (
      <View
        style={styles.form}
      >
        {this.renderForm()}
        {this.renderMessage()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 20
  },
  button: {
    backgroundColor: '#3FEDC7',
    padding: 10
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'poppins-semi-bold'
  },
  input: {
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  errorMessage: {
    color: '#FF0000'
  }
});

export default NewsletterSubscribeForm
