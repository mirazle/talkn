import React from 'react';

import TagSection from 'cover/components/organisms/tag/TagSection';

const tagParentSelf = 'Self';
const tagParentRelation = 'Relation';
const tagParentStory = 'Story';
export type TagParentType = typeof tagParentSelf | typeof tagParentRelation | typeof tagParentStory;
export const tagParentTypes: TagParentType[] = [tagParentSelf, tagParentRelation, tagParentStory];

const tagInvesdtor = 'Investor';
const tagFounder = 'Founder';
const tagMember = 'Member';
export const tagTypes = [tagInvesdtor, tagFounder, tagMember];

const Component: React.FC = () => {
  /*
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
  */
  return (
    <>
      {tagParentTypes.map((tagParentType: TagParentType) => {
        return <TagSection key={tagParentType} tagParent={tagParentType} />;
      })}
    </>
  );
};

export default Component;
