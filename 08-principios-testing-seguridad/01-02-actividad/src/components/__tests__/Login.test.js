import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import AmazonConditionsPanel from '../AmazonConditionsPanel';
import offer from './offerMock.json';

const {
  options: { appliesConditions },
} = offer;

describe('AmazonConditionsPanel', () => {
  beforeEach(() => {
    const portal = document.createElement('div');
    portal.id = 'portal';
    document.body.appendChild(portal);
  });

  it('AmazonConditionsPanel open & close', async () => {
    render(<AmazonConditionsPanel appliesConditions={appliesConditions} />);
    const openButton = /Aplica condiciones/gi;
    const closeButton = /Cerrar/gi;

    screen.getByText(openButton).click();
    await waitFor(() => expect(screen.getByText(closeButton)));
    expect(screen.getByText(closeButton)).toBeInTheDocument();

    screen.getByText(closeButton).click();
    await waitFor(() => expect(screen.getByText(openButton)));
    expect(screen.getByText(openButton)).toBeInTheDocument();
  });
});
