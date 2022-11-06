import React, { useState, useEffect } from 'react';

import Select from 'cover/components/atoms/select';
import Flex, { Label } from 'cover/flexes';

type Props = {
  type: string;
  isEditable: boolean;
  industoryParentId: any;
  industoryId: any;
  onChange: (industoryParentId: string, industoryId: string) => void;
};

const Component: React.FC<Props> = ({
  type,
  isEditable,
  industoryParentId: _industoryParentId,
  industoryId: _industoryId,
  onChange,
}: Props) => {
  const [industoryParentId, setIndustoryParentId] = useState(_industoryParentId);
  const [industoryId, setIndustoryId] = useState(_industoryId);
  const [industoryStaticData, setIndustoryStaticData] = useState([]);
  const handleOnChangeIndustoryParent = (value) => {
    setIndustoryParentId(value);
    setIndustoryId('');
    onChange(value, '');
  };
  const handleOnChangeIndustory = (value) => {
    setIndustoryId(value);
    onChange(industoryParentId, value);
  };

  useEffect(() => {
    setIndustoryParentId(_industoryParentId);
  }, [_industoryParentId]);

  useEffect(() => {
    setIndustoryId(_industoryId);
  }, [_industoryId]);

  useEffect(() => {
    const updateIndustoryStaticData = window.talknDatas.staticTags.industory.filter((ind) => ind.parentId === industoryParentId);
    setIndustoryStaticData(updateIndustoryStaticData);
  }, [industoryParentId]);

  return (
    <Flex flow="column nowrap">
      <Label bottomMargin>Industory</Label>
      <Flex flow="row wrap" alignItems="center">
        <Select.Single
          name={`${type}_industoryParent}`}
          disabled={!isEditable}
          label={'Industory'}
          onChange={handleOnChangeIndustoryParent}
          value={industoryParentId}
          noSelectOption>
          {window.talknDatas.staticTags.industoryParent.map((tag) => (
            <Select.Option key={`IndustoryParentId_${tag.uniqueId}`} value={tag.uniqueId}>
              {tag.ja}
            </Select.Option>
          ))}
        </Select.Single>

        <Select.Single name={'industory[]'} disabled={!isEditable} onChange={handleOnChangeIndustory} value={industoryId} noSelectOption>
          {industoryStaticData.map((tag) => (
            <Select.Option key={`IndustoryId_${tag.uniqueId}`} value={tag.uniqueId}>
              {tag.ja}
            </Select.Option>
          ))}
        </Select.Single>
      </Flex>
    </Flex>
  );
};

export default Component;
