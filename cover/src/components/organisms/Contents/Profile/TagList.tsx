import React from 'react';

import { Section, H5 } from 'cover/flexes';

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
      <H5>●{props.tagParent}</H5>
      {props.tagParent !== tagParentStory &&
        tagTypes.map((tagType, index) => {
          return (
            <div key={`tagType${index}`}>
              <H5>{tagType}</H5>
            </div>
          );
        })}
      {props.tagParent === tagParentStory && <H5>{tagParentStory}</H5>}
    </Section>
  );
};

export default Component;
