import React from 'react';

import H from 'cover/components/atoms/H';
import Section from 'cover/components/atoms/Section';

import { TagValueType } from './common';

const tagParentSelf = 'Self';
const tagParentSearch = 'Search';
const tagParentStory = 'Story';
type TagParentType = typeof tagParentSelf | typeof tagParentSearch | typeof tagParentStory;

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
      <H.Five>●{props.tagParent}</H.Five>
      {props.tagParent !== tagParentStory &&
        tagTypes.map((tagType, index) => {
          return (
            <div key={`tagType${index}`}>
              <H.Five>{tagType}</H.Five>
            </div>
          );
        })}
      {props.tagParent === tagParentStory && <H.Five>{tagParentStory}</H.Five>}
    </Section>
  );
};

export default Component;
