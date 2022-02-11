import React from 'react';
import styled from 'styled-components';

import Flex from 'cover/components/atoms/Flex';
import Section from 'cover/components/atoms/Section';
import Title from 'cover/components/atoms/Title';
import AddTag from 'cover/components/organisms/tag/AddTag';
import TagComplexity from 'cover/components/organisms/tag/TagComplexity';
import TagSimply from 'cover/components/organisms/tag/TagSimply';
import * as styles from 'cover/styles';

import { TagValueType } from './common';

const tagParentSelf = 'Self';
const tagParentRelation = 'Relation';
const tagParentStory = 'Story';
export type TagParentType = typeof tagParentSelf | typeof tagParentRelation | typeof tagParentStory;
export const tagParentTypes: TagParentType[] = [tagParentSelf, tagParentRelation, tagParentStory];

const tagInvesdtor = 'Investor';
const tagFounder = 'Founder';
const tagMember = 'Member';
const tagTypes = [tagInvesdtor, tagFounder, tagMember];
type Props = {
  tagParent: TagParentType;
  tags?: TagValueType[];
};

const Component: React.FC<Props> = (props: Props) => {
  const handleOnClickComplexityTag = (tagType) => {
    console.log(props.tagParent, tagType);
  };
  const handleOnClickNewComplexityTag = (tagType) => {
    console.log(props.tagParent, tagType);
  };
  const handleOnClickSimplyTag = () => {
    console.log(props.tagParent);
  };
  const handleOnClickNewSimplyTag = () => {
    console.log(props.tagParent);
  };
  return (
    <Flex className="TagSection" flow="column nowrap" border radius upperMargin sideMargin bottomPadding bottomMargin>
      <Flex width="100%" border="underline" upperPadding sideMargin sidePadding bottomPadding>
        <Title type={'TagParentTitle'}>{props.tagParent}</Title>
      </Flex>
      <br />
      {props.tagParent !== tagParentStory &&
        tagTypes.map((tagType, index) => {
          return (
            <Section key={`${tagType}_${index}`} className={`${tagType}_${index}`} flow="column nowrap" upperPadding sideMargin sidePadding>
              <Title type={'TagTitle'}>{tagType}</Title>
              <Flex flow="row nowrap" alignItems="center" width="100%" upperMargin>
                <TagComplexity
                  onClick={() => handleOnClickComplexityTag(tagType)}
                  upperLeft="業界(親)"
                  upperRight="業界(子)"
                  bottomLeft="営業"
                  bottomRight="(10)"
                />
                <AddTag onClick={() => handleOnClickNewComplexityTag(tagType)} />
              </Flex>
            </Section>
          );
        })}
      {props.tagParent === tagParentStory && (
        <Section key={`${tagParentStory}`} flow="column nowrap" upperPadding sideMargin sidePadding>
          <Title>{tagParentStory}</Title>
          <Flex flow="row nowrap" alignItems="center" width="100%" upperMargin>
            <TagSimply onClick={() => handleOnClickSimplyTag()} label="DX" />
            <TagSimply onClick={() => handleOnClickSimplyTag()} label="AI" />
            <AddTag onClick={handleOnClickNewSimplyTag} />
          </Flex>
        </Section>
      )}
    </Flex>
  );
};

export default Component;
