import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import util from 'common/util';

import api from 'cover/api';
import Svg from 'cover/components/atoms/svg';
import { ModalFooter, getAllFillInputs, TagId } from 'cover/components/organisms/Contents/Profile/common';
import Modal from 'cover/components/organisms/Modal';
import UserContent, { hoverAnimationBoxShadow } from 'cover/components/organisms/User/Content';
import Flex, { A, H5, FlexesContextType, useFlexesContext } from 'cover/flexes';
import {
  FixValuesType,
  TagParentType,
  TagType,
  tagFounder,
  tagInvestor,
  tagMember,
  tagStory,
  tagParentSelf,
  OpenModalOptionType,
} from 'cover/model/userTags';
import { UserTagsType } from 'cover/model/userTags';
import { FixFounderValuesType } from 'cover/model/userTags/Founder';
import { FixInvestorValuesType } from 'cover/model/userTags/Investor';
import { FixMemberValuesType } from 'cover/model/userTags/Member';
import { FixStoryValuesType } from 'cover/model/userTags/Story';
import { getFixValuesEmpty, getHasSelfTags, getExtractFixValues } from 'cover/utils/userTags';

import FounderMenu from './FounderMenu';
import InvestorMenu from './InvestorMenu';
import MemberMenu from './MemberMenu';
import StoryMenu from './StoryMenu';

type Props = {
  show: boolean;
  openModalOptions: OpenModalOptionType;
  isMyPage: boolean;
  userTags: UserTagsType;
  handleOnClickRemove: (tagParentType: TagParentType, tagType: TagType, index: number, hasSelfTags: {}) => void;
  handleOnClickCancel: () => void;
  handleOnClickSaveUserTag: (openModalOptions: OpenModalOptionType, hasSelfTags: {}) => void;
};

