import React from "react";
import TalknComponent from "client/components/TalknComponent";
import PostsFooter from "client/components/PostsFooter";
import MenuFooter from "client/components/Menu/Footer";
import DetailFooter from "client/components/DetailFooter";

interface FooterProps {
  state: any;
  handleOnClickToggleMain?: any;
}

interface FooterState {}

export default class Footer extends TalknComponent<FooterProps, FooterState> {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, handleOnClickToggleMain } = this.props;
    const { style } = state;
    return (
      <footer data-component-name={"Footer"} style={style.footer.self}>
        <MenuFooter {...this.props} mode={"default"} />
        <PostsFooter {...this.props} mode={"default"} handleOnClickToggleMain={handleOnClickToggleMain} />
        <DetailFooter {...this.props} mode={"default"} />
      </footer>
    );
  }
}
