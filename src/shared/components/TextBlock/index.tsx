import styled from '@emotion/styled';

const fontSizes = {
  extrasmall: '0.75rem',
  small: '0.875rem',
  medium: '1rem',
  large: '1.25rem',
  extralarge: '1.5rem'
};

interface TextBlockProps {
  size?: keyof typeof fontSizes;
  color?:
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'neutral'
    | 'base-content'
    | 'success'
    | 'error'
    | 'warning';
  bold?: boolean;
  weight?: number | string;
  align?: 'left' | 'center' | 'right' | 'justify';
}

export const TextBlock = styled.p<TextBlockProps>`
  margin: 0;
  font-size: ${({ size = 'medium' }) => fontSizes[size]};
  color: ${({ color = 'dark' }) => `var(--color-${color})`};
  font-weight: ${({ bold, weight }) =>
    bold ? '700' : weight ? weight : '400'};
  text-align: ${({ align = 'left' }) => align};
`;
