// Adapted from react-mailchimp-subscribe:
// https://github.com/revolunet/react-mailchimp-subscribe

import React, { Component } from "react";
import jsonp from "jsonp";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView
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

  onSubmit = (event) => {
    event.preventDefault();

    // Check field for properly formatted email
    if (!this.input.value || this.input.value.length < 5 || this.input.value.indexOf("@") === -1) {
      this.setState({
        status: "error"
      })
      return
    }

    const url = getAjaxUrl(this.state.action) + `&EMAIL=${encodeURIComponent(this.input.value)}`;

    this.setState(
      {
        status: "sending",
        msg: null
      }, () => jsonp(url, {
        param: "c"
      }, (error, data) => {
        if (error) {
          console.log('error: ', error);
          this.setState({
            status: 'error',
            msg: error
          })
        } else if (data.result !== 'success') {
          this.setState({
            status: 'error',
            msg: data.msg
          })
        } else {
          this.setState({
            status: 'success',
            formIsShown: false,
            msg: data.msg
          })
        }
      })
    ) // End this.setState()
  } // End onSubmit()

  renderForm() {
    let { status } = this.state;

    if (true
      // this.state.formIsShown
      ) {
      return(
        <View>
          <TextInput
            style={styles.input}
            placeholder="Newsletter"
          />
          <TouchableOpacity
            // disabled={this.state.status === "sending" || this.state.status === "success"}
            onPress={this.onSubmit}
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

  // renderMessage() {
  //   let { status } = this.state;

  //   if (status === "success") {
  //     return (
  //       <div className="message message-confirmation">
  //         Thanks for subscribing to Tap In!
  //       </div>
  //     )
  //   } else if (status === "error") {
  //     return(
  //       <p className="message message-error">
  //         {this.renderErrorMessage()}
  //       </p>
  //     )
  //   }
  // }

  render() {
    return (
      <View

        style={styles.form}

      >
        {this.renderForm()}
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
  }
});

export default NewsletterSubscribeForm
