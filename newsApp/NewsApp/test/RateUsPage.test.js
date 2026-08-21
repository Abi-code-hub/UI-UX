import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RateUsPage from '../pages/RateUsPage';
import { AppContext } from '../context/AppContext';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');

const mockContext = { theme: 'light', user: { name: 'Alice' } };

describe('RateUsPage', () => {
  it('renders correctly and shows stars', () => {
    const { getAllByText } = render(
      <AppContext.Provider value={mockContext}>
        <RateUsPage />
      </AppContext.Provider>
    );
    expect(getAllByText('⭐').length).toBe(5);
  });

  it('submits 5-star rating and shows alert', () => {
    const { getAllByText, getByText } = render(
      <AppContext.Provider value={mockContext}>
        <RateUsPage />
      </AppContext.Provider>
    );

    fireEvent.press(getAllByText('⭐')[4]); // select 5th star
    fireEvent.press(getByText('🎯 Submit Rating'));

    expect(Alert.alert).toHaveBeenCalledWith(
      "Thank You! 🎉",
      expect.stringContaining('5-star rating'),
      expect.any(Array)
    );
  });

  it('handles share app alert', () => {
    const { getByText } = render(
      <AppContext.Provider value={mockContext}>
        <RateUsPage />
      </AppContext.Provider>
    );

    fireEvent.press(getByText('📤 Share with Friends'));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Share App",
      expect.any(String),
      expect.any(Array)
    );
  });
});