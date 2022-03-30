import React, { useEffect, useState } from 'react';

import util from 'common/util';

import api from 'cover/api';
import Flex from 'cover/components/atoms/Flex';
import H from 'cover/components/atoms/H';
import Spinner from 'cover/components/atoms/Spinner';
import { ModalFooter } from 'cover/components/organisms/Contents/Profile/common';
import { UserModalOptionType } from 'cover/components/organisms/Contents/Profile/index';
import Content, { hoverAnimationBoxShadow } from 'cover/components/organisms/EyeCatch/Content';
import Modal from 'cover/components/organisms/Modal';

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
  }, []);
  console.log(users);
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
            {users.map((user) => (
              <>
                <Content key={user.email} user={user} fullWidth={false} hoverAnimationType={hoverAnimationBoxShadow} />
                <br />
              </>
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
