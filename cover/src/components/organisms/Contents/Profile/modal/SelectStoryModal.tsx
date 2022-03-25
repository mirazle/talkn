import React, { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';

import Button, { buttonThemeBright } from 'cover/components/atoms/Button';
import H from 'cover/components/atoms/H';
import { TagParentType, TagType } from 'cover/components/organisms/Contents/Profile';
import { Profiles, ModalFooter, handleOnSearch } from 'cover/components/organisms/Contents/Profile/common';
import { UserModalOptionType } from 'cover/components/organisms/Contents/Profile/index';
import SelectStory from 'cover/components/organisms/Contents/Profile/modal/children/SelectStory';
import Modal from 'cover/components/organisms/Modal';
import { UserTagsType } from 'cover/talkn.cover';

export type FixValuesType = {
  storyId: string;
};

export const fixValuesInit: FixValuesType = {
  storyId: '',
};

type Props = {
  show: boolean;
  userTags: UserTagsType;
  userModalOptions: UserModalOptionType;
  onCancel: () => void;
  onOk: (tagParentType: TagParentType | '', tagType: TagType | '', fixValues: FixValuesType, index: number) => void;
};

const Component: FunctionComponent<Props> = ({ show, userTags, userModalOptions, onOk, onCancel }: Props) => {
  const [didMount, setDidMount] = useState(false);
  const [disableButtonOk, setDisableButtonOk] = useState(false);
  const [initValues, setInitValues] = useState<FixValuesType>(fixValuesInit);
  const [fixValues, setFixValues] = useState<FixValuesType>(fixValuesInit);
  const isEditable = userModalOptions.isEditable;

  const handleOnChangeStory = (storyId) => {
    setFixValues({ ...fixValues, storyId });
  };

  const handleOnClose = () => {
    setFixValues({ ...initValues });
    onCancel();
  };

  useEffect(() => {
    if (show) {
      if (didMount) {
        setDisableButtonOk(Boolean(Object.keys(fixValues).find((key) => fixValues[key] === '')));
      } else {
        setDidMount(true);
      }
    }
  }, [show, fixValues]);

  useEffect(() => {
    const values = {
      ...fixValues,
      storyId: userModalOptions.storyId,
    };
    setFixValues(values);
    setInitValues(values);
  }, [userModalOptions]);

  return (
    <Modal.Structure
      show={show}
      closeModal={handleOnClose}
      flow="column nowrap"
      header={<H.Five>{userModalOptions.tagParentType}</H.Five>}
      content={
        <SelectStory
          selected={userTags && userTags.story ? userTags.story.filter((storyId) => storyId !== fixValues.storyId) : []}
          storyId={fixValues.storyId}
          onChange={handleOnChangeStory}
        />
      }
      footer={
        <ModalFooter
          isEditable={isEditable}
          rightButtonDisabeld={disableButtonOk}
          onClickRightButton={() =>
            isEditable
              ? onOk(userModalOptions.tagParentType, userModalOptions.tagType, fixValues, userModalOptions.index)
              : handleOnSearch(userModalOptions)
          }
          handleOnClose={handleOnClose}
        />
      }
      upperPadding
      sidePadding
      bottomPadding
    />
  );
};

export default Component;
