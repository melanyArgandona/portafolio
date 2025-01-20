import { describe, expect, it, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/svelte';
import Content from './Content.svelte';

describe('Content Cpmponent', () => {
  afterEach(() => {
    cleanup();
  });
  it('should render with black background color', () => {
    render(Content, { bgColor: 'black' });
    const clazz = screen.getByTestId('content-element').getAttribute('class');
    expect(() => screen.getByTestId('content-element')).not.toThrow();
    expect(clazz).toContain('bgColor');
  });
  it('should render without black background color', () => {
    render(Content, { bgColor: 'white' });
    const clazz = screen.getByTestId('content-element').getAttribute('class');
    expect(() => screen.getByTestId('content-element')).not.toThrow();
    expect(clazz).not.toContain('bgColor');
  });
});
