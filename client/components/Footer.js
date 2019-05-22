import React, { Component } from "react"
import PostsFooter from 'client/components/PostsFooter';
import MenuFooter from 'client/components/MenuFooter';
import DetailFooter from 'client/components/DetailFooter';

export default class Footer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { state, handleOnClickToggleMain } = this.props;
    const { style } = state;
    return (
      <footer data-component-name={"Footer"} style={ style.footer.self }>
        <MenuFooter {...this.props} mode={"default"} />
        <PostsFooter {...this.props} mode={"default"} handleOnClickToggleMain={handleOnClickToggleMain} />
        <DetailFooter {...this.props} mode={"default"} />
      </footer>
		);
 	}
}
