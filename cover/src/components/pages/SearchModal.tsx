import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import conf from 'common/conf';
import util from 'common/util';

import api from 'cover/api';
import A from 'cover/components/atoms/A';
import Flex from 'cover/components/atoms/Flex';
import H from 'cover/components/atoms/H';
import Spinner from 'cover/components/atoms/Spinner';
import { ModalFooter } from 'cover/components/organisms/Contents/Profile/common';
import { UserModalOptionType } from 'cover/components/organisms/Contents/Profile/index';
import Modal from 'cover/components/organisms/Modal';
import UserContent, { hoverAnimationBoxShadow } from 'cover/components/organisms/User/Content';
import styles from 'cover/styles';

type Props = {
  show: boolean;
  userModalOptions: UserModalOptionType;
  handleOnClose: () => void;
};

const Component: React.FC<Props> = ({ show, userModalOptions, handleOnClose }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    setIsLoading(true);
    const requestJson = util.deepCopy(userModalOptions);
    delete requestJson.isEditable;
    delete requestJson.index;

    // declare the data fetching function
    const fetchData = async () => {
      const result = await api.json('search', requestJson);
      setUsers(result.response);
      setIsLoading(false);
    };

    // call the function
    fetchData().catch((e) => {
      setIsLoading(false);
      console.error(e);
    });
  }, [userModalOptions]);

  return (
    <Modal.Structure
      show={show}
      closeModal={handleOnClose}
      flow="column nowrap"
      header={<H.Five>Search Result</H.Five>}
      content={
        <>
          {isLoading && (
            <Flex flow="column nowrap" width="100%" height="100%" alignItems="center" justifyContent="center">
              <Spinner />
            </Flex>
          )}
          <Flex flow="column nowrap" width="100%">
            {users.map((user, index) => (
              <A key={`UserContent_${index}`} href={`https://${conf.coverURL}/${user.email}/`} block>
                <ContentCustom className={'SearchContentUser'} user={user} fullWidth={false} hoverAnimationType={hoverAnimationBoxShadow} />
              </A>
            ))}
          </Flex>
        </>
      }
      footer={<ModalFooter userModalOptions={userModalOptions} handleOnClose={handleOnClose} showPositive={false} />}
      fullHeightContent
      upperPadding
      sidePadding
      bottomPadding
    />
  );
};

export default Component;

const ContentCustom = styled(UserContent)`
  margin-bottom: ${styles.baseMargin}ps;
`;
