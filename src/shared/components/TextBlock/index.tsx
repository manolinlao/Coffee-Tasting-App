import styled from '@emotion/styled';

const colors = {
  primary: '#007acc',
  secondary: '#555',
  success: '#28a745',
  error: '#dc3545',
  dark: '#333',
  light: '#eee',
};

const fontSizes = {
  extrasmall: '0.75rem',
  small: '0.875rem',
  medium: '1rem',
  large: '1.25rem',
  extralarge: '1.5rem',
};

interface TextBlockProps {
  size?: keyof typeof fontSizes;
  color?: keyof typeof colors;
  bold?: boolean;
  weight?: number | string;
  align?: 'left' | 'center' | 'right' | 'justify';
}

export const TextBlock = styled.p<TextBlockProps>`
  margin: 0;
  font-size: ${({ size = 'medium' }) => fontSizes[size]};
  color: ${({ color = 'dark' }) => colors[color] || color};
  font-weight: ${({ bold, weight }) =>
    bold ? '700' : weight ? weight : '400'};
  text-align: ${({ align = 'left' }) => align};
`;
