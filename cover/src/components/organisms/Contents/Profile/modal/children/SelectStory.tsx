import React, { useState, useEffect } from 'react';

import Select from 'cover/components/atoms/select';

type Props = {
  storyId: string;
  selected: string[];
  onChange: (storyId: string) => void;
};

const Component: React.FC<Props> = ({ storyId: _storyId, selected, onChange }: Props) => {
  const [storyId, setStoryId] = useState(_storyId);
  const handleOnChange = (value) => {
    setStoryId(value);
    onChange(value);
  };
  useEffect(() => {
    setStoryId(_storyId);
  }, [_storyId]);

  return (
    <Select.Single name={'story[]'} onChange={handleOnChange} value={storyId} noSelectOption>
      {window.talknStaticTags.story.map((tag) => {
        return (
          !selected.includes(tag.uniqueId) && (
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
