import React, { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';

import H from 'cover/components/atoms/H';
import { ModalFooter, TagId } from 'cover/components/organisms/Contents/Profile/common';
import { UserModalOptionType } from 'cover/components/organisms/Contents/Profile/index';
import SelectStory from 'cover/components/organisms/Contents/Profile/modal/children/SelectStory';
import Modal from 'cover/components/organisms/Modal';
import { UserType, UserTagsType } from 'cover/talkn.cover';

export type FixValuesType = {
  storyId: string;
};

export const fixValuesInit: FixValuesType = {
  storyId: '',
};

type Props = {
  show: boolean;
  user: UserType;
  userTags: UserTagsType;
  userModalOptions: UserModalOptionType;
  onClickPositive: (userModalOptions: UserModalOptionType, fixValues: FixValuesType) => void;
  onCancel: () => void;
};

const Component: FunctionComponent<Props> = ({ show, userTags, userModalOptions, onClickPositive, onCancel }: Props) => {
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
        <>
          <SelectStory
            isEditable={isEditable}
            clickedStoryId={userModalOptions.storyId}
            selected={userTags ? userTags.story.story.map((obj) => obj.storyId) : []}
            storyId={fixValues.storyId}
            onChange={handleOnChangeStory}
          />
          <br />
          <TagId>ID: {userModalOptions._id && userModalOptions._id !== '' ? userModalOptions._id : '-'}</TagId>
        </>
      }
      footer={
        <ModalFooter
          userModalOptions={userModalOptions}
          positiveDisabeld={disableButtonOk}
          onClickPositive={() => onClickPositive(userModalOptions, fixValues)}
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
