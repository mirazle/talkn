import React from 'react';

import SelectStory from 'cover/components/organisms/Contents/Profile/modal/children/SelectStory';
import { UserTagsType } from 'cover/model/userTags';
import { FixStoryValuesType } from 'cover/model/userTags/Story';

type Props = {
  type: string;

  userTags: UserTagsType;
  fixValues: FixStoryValuesType;
  setFixValues: React.Dispatch<React.SetStateAction<FixStoryValuesType>>;
  optionStoryId?: string;
};

const Component: React.FC<Props> = ({ type, optionStoryId, fixValues, userTags, setFixValues }: Props) => {
  const handleOnChangeStory = (storyId) => {
    setFixValues({ ...fixValues, storyId });
  };

  return (
    <SelectStory
      isEditable
      clickedStoryId={optionStoryId}
      selected={userTags ? userTags.story.story.map((obj) => obj.storyId) : []}
      storyId={fixValues.storyId}
      onChange={handleOnChangeStory}
    />
  );
};

export default Component;
