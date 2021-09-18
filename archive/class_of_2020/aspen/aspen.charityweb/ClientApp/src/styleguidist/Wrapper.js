import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {configureDocsStore} from '../store/configureStore'
import {initialState} from "../store/initialState"

const store = configureDocsStore(initialState)
export default class Wrapper extends Component {
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}