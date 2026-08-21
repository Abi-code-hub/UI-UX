import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ShareNewsPage from '../pages/ShareNewsPage';
import { AppContext } from '../context/AppContext';
import { Alert } from 'react-native';

jest.spyOn(Alert, 'alert');

const mockContext = { theme: 'light', toggleTheme: jest.fn() };

describe('ShareNewsPage', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <AppContext.Provider value={mockContext}>
        <ShareNewsPage />
      </AppContext.Provider>
    );
    expect(getByText('Share News')).toBeTruthy();
    expect(getByText('📷 Add Photo')).toBeTruthy();
  });

  it('shares text correctly', async () => {
    const { getByPlaceholderText, getByText } = render(
      <AppContext.Provider value={mockContext}>
        <ShareNewsPage />
      </AppContext.Provider>
    );

    fireEvent.changeText(getByPlaceholderText('Add your news text here...'), 'Hello world');
    fireEvent.press(getByText('📤 Share News'));

    await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith(
      'Share News', 'Your news text is shared!', expect.any(Array)
    ));
  });

  it('shares image correctly', async () => {
    const { getByText } = render(
      <AppContext.Provider value={mockContext}>
        <ShareNewsPage />
      </AppContext.Provider>
    );

    fireEvent.press(getByText('📷 Add Photo'));
    await waitFor(() => expect(Alert.alert).toHaveBeenCalled());
  });
});