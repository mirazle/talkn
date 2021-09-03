import React from 'react';

import DetailFooter from 'client/components/Detail/DetailFooter';
import PostsFooter from 'client/components/Input/PostsFooter';
import MenuFooter from 'client/components/Menu/Footer';
import TalknComponent from 'client/components/TalknComponent';

type FooterProps = {
  state: any;
  handleOnClickToggleMain?: any;
};

type FooterState = unknown;

export default class Footer extends TalknComponent<FooterProps, FooterState> {
  constructor(props) {
    super(props);
    this.componentName = 'Footer';
  }

  render() {
    const { state, handleOnClickToggleMain } = this.props;
    const { style } = state;
    return (
      <footer data-component-name={this.componentName} style={style.footer.self}>
        <MenuFooter {...this.props} mode={'default'} />
        <PostsFooter {...this.props} mode={'default'} handleOnClickToggleMain={handleOnClickToggleMain} />
        <DetailFooter {...this.props} mode={'default'} />
      </footer>
    );
  }
}
