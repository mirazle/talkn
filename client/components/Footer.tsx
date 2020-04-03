import React from "react";
import TalknComponent from "client/components/TalknComponent";
import ClientState from "client/store/";
import PostsFooter from "client/components/PostsFooter";
import MenuFooter from "client/components/MenuFooter";
import DetailFooter from "client/components/DetailFooter";

interface FooterProps {
  clientState: ClientState;
  handleOnClickToggleMain?: any;
}

interface FooterState {}

export default class Footer extends TalknComponent<FooterProps, FooterState> {
  constructor(props) {
    super(props);
  }

  render() {
    const { clientState, handleOnClickToggleMain } = this.props;
    const { style } = clientState;
    return (
      <footer data-component-name={"Footer"} style={style.footer.self}>
        <MenuFooter {...this.props} mode={"default"} />
        <PostsFooter {...this.props} mode={"default"} handleOnClickToggleMain={handleOnClickToggleMain} />
        <DetailFooter {...this.props} mode={"default"} />
      </footer>
    );
  }
}
