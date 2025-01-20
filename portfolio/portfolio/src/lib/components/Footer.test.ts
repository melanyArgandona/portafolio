import { describe, it, afterEach, expect } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import Footer from './Footer.svelte';

describe('footer', () => {
  afterEach(() => {
    cleanup();
  });
  it('should containt rights paragraph', () => {
    render(Footer);
    expect(() => screen.getByText(/All right reserved/i)).not.toThrow();
    expect(() => screen.getAllByRole('link')).toThrow();
  });
  it('should render with provided sociala networks', () => {
    const socialNetworks: Array<{ type: string; link: string }> = [
      {
        type: 'facebook',
        link: 'https://facebook.com'
      },
      {
        type: 'twitter',
        link: 'https://twitter.com'
      }
    ];
    render(Footer, { socialNetworks });
    expect(() => screen.getAllByRole('link')).not.toThrow();
    const links = screen.getAllByRole('link');
    expect(links.length).toBe(socialNetworks.length);
  });
});
