import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';

import conf from 'common/conf';

import styles from 'cover/styles';

const dragStatusDragover = 'dragover';
const dragStatusDragleave = 'dragleave';
const dragStatusDraged = 'draged';
const dragStatusDefault = dragStatusDragleave;
type DragStatusType = typeof dragStatusDragover | typeof dragStatusDragleave | typeof dragStatusDraged;

export const imageBg = 'bg';
export const imageIcon = 'icon';
export const imageDefault = imageBg;
export type ImageType = typeof imageBg | typeof imageIcon;

type Props = {
  onChange: (formData: FormData, fileName: string) => void;
  id: string;
  value?: string;
  type?: ImageType;
  className?: string;
};

const Component: React.FC<Props> = ({ type = imageDefault, id, value = '', className, onChange }) => {
  const containerRef = useRef(<div />);
  const dragDropInputRef = useRef(<input />);
  const [dragStatus, setDragStatus] = useState<DragStatusType>(dragStatusDefault);

  const preview = (file: File) => {
    if (dragDropInputRef.current) {
      const containerElm = containerRef.current as unknown as HTMLElement;

      let reader: FileReader = new FileReader();

      reader.onload = () => {
        const formData = new FormData();
        const base64String = String(reader.result);
        const createdFile = new File([base64String], id, { type: file.type, lastModified: new Date().getTime() });
        let extType = file.type.split('/')[1];
        extType = extType === 'jpeg' ? 'jpg' : extType;
        const fileName = `${type}.${extType}`;
        containerElm.style.backgroundImage = `url(${base64String})`;
        formData.append(type, createdFile);

        onChange(formData, fileName);
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
    setDragStatus(dragStatusDragleave);
  };

  return (
    <Container ref={containerRef} id={id} type={type} dragStatus={dragStatus} className={className} value={value}>
      <DragDropInput
        ref={dragDropInputRef}
        type="file"
        className={type}
        accept="image/*"
        name="photo"
        dragStatus={dragStatus}
        onDragOver={(e) => {
          e.preventDefault();
          setDragStatus(dragStatusDragover);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragStatus(dragStatusDragleave);
        }}
        onDrag={(e) => {
          e.preventDefault();
          setDragStatus(dragStatusDraged);
          let files = e.dataTransfer.files;
          preview(files[0]);
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files[0];
          preview(file);
        }}
      />
    </Container>
  );
};

export default Component;

type ContainerPropsType = {
  ref: any;
  id: string;
  value: string;
  type: ImageType;
  dragStatus: DragStatusType;
};

const bgCss = css<ContainerPropsType>`
  width: 100%;
  height: 230px;
  background-color: ${styles.brightColor};
  border: ${(props) => (props.dragStatus === dragStatusDragover ? 3 : 0)}px dashed ${styles.themeColor};
  :hover {
    box-shadow: ${styles.shadowHorizonBright};
  }
`;

const iconCss = css<ContainerPropsType>`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: rgb(190, 190, 190, 0.9);
  border: ${(props) => (props.dragStatus === dragStatusDragover ? 3 : 0)}px dashed ${styles.themeColor};
  :hover {
    box-shadow: 0px 0px 15px rgb(150 150 150);
  }
`;

const Container = styled.div<ContainerPropsType>`
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) => (props.type === imageBg ? bgCss : iconCss)}
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props) => getBackgroundImage({ id: props.id, image: props.value })};
  background-position: center;
  transition: ${styles.transitionDuration}ms;
`;

const DragDropInput = styled.input<{ ref: any; dragStatus: DragStatusType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: inherit;
  opacity: 0;
  cursor: pointer;
`;

const getBackgroundImage = ({ id, image }) => {
  if (image && image !== '') {
    return `url(https://${conf.assetsCoverPath}${id}/${image}), url(https://${conf.assetsCoverPath}${image}) `;
  } else {
    return `https://${conf.assetsCoverPath}/${image}`;
  }
};
