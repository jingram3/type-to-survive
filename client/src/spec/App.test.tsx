import React from 'react';
import App from '../App';
import {render} from "@testing-library/react";
import {emit} from "../utils/eventHandlers";
import {Simulate} from "react-dom/test-utils";

jest.mock('../utils/eventHandlers.ts');

it('should allow user to enter their name before playing', function () {
  const container = render(<App/>);

  const nameInput = container.getByLabelText('Enter Your Name') as HTMLInputElement;
  nameInput.value = 'Joe';
  Simulate.change(nameInput);

  expect(container.queryByTestId('type-area')).toBeNull();
  const joinButton = container.getByText('Join') as HTMLButtonElement;

  joinButton.click();

  container.getByTestId('type-area');

  expect(emit).toBeCalledWith('player join', 'Joe');
});