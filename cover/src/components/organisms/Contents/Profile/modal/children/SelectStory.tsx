import React, { useState, useEffect } from 'react';

import Select from 'cover/components/atoms/select';

type Props = {
  storyId: string;
  isEditable: boolean;
  selected: string[];
  onChange: (storyId: string) => void;
  clickedStoryId?: string;
};

const Component: React.FC<Props> = ({ storyId: _storyId, isEditable, selected, onChange, clickedStoryId }: Props) => {
  const [storyId, setStoryId] = useState(_storyId);
  const handleOnChange = (value) => {
    setStoryId(value);
    onChange(value);
  };
  useEffect(() => {
    setStoryId(_storyId);
  }, [_storyId]);

  return (
    <Select.Single name={'story[]'} disabled={!isEditable} onChange={handleOnChange} value={storyId} noSelectOption>
      {window.talknDatas.staticTags.story.map((tag) => {
        return (
          isShow(isEditable, selected, clickedStoryId, tag.uniqueId) && (
            <Select.Option key={`StartupSeries_${tag.uniqueId}`} value={String(tag.uniqueId)}>
              {tag.ja}
            </Select.Option>
          )
        );
      })}
    </Select.Single>
  );
};

export default Component;

const isShow = (isEditable, selected, clickedStoryId, uniqueId) => {
  if (isEditable) {
    if (clickedStoryId === uniqueId) {
      return true;
    } else {
      return !selected.includes(uniqueId);
    }
  } else {
    return true;
  }
};
