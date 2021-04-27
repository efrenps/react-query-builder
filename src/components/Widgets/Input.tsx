import React, { useContext } from 'react';
import styled from 'styled-components';
import { clone } from '../../utils/clone';
import { isStringArray, isUndefined } from '../../utils/types';
import { BuilderContext } from '../Context';

interface InputProps {
  type: 'date' | 'number' | 'text';
  value: string | string[];
  id: string;
}

const DivContainer = styled.div({
  alignSelf: 'center',
});

export const Input: React.FC<InputProps> = inputProps => {
  const { type, value, id } = inputProps;
  const { data, setData, onChange, components, readOnly } = useContext(
    BuilderContext
  );

  const { form } = components;

  const handleBoolChange = (value: boolean) => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item: any) => item.id === id);
    clonedData[parentIndex].value = value === true ? 'TODAY' : '';
    setData(clonedData);
    onChange(clonedData);
  };

  const handleChange = (changedValue: any, index?: number) => {
    const clonedData = clone(data);
    const parentIndex = clonedData.findIndex((item: any) => item.id === id);

    if (!isUndefined(index)) {
      clonedData[parentIndex].value[index] = changedValue;
    } else {
      clonedData[parentIndex].value = changedValue;
    }

    setData(clonedData);
    onChange(clonedData);
  };

  if (form) {
    if (isStringArray(value)) {
      return (
        <>
          <form.Input
            type={type}
            value={value[0]}
            onChange={(changedValue: any) => handleChange(changedValue, 0)}
            disabled={readOnly}
          />
          <form.Input
            type={type}
            value={value[1]}
            onChange={(changedValue: any) => handleChange(changedValue, 1)}
            disabled={readOnly}
          />
        </>
      );
    } else {
      const isToday = value === 'TODAY';
      const dateValue = isToday ? '' : value;
      const dateDisabled = isToday ? true : readOnly;
      return (
        <>
          <form.Input
            type={type}
            value={dateValue}
            onChange={handleChange}
            disabled={dateDisabled}
          />
          <DivContainer>
            <form.Switch
              onChange={handleBoolChange}
              switched={isToday}
              disabled={readOnly}
            />
          </DivContainer>
          <DivContainer>
            <label>Today</label>
          </DivContainer>
        </>
      );
    }
  }

  return null;
};
