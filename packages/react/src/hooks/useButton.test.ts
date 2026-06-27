import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useButton } from './useButton';

describe('useButton', () => {
  it('returns buttonProps, isPressed, and buttonRef', () => {
    const { result } = renderHook(() => useButton({}));

    expect(result.current.buttonProps).toBeDefined();
    expect(result.current.isPressed).toBe(false);
    expect(result.current.buttonRef).toBeDefined();
  });

  it('buttonRef is a React ref object', () => {
    const { result } = renderHook(() => useButton({}));
    expect(result.current.buttonRef).toHaveProperty('current');
  });

  it('forwards aria-label to buttonProps', () => {
    const { result } = renderHook(() => useButton({ 'aria-label': 'Close dialog' }));
    expect(result.current.buttonProps['aria-label']).toBe('Close dialog');
  });

  it('sets disabled when isDisabled is true', () => {
    const { result } = renderHook(() => useButton({ isDisabled: true }));
    // React Aria sets the native `disabled` attribute for button elements
    // @ts-expect-error Property 'disabled' does not exist on type 'HTMLAttributes<HTMLElement>'
    expect(result.current.buttonProps.disabled).toBe(true);
  });

  it('does not set disabled when isDisabled is false', () => {
    const { result } = renderHook(() => useButton({ isDisabled: false }));
    // @ts-expect-error Property 'disabled' does not exist on type 'HTMLAttributes<HTMLElement>'
    expect(result.current.buttonProps.disabled).toBeFalsy();
  });

  it('isPressed is initially false', () => {
    const { result } = renderHook(() => useButton({}));
    expect(result.current.isPressed).toBe(false);
  });
});
