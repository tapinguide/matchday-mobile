// Adapted from react-mailchimp-subscribe:
// https://github.com/revolunet/react-mailchimp-subscribe

import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Form } from 'react-native'

const getAjaxUrl = url => url.replace('/post?', '/post-json?')

class NewsletterSubscribeForm extends Component {
  state = {
    status: null,
    input: {
      email: '',
    },
    formIsShown: true,
    action: 'https://tapinguide.us14.list-manage.com/subscribe/post?u=14e98619ae4c42af11b4222bb&id=8e0497d99f',
  }

  handleSubmit = () => {
    const { email } = this.state.input
    const { action } = this.state

    // Check field for properly formatted email
    if (!email || email.length < 5 || email.indexOf('@') === -1) {
      this.setState({
        status: 'error',
        msg: 'Please enter a valid email',
      })
      return
    }
    const url = getAjaxUrl(action) + `&EMAIL=${encodeURIComponent(email)}`

    this.submitToMailchimp(url)
  } // End onSubmit()

  submitToMailchimp(url) {
    // payload is your post data
    const payload = { param: 'c' }
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cors: true, // allow cross-origin HTTP request
      credentials: 'same-origin', // This is similar to XHR’s withCredentials flag
    }

    this.setState({
      status: 'sending',
    })

    // SEND REQUEST
    fetch(url, options)
      .then(response => {
        // Set success message if successful
        let result = JSON.parse(response._bodyText)
        console.log('response: ', response)
        if (result.result === 'success') {
          this.setState({
            status: 'success',
            formIsShown: false,
          })
        } else {
          this.setState({
            status: 'error',
            msg: result.msg,
          })
        }
      })
      .catch(error => {
        // Set error state if error is returned
        this.setState({
          status: 'error',
          msg: error,
        })
      })
  }

  renderForm() {
    let { status, input, formIsShown } = this.state

    if (formIsShown) {
      return (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Newsletter – Enter Your Email"
            underlineColorAndroid="transparent"
            onChangeText={text => this.handleInputChange({ email: text })}
            value={input.email}
            returnKeyType="send"
            onSubmitEditing={() => this.handleSubmit()}
          />
          <TouchableOpacity
            disabled={status === 'sending' || status === 'success'}
            onPress={() => this.handleSubmit()}
            style={[styles.button, status === 'sending' ? styles.buttonDisabled : '']}
          >
            <Text style={styles.buttonText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  handleInputChange = newPartialInput => {
    this.setState(state => ({
      ...state,
      input: {
        ...state.input,
        ...newPartialInput,
      },
    }))
  }

  renderErrorMessage() {
    let { msg } = this.state

    if (msg) {
      if (msg.includes('already subscribed')) {
        return 'This email has already been subscribed to our newsletter'
      } else {
        return msg
      }
    } else {
      return "Oops, there's been an error. Please try again."
    }
  }

  renderMessage() {
    let { status } = this.state

    if (status === 'success') {
      return <Text style={styles.successMessage}>Thanks for subscribing to Tap In!</Text>
    } else if (status === 'error') {
      return <Text style={styles.errorMessage}>{this.renderErrorMessage()}</Text>
    }
  }

  render() {
    return (
      <View style={styles.form}>
        {this.renderForm()}
        {this.renderMessage()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
  },
  button: {
    backgroundColor: '#3FEDC7',
    padding: 10,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(63, 237, 199, 0.2)',
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'poppins-semi-bold',
  },
  input: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'poppins-regular',
    fontSize: 16,
    padding: 10,
  },
  errorMessage: {
    color: '#FF0000',
    marginTop: 10,
  },
  successMessage: {
    color: '#3FEDC7',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'poppins-semi-bold',
    padding: 10,
  },
})

export default NewsletterSubscribeForm
