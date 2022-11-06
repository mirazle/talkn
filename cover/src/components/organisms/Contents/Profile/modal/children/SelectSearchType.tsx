import React, { useState } from 'react';

import util from 'common/util';

import Select from 'cover/components/atoms/select';
import Flex, { Label } from 'cover/flexes';
import { tagTypes, TagType } from 'cover/model/userTags';

type Props = {
  type: string;
  isEditable: boolean;
  onChange: (searchType: TagType) => void;
  searchType?: TagType;
  underline?: boolean;
};

const Component: React.FC<Props> = ({ type, isEditable, searchType, underline = false, onChange }: Props) => {
  const [value, setValue] = useState(searchType);
  const handleOnChange = (value) => {
    setValue(value);
    onChange(value);
  };

  return (
    <Flex flow="column nowrap" width="100%" border={underline ? 'underline' : 'none'} bottomPadding bottomMargin>
      <Label bottomMargin>Search Types</Label>
      <Flex flow="row wrap" alignItems="center">
        <Select.Single name={'SearchType'} disabled={!isEditable} onChange={handleOnChange} value={value} noSelectOption>
          {tagTypes.map((tagType) => {
            const tagTypeUpper = util.getHeadUpper(tagType);
            return (
              <Select.Option key={`SearchType${tagTypeUpper}`} value={tagType}>
                {tagTypeUpper}
              </Select.Option>
            );
          })}
        </Select.Single>
      </Flex>
    </Flex>
  );
};

export default Component;
