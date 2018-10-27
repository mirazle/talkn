import React, { Component } from "react"
import PostsFooter from 'client/components/PostsFooter';
import MenuFooter from 'client/components/MenuFooter';

export default class Footer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { style } = this.props.state;
    return (
      <footer data-component-name={this.constructor.name} style={ style.footer.self }>
        <MenuFooter {...this.props} />
        <PostsFooter {...this.props} />
      </footer>
		);
 	}
}
