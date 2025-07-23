import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  max-width: 500px;
  margin: 2rem auto;
  gap: 1.5rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const FileInputWrapper = styled.div`
  padding-top: 0.5rem;

  input[type='file'] {
    width: 100%;
    cursor: pointer;
  }
`;

export const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 0.5rem;
`;

export const PreviewImage = styled.img`
  width: 100%;
  max-height: 250px;
  object-fit: contain;
  border-radius: 0.75rem;
  margin-bottom: 1rem;
  background-color: #f3f3f3;
`;

export const ErrorList = styled.div`
  background-color: #ffe6e6;
  color: #cc0000;
  border: 1px solid #cc0000;
  border-radius: 4px;
  padding: 12px 16px;
  margin-bottom: 16px;
  font-size: 0.9rem;

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin-bottom: 4px;
  }
`;