const Component: React.FC<Props> = ({
  show,
  openModalOptions,
  isMyPage = false,
  userTags,
  handleOnClickRemove: handleOnClickRemoveUserTags,
  handleOnClickCancel,
  handleOnClickSaveUserTag,
}: Props) => {
  const { tagParentType, tagType, tagId, userId, index } = openModalOptions;
  const globalContext: FlexesContextType = useFlexesContext();
  const fixValuesEmpty = getFixValuesEmpty(tagType);
  const [isDidMount, setIsDidMount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckAnimation, setIsCheckAnimation] = useState(false);
  const [contentIndex, setContentIndex] = useState(0);

  const [searchedUsers, setSearchedUsers] = useState<any[]>([]);
  const [disableSearchButton, setDisableSearchButton] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(true);
  const [fixValues, setFixValues] = useState<FixValuesType>(fixValuesEmpty);
  const [fixValuesInit, setFixValuesInit] = useState<FixValuesType>(fixValuesEmpty);

  const isCreate = tagId === '';
  const isChange = util.deepEquals(fixValuesInit, fixValues);
  const enableRemoveButton = isChange && !isCreate;
  const isSelf = openModalOptions.tagParentType === tagParentSelf;

  const getDisableSaveButton = () => {
    const allFillInputs = getAllFillInputs(fixValues, tagType);
    const isEquals = util.deepEquals(fixValuesInit, fixValues);
    return !(allFillInputs && !isEquals);
  };
  const handleOnClickSave = async () => {
    setIsLoading(true);
    const hasSelfTags = getHasSelfTags(userTags, 'save', tagType as TagType);
    const requestModalOptions = util.deepCopy({ ...openModalOptions, ...fixValues });
    const requestParams = { userTags: { ...requestModalOptions }, user: { _id: userId, hasSelfTags } };
    const response = await api.json('upsertUserTag', requestParams);
    setIsLoading(false);
    if (response.upsertedId) {
      requestModalOptions.tagId = response.upsertedId;
    }

    handleOnClickSaveUserTag(requestModalOptions as OpenModalOptionType, hasSelfTags);
    setFixValuesInit(getExtractFixValues(requestModalOptions));
    setIsCheckAnimation(true);
    setTimeout(() => {
      setIsCheckAnimation(false);
    }, 2000);
  };

  const handleOnChangeContentIndex = (contentIndex) => {
    setContentIndex(contentIndex);
  };

  const fetchUser = (fixValues) => {
    setIsLoading(true);
    const requestJson = util.deepCopy({ ...openModalOptions, ...fixValues });

    delete requestJson.isEditable;
    delete requestJson.index;

    const fetchData = async () => {
      const response = await api.json('search', requestJson);
      setSearchedUsers(response);
      setIsLoading(false);
    };

    fetchData().catch((e) => {
      setIsLoading(false);
      console.error(e);
    });
  };

  const handleOnClickRemove = () => {
    const hasSelfTags = getHasSelfTags(userTags, 'remove', tagType as TagType);
    api.json('removeUserTag', { userTags: { _id: tagId }, user: { _id: userId, hasSelfTags } });
    handleOnClickRemoveUserTags(tagParentType as TagParentType, tagType as TagType, index, hasSelfTags);
    handleOnClickCancel();
  };

  const getMenuNode = () => {
    const type = `${tagParentType}_${tagType}`;
    let menuNode;

    switch (tagType) {
      case tagInvestor:
        menuNode = <InvestorMenu type={type} fixValues={fixValues as FixInvestorValuesType} setFixValues={setFixValues} />;
        break;
      case tagFounder:
        menuNode = <FounderMenu type={type} fixValues={fixValues as FixFounderValuesType} setFixValues={setFixValues} />;
        break;
      case tagMember:
        menuNode = <MemberMenu type={type} fixValues={fixValues as FixMemberValuesType} setFixValues={setFixValues} />;
        break;
      case tagStory:
        menuNode = (
          <StoryMenu
            type={type}
            optionStoryId={openModalOptions.storyId}
            fixValues={fixValues as FixStoryValuesType}
            userTags={userTags}
            setFixValues={setFixValues}
          />
        );
        break;
    }
    return (
      <>
        {menuNode}
        <TagId className="TagId" select>
          ID: {tagId !== '' ? tagId : '-'}
        </TagId>
      </>
    );
  };

  useEffect(() => {
    if (show) {
      if (isDidMount) {
        setDisableSaveButton(getDisableSaveButton());
        setDisableSearchButton(!getAllFillInputs(fixValues, tagType));
      } else {
        setIsDidMount(true);
      }
    }
  }, [show, fixValues]);

  useEffect(() => {
    fetchUser(openModalOptions);
    const values = getExtractFixValues(openModalOptions);
    setFixValues(values);
    setFixValuesInit(values);
  }, []);

  return (
    <Modal.Full
      show={show}
      width="100%"
      overflow="hidden"
      flow="column nowrap"
      contentIndex={contentIndex}
      handleOnClickClose={handleOnClickCancel}
      handleOnChangeContentIndex={handleOnChangeContentIndex}
      isCheckAnimation={isCheckAnimation}
      isLoading={isLoading}
      header={
        <>
          <H5>
            {tagParentType} - {tagType}
            {index !== undefined && ` (No${index + 1})`}
          </H5>
          <Flex width="25%" maxWidth="120px" justifyContent="space-around">
            {isMyPage && <Svg.Notif />}
            <Svg.Close onClick={handleOnClickCancel} />
          </Flex>
        </>
      }
      menu={getMenuNode()}
      content={
        <>
          {searchedUsers &&
            searchedUsers.map((user, index) => (
              <ACustom key={`UserContent_${index}`} href={`https://${conf.coverURL}/${userId}/`} display="block">
                <UserContent
                  className={'SearchUserContent'}
                  user={user}
                  fullWidth={false}
                  layout="search"
                  hoverAnimationType={hoverAnimationBoxShadow}
                />
              </ACustom>
            ))}
        </>
      }
      footer={<ModalFooter isMyPage={isMyPage} handleOnClickRemove={handleOnClickRemove} handleOnClickSave={handleOnClickSave} />}
      upperPadding
      sidePadding
      bottomPadding
    />
  );
};

export default Component;

const ACustom = styled(A)`
  width: 100%;
  min-width: 100%;
  max-width: 100%;
`;
