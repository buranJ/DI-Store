import React, { createContext, useState, ReactNode } from 'react';

interface IHeaderContext {
  isSearchHide: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  isIconsHide: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  handleSearchHide: (value: boolean) => void;
  handleIconsHide: (value: boolean) => void;
  headerContent?: ReactNode;
  setHeaderContent: (content: ReactNode) => void;
  isShowArrow: boolean;
  handleShowArrow: (value: boolean) => void;
}

const HeaderContextState = createContext<IHeaderContext | null>(null);

interface HeaderContextProviderProps {
  children: ReactNode;
}

const HeaderContextProvider: React.FC<HeaderContextProviderProps> = ({
  children,
}) => {
  const [iseSearchHide, setIsSearchHide] = useState(true);
  const [isIconsHide, setIsIconsHide] = useState(true);
  const [headerContent, setHeaderContent] = useState<ReactNode | null>(null);
  const [isShowArrow, setIsShowArrow] = useState(false);

  const handleSearchHide = (value: boolean) => {
    setIsSearchHide(value);
  };

  const handleIconsHide = (value: boolean) => {
    setIsIconsHide(value);
  };

  const handleShowArrow = (value: boolean) => {
    setIsShowArrow(value);
  };

  const value: IHeaderContext = {
    isSearchHide: [iseSearchHide, setIsSearchHide],
    isIconsHide: [isIconsHide, setIsIconsHide],
    handleSearchHide,
    handleIconsHide,
    setHeaderContent,
    handleShowArrow,
    headerContent,
    isShowArrow,
  };

  return (
    <HeaderContextState.Provider value={value}>
      {children}
    </HeaderContextState.Provider>
  );
};

export { HeaderContextState, HeaderContextProvider };
