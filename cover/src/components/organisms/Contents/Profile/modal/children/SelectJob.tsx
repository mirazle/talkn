import React, { useState, useEffect } from 'react';

import Select from 'cover/components/atoms/select';
import SelectYear from 'cover/components/organisms/Contents/Profile/modal/children/SelectYear';
import Flex, { Label } from 'cover/flexes';

type Props = {
  type: string;
  isEditable: boolean;
  jobParentId: string;
  jobId: string;
  year: number;
  onChangeJob: (jobParentId: string, jobId: string) => void;
  onChangeYear: (year: number) => void;
};

const Component: React.FC<Props> = ({
  type,
  isEditable,
  jobParentId: _jobParentId,
  jobId: _jobId,
  year: _year,
  onChangeJob,
  onChangeYear,
}: Props) => {
  const [jobParentId, setJobParentId] = useState(_jobParentId);
  const [jobId, setJobId] = useState(_jobId);
  const [jobStaticData, setJobStaticData] = useState([]);
  const [year, setYear] = useState(_year);
  const handleOnChangeJobParent = (value) => {
    setJobParentId(value);
    setJobId('');
    onChangeJob(value, '');
  };

  const handleOnChangeJob = (value) => {
    setJobId(value);
    onChangeJob(jobParentId, value);
  };

  const handleOnChangeYear = (value) => {
    setYear(year);
    onChangeYear(value);
  };

  useEffect(() => {
    setJobParentId(_jobParentId);
  }, [_jobParentId]);

  useEffect(() => {
    setJobId(_jobId);
  }, [_jobId]);

  useEffect(() => {
    setYear(_year);
  }, [_year]);

  useEffect(() => {
    const updateJobStaticData = window.talknDatas.staticTags.jobs.filter((ind) => ind.parentId === jobParentId);
    setJobStaticData(updateJobStaticData);
  }, [jobParentId]);

  return (
    <Flex flow="column nowrap">
      <Label bottomMargin>Job</Label>
      <Flex flow="row wrap" alignItems="center">
        <Select.Single
          name={`${type}_jobParent}`}
          disabled={!isEditable}
          label={'Job'}
          onChange={handleOnChangeJobParent}
          value={jobParentId}
          noSelectOption>
          {window.talknDatas.staticTags.jobParents.map((tag, index) => (
            <Select.Option key={`JobParents_${type}_${tag.uniqueId}_${index}`} value={tag.uniqueId}>
              {tag.ja}
            </Select.Option>
          ))}
        </Select.Single>

        <Select.Single name={`job[]`} disabled={!isEditable} onChange={handleOnChangeJob} value={jobId} noSelectOption>
          {jobStaticData.map((tag, index) => (
            <Select.Option key={`Job_${type}_${tag.uniqueId}_${index}`} value={tag.uniqueId}>
              {tag.ja}
            </Select.Option>
          ))}
        </Select.Single>

        <SelectYear type={type} isEditable={isEditable} year={year} onChange={handleOnChangeYear} />
      </Flex>
    </Flex>
  );
};

export default Component;
