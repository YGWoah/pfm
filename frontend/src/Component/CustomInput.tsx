import React, {  useState, forwardRef, Ref } from 'react';

interface CustomInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeErrorMessage?: string;
  onBlurErrorMessage?: string;
  onChangePattern?: RegExp;
  onBlurPattern?: RegExp;
}

const CustomInput = forwardRef(
  (
    {
      onChangePattern,
      onBlurPattern,
      onChangeErrorMessage,
      onBlurErrorMessage,
      ...props
    }: CustomInputProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const input = e.target;

      if (!input) return;

      if (onChangePattern && !onChangePattern.test(input.value)) {
        if (onChangeErrorMessage) setError(onChangeErrorMessage);
      } else {
        setError(null);
      }
    };

    const handleInputBlur = (
      e: React.FocusEvent<HTMLInputElement>
    ) => {
      const input = e.target;

      if (!input) return;

      if (onBlurPattern && !onBlurPattern.test(input.value)) {
        if (onBlurErrorMessage) setError(onBlurErrorMessage);
      } else {
        setError(null);
      }
    };

    return (
      <React.Fragment>
        <input
          {...props}
          ref={ref}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />

        {error && (
          <span className="text-red-700 block text-sm font-medium">
            {error}
          </span>
        )}
      </React.Fragment>
    );
  }
);

export default CustomInput;
