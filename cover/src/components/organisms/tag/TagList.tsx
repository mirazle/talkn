import React, { useState, useRef } from 'react';
import type { FunctionComponent } from 'react';
import styled from 'styled-components';

import Section from 'cover/components/atoms/Section';
import Title from 'cover/components/atoms/Title';
import * as styles from 'cover/styles';

import { InputCss, TagValueType } from './common';

const tagParentSelf = 'Self';
const tagParentRelation = 'Relation';
const tagParentStory = 'Story';
type TagParentType = typeof tagParentSelf | typeof tagParentRelation | typeof tagParentStory;

const tagInvesdtor = 'Investor';
const tagFounder = 'Founder';
const tagMember = 'Member';
const tagTypes = [tagInvesdtor, tagFounder, tagMember];
type Props = {
  tagParent: TagParentType;
  tags?: TagValueType[];
};

const Component: React.FC<Props> = (props: Props) => {
  return (
    <Section className="TagSection" flow="column nowrap" upperMargin bottomMargin sideMargin sidePadding>
      <Title>●{props.tagParent}</Title>
      {props.tagParent !== tagParentStory &&
        tagTypes.map((tagType, index) => {
          return (
            <div key={`tagType${index}`}>
              <Title>{tagType}</Title>
            </div>
          );
        })}
      {props.tagParent === tagParentStory && <Title>{tagParentStory}</Title>}
    </Section>
  );
};

export default Component;
